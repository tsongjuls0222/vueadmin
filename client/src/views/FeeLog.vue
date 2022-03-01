<template>
  <div>
    <Nav />
    <div class="column">
      <!-- <div class="card"> -->
      <!-- <div class="card-content"> -->
      <FeeLogs :agents="agents" :feelogs="feelogs" :filterFunction="filterFunction"/>
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
    }
  },
  methods: {
    async getData(){
      const res = await APIFilter.getSelectAgent();
      this.agents = res;
      const fee = await APIFees.getFeelogs();
      this.feelogs = fee;
      console.log(this.feelogs.length);
    },
    async filterFunction(data) {
      const res = await APIFees.getFilterFeelogs(data);
      this.feelogs = res;
      
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
