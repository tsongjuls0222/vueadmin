<template>
  <div class="views-count-wrapper">
    <div class="views-count-content">
      <Qwekqwek :list="computedUserList.prematchlist" :korpage="'프리매치'" :currenttoggle="currenttoggle" :currentpage="'prematch'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber" />
      <Qwekqwek :list="computedUserList.livelist" :korpage="'라이브'" :currenttoggle="currenttoggle" :currentpage="'livelist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
      <Qwekqwek :list="computedUserList.minigamelist" :korpage="'미니게임'" :currenttoggle="currenttoggle" :currentpage="'minigamelist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
      <Qwekqwek :list="computedUserList.casinolist" :korpage="'카지노'" :currenttoggle="currenttoggle" :currentpage="'casinolist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
      <Qwekqwek :list="computedUserList.inquirylist" :korpage="'1:1문의'" :currenttoggle="currenttoggle" :currentpage="'inquirylist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
      <Qwekqwek :list="computedUserList.noticelist" :korpage="'공지사항'" :currenttoggle="currenttoggle" :currentpage="'noticelist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
      <Qwekqwek :list="computedUserList.eventlist" :korpage="'이벤트'" :currenttoggle="currenttoggle" :currentpage="'eventlist'" :togglesetttings="togglesetttings" :currenthovered="currenthovered" :setcurrenthovered="setcurrenthovered" :formatNumber="formatNumber"/>
    </div>
  </div>
</template>

<script>
import global from '../../globalfunction/paging';
import Qwekqwek from './UserBalance.vue';
export default {
  name: "UserCount",
  components:{Qwekqwek},
  data() {
    return {
      class1 : "",
      class2 : "",
      class3 : "",
      class4 : "",
      class5 : "",
      class6 : "",
      class7 : "",
      currenthovered: [],
      currenttoggle: 0,
      counter:0,
    };
  },
  methods : {
    formatNumber(param){
      return global.methods.numberWithCommas(param);
    },
    setcurrenthovered(param){
      this.currenthovered = param;
    },
    togglesetttings(param){
      if(this.currenttoggle == param){
        this.counter++;
      }
      if(this.counter >= 1){
        this.counter = 0;
        this.currenttoggle = null;
      }else{
        this.currenttoggle = param;
      }
      
    },
    showUser(param){
      this.class1 = "";
      this.class2 = "";
      this.class3 = "";
      this.class4 = "";
      this.class5 = "";
      this.class6 = "";
      this.class7 = "";
      if(param == 1){
        this.class1 = "active";
      }
      else if(param == 2){
        this.class2 = "active";
      }
      else if(param == 3){
        this.class3 = "active";
      }
      else if(param == 4){
        this.class4 = "active";
      }
      else if(param == 5){
        this.class5 = "active";
      }
      else if(param == 6){
        this.class6 = "active";
      }
      else{
        this.class7 = "active";
      }
    }
  },
  computed:{
    computedUserList(){
      // console.log(this.$store.getters.getstate);
        return this.$store.getters.getstate;
    },
  },
};
</script>
