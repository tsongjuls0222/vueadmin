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

        <b-table
            :data="isEmpty ? [] : newData"
            :checked-rows.sync="checkedRows"
            :is-row-checkable="(row) => row.it_idx"
            :narrowed="isNarrowed"
            :row-class="(row, index) => rowClass(row.it_type,row.it_proceed,row.it_status)"
            checkable>

            <b-table-column
                :centered="true"
                field="it_proceed"
                label="구분"
                v-slot="props"
            >
                {{ getDivision(props.row.it_proceed,props.row.coinType) }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="ia_name"
                label="총판"
                v-slot="props"
            >
                {{ props.row.ia_name }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="real_code"
                label="코드"
                v-slot="props"
            >
                {{ props.row.real_code }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="iu_level"
                label="레벨"
                v-slot="props"
            >
                {{ props.row.iu_level }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="username"
                label="아이디"
                v-slot="props"
            >
                {{ props.row.username }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="iu_nickname"
                label="닉네임"
                v-slot="props"
            >
                {{ props.row.iu_nickname }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="iu_name"
                label="이름"
                v-slot="props"
            >
                {{ props.row.iu_name }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="counting"
                label="입/출"
                v-slot="props"
            >
                <p><span class="has-text-info">{{ props.row.depositcount }}</span> / <span class="has-text-danger">{{ props.row.withdrawalcount }}</span></p>
            </b-table-column>

            <b-table-column
                :centered="true"
                field="address"
                label="은행/주소"
                v-slot="props"
            >
                {{ getAddress(props.row.iu_bank,props.row.iu_acc,props.row.it_proceed,props.row.walletAddress,props.row.gwallet_data) }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="coinamount"
                label="수량"
                v-slot="props"
            >
                {{ getCoinAmount(props.row.it_proceed,props.row.gwallet_data) }}
            </b-table-column>

            <b-table-column
                :centered="true"
                :narrowed="true"
                field="it_amount"
                label="금액"
                v-slot="props"
            >
                <input type="text" class="input is-small" style="text-align: right;" v-model="props.row.newAmount">
            </b-table-column>

            <b-table-column
                :centered="true"
                :narrowed="true"
                field="it_point"
                label="포인트"
                v-slot="props"
            >
                <input type="text" class="input is-small" style="text-align: right;" v-model="props.row.newPoint">
            </b-table-column>

            <b-table-column
                :centered="true"
                field="it_reg_datetime"
                label="신청일시"
                v-slot="props"
            >
                {{ changeDate(props.row.it_reg_datetime) }}
            </b-table-column>

            <b-table-column
                ::centered="true"
                field="it_update_datetime"
                label="처리일시"
                v-slot="props"
            >
                {{ checkDate(props.row.it_update_datetime) }}
            </b-table-column>

            <b-table-column
                :centered="true"
                field="it_status"
                label="상태"
                v-slot="props"
                v-html:=""
            >
                <template v-if="checkStatus(props.row.it_status) == 'else'" >
                    <button class="button is-success is-small" @click="transactionProcess(props.row.it_idx,2)">승인</button>&nbsp;
                    <button class="button is-primary is-small" @click="transactionProcess(props.row.it_idx,1)">대기</button>&nbsp;
                    <button class="button is-danger is-small" @click="transactionProcess(props.row.it_idx,3)">취소</button>
                </template>
                <template v-else>
                    {{checkStatus(props.row.it_status)}}
                </template>
            </b-table-column>

            <template #empty>
                <div class="is-flex" style="height: 500px">
                <div
                    class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                >
                    <b-icon icon="information-outline" size="is-large"></b-icon>
                    <span class="is-size-4 is-unselectable">Sorry, no data found.</span>
                </div>
                </div>
            </template>
        </b-table>
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
            newamount: 0,
            newpoint: 0,
        }
    },
    methods : {
        PopupMessage(){
            let multiselectid = [];
            let multiselectusername = [];

            this.checkedRows.forEach((value, index) => {
                multiselectid.push(value.id);
                multiselectusername.push(value.username+" "+value.iu_name);
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
        }
    }
}
</script>
<style>
thead {
    background: transparent linear-gradient(180deg, #93a6b7 0%, #6b7982 100%) 0% 0% no-repeat padding-box !important;
}
th{
    border-top: 1px solid #646e78 !important;
    border-bottom: 1px solid #646e78 !important;
    border-left: 1px solid #646e78 !important;
}
th:last-child{
    border-right: 1px solid #646e78 !important;
}
td{
    border-bottom: 1px solid #cecfd1 !important;
    border-left: 1px solid #cecfd1 !important;
}
td:last-child{
    border-right: 1px solid #cecfd1 !important;  
}
th span{
    color: #fff;
}
th .check{
    background: white;
}
tr.is-info {
    background: #167df0;
    color: #fff;
}
tr.gwallet-deposit{
    background-color: #ffc48c;
}
tr.shopcoin-deposit{
    background-color: #e2efff;
}
tr.rejected-deposit{
    background-color: #fa8686;
}
</style>