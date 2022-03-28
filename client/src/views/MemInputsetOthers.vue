<template>
  <div>
     
    <div class="column">
      <div class="card">
        <Others />
      </div>
    </div>
  </div>
</template>
<script>
  
import Others from "../components/FeesManagement/Others.vue";
export default {
  name: "MemInputsetOthers",
  components: {   Others }
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgb(0, 0, 0);
  /* background-color: white; */
}
</style>
