<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field is-narrow">
                    <button type="button" class="button is-success is-focused" @click="setSellAllToInput(2,checkedRows)">승인</button>
                </div>
                <div class="field is-narrow">
                    <button type="button" class="button is-info is-focused" @click="setSellAllToInput(1,checkedRows)">대기</button>
                </div>
                <div class="field is-narrow">
                    <button type="button" class="button is-danger is-focused" @click="setSellAllToInput(3,checkedRows)">취소</button>
                </div>
                <div class="field is-narrow">
                    <button type="button" class="button is-success is-focused" @click="PopupMessage()">쪽지발송</button>
                </div>
            </div>
        </div>
        <div class="columns is-fullwidth">
            <div class="column is-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" v-model="allSelected" @click="selectAll" :disabled="newData <= 0"></th>
                            <th><span>구분</span></th>
                            <th><span>총판</span></th>
                            <th><span>코드</span></th>
                            <th><span>레벨</span></th>
                            <th><span>아이디</span></th>
                            <th><span>닉네임</span></th>
                            <th><span>이름</span></th>
                            <th><span>입/출</span></th>
                            <th><span>은행/주소</span></th>
                            <th><span>수량</span></th>
                            <th><span>금액</span></th>
                            <th><span>포인트</span></th>
                            <th><span>신청일시</span></th>
                            <th><span>처리일시</span></th>
                            <th><span>상태</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in newData" :key="index" :class="rowClass(row.it_type,row.it_proceed,row.it_status)">
                            <td><input type="checkbox" :value="{'id':row.it_idx,'name':row.username+' '+row.iu_name}" v-model="checkedRows" ></td>
                            <td><span>{{ getDivision(row.it_proceed,row.coinType) }}</span></td>
                            <td><span>{{ row.ia_name }}</span></td>
                            <td><span>{{ row.real_code }}</span></td>
                            <td><span>{{ row.iu_level }}</span></td>
                            <td><span>{{ row.username }}</span></td>
                            <td><span>{{ row.iu_nickname }}</span></td>
                            <td><span>{{ row.iu_name }}</span></td>
                            <td><span><p><span class="has-text-info">{{ row.depositcount }}</span> / <span class="has-text-danger">{{ row.withdrawalcount }}</span></p></span></td>
                            <td><span>{{ getAddress(row.iu_bank,row.iu_acc,row.it_proceed,row.walletAddress,row.gwallet_data) }}</span></td>
                            <td><span>{{ getCoinAmount(row.it_proceed,row.gwallet_data) }}</span></td>
                            <td><input type="text" class="input is-small" style="text-align: right;" v-model="row.newAmount"></td>
                            <td><span><input type="text" class="input is-small" style="text-align: right;" v-model="row.newPoint"></span></td>
                            <td><span>{{ changeDate(row.it_reg_datetime) }}</span></td>
                            <td><span>{{ checkDate(row.it_update_datetime) }}</span></td>
                            <td>
                                <template v-if="checkStatus(row.it_status) == 'else'" >
                                    <button class="button is-success is-small" @click="transactionProcess(row.it_idx,2)">승인</button>&nbsp;
                                    <button class="button is-primary is-small" @click="transactionProcess(row.it_idx,1)">대기</button>&nbsp;
                                    <button class="button is-danger is-small" @click="transactionProcess(row.it_idx,3)">취소</button>
                                </template>
                                <template v-else>
                                    {{checkStatus(row.it_status)}}
                                </template>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <template>
                    <div class="is-flex" style="height: 500px" v-if="newData.length == 0 && counterTrigger == -1">
                        <div
                            class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                        >
                            <b-icon icon="information-outline" size="is-large"></b-icon>
                            <span class="is-size-4 is-unselectable">Sorry, no data found.</span>
                        </div>
                    </div>
                    <div class="is-flex" style="height: 500px" v-if="newData.length == 0 && counterTrigger == 0">
                        <div
                            class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                        >
                            <b-icon icon="information-outline" size="is-large"></b-icon>
                            <span class="is-size-4 is-unselectable">Loading.........</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import SendMessage from "../../components/Popup/SendMessage.vue";
