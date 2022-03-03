<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title"><Filters :title="'OTP 로그'" /></div>
        </div>
        <div class="card-content">
          <div class="content">
            <OTP :otp="otp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Filters from "../components/API/Filter.vue";
import OTP from "../components/API/OTP.vue";
import APIOTP from "../api/otp";
export default {
  name: "OTPLogs",
  components: { Nav, Filters, OTP },
  data() {
    return {
      otp:[],
    }
  },
  methods: {
    async getotp(){
      const otp = await APIOTP.getOTP();
      this.otp = otp;
    }
  },
  created() {
    this.getotp();
  },
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
}
</style>
