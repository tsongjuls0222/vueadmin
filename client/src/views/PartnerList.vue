<template>
  <div>
     
    <div class="column">
      <Partner />
    </div>
  </div>
</template>
<script>
  
import Partner from "../components/SiteSettings/PartnerSetting.vue";
export default {
  name: "PartnerList",
  components: {   Partner }
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
