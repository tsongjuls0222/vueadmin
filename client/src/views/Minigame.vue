<template>
  <div>
     
    <div class="column">
        <BetList :title="'미니게임'"/>
    </div>
  </div>
</template>
<script>
  
import BetList from "../components/Bets/BetList.vue";
export default {
  name: "Minigame",
  components: {   BetList }
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