import API from "../../api/admin";
export default {
    name : "AdminMain",
    props: ["isEmpty"],
    data(){
        return {
            isNarrowed: false,
            checkedRows: [],
            checkedRowsName: [],
            newamount: 0,
            newpoint: 0,
            allSelected: false
        }
    },
    methods : {
        selectAll() {
            if(this.allSelected == false){
                const ndata = [];
                this.newData.forEach((v, index) => {
                    ndata.push({'id':v.it_idx,'name':v.username+" "+v.iu_name});
                });
                this.checkedRows = ndata;
            }
            else{
                this.checkedRows = [];
            }

        },
        PopupMessage(){
            let multiselectid = [];
            let multiselectusername = [];

            this.checkedRows.forEach((value, index) => {
                multiselectid.push(value.id);
                multiselectusername.push(value.name);
            });

            this.$modal.show(SendMessage,{
                mid : multiselectid,
                musername : multiselectusername
            },{
                draggable: ".card-header",
                classes: "pointpopup-modal",
                width: "900px",
                height: "auto",
                maxHeight: 749,
            });
        },
        getDivision(param1,param2){
            var text = "";
            if(param1 == 'gwallet-user'){
                text = param2;
            }
            else if(param1 == 'shopcoin-user'){
                text = "샵코인";
            }
            else{
                if(param1 == 'deposit'){
                    text = "입금";
                }
                else{
                    text = "출금";
                }
            }

            return text;
        },
        getAddress(iu_bank,iu_acc,it_proceed,walletAddress,gwallet_data){
            var maxchar = 15
            var textLength = 0;
            if(walletAddress !== null){
                textLength = walletAddress.length;
            }
            var address = iu_bank+" "+iu_acc;
            if(it_proceed == "gwallet-user"){
                var text = walletAddress;
                address = replaceAddress(text, maxchar/2, textLength-maxchar);
            }
            return address;
        },
        replaceAddress(str,index,chr){
            if(index > str.length-1) return str;
            return str.substring(0,index) + chr + str.substring(index+1);
        },
        getCoinAmount(it_proceed,gwallet_data){
            var coinamount 	= "-";
            if(it_proceed == "gwallet-user"){
                coinamount 	= gwallet_data;
                if(coinamount != null || coinamount != ""){
                    coinamount 	= coinamount.split("/");
                    coinamount 	= coinamount[2];
                    coinamount 	= coinamount.split(":");
                    coinamount 	= coinamount[1];
                }
            }

            return coinamount;
        },
        changeDate(it_reg_datetime){
            var d = "";
            var t = "";
            var text = it_reg_datetime;
            d = text.split("T");
            d = d[0];
            t = text.split("T");
            t = t[1];
            t = t.split(".")[0];
            return d+" "+t;
        },
        checkDate(it_update_datetime){
            var text = "";
            var d = "";
            var t = "";
            if(it_update_datetime != null){
                text = it_update_datetime;
                d = text.split("T");
                d = d[0];
                t = text.split("T");
                t = t[1];
                t = t.split(".")[0];

                text = d+" "+t;
            }
            else{
                text = "처리대기"
                
            }

            return text;
        },
        checkStatus(it_status) {
            var val = "";
            if(it_status == "2" || it_status == "3"){
                if(it_status == "2"){
                    val = "처리완료";
                }
                else{
                    val = "취소";
                }
            }
            else{
                val = "else";
            }

            return val;
        },
        transactionProcess(it_idx,type){
        },
        rowClass(it_type,it_proceed,it_status){
            var rclass = "";
            if(it_type == "deposit" && it_proceed == "gwallet-user"){
                rclass = "gwallet-deposit";
            }
            else if(it_type == "deposit" && it_proceed == "shopcoin-user"){
                rclass = "shopcoin-deposit";
            }
            else{
                if(it_status == '3'){
                    rclass = "rejected-deposit";
                }
            }

            return rclass;
        },
        async setSellAllToInput(type, data) {
            if(type == 1){
                const res = await API.transactType1(data);
                if(res.message == "NO"){
                    this.$buefy.toast.open({
                        position: "is-bottom-left",
                        message: "일괄 처리할 체크박스를 먼저 선택해 주세요",
                        type: "is-danger",
                    });
                    
                }
                else{
                    console.log(res);
                }
            }
            else if(type == 2){
                const res = await API.transactType2(data);
                if(res.message == "NO"){
                    this.$buefy.toast.open({
                        position: "is-bottom-left",
                        message: "일괄 처리할 체크박스를 먼저 선택해 주세요",
                        type: "is-danger",
                    });
                }
                else{
                    console.log(res);
                }
            }
            else{
                const res = await API.transactType3(data);
                if(res.message == "NO"){
                    this.$buefy.toast.open({
                        position: "is-bottom-left",
                        message: "일괄 처리할 체크박스를 먼저 선택해 주세요",
                        type: "is-danger",
                    });
                }
                else{
                    console.log(res);
                }
            }
            
        }
    },
    computed : {
        newData(){
            return this.$store.getters.getData;
        },
        counterTrigger(){
            return this.$store.getters.getTableCounter;
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.8125rem;
    font-weight: 400;
    color: #333;
}

// scss
.table{
    width: 100%;
    thead{
        height: 30px;
        background: transparent linear-gradient(180deg, #93a6b7 0%, #6b7982 100%) 0% 0% no-repeat padding-box !important;
        tr{
            th{
                align-items:center;
                vertical-align: middle;
                border-top: 1px solid #646e78 !important;
                border-bottom: 1px solid #646e78 !important;
                border-left: 1px solid #646e78 !important;
                text-align: center;
                
                span{
                    color: white;
                }
                input[type="checkbox"]{
                    width: 20px;
                    height: 20px;
                    align-items:center;
                    vertical-align: middle;
                }
                &:first-child{
                    width: 2%;
                }
                &:last-child{
                    border-right: 1px solid #646e78 !important;
                }
            }
        }
    }
    tbody{
        height: 30px;
        tr{
            &.gwallet-deposit{
                background-color: #ffc48c;
            }
            &.shopcoin-deposit{
                background-color: #e2efff;
            }
            &.rejected-deposit{
                background-color: #fa8686;
            }
            td{
                align-items:center;
                vertical-align: middle;
                border-bottom: 1px solid #cecfd1 !important;
                border-left: 1px solid #cecfd1 !important;
                text-align: center;
                input[type="checkbox"]{
                    width: 20px;
                    height: 20px;
                    align-items:center;
                    vertical-align: middle;
                }
                &:nth-child(12){
                    width: 7%;
                }
                &:nth-child(13){
                    width: 7%;
                }
                &:last-child{
                    border-right: 1px solid #cecfd1 !important;  
                }
            }
        }
    }
}
</style>