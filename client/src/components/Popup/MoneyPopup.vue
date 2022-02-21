<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">회원 머니 가감</p>
      <b-button
        class="close card-header-icon"
        icon-right="close"
        @click="$emit('close')"
      />
    </header>
    <div class="card-content">
      <div class="content">
        <b-field grouped>
          <b-field label="아이디">
            <b-input
              name="username"
              v-model="userName"
              placeholder="Username"
              disabled
            ></b-input>
          </b-field>
          <b-field label="이름">
            <b-input
              name="nickname"
              v-model="userNickname"
              placeholder="Nickname"
              disabled
            ></b-input>
          </b-field>
        </b-field>
        <b-field label="보유 머니">
          <b-input
            name="balance"
            v-model="userBalance"
            custom-class="has-text-right"
            placeholder="0 원"
            disabled
          ></b-input>
        </b-field>
        <b-field label="머니 가감">
          <b-input class="has-text-right" type="text" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" v-model="addValue"></b-input>
        </b-field>
        <b-field label="추가설명">
          <b-input
            placeholder="내용 입력"
            class="balance-msg"
            type="textarea"
            v-model = "addReason"
          ></b-input>
        </b-field>
      </div>
    </div>
    <footer class="card-footer">
      <b-button type="is-ghost" class="card-footer-item has-text-success" @click="addBalance() "
        >지급</b-button
      >
    </footer>
  </div>
</template>

<script>
import $ from "jquery";
import API from "../../api/userpopup";
export default {
  name: "MoneyPopup",
  props: ["userID","userName","userNickname","userPoint"],
  data() {
    return {
      addValue : 0,
      addReason : "",
      ipAddress : null,
      userBalance : this.computedUserBalance,
    };
  },
  methods : {
    async addBalance(){
      let amt = 0;
      let addvalue = this.addValue;
      if(addvalue == "" || addvalue === undefined){
        addvalue = 0;
      }
      
      const res = await API.refreshBalanceAndPoint(this.userID);
      console.log(res);
      amt = parseInt(res[0].iu_balance) + parseInt(addvalue);

      const sendData = {
        userid : this.userID,
        amount : addvalue,
        before : res[0].iu_balance,
        after : amt,
        reason : this.addReason,
        point : parseInt(res[0].iu_point),
        ip : this.ipAddress
      };
      
      const res2 = await API.updateBalance(sendData);
      console.log(res2);

      if(res2.message == "OK"){
        this.$store.dispatch('setNewUserBalance', amt);
        this.userBalance = this.computedUserBalance;
        
        const res2 = await API.addTransaction(sendData);
        console.log(res2);

      }
      else{
        this.$buefy.toast.open({
            position: "is-top-right",
            message: "Failed to process due to system error",
            type: "is-danger",
        });
      }

    }
  },
  mounted(){
      
  },
  computed : {
    computedUserBalance(){
        var numeral = require("numeral");
        let number = this.$store.getters.getUserBalance;
        let num = numeral(number).format("0,0");
        return num+" 원";
    },
  },
  created() {
    var studentId = "";
    $.getJSON('https://api.ipify.org?format=json', function(data){})
    .then((data) => {
      studentId = data.ip;
      this.ipAddress = studentId;
    })

    this.userBalance = this.computedUserBalance;
  },
};
</script>
