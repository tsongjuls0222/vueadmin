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
            <b-table-column :centered="true" field="username" label="아이디" sortable v-slot="props">
                {{props.row.username}}
            </b-table-column>
            <b-table-column :centered="true" field="ipl_amount" label="포인트" sortable v-slot="props">
                <p v-html="formatIPLAmount(props.row.ipl_amount,props.row.pointType,props.row.ipl_info)"></p>
            </b-table-column>
            <b-table-column :centered="true" field="ipl_after" label="보유 포인트" sortable v-slot="props">
                {{formatAmount(props.row.ipl_after)}}
            </b-table-column>
            <b-table-column :centered="true" field="it_point" label="입/출금" sortable v-slot="props">
                {{props.row.username}}
            </b-table-column>
            <b-table-column :centered="true" field="ipl_info" label="내역" sortable v-slot="props">
                {{props.row.ipl_info}}
            </b-table-column>
            <b-table-column :centered="true" field="ipl_datetime" label="날짜" sortable v-slot="props">
                {{ formatDate(props.row.ipl_datetime) }}
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
    name : "MemberPointTable",
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
        formatIPLAmount(amount,point,info){
            var numeral = require("numeral");
            let txt = "";
            let amt = numeral(parseInt(amount)).format("0,0");

            if(info == "포인트 전환"){
                txt = '<i class="mdi mdi-minus"></i>&nbsp;<span class="red-text">'+amt+'P</span>';
            }
            else{
                if(point == "manager-add"){
                    if(parseInt(amount) < 0){
                        txt = '<i class="mdi mdi-minus"></i>&nbsp;<span class="red-text">'+amt+'P</span>';
                    }
                    else{
                        txt = '<i class="mdi mdi-plus"></i>&nbsp;<span class="blue-text">'+amt+'P</span>';
                    }
                }
                else if(point == "manager-deduct"){
                    txt = '<i class="mdi mdi-minus"></i>&nbsp;<span class="red-text">'+amt+'P</span>';
                }
                else{
                    if(info == "rollback"){
                        txt = '<i class="mdi mdi-minus"></i>&nbsp;<span class="red-text">'+amt+'P</span>';
                    }
                    else{
                        txt = '<i class="mdi mdi-plus"></i>&nbsp;<span class="blue-text">'+amt+'P</span>';
                    }
                }
            }

            return txt;
        },
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
