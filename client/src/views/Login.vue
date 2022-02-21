<template>
  <div class="login">
    <div class="accountbg"></div>
    <div class="accountbg-overlay"></div>
    <LoginCard />
  </div>
</template>
<script>
  import LoginCard from "../components/LoginCard.vue";
  export default {
    name: 'Login',
    components: { LoginCard },
    created () {
      document.title = "VS Admin - Login";
    },
    mounted() {
    },
    beforeCreate() {
    },
  }
</script>
<style scoped>
.accountbg {
  background: url("../assets/img/bg.jpg");
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
}
.accountbg-overlay {
  background: url("../assets/img/horizontal-1.png");
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
}
</style>
