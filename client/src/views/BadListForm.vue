<template>
  <div>
    <Nav />
    <div class="column">
      <Forms :title="'블랙계좌답변양식'" />
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Forms from "../components/CustomerService/Forms";
export default {
  name: "BadListForm",
  components: { Nav, Forms }
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
