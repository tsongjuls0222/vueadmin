<template>
  <div>
     
    <div class="column">
      <Header :title="'이벤트 등록'" />
    </div>
  </div>
</template>
<script>
  
import Header from "../components/Event/Notice.vue";
export default {
  name: "BoardList",
  components: {   Header }
};
</script>
<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  color: #333;
}
</style>
