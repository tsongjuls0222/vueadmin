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
                <p v-if="props.row.it_type == 'deposit'">
                    <i class="mdi mdi-plus"></i>
                    <span class="blue-text" v-if="props.row.it_reason == null || props.row.it_reason == '포인트전환' || props.row.it_reason == 'SHOP COIN DEPOSIT' || props.row.it_reason == 'BCOIN DEPOSIT'">{{formatAmount(props.row.it_amount)}}원</span>
                    <span class="red-text" v-else>{{formatAmount(props.row.it_amount)}}원</span>
                </p>
                <p v-else-if="props.row.it_type == 'withdraw'">
                    <i class="mdi mdi-minus"></i>
                    <span class="red-text" v-if="props.row.it_reason == null || props.row.it_reason == '' || props.row.it_reason == '포인트전환'">{{formatAmount(props.row.it_amount)}}원</span>
                    <span class="blue-text" v-else>{{formatAmount(props.row.it_amount)}}원</span>
                </p>
                <p v-else-if="props.row.it_type == 'point'">
                    <span class="blue-text">0원</span>
                </p>
            </b-table-column>
            <b-table-column :centered="true" field="it_point" label="보너스" sortable v-slot="props">
                {{ formatMemberLogBonus(props.row.it_point,props.row.it_type,props.row.it_amount) }}
            </b-table-column>
            <b-table-column :centered="true" field="it_after_balance" label="보유금" sortable v-slot="props">
                {{ formatAmount(props.row.it_after_balance) }}
            </b-table-column>
            <b-table-column :centered="true" field="it_type" label="입/출금" sortable v-slot="props">
                <p v-if="props.row.it_type == 'deposit'">
                    <span class="blue-text" v-if="props.row.it_reason == null || props.row.it_reason == '포인트전환' || props.row.it_reason == 'SHOP COIN DEPOSIT' || props.row.it_reason == 'BCOIN DEPOSIT'">입금</span>
                    <span class="red-text" v-else>게임환전</span>
                </p>
                <p v-else-if="props.row.it_type == 'custom'">
                    <span class="red-text" v-if="parseInt(props.row.it_amount) < 0">관리자 차감</span>
                    <span class="blue-text" v-else>관리자 지급</span>
                </p>
                <p v-else-if="props.row.it_type == 'point'">
                    <span class="blue-text">{{props.row.it_reason}}</span>
                </p>
                <p v-else>
                    <span class="red-text" v-if="props.row.it_reason == null || props.row.it_reason == '' || props.row.it_reason == '포인트전환'">출금</span>
                    <span class="blue-text" v-else>게임충전</span>
                </p>
            </b-table-column>
            <b-table-column :centered="true" field="it_reason" label="내역" sortable v-slot="props">
                <p v-if="props.row.it_type == 'deposit'">
                    <span class="blue-text" v-if="props.row.it_reason == null">은행</span>
                    <span class="red-text" v-else-if="props.row.it_reason == 'CASINO WITHDRAW'">{{props.row.casino_name}}</span>
                    <span class="blue-text" v-else-if="props.row.it_reason == 'SHOP COIN DEPOSIT'">샵코인</span>
                    <span class="blue-text" v-else-if="props.row.it_reason == 'BCOIN DEPOSIT'">B코인</span>
                    <span class="blue-text" v-else>게임환전</span>
                </p>
                <p v-else-if="props.row.it_type == 'custom'">
                    <span class="red-text" v-if="parseInt(props.row.it_amount) < 0">{{props.row.it_reason}}</span>
                    <span class="blue-text" v-else>{{props.row.it_reason}}</span>
                </p>
                <p v-else-if="props.row.it_type == 'point'">
                    <span class="blue-text">{{props.row.it_reason}}</span>
                </p>
                <p v-else>
                    <span class="red-text" v-if="props.row.it_reason == null || props.row.it_reason == '포인트전환'">은행</span>
                    <span class="blue-text" v-else-if="props.row.it_reason == 'CASINO DEPOSIT'">{{props.row.casino_name}}</span>
                    <span class="red-text" v-else>{{props.row.it_reason}}</span>
                </p>
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
