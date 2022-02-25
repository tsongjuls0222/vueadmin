<template>
  <div>
    <Nav />
    <div class="column">
        <div class="card">
            <div class="card-header">
                <SettlementHeader :title="'기간별 결산내역'"/>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import SettlementHeader from "../components/Settlement/SettlementHeader.vue";
export default {
  name: "MemberHistory",
  components: { Nav, SettlementHeader }
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
