<template>
  <div>
     
    <div class="column">
      <Filters :title="'카지노 로그'" />
      <!-- <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <Casino />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
  
import Filters from "../components/API/Filter.vue";
import APIOTP from "../api/otp";
export default {
  name: "CasinoLogs",
  components: {   Filters },
  methods: {
    async getData(){
      var sendData = {
        start: 0,
        fromDate:'2021-11-11',
        toDate:'2022-03-07',
        keyword:'',
      }
      const temp = await APIOTP.getCasino(sendData);
      console.log(temp);
    }
  },
  created() {
    // this.getData();
  },
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  /* color: rgb(0, 0, 0); */
  /* background-color: white; */
}
</style>
