<template>
  <div>
    <Nav />
    <div class="column">
      <!-- <div class="card"> -->
      <!-- <div class="card-content"> -->
      <FeeLogs agents:agents/>
      <!-- </div> 
      </div>-->
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import FeeLogs from "../components/FeesManagement/FeeLogs.vue";
import APIFilter from '../api/admin';
export default {
  name: "FeeLog",
  components: { Nav, FeeLogs },
  data() {
    return {
      agents : []
    }
  },
  methods: {
    async getAgentNCode(){
      const res = APIFilter.getSelectAgent();
      // const codes = API.getSelectCode();
      this.$store.commit("setAgents", res);
      this.agents = res;
      
      console.log(this.agents);
    }
  },
  created() {
    this.getAgentNCode();
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
