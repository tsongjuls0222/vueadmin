<template>
  <div>
     
    <div class="column">
      <div v-if="switching==false" class="card">
        <div class="card-header">
          <div class="is-flex is-justify-content-space-between p-5" style="width:100%">
            <span>미니 게임목록</span>
            <div class="buttons">
              <button disabled class="button is-info">Save Edit</button>
              <button @click="gotoadd" class="button is-info">새로운 미니 게임</button>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <div v-for="minigame in computedMinigame" :key="minigame.id">
              <Minigame :minigame="minigame" :gametitle="gametitle" :marketarray="marketarray" :deleteminigame="deleteminigame" :saveedit="saveedit" :deletesubgame="deletesubgame"/>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" v-model="selectAll"></th>
                    <th>Page Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mainte in maintenance" :key="mainte.id">
                    <td><input type="checkbox" v-model="selected" :value="mainte.id"></td>
                    <td>{{mainte.page_kor}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card">
          <AddMini :gametitle="gametitle" :marketarray="marketarray" :addminigame="addminigame" :backtolist="backtolist" />
      </div>
    </div>
  </div>
</template>
<script>
  
import Minigame from "../components/GameList/MinigameTable.vue";
import AddMini from "../components/GameList/AddMini.vue";
import API from "../api/gamelist";
export default {
  name: "GameListMinigames",
  components: {  Minigame,AddMini },
  data() {
    return {
      minigamelist:[],
      maintenance:[],
      selected:[],
      gametitle:{
          "6001":"Powerball",
          "6002":"Speedkeno",
          "6011":"Power Freekick",
          "6012":"Speed Homerun",
          "6021":"Escape Ladder",
          "6022":"Hammer Hammer",
          "6023":"Penalty Kick",
          "6031":"Speed Ladder",
          "6033":"Ladder Power"
      },
      marketarray:{
          "1":"일반볼-오버/언더", 
          "3":"파워볼-오버/언더", 
          "4":"일반볼 홀/짝", 
          "5":"홀/짝", 
          "2":"오버/언더", 
          "7":"일반볼", 
          "8":"레드/블루", 
          "9":"방향", 
          "10":"골/노골", 
          "11":"레드/블루",
          "12":"Attack", 
          "13":"Defense", 
          "14":"승패",
          "15":"Line Count",
          "16":"좌/우",
          "17":"좌/무/우",
          "18":"키커/골키퍼"
      },
      switching:false,
      count:0,
      addingminigame:[],
    }
  },
  methods: {
    async getminigamelist(){
      const res = await API.getminigamelist();
      this.minigamelist = res;
      this.$store.commit("setMinigame", res);
    },
    async getmaintenance(){
      const res = await API.getmaintenance();
      this.maintenance = res;
      this.checkers();
    },
    checkers(){
      var selected = [];
      this.maintenance.forEach(function (temp) {
          if(temp.maintenance == 1){
            selected.push(temp.id);
          }
      });
      this.selected = selected;
    },
    backtolist(){
      this.switching = false;
    },
    gotoadd(){
      this.switching = true;
    },
    addFormElement(){
      this.addedgame.push({count:this.count++});
    },
    async addminigame(param){
      // console.log(param);
      const res = await API.addminigame(param);
      // console.log(res);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status)?'is-success':"is-danger",
      });
      if(res.status){
        this.backtolist();
        this.getminigamelist();
      }
    },
    async deleteminigame(event){
      // console.log(event.currentTarget.id);
      if(confirm("Do you want to delete this?")){
        const res = await API.deleteminigame(event.currentTarget.id);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: 'is-success',
        });
        this.getminigamelist();
      }
    },
    async saveedit(param){
      if(confirm("Are you sure?")){
        const res = await API.saveminigame(param);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status)?'is-success':"is-danger",
        });
        if(res.status){
          this.getminigamelist();
        }
      }
    },
    async deletesubgame(param){
      if(confirm("Are you sure?")){
        const res = await API.deletesubgame(param);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: 'is-success',
        });
        
        this.$store.dispatch("setNewMinigame", this.getminigamelist());
      }
    },
  },
  computed:{
    computedMinigame(){
      return this.$store.getters.getMinigame;
    },
    selectAll:{
      get: function () {
            // return this.users ? this.selected.length == this.users.length : false;
      },
      set: function (value) {
          var selected = [];
          if (value) {
              this.maintenance.forEach(function (temp) {
                  selected.push(temp.id);
              });
          }
          this.selected = selected;
      }
    }
  },
  created() {
    this.getminigamelist();
    this.getmaintenance();
    // console.log(this.computedMinigame);
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
  color: #333;
}
</style>
