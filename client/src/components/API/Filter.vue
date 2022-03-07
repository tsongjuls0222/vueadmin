<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="p-5">
          <span>{{ title }}</span>
          <div class="field mt-2">
            <div class="is-flex">
              <input
                class="input mx-5"
                type="number"
                v-if="title == 'OTP 로그'"
                placeholder="Mobile Number"
                v-model="keyword"
              />
              <input class="input mx-5" type="number" v-model="keyword" v-else placeholder="Username" />
              <input class="input ml-6" v-model="fromDate" type="date" />
              <input class="input mx-2" v-model="toDate" type="date" />
              <button @click="getData(1)" class="button is-info"  type="button">
                <i class="mdi mdi-account-search"></i>검색
              </button>
              <input class="input mx-2" v-if="title == 'OTP 로그'" type="time" style="margin-left:478px !important" />
              <button class="button is-info" v-if="title == 'OTP 로그'" type="button">
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <div v-if="title == 'OTP 로그'">
            <OTP :data="data" :getData="getData" :count="count" :currentButton="currentButton" :isHiding="isHiding" :isClass="isClass" />
          </div>
          <div v-else>
            <Casino :data="data" :getData="getData" :count="count" :currentButton="currentButton" :isHiding="isHiding" :isClass="isClass" :formatDate="formatDate"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OTP from "./OTP.vue";
import APIOTP from "../../api/otp";
import Casino from './Casino.vue';
export default {
  props: ["title"],
  components:{
    OTP,
    Casino
  },
  data() {
    return {
      data:[],
      count:10,
      currentButton:0,
      startButton:0,
      endButton:0,
      fromDate: '2021-11-11',
      toDate:new Date().toISOString().slice(0,10),
      keyword:'',
    }
  },
  methods: {
    async getData(param){
      this.currentButton = parseInt(param);
      var start = 0;
      if(param > 1){
        start = (param - 1) * 50;
      }
      if(param <= 3){
        this.startButton = 0;
        this.endButton = 0;
      }else{
        
        if((this.count - this.currentButton) > 1){
          this.startButton = this.currentButton -2;
          this.endButton = this.currentButton +2;
          
        }else if((this.count - this.currentButton) > 0){
          this.startButton = this.count -4;
          this.endButton = this.currentButton +1;
        }
      }

      var sendData = {
        start: start,
        fromDate:this.fromDate,
        toDate:this.toDate,
        keyword:this.keyword,
      }
      console.log(this.title);
      // if(this.title == 'OTP 로그'){
      //   console.log("otp");
      //   const otp = await APIOTP.getOTP(sendData);
      //   this.data = otp.data;
        
      //   this.count = parseInt(otp.count[0].counter / 50) ;
      //   if(otp.count[0].counter % 50 > 0){
      //     this.count + 1;
      //   }
      // }else{
      //   console.log("casino");
        const casino = await APIOTP.getCasino(sendData);
        this.data = casino.data;
        console.log(casino);
        this.count = parseInt(casino.count[0].counter / 50);
        if(casino.count[0].counter % 50 > 0){
          this.count + 1;
        }
      // }
    },
    isClass(param){
      var isclass ='';
      if(param == this.currentButton){
        isclass = 'is-current';
      }
      return isclass;
    },
    isHiding(param){
      var isclass = '';
      if(this.startButton == 0 && this.endButton == 0){
        if(param > 5){
          isclass = 'is-hidden';
        }
      }else{
        if(param < this.startButton){
          isclass = 'is-hidden';
        }
        if(param > this.endButton){
          isclass = 'is-hidden';
        }
      }
      return isclass;
    },
    setstatus(status){
      let val = ''
      if(status == '1'){
        val="가입완료";
      }else if(status == '3'){
        val="가입거부";
      }else{
        val="발송중";
      }
      return val;
    },
    setcolor(status){
      let val = ''
      if(status == '1'){
        val="pepe-blue";
      }else if(status == '3'){
        val="pepe-red";
      }else{
        val="pepe-green";
      }
      return val;
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
  },
  created(){
    this.getData(1);
  }
};
</script>
