<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">동접자</div>
        </div>
        <div class="card-content">
          <div class="columns is-fullwidth">
            <div class="column is-12">
              <table>
                <thead>
                  <tr>
                    <th>아이디</th>
                    <th>Device</th>
                    <th>IP</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div class="is-flex" style="height: 500px">
                <div
                  class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                >
                  <span class="icon is-large"
                    ><i class="mdi mdi-information-outline mdi-48px"></i></span
                  ><span class="is-size-4 is-unselectable"
                    >Sorry, no data found.</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
// import Others from "../components/FeesManagement/Others.vue";
export default {
  name: "OnlineAdminList",
  components: { Nav }
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  /* color: rgb(0, 0, 0); */
  /* background-color: white; */
}
</style>
