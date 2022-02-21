<template>
    <div>
        <div class="level">
            <div class="ml-auto">
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="30">30 per page</option>
                    <option value="40">40 per page</option>
                    <option value="50">50 per page</option>
                </b-select>
            </div>
        </div>
        <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="it_update_datetime"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
            <b-table-column :centered="true" field="pname2" label="총판" sortable v-slot="props">
                {{ props.row.pname2 }}
            </b-table-column>
            <b-table-column :centered="true" field="username" label="아이디" sortable v-slot="props">
                {{ props.row.username }}
            </b-table-column>
            <b-table-column :centered="true" field="it_amount" label="금액" sortable v-slot="props">
                <p v-if="props.row.it_type == 'deposit'"><i class="mdi mdi-plus"></i><span class="blue-text">{{formatAmount(props.row.it_amount)}}원</span></p>
                <p v-else><i class="mdi mdi-minus"></i><span class="red-text">{{formatAmount(props.row.it_amount)}}원</span></p>
            </b-table-column>
            <b-table-column :centered="true" field="it_point" label="포인트" sortable v-slot="props">
                {{ formatAmount(props.row.it_point) }}P
            </b-table-column>
            <b-table-column :centered="true" field="it_after_balance" label="보유금" sortable v-slot="props">
                {{ formatAmount(props.row.it_after_balance) }}원
            </b-table-column>
            <b-table-column :centered="true" field="it_type" label="입/출금" sortable v-slot="props">
                <p v-if="props.row.it_type == 'deposit'"><span class="blue-text">입금</span></p>
                <p v-else><span class="red-text">출금</span></p>
            </b-table-column>
            <b-table-column :centered="true" field="it_reason" label="내역" sortable v-slot="props">
                <p v-if="props.row.it_type == 'deposit'"><span class="blue-text">{{formatReason(props.row.it_type,props.row.it_reason)}}</span></p>
                <p v-else><span class="red-text">{{formatReason(props.row.it_type,props.row.it_reason)}}</span></p>
            </b-table-column>
            <b-table-column :centered="true" field="it_update_datetime" label="처리시간" sortable v-slot="props">
                {{ formatDate(props.row.it_update_datetime) }}
            </b-table-column>

            <template #empty>
                <div class="is-flex" style="height: 365px">
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
export default {
    name : "DepositTable",
    props : ["data"],
    data(){
        return {
            isPaginated: true,
            isPaginationSimple: true,
            isPaginationRounded: false,
            currentPage: 1,
            perPage: 10,
            defaultSortDirection: 'desc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            paginationPosition: 'bottom',
        }
    },
    methods : {
        formatMemberLogType(type, reason){
            let txt = "";
            if(type == "deposit"){
                this.memberlogType = "blue-text";
                if(reason === null  || reason == "포인트전환" || reason == "SHOP COIN DEPOSIT" || reason == "BCOIN DEPOSIT"){
                    txt = "입금";
                }
                else{
                    this.memberlogType = "red-text";
                    txt = "게임환전";
                }
            }else if(type == "custom"){
                if(parseInt(rowData.it_amount) < 0){
                    this.memberlogType = "red-text";
                    txt = "관리자 차감";
                }else{
                    this.memberlogType = "blue-text";
                    txt = "관리자 지급";
                }
                
            }else{
                if(type == "point"){
                    this.memberlogType = "blue-text";
                    txt = reason;
                }else{
                    this.memberlogType = "red-text";
                    if(reason === null || reason == "" || reason == "포인트전환"){
                        txt = "출금";
                    }else{
                        this.memberlogType = "blue-text";
                        txt = "게임충전";
                    }
                }
            }

            return txt;
        },
        formatMemberLogBonus(point, type, amount){
            var numeral = require("numeral");
            let amt = 0;
            if(type == 'withdraw' || type == 'deposit' || type == 'custom'){
                amt = numeral(point).format("0,0");
            }
            else{
                amt = numeral(amount).format("0,0");
            }

            return amt;
        },
        formatAmount(param){
            var numeral = require("numeral");
            let num = numeral(param).format("0,0");

            return num;
        },
        formatReason(type,reason){
            let txt = "";
            if(type == "deposit"){
                if(reason === null){
                    txt = "은행";
                }
                else if(reason == "GWALLET DEPOSIT"){
                    txt = "지월렛";
                }
                else if(reason == "SHOP COIN DEPOSIT"){
                    txt = "샵코인";
                }
                else if(reason == "BCOIN DEPOSIT"){
                    txt = "B코인";
                }
                else{
                    txt = "게임환전";
                }
            }else{
                if(reason === null){
                    txt = "은행";
                }
                else if(reason == "GWALLET WITHDRAW"){
                    txt = "지월렛";
                }
                else{
                    txt = "게임환전";
                }
            }

            return txt;
        },
        formatDate(param){
            let str = param;
            let newstr = str.split(".")[0];
            let d = newstr.split("T")[0];
            let t = newstr.split("T")[1];
            newstr = d+" "+t;
            return newstr;
        },
    }
}
</script>
