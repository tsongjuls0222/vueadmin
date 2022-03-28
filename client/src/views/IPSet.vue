<template>
  <div>
     
    <div class="column">
      <div class="card">
        <div class="card-header"><HeaderSS :title="'IP 차단/설정'" /></div>
        <div class="card-content">
          <div class="content">
            <IPBlock />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  
import HeaderSS from "../components/SiteSettings/HeaderSiteSettings.vue";
import IPBlock from "../components/SiteSettings/IPBlock.vue";
export default {
  name: "IPSet",
  components: {   IPBlock, HeaderSS }
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
