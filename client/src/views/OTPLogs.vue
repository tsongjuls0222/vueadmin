<template>
  <div>
    <Nav />
    <div class="column">
      <Filters :title="'OTP 로그'"/>
      <!-- <div class="card">
        <div class="card-header">
          <div class="card-header-title"></div>
        </div>
        <div class="card-content">
          <div class="content">
            <OTP :data="data" :getData="getData" :count="count" :currentButton="currentButton" :isHiding="isHiding" :isClass="isClass" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Filters from "../components/API/Filter.vue";


export default {
  name: "OTPLogs",
  components: { Nav, Filters },
  
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
}
</style>
