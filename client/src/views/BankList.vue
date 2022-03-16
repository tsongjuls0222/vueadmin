<template>
  <div>
    <Nav />
    <div class="column">
      <ListBank :title="'은행목록'"/>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import ListBank from "../components/SiteSettings/ListBank.vue";
export default {
  name: "BankList",
  components: { Nav, ListBank }
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
