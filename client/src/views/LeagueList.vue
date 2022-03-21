<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header p-5">
          <div class="columns">
              <div class="column ">
                  <div class="select" style="width:150px;font-size:15px; height:36px">
                        <select @change="setnation" v-model="selectedid" class="" name="" id="" style="width:150px;font-size:15px; height:36px">
                            <option value="all">종목</option>
                            <option v-for="row in event" :key="row.id" :value="row.game_section">{{row.sportsKorName}}</option>
                        </select>
                  </div>
              </div>
              <div class="column">
                  <div class="select" style="width:300px;font-size:15px; height:36px">
                        <select v-model="country" class="" name="" id="" style="width:300px;font-size:15px; height:36px">
                            <option value="all">종목</option>
                            <option v-for="row in nation" :key="row.id" :value="row.game_section">{{row.country_title}}</option>
                        </select>
                  </div>
              </div>
              <div class="column">
                  <div>
                      <input v-model="keyword" type="text" class="input" placeholder="검색할 팀이름">
                  </div>
              </div>
              <div class="column">
                  <button @click="getlist" class="button is-info"><span class="mdi mdi-magnify pr-2"></span>검색</button>
              </div>
          </div>
        </div>
        <div class="card-content">
          <div class="columns is-fullwidth">
            <div class="column is-12">
              <table>
                <thead>
                  <tr style="height:30px;background-color:#C9D3E2;">
                    <th>Sports</th>
                    <th style="width:150px">Country Code</th>
                    <th style="width:150px">Team Logo</th>
                    <th>Team Name</th>
                    <th>Team Name Korean</th>
                    <th style="width:100px">Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="row in datas" :key="row.num" style="height:30px;">
                      
                        <td><img width='25px' :src="`${pathing}/sports/${row.sports_id}a.png`" alt="">{{gamesec[row.sports_id+'']}}</td>
                        <td>{{(row.country_title == "")?row.team_country:row.country_title}}</td>
                        <td>
                          <form action="" enctype="multipart/form-data">
                              <label for="file-input">
                                  <img class="is-clickable" width='25px' :src="`${pathing}/team_icon/${teamicon(row.teamimg)}`" alt="">
                              </label>
                              <span :class="`is-clickable ${settrash(row.teamimg)}`" @click="deleteme" :data-id="row.num" style='width:45px'></span>
                              <input @change="onfilechange" style="display:none" id="file-input" type="file"/>
                          </form>
                        </td>
                        <td class="text-center"><input type="text" :value="`${teamname(row.team_name_new,row.team_name)}`" style="width:80%;height:30px"></td>
                        <td><input type="text" :value="`${teamnamekor(row.team_name_kor_new,row.team_name_kor)}`" style="width:80%;height:30px"></td>
                        <td><button @click="setrow" :data-country="row.team_country" :data-id="row.num" class="button is-info is-small">Update</button></td>
                        
                    </tr>
                </tbody>
              </table>
              <Nodata v-if="datas.length < 1"/>
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
import Nodata from "../components/GlobalTemplate/Nodata.vue";
import API from "../api/league";
export default {
  name: "LeagueList",
  components: { Nav ,Nodata},
  data() {
      return {
          datas:[],
          event:[],
          nation:[],
          selectedid:'all',
          country:'all',
          keyword:'',
          pathing:'http://192.168.10.50:5000/api/upload',
          gamesec:{
            "1" : "축구",
            "12": "풋볼",
            "13": "테니스",
            "16": "야구",
            "17": "아이스 하키",
            "18": "농구",
            "78": "핸드볼",
            "91": "배구",
            "2004": "탁구",
            "2006": "풋살",
            "2005": "배드민턴",
            "151": "E-스포츠"
          },
      }
  },
  methods: {
      async getfilters(){
          const resnation = await API.getnation();
          this.nation = resnation;
          const resevent = await API.getevent();
          this.event = resevent;
      },
      async setnation(){
          const res = await API.getnations(this.selectedid);
          this.nation = res;
      },
      async getlist(){
          var sendData = {
              sportsid:this.selectedid,
              keyword:this.keyword,
              country:this.country,
          }
          const res = await API.getlist(sendData);
          this.datas = res;
      },
      async deleteme(event){
        const target = event.currentTarget.dataset;
        var targetItem = this.datas.filter(data=>data.num==target.id);
        targetItem = targetItem[0];
        var sendData = {
          sports_id: targetItem.sports_id,
          team_id: targetItem.team_id,
          country_id: targetItem.newCountryCode,
        }
        console.log(targetItem);
        const res = await API.deleteimage(sendData);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status < 1)?"is-danger":"is-success",
        });
        if(res.status > 0){
          this.getlist();
        }
      },
      teamicon(param){
          if(param == '' || param == null){
              return 'uploadme.png';
          }
          return param;
      },
      teamname(param1,param2){
          if(param1 == '' || param1 == null){
              return param2;
          }
          return param1;
      },
      teamnamekor(param1,param2){
           if(param1 == '' || param1 == null){
              return param2;
          }
          return param1;
      },
      settrash(param){
        if(param == '' || param == null){
              return '';
          }
          return 'mdi mdi-delete';
      },
      async setrow(event){
        var imageupload = event.currentTarget.parentElement.parentElement.children[2].querySelector('input').files;
        var enname = event.currentTarget.parentElement.parentElement.children[3].querySelector('input').value;
        var korname = event.currentTarget.parentElement.parentElement.children[4].querySelector('input').value;
        const target = event.currentTarget.dataset;
        const formData = new FormData();
        var targetItem = this.datas.filter(data=>data.num==target.id);
        targetItem = targetItem[0];
        if(imageupload.length > 0){
          imageupload = imageupload[0];
        }else{
          imageupload = null;
        }

        const sendData = {
          sports_id: targetItem.sports_id,
          team_id: targetItem.team_id,
          country_id: targetItem.newCountryCode,
          korname: korname,
          enname: enname,
          img_file : imageupload,
          country : target.country,
        }
        formData.append("img_file",imageupload);
        formData.append("sports_id",targetItem.sports_id);
        formData.append("team_id",targetItem.team_id);
        formData.append("country_id",targetItem.newCountryCode);
        formData.append("korname",korname);
        formData.append("enname",enname);
        formData.append("country",target.country);

        console.log(sendData);

        const res = await API.setrow(formData);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status < 1)?"is-danger":"is-success",
        });
        if(res.status > 0){
          this.getlist();
        }

      },
      onfilechange(event){
        var imgsrc = event.currentTarget.files[0];
        const inputfile = event.currentTarget.parentElement.firstChild.firstChild;
        var reader = new FileReader();
        reader.onload = function(e) {
          inputfile.src = e.target.result;
        }
        reader.readAsDataURL(imgsrc);
      }
  },
  created() {
      this.getfilters();
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  
  /* color: rgb(0, 0, 0); */
  /* background-color: white; */
}

th{
    color:black !important;
}
</style>
