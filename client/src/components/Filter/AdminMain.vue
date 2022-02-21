<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-body pl-5 pr-4 pb-4">
                <div class="field is-narrow">
                    <div class="select">
                        <select v-model="agentDataSelect" @change="selectCodeByAgent()">
                            <option value="-1">전체회원</option>
                            <option  v-for="agent in mutableAgent" :value="agent.ia_idx" :key="agent.id">{{ agent.ia_name }}</option>
                        </select>
                    </div>
                </div>
                <div class="field is-narrow">
                    <div class="select">
                        <select v-model="codeDataSelect" @change="selectAgentByCode()">
                            <option value="-1">코드</option>
                            <option  v-for="code in mutableCode" :value="code.icd_code" :key="code.id">{{ code.icd_code }}</option>
                        </select>
                    </div>
                </div>
                <div class="field is-narrow">
                    <div class="select">
                        <select v-model="filterType">
                            <option value="username">아이디</option>
                            <option value="iu_nickname">닉네임</option>
                            <option value="iu_name">이름</option>
                            <option value="iu_phone">연락처</option>
                            <option value="iu_acc">계좌번호</option>
                        </select>
                    </div>
                </div>
                <div class="field is-narrow">
                    <input class="input" type="text" placeholder="검색내용" v-model="filterKeyword">
                </div>
                <div class="field is-narrow">
                    <input class="input" type="date" placeholder="검색내용" v-model="fromdate">
                </div>
                <div class="field is-narrow">
                    <input class="input" type="date" placeholder="검색내용" v-model="todate">
                </div>
                <div class="field is-narrow">
                    <button type="button" class="button is-info" @click="filterTransaction()"><i class="mdi mdi-account-search"></i>&nbsp;&nbsp;검색</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from "../../api/admin";
export default {
    name : "AdminMain",
    props: ["worktype","transaction"],
    data(){
        return{
            fromdate: new Date().toISOString().substr(0, 10),
            todate: new Date().toISOString().substr(0, 10),
            agentDataSelect: "-1",
            codeDataSelect: "-1",
            filterType: "username",
            filterKeyword : ""
        }
    },
    methods : {
        async selectCodeByAgent(){
            const id = this.agentDataSelect;
            const res = await API.CodeByAgent(id);
            this.$store.dispatch('setNewCodes',res);
        },
        async selectAgentByCode(){
            const id = this.codeDataSelect;
            const res = await API.AgentByCode(id);
            this.$store.dispatch('setNewAgents',res);
        },
        async filterTransaction(){
            const ndata = [];
            this.$store.dispatch('setNewTableCounter',0);
            this.$store.dispatch('setNewData',ndata);

            const sendData = {
                AgentFilter : this.agentDataSelect,
                CodeFilter : this.codeDataSelect,
                FieldFilter : this.filterType,
                KeywordFilter : this.filterKeyword,
                TransactionFilter : this.transaction,
                WorktypeFilter : this.worktype,
                DatefromFilter : this.fromdate+" 00:00:00",
                DatetoFilter : this.todate+" 23:59:59"
            };
            const res = await API.filterTransaction(sendData);
            this.$store.dispatch('setNewData',res);
            const res2 = await API.filterRadioData(sendData);
            this.$store.dispatch('setNewRadioData',res2);
            
            if(res.length <= 0){
                this.$store.dispatch('setNewTableCounter',-1);
            }
            
        }
    },
    computed : {
        mutableCode(){
            return this.$store.getters.getCodes;
        },
        mutableAgent(){
            return this.$store.getters.getAgents;
        }
    }
}
</script>
<style scoped>
* {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.8125rem;
    font-weight: 400;
    color: #333;
}
.is-narrow input{
    height: 2.05em;
}
.is-narrow i{
    font-size: 20px;
    color: white;
}
.is-narrow button{
    height: 2.05em;
}
</style>