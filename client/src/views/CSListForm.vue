<template>
  <div>
     
    <div class="column">
      <CSHeader :title="'일반답변양식'" />
    </div>
  </div>
</template>
<script>
  
import CSHeader from "../components/CustomerService/CSHeader.vue";
export default {
  name: "CSListForm",
  components: {   CSHeader }
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
