<template>
  <div>
     
    <div class="column">
      <div class="card">
        <div class="card-header"><CSHeader :title="'일반문의'" /></div>
        <div class="card-content">
          <div class="content">
            <GenInquiry/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  
import CSHeader from "../components/CustomerService/CSHeader.vue";
import GenInquiry from "../components/CustomerService/GenInquiry.vue";
export default {
  name: "GeneralInquiry",
  components: {   CSHeader ,GenInquiry}
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
