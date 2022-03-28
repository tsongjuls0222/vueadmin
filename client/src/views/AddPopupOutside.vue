<template>
  <div>
     
    <div class="column">
      <Header :title="'외부 팝업'" />
    </div>
  </div>
</template>
<script>
  
import Header from "../components/Event/Popups.vue";
export default {
  name: "AddPopupOutside",
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
