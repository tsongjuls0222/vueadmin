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
                    <th>총판</th>
                    <th>코드</th>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>이름</th>
                    <th>IP</th>
                    <th>접속일자</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in computedUserList" :key="index">
                    <td>{{data[9]}}</td>
                    <td>{{data[8]}}</td>
                    <td>{{data[1]}}</td>
                    <td>{{data[5]}}</td>
                    <td>{{data[7]}}</td>
                    <td>{{data[2]}}</td>
                    <td>{{data[3]}}</td>
                    <td>ONLINE</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="computedUserList.length < 1" class="is-flex" style="height: 500px">
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
  
import io from "../globalfunction/socket.io.js";
export default {
  name: "OnlineList",
  data() {
    return {
      newsocket :null,
      currentadmin: null,
      currentip:null,
      userlist:[],
      socket : io.connect('https://vicsports02.com:8443')
    }
  },
  methods: {
    
    onlinelist(param){
      console.log(param);
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
    computedUserList(){
      var list = this.$store.getters.getstate.userlist;
      var newArray = [];
      for(var x in list){
        var each = list[x];
        var userid = each[0];
        if(newArray.findIndex(temp => temp[0] == userid) < 0){
          newArray.push(each);
        }
      }
      return newArray;
    }
    
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
