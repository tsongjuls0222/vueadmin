<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header"><HeaderSS :title="'은행목록'" /></div>
        <div class="card-content">
          <div class="content">
            <ListBank />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import HeaderSS from "../components/SiteSettings/HeaderSiteSettings.vue";
import ListBank from "../components/SiteSettings/ListBank.vue";
export default {
  name: "BankList",
  components: { Nav, ListBank, HeaderSS }
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
