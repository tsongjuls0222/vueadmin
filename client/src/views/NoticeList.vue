<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <Header :title="'공지 목록'" />
        </div>
        <div class="card-content">
          <div class="content">
            <Body />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Header from "../components/Event/Header.vue";
import Body from "../components/Event/Body.vue";
export default {
  name: "NoticeList",
  components: { Nav, Header, Body }
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
