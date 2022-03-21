<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header p-5">
          <span>스포츠 리그정렬</span>
          <input class="nyeckbox" type="checkbox">
        </div>
        <div class="card-content">
          <div class="columns is-12">
            <div v-for="row in event" :key="row.game_section" class="column ">
              <div class="table">
                <div class="market-title">{{row.sportsKorName}}</div>
                <div class="country-list" :data-id="row.game_section">
                  <List v-if="row.game_section == 1" :list="datas.soccer"/>
                  <List v-if="row.game_section == 16" :list="datas.baseball"/>
                  <List v-if="row.game_section == 18" :list="datas.basketball"/>
                  <List v-if="row.game_section == 91" :list="datas.volleyball"/>
                  <List v-if="row.game_section == 17" :list="datas.icehockey"/>
                  <List v-if="row.game_section == 12" :list="datas.football"/>
                  <List v-if="row.game_section == 151" :list="datas.esports"/>
                  <List v-if="row.game_section == 78" :list="datas.handball"/>
                  <List v-if="row.game_section == 13" :list="datas.tennis"/>
                  <List v-if="row.game_section == 2004" :list="datas.pingpong"/>
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
import List from "../components/Leagues/CountryList.vue";
import API from "../api/league";
export default {
    name: "LeagueSorting",
    components: { Nav,List },
    data() {
        return {
            event:[],
            datas:[],
        }
    },
    methods: {
      async getevent(){
        const res = await API.getevent();
        this.event = res;
        const results = await API.getleaguesorting();
        this.datas = results;
      }
    },
    created() {
      this.getevent();
    },
}
</script>
<style lang="scss">
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
      .country-title{
        display: flex;
        justify-content: space-evenly;
        height: 40px;
        align-items: center;
        background-color: #eeeeee;
        border:1px solid #cccccc;
        border-radius: 3px;
        margin: 5px;
        input[type="file"]{
          display: none;
        }
        input[type="text"]{
          width: 150px !important;
          border-radius: 5px;
        }
        input[type="checkbox"]{
          top:0px !important;
        }
      }
    }
  }
}


</style>