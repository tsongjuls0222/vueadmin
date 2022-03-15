<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">편집</div>
            <div @click="$emit('close')" class="is-clickable card-header-close pr-4 pt-2"><span class="mdi mdi-close-circle-outline"></span></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="box mb-2">
                    <div v-show="position != 'bubonsa'" class="mb-2">
                        <div class=""><span>Transfer Partner</span></div>
                        <div class="columns">
                            <div class="column">
                                <label for="">From</label>
                                <input type="text" class="input" v-model="partnername" readonly>
                            </div>
                            <div class="column">
                                <label for="">To</label>
                                <div class="select" style="width:100%">
                                    <select v-model="transfer_to" name="" id="" style="width:100%">
                                        <option value="0">파트너 선택</option>
                                        <option v-for="opt in agents" :key="opt.ia_idx" :value="opt.ia_idx">{{opt.ia_name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="column is-one-fifth mt-5"><button @click="transferpartner" class="button is-info">수정</button></div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <div class=""><span>회원이동</span></div>
                        <div class="columns">
                            <div class="column">
                                <label for="">From</label>
                                <input type="text" class="input" v-model="partnername" readonly>
                            </div>
                            <div class="column">
                                <label for="">To</label>
                                <div class="select" style="width:100%">
                                    <select v-model="target_partner" name="" id="" style="width:100%">
                                        <option value="0">파트너 선택</option>
                                        <option v-for="opt in memberagents" :key="opt.ia_idx" :value="opt.ia_idx">{{opt.ia_name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div @click="transfermember" class="column is-one-fifth mt-5"><button class="button is-info">수정</button></div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <div class=""><span>정산금이동</span></div>
                        <div class="columns">
                            <div class="column">
                                <label for="">From</label>
                                <input type="text" class="input" v-model="partnerbalance" readonly>
                            </div>
                            <div class="column">
                                <label for="">To</label>
                                <div class="select" style="width:100%">
                                    <select name="" id="" style="width:100%">
                                        <option value="0">파트너 선택</option>
                                        <option v-for="opt in agents" :key="opt.ia_idx" :value="opt.ia_idx">{{opt.ia_name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="column is-one-fifth mt-5"><button class="button is-info">수정</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../../globalfunction/paging';
import API from '../../api/partner';
export default {
    props:['ip','partnerinfo','refresh','balance','position'],
    data() {
        return {
            partnername:'',
            partnerbalance:'',
            agents:[],
            transfer_to:0,
            memberagents:[],
            target_partner:0,
        }
    },
    methods: {
        formatDate(){
            return global.methods.formatDateAndTime();
        },
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        },
        setfields(){
            this.partnername = this.partnerinfo.ia_code;
            this.partnerbalance = this.balance;
        },
        async getcodes(){
            const res = await API.gettransferagentcodes();
            this.agents = res;
            const ress = await API.getmemberagentcodes();
            this.memberagents = ress;
        },
        async transferpartner(){
            var sendData = {
                transfer_who: this.partnerinfo.ia_idx,
                transfer_to: this.transfer_to,
                transfer_type: this.position,
            }
            const res = await API.transferpartner(sendData);
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
            if(res.status > 0){
                this.refresh();
                this.$emit('close');
            }
        },
        async transfermember(){
            var sendData = {
                transfer_who : this.partnerinfo.ia_idx,
                transfer_to : this.target_partner,
                datenow: this.formatDate(),
            }
            
            const res = await API.transfermember(sendData);
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
            if(res.status > 0){
                this.refresh();
                this.$emit('close');
            }
        }
    },
    created() {
        this.setfields();
        this.getcodes();
    },
}
</script>