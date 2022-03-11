<template>
  <div>
    <Nav />
    <div class="column">
      <!-- <div class="card"> -->
      <!-- <div class="card-content"> -->
      <FeeLogs :agents="agents" :feelogs="feelogs" :filterFunction="filterFunction" :count="count" :currentButton="currentButton" :startButton="startButton" :endButton="endButton" />
      <!-- </div> 
      </div>-->
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import FeeLogs from "../components/FeesManagement/FeeLogs.vue";
import APIFilter from '../api/admin';
import APIFees from '../api/feemanagement';
export default {
  name: "FeeLog",
  components: { Nav, FeeLogs },
  data() {
    return {
      agents : [],
      feelogs :[],
      count: 0,
      currentButton:1,
      startButton:0,
      endButton:0,
    }
  },
  methods: {
    async getData(){
      const res = await APIFilter.getSelectAgent();
      this.agents = res;
      const fee = await APIFees.getFeelogs();
      this.feelogs = fee.data;
      this.count = parseInt(fee.count[0].counter / 50);
      if(fee.count[0].counter % 50 > 0){
        this.count = this.count + 1;
      }
    },
    async filterFunction(data,param) {
      this.currentButton = param;
      
      if(param <= 3){
        this.startButton = 0;
        this.endButton = 0;
      }else{
        
        if((this.count - this.currentButton) > 1){
          this.startButton = this.currentButton -2;
          this.endButton = this.currentButton +2;
          
        // }else if((this.count - this.currentButton) > 0){
        //   this.startButton = this.count -4;
        //   this.endButton = this.currentButton +1;
        }else{
          this.startButton = this.count -4;
          this.endButton = this.currentButton +1;
        }
      }
      const res = await APIFees.getFilterFeelogs(data);
      this.feelogs = res.data;
      this.count = parseInt(res.count[0].counter / 50);
      if(res.count[0].counter % 50 > 0){
        this.count = this.count + 1;
      }
    }
  },
  created() {
    this.getData();
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
  color: rgb(0, 0, 0);
  /* background-color: white; */
}
</style>
