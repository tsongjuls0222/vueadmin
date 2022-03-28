<template>
  <div>
     
    <div class="column">
      <div class="card">
        <div class="card-header p-5">
          <span>스포츠 리그정렬</span>
          <input class="nyeckbox" type="checkbox">
        </div>
        <div class="card-content">
          <div class="columns is-12">
            <div v-for="row in datas" :key="row.row.game_section" class="column ">
              <div class="table">
                <div class="market-title">{{row.row.sportsKorName}}</div>
                <div class="country-list" :data-id="row.row.game_section">
                  <List :list="row.data" :game_section="row.row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <!-- <List v-if="row.game_section == 16" :list="datas.baseball" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 18" :list="datas.basketball" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 91" :list="datas.volleyball" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 17" :list="datas.icehockey" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 12" :list="datas.football" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 151" :list="datas.esports" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 78" :list="datas.handball" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 13" :list="datas.tennis" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/>
                  <List v-if="row.game_section == 2004" :list="datas.pingpong" :game_section="row.game_section" :swapping="swapping" :getleaguesorting="getleaguesorting"/> -->
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
  
import List from "../components/Leagues/CountryList.vue";
import API from "../api/league";
export default {
    name: "LeagueSorting",
    components: {  List },
    data() {
        return {
            datas:[],
        }
    },
    methods: {
      async getleaguesorting(){
        const results = await API.getleaguesorting();
        this.datas = results;
      },
      swapping(drag,drop,type){
        const tempitem = this.datas.filter(item => item.row.game_section == type);
        this.swapitem(type,tempitem[0].data,drag,drop);
      },
      swapitem(param,arr,drag,drop){
          const tempdata = arr;
          const dragged = tempdata.findIndex(element=>element.sort_num == drag);
          const dropped = tempdata.findIndex(element=>element.sort_num == drop);
          
          tempdata[dragged].sort_num = parseInt(drop);
          tempdata[dropped].sort_num = parseInt(drag);

          var temp = tempdata[dragged];
          tempdata[dragged] = tempdata[dropped];
          tempdata[dropped] = temp;

          const sendData = [];
            var temp1 = {
                game_code: param,
                country_code: tempdata[dragged].country_code,
                sort: tempdata[dragged].sort_num,
                type:'prematch',
            }
            var temp2 = {
                game_code: param,
                country_code: tempdata[dropped].country_code,
                sort: tempdata[dropped].sort_num,
                type:'prematch',
            }

            sendData.push(temp1);
            sendData.push(temp2);

            this.setsort(sendData);
      },
      async setsort(param){
        const res = await API.setcountrysort(param);
      }
    },
    created() {
      this.getleaguesorting();
    },
}
</script>
<style lang="scss" scoped>
.nyeckbox{
    width: 20px;
    height: 20px;
    position: relative;
    top: 3px;
    margin-left: 5px;
    cursor: pointer;
}
.columns{
  overflow: auto;
  .column{
    padding: 0px !important;
    height: auto;
    .market-title{
      width: 255px;
      border:1px solid black;
      padding:0px !important;
      margin:0px;
      text-align: center;
      background-color: #2196f3;
      color: white;
      height: 34px;
    }
    .country-list{
      border:1px solid black;
      border-top: 0px;
    }
  }
}


</style>