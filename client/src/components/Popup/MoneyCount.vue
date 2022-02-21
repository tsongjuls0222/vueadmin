<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title" v-if="popupType == 'casino' ">Casino Holdings</p>
      <p class="card-header-title" v-else-if="popupType == 'amount' ">회원 보유머니</p>
      <p class="card-header-title" v-else>회원 보유포인트</p>
      <b-button
        class="close card-header-icon"
        icon-right="close"
        @click="$emit('close')"
      />
    </header>
    <div class="card-content">
      <div class="content popupdatatable">
        <div class="level">
          <div class="ml-auto">
            <b-select v-model="perPage" :disabled="!isPaginated">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
              <option value="30">30 per page</option>
              <option value="40">40 per page</option>
              <option value="50">50 per page</option>
            </b-select>
          </div>
        </div>
        <b-table
          :data="popupData"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :pagination-rounded="isPaginationRounded"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          default-sort="ia_name"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column :centered="true" field="ia_name" label="총판" sortable v-slot="props">
            {{ props.row.ia_name }}
          </b-table-column>
          <b-table-column :centered="true" field="real_code" label="코드" sortable v-slot="props">
            {{ props.row.real_code }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_level" label="코드" sortable v-slot="props">
            {{ props.row.iu_level }}
          </b-table-column>
          <b-table-column :centered="true" field="recommender" label="코드" sortable v-slot="props">
            {{ formatRecommender(props.row.recommender) }}
          </b-table-column>
          <b-table-column :centered="true" field="username" label="아이디" sortable v-slot="props">
            <a @click="userPopup(props.row.id)">{{ props.row.username }}</a>
          </b-table-column>
          <b-table-column :centered="true" field="iu_last_login" label="최근로그인" sortable v-slot="props">
            {{ formatDate(props.row.iu_last_login) }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_nickname" label="닉네임" sortable v-slot="props">
            {{ props.row.iu_nickname }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_name" label="이름" sortable v-slot="props">
            {{ props.row.iu_name }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_phone" label="연락처" sortable v-slot="props">
            {{ formatPhone(props.row.iu_phone) }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_balance" label="Total Balance" sortable v-slot="props" v-if="popupType == 'casino'">
            {{ formatBalance(props.row.iu_balance) }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_balance" label="보유금액" sortable v-slot="props" v-if="popupType == 'amount' || popupType == 'point'">
            {{ formatBalance(props.row.iu_balance) }}
          </b-table-column>
          <b-table-column :centered="true" field="iu_point" label="포인트" sortable v-slot="props" v-if="popupType == 'amount' || popupType == 'point'">
            {{ formatBalance(props.row.iu_point) }}
          </b-table-column>

          <template #footer>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="center">-</th>
            <th align="right" v-if="popupType == 'casino'">Total:</th>
            <th align="center" v-if="popupType == 'casino'">{{formatTotal}}</th>
            <th align="right" v-if="popupType == 'amount'">Total:</th>
            <th align="right" v-if="popupType == 'amount'">{{formatTotal}}</th>
            <th align="right" v-if="popupType == 'amount'">-</th>
            <th align="right" v-if="popupType == 'point'">Total:</th>
            <th align="right" v-if="popupType == 'point'">-</th>
            <th align="right" v-if="popupType == 'point'">{{formatTotal}}</th>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import UserPopup from "@/components/Popup/UserPopup.vue";
import API from "../../api/userpopup";
export default {
  name: "MoneyCountPopup",
  props : ["popupType","popupData","popupDataTotal"],
  components : {UserPopup},
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: true,
      isPaginationRounded: false,
      currentPage: 1,
      perPage: 20,
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      paginationPosition: 'bottom',
    };
  },
  methods : {
    formatDate(param){
        let str = param;
        let newstr = str.split(".")[0];
        let d = newstr.split("T")[0];
        let t = newstr.split("T")[1];
        newstr = d+" "+t;
        return newstr;
    },
    async userPopup(param){
      const res = await API.getDepositData(param);
      const res2 = await API.getMoneylogData(param);
      const res3 = await API.getBetlogData1st(param);
      const res4 = await API.getPointlogData(param);
      const res5 = await API.getUserInformation(param);
      const res6 = await API.getRecommender(res5[0].iu_recommend);
      const res7 = await API.getBankList();
      const res8 = await API.getCodeName(res5[0].real_code);
      const res9 = await API.getUserBetInfo(param);

      this.$modal.show(UserPopup,{
        userID : param,
        depositData : res,
        moneylogData : res2,
        betlogData : res3,
        pointlogData : res4,
        userInformation : res5[0],
        userRecommenderProps : res6.value,
        bankList : res7,
        codeName : res8[0],
        userBetInfos : res9[0]
      },{
          draggable: ".tabs, .tab-content",
          classes: "userpopup-modal",
          width: "97%",
          height: "97%"
      });
    },
    formatBalance(param){
      var numeral = require("numeral");
      let num = numeral(param).format("0,0");

      return num;
    },
    formatRecommender(param){
      let txt = param;
      if(txt == null){
        txt = "-";
      }
      return txt;
    },
    formatPhone(param){
      let str = param;
      let newstr = str.substr(2);
      let first = newstr.substr(0,1);
      if(first != 0){
        newstr = "0"+newstr;
      }

      return newstr;
    }
  },
  computed: {
    formatTotal(){
      var numeral = require("numeral");
      let num = numeral(this.popupDataTotal).format("0,0");

      return num;
    },
  }
};
</script>
<style scoped>

</style>
