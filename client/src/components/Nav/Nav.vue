<template>
  <nav
    class="navbar header is-primary pt-2 mb-2"
    role="navigation"
    aria-label="main navigation"
    v-if="this.$route.fullPath != '/'"
  >
    <div class="digits-wrapper">
      <ul class="digit-content">
        <li>
          <span class="dg-title">입금</span
          ><span class="digit" id="charge_total">{{ charge_total }}</span>
        </li>
        <li>
          <span class="dg-title">출금</span
          ><span class="digit" id="withdraw_total">{{ withdraw_total }}</span>
        </li>
        <li>
          <span class="dg-title">루징</span
          ><span
            class="digit"
            :class="isClass"
            id="loosing"
            >{{ loosing }}</span
          >
        </li>
        <li>
          <span class="dg-title">충전포인트</span
          ><span class="digit" id="sentPoint">{{ sentPoint }}</span>
        </li>
        <li>
          <span class="dg-title">보유포인트</span
          ><span class="digit" id="cashTotal" @click="MoneyPopup('point')">{{ cashTotal }}</span>
        </li>
        <li>
          <span class="dg-title">유저보유머니</span
          ><span class="digit" id="pointsTotal" @click="MoneyPopup('amount')">{{ pointsTotal }}</span>
        </li>
        <li>
          <span class="dg-title">카지노보유머니</span
          >
          <span class="digit" id="totalCasino" @click="MoneyPopup('casino')">{{ totalCasino }}</span>
        </li>
      </ul>
    </div>
    <div class="nav-right is-flex-direction-column">
      <Menu />
      <div class="is-flex mt-3">
        <div class="info-table-wrapper d-flex">
          <div class="info-table-content">
            <div class="info-box-wrapper">
              <div class="info-box-content" onclick="golinkpage(1)">
                <div class="info-title-wrapper">
                  <span class="info-title">충전신청</span>
                </div>
                <div class="info-values" id="topinfobox_1">
                  <p>NEW: </p>
                  <span class="infovalsin">{{ charge_in }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(2)">
                <div class="info-title-wrapper">
                  <span class="info-title">충전대기</span>
                </div>
                <div class="info-values" id="topinfobox_2">
                  <p>대기: </p>
                  <span class="infovalsin" id="infvalin2">{{ charge_hold }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(3)">
                <div class="info-title-wrapper">
                  <span class="info-title">충전완료</span>
                </div>
                <div class="info-values" id="topinfobox_3">
                  <p>완료: </p>
                  <span class="infovalsin" id="infvalin3">{{ charge_done }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(4)">
                <div class="info-title-wrapper">
                  <span class="info-title">환전신청</span>
                </div>
                <div class="info-values" id="topinfobox_4">
                  <p>NEW: </p>
                  <span class="infovalsin" id="infvalin4">{{ withdraw_in }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(5)">
                <div class="info-title-wrapper">
                  <span class="info-title">환전대기</span>
                </div>
                <div class="info-values" id="topinfobox_5">
                  <p>대기: </p>
                  <span class="infovalsin" id="infvalin5">{{ withdraw_hold }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(6)">
                <div class="info-title-wrapper">
                  <span class="info-title">환전완료</span>
                </div>
                <div class="info-values" id="topinfobox_6">
                  <p>완료: </p>
                  <span class="infovalsin" id="infvalin6">{{ withdraw_done }}</span>
                </div>
              </div>
              <div class="info-box-content d-none" onclick="golinkpage(12)">
                <div class="info-title-wrapper">
                  <span class="info-title">승인완료</span>
                </div>
                <div class="info-values" id="topinfobox_9">
                  <p>승인: </p>
                  <span class="infovalsin" id="infvalin9">0</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(7)">
                <div class="info-title-wrapper">
                  <span class="info-title">일반문의</span>
                </div>
                <div class="info-values" id="topinfobox_7">
                  <p>NEW: </p>
                  <span class="infovalsin" id="infvalin7">{{ withdraw_in }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(11)">
                <div class="info-title-wrapper">
                  <span class="info-title">계좌문의</span>
                </div>
                <div class="info-values" id="topinfobox_11">
                  <span class="infovalsin" id="infvalin11">{{ newcsCnt }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(8)">
                <div class="info-title-wrapper">
                  <span class="info-title">가입신청</span>
                </div>
                <div class="info-values" id="topinfobox_8">
                  <p>NEW: </p>
                  <span class="infovalsin" id="infvalin8">{{ newmember }}</span>
                </div>
              </div>
              <div class="info-box-content" onclick="golinkpage(10)">
                <div class="info-title-wrapper">
                  <span class="info-title">동접자</span>
                </div>
                <div class="info-values" id="topinfobox_10">
                  <p>NOW: </p>
                  <span class="infovalsin" id="infvalin10">{{ online_count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCount />
      </div>
    </div>
  </nav>
</template>

<script>
import UserCount from "@/components/Nav/UserCount.vue";
import MoneyCountPopup from "@/components/Popup/MoneyCount.vue";
import Menu from "@/components/Nav/Menu.vue";
import API from "../../api/navbar";
export default {
  name: "Nav",
  components: {
    UserCount,
    Menu
  },
  data() {
    return {
      charge_total: 0,
      withdraw_total: 0,
      loosing: 0,
      cashTotal: 0,
      sentPoint: 0,
      pointsTotal: 0,
      totalCasino : 0,
      isClass : 'isDefault',
      charge_in: 0,
      charge_hold: 0,
      charge_done: 0,
      withdraw_in: 0,
      withdraw_hold: 0,
      withdraw_done: 0,
      newcsCnt: 0,
      newmember: 0,
      memberok: 0,
      online_count: 0,
    };
  },
  methods : {
    async MoneyPopup(param) {
      const sendData = {
        type : param
      }
      const res = await API.getMoneyCountData(sendData);
      const res2 = await API.getMoneyCountDataTotal(sendData);
      this.$modal.show(MoneyCountPopup,{
        popupType : param,
        popupData : res,
        popupDataTotal : res2[0].total_balance
      },{
          draggable: ".card-header",
          classes: "casinoholdings-modal",
          width: "97%",
          height: "97%"
      });
    },
    async getTopInfo1st(){
      var numeral = require("numeral");
      const res = await API.getTopInfo();
      var loosing = parseInt(res[0].charge_total - res[0].withdraw_total);
      if (parseInt(loosing) >= 0) {
        this.isClass = 'isPositive';
      }
      else{
        this.isClass = 'isNegative';
      }


      //moneycount
      this.charge_total = numeral(res[0].charge_total).format("0,0");
      this.withdraw_total = numeral(res[0].withdraw_total).format("0,0");
      this.loosing = numeral(loosing).format("0,0");
      this.sentPoint = numeral(res[0].sentPoint).format("0,0");
      this.cashTotal = numeral(res[0].cashTotal).format("0,0");
      this.pointsTotal = numeral(res[0].pointsTotal).format("0,0");
      this.totalCasino = numeral(res[0].totalCasino).format("0,0");

      //dailycount
      this.charge_in = res[0].charge_in;
      this.charge_hold = res[0].charge_hold;
      this.charge_done = res[0].charge_done;
      this.withdraw_in = res[0].withdraw_in;
      this.withdraw_hold = res[0].withdraw_hold;
      this.withdraw_done = res[0].withdraw_done;
      this.newcsCnt = res[0].newcsCnt;
      this.newmember = res[0].newmember;
      this.memberok = res[0].memberok;
      
    },
    async getTopInfo(){
      setInterval(async function () {
        var numeral = require("numeral");
        const res = await API.getTopInfo();
        var loosing = parseInt(res[0].charge_total - res[0].withdraw_total);
        if (parseInt(loosing) >= 0) {
          this.isClass = 'isPositive';
        }
        else{
          this.isClass = 'isNegative';
        }


        //moneycount
        this.charge_total = numeral(res[0].charge_total).format("0,0");
        this.withdraw_total = numeral(res[0].withdraw_total).format("0,0");
        this.loosing = numeral(loosing).format("0,0");
        this.sentPoint = numeral(res[0].sentPoint).format("0,0");
        this.cashTotal = numeral(res[0].cashTotal).format("0,0");
        this.pointsTotal = numeral(res[0].pointsTotal).format("0,0");
        this.totalCasino = numeral(res[0].totalCasino).format("0,0");

        //dailycount
        this.charge_in = res[0].charge_in;
        this.charge_hold = res[0].charge_hold;
        this.charge_done = res[0].charge_done;
        this.withdraw_in = res[0].withdraw_in;
        this.withdraw_hold = res[0].withdraw_hold;
        this.withdraw_done = res[0].withdraw_done;
        this.newcsCnt = res[0].newcsCnt;
        this.newmember = res[0].newmember;
        this.memberok = res[0].memberok;
        
      }, 10000);
      
    }
  },
  created() {
    this.getTopInfo1st();
    this.getTopInfo();
  }
};
</script>
