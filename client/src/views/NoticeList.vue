<template>
  <div>
    <Nav />
    <div class="column">
      <Notice :title="'공지 목록'" />
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Notice from "../components/Event/Notice.vue";
export default {
  name: "NoticeList",
  components: { Nav, Notice }
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
