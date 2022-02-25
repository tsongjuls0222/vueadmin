<template>
  <div>
    <Nav />
    <div class="column">
        <BetList/>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import BetList from "../components/Bets/BetList.vue";
export default {
  name: "Realtime",
  components: { Nav, BetList }
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
