<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header"><CSHeader :title="'계좌문의'" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import CSHeader from "../components/CustomerService/CSHeader.vue";
export default {
  name: "AccountInquiry",
  components: { Nav, CSHeader }
};
</script>
<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  /* color: #333; */
}
</style>
