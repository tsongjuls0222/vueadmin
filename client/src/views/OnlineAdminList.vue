<template>
  <div>
     
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
                <tbody>
                  <tr v-for="(row, index) in computedAdminList" :key="index">
                    <td>{{row[1]}}</td>
                    <td>{{row[2]}}</td>
                    <td>{{row[0]}}</td>
                    <td>ONLINE</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="Object.keys(computedAdminList).length < 1" class="is-flex" style="height: 500px">
                <div
                  class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                >
                  <span class="icon is-large"
                    ><i class="mdi mdi-information-outline mdi-48px"></i></span
                  ><span class="is-size-4 is-unselectable">Sorry, no data found.</span>
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
  
export default {
  name: "OnlineAdminList",
  data() {
    return {
      currentadmin: null,
      currentip:null,
    }
  },
  methods: {
    vicsports(){

    },
    async getip(){
      await fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
          this.currentip = ip;
      });
    },
  },
  computed:{
    computedUserInfo(){
        return this.$store.getters.getUserInfo;
    },
    computedAdminList(){
        return this.$store.getters.getstate.onlineadminlist;
    },
  },
  created() {
    this.currentadmin = this.computedUserInfo.user.username;
    this.getip();
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
  /* color: rgb(0, 0, 0); */
  /* background-color: white; */
}
</style>
