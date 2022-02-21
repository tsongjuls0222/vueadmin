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
        default-sort="bettime"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
            <b-table-column :centered="true" field="bettime" label="배팅시간" sortable v-slot="props">
                {{ formatDate(props.row.bettime) }}
            </b-table-column>
            <b-table-column :centered="true" field="username" label="아이디" sortable v-slot="props">
                {{props.row.username}}
            </b-table-column>
            <b-table-column :centered="true" field="is_realtime" label="유형" sortable v-slot="props">
                <p v-if="props.row.is_realtime == '0'">스포츠</p>
                <p v-else-if="props.row.is_realtime == '3'">라이브</p>
                <p v-else>미니게임</p>
            </b-table-column>
            <b-table-column :centered="true" field="cashbefore" label="시작보유금" sortable v-slot="props">
                {{ formatAmount(props.row.cashbefore) }}
            </b-table-column>
            <b-table-column :centered="true" field="betamount" label="보유금" sortable v-slot="props">
                {{ formatAmount(props.row.betamount) }}
            </b-table-column>
            <b-table-column :centered="true" field="cashafter" label="베팅금액" sortable v-slot="props">
                {{ formatAmount(props.row.cashafter) }}
            </b-table-column>
            <b-table-column :centered="true" field="estimated" label="베팅 후 보유금" sortable v-slot="props">
                {{props.row.estimated}}
            </b-table-column>
            <b-table-column :centered="true" field="bet_result" label="당첨예상금액" sortable v-slot="props">
                <p v-if="props.row.bet_result == 'win'">
                    <span class="red-text">승리</span>
                </p>
                <p v-else-if="props.row.bet_result == 'lost'">
                    <span class="blue-text">패배</span>
                </p>
                <p v-else-if="props.row.bet_result == 'draw'">
                    <span class="green-text">패배</span>
                </p>
                <p v-else-if="props.row.bet_result == 'cancel'">
                    <span class="blue-text">적특</span>
                </p>
                <p v-else-if="props.row.bet_result == 'cancel-user'">
                    <span class="blue-text">유저취소</span>
                </p>
                <p v-else>{{props.row.bet_result}}</p>
            </b-table-column>
            <b-table-column :centered="true" field="cashsettled" label="승패" sortable v-slot="props">
                {{props.row.cashsettled}}
            </b-table-column>
            <b-table-column :centered="true" field="proDate" label="마감 후 보유금" sortable v-slot="props">
                {{ formatDate(props.row.proDate) }}
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
    name : "BetlogTable1stTab",
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
        formatDate(param){
            if(param == null){
                return " ";
            }
            else{
                let str = param;
                let newstr = str.split(".")[0];
                let d = newstr.split("T")[0];
                let t = newstr.split("T")[1];
                newstr = d+" "+t;
                return newstr;
            }
        },
        formatAmount(param){
            var numeral = require("numeral");
            let num = numeral(param).format("0,0");

            return num;
        },
    }
}
</script>
