<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            <Filters :title="'카지노 로그'" />
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <Casino />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Filters from "../components/API/Filter.vue";
import Casino from "../components/API/Casino.vue";
export default {
  name: "CasinoLogs",
  components: { Nav, Filters, Casino }
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
