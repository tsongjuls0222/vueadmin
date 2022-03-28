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
  
import List from "../components/Leagues/LiveCountryList.vue";
import API from "../api/league";
export default {
    name: "LiveLeagueSorting",
    components: {  List },
    data() {
        return {
            datas:[],
        }
    },
    methods: {
      async getleaguesorting(){
        const results = await API.getliveleaguesorting();
        this.datas = results;
      },
      swapping(drag,drop,type){
        const tempitem = this.datas.filter(item => item.row.game_section == type);
        this.swapitem(type,tempitem[0].data,drag,drop);
      },
      swapitem(param,arr,drag,drop){
          const tempdata = arr;
          const dragged = tempdata.findIndex(element=>element.sort_nums == drag);
          const dropped = tempdata.findIndex(element=>element.sort_nums == drop);
          
          tempdata[dragged].sort_nums = parseInt(drop);
          tempdata[dropped].sort_nums = parseInt(drag);

          var temp = tempdata[dragged];
          tempdata[dragged] = tempdata[dropped];
          tempdata[dropped] = temp;

          const sendData = [];
            var temp1 = {
                game_code: param,
                country_code: tempdata[dragged].country_code,
                sort: tempdata[dragged].sort_nums,
                type:'live',
            }
            var temp2 = {
                game_code: param,
                country_code: tempdata[dropped].country_code,
                sort: tempdata[dropped].sort_nums,
                type:'live',
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