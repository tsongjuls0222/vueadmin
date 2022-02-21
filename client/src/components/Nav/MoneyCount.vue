<template>
  <div class="digits-wrapper">
    <ul class="digit-content">
      <li>
        <span class="dg-title">입금</span
        ><span class="digit" id="deposit">{{ charge_total }}</span>
      </li>
      <li>
        <span class="dg-title">출금</span
        ><span class="digit" id="withdraw">{{ withdraw_total }}</span>
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
        ><span class="digit" id="charging_point">{{ sentPoint }}</span>
      </li>
      <li>
        <span class="dg-title">보유포인트</span
        ><span class="digit" id="holding_point">{{ cashTotal }}</span>
      </li>
      <li>
        <span class="dg-title">유저보유머니</span
        ><span class="digit" id="user_holding_money">{{
          pointsTotal
        }}</span>
      </li>
      <li>
        <span class="dg-title">카지노보유머니</span
        ><span class="digit" id="user_holding_money">{{
          totalCasino
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../../api/navbar";
export default {
  name: "MoneyCount",
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
    };
  },
  methods : {
    async getTopInfo1st(){
      var numeral = require("numeral");
      const res = await API.getTopInfo();
      console.log(res)
      var loosing = parseInt(res[0].charge_total - res[0].withdraw_total);
      if (parseInt(loosing) >= 0) {
        this.isClass = 'isPositive';
      }
      else{
        this.isClass = 'isNegative';
      }

      this.charge_total = numeral(res[0].charge_total).format("0,0");
      this.withdraw_total = numeral(res[0].withdraw_total).format("0,0");
      this.loosing = numeral(loosing).format("0,0");
      this.sentPoint = numeral(res[0].sentPoint).format("0,0");
      this.cashTotal = numeral(res[0].cashTotal).format("0,0");
      this.pointsTotal = numeral(res[0].pointsTotal).format("0,0");
      this.totalCasino = numeral(res[0].totalCasino).format("0,0");
    },
    async getTopInfo(){
      setInterval(async function () {
        const res = await API.getTopInfo();
        console.log(res)
        // this.$store.commit("setTopInfo", res);
      }, 10000);
      
    }
  },
  created() {
    this.getTopInfo1st();
    // this.getTopInfo();
  },
};
</script>
