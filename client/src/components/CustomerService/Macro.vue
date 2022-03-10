<template>
  <div>
    <div class="card" style="width: 100%">
      <div class="card-header m-3">
        <div class="card-header-title is-flex is-justify-content-space-between">
          <div class="card-header-title">
          <span class="ml-4">{{ title }}</span>
        </div>
        <div class="is-flex is-flex-direction-row-reverse my-3">
          <div class="buttons is-right">
            <button @click="saveSort" class="button is-success is-normal">{{(dragtoggle)?'확인':'편집'}}</button>
            <button @click="popup=true" class="button is-info is-normal">
              <span class="icon">
                <i class="mdi mdi-note"></i>
              </span>
              <span>Add Macro</span>
            </button>
          </div>
        </div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Macro Name</th>
                <th>닫기/열기</th>
                <th>설정</th>
              </tr>
            </thead>
            <tbody v-if="title == 'Macro Group'">
              <tr @dragenter.prevent @dragover.prevent @drop="droppablegroup($event, row.id, datas)" :id="row.group_sorting" :draggable="dragtoggle" @dragstart="startDrag($event, row.id)" v-for="row in datas" :key="row.id">
                <td>{{row.group_sorting}}</td>
                <td>{{row.group_name}}</td>
                <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.group_status" true-value="1" false-value='0'></b-switch></td>
                <td>
                  <button class="button is-info mr-2" @click="showpopup" :id="row.id" >수정</button>
                  <button class="button is-danger" @click="deletepopup" :id="row.id" >삭제</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr @dragenter.prevent @dragover.prevent @drop="droppablelist($event, row.id, datas)" :id="row.macro_sorting" :draggable="dragtoggle" @dragstart="startDrag($event, row.id)"  v-for="row in datas" :key="row.id">
                <td>{{row.macro_sorting}}</td>
                <td>{{row.macro_name}}</td>
                <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.macro_status" true-value="1" false-value='0'></b-switch></td>
                <td>
                  <button class="button is-info mr-2" @click="showpopup" :id="row.id" >수정</button>
                  <button class="button is-danger" @click="deletepopup" :id="row.id" >삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="popupmodal" v-show="popup">
      <AddMacro :title="title" :toedit="toedit" :addpopup="addpopup" :closepopup="closepopup" :editpopup="editpopup"/>
    </div>
  </div>
</template>
<script>
import API from '../../api/customer_service';
import AddMacro from './AddMacro.vue';
export default {
  props: ["title"],
  data() {
    return {
      datas:[],
      currentid: null,
      toedit:{
        name:'',
        id:null,
        type:'',
      },
      popup:false,
      dragtoggle:false,
      tosort:[],
    }
  },
  components:{AddMacro},
  methods: {
    droppablegroup(event,id,items){
      const draggingid = event.dataTransfer.getData("itemID");
      var data = null;
      var temp = null;
      for(var item in items){
        if(draggingid == items[item].id){
          data = item;
        }
        if(id == items[item].id){
          temp = item;
        }
      }

      var tempsort = this.datas[data].group_sorting;
      this.datas[data].group_sorting = this.datas[temp].group_sorting;
      this.datas[temp].group_sorting = tempsort;

      var tempdata = this.datas[data];
      this.datas[data] = this.datas[temp];
      this.datas[temp] = tempdata;

      const temporary = this.tosort.filter(sort => sort.target == this.datas[data].id)
      const temporary2 = this.tosort.filter(sort => sort.target == this.datas[temp].id)
      
      if(temporary != ''){
        temporary[0].group_sorting = this.datas[data].group_sorting;
      }else{
        var tosortdata = {
          group_sorting: this.datas[data].group_sorting,
          target: this.datas[data].id,
        }
        this.tosort.push(tosortdata);
      }

      if(temporary2 != ''){
        temporary2[0].group_sorting = this.datas[temp].group_sorting;
      }else{
        tosortdata = {
          group_sorting: this.datas[temp].group_sorting,
          target: this.datas[temp].id,
        }
        this.tosort.push(tosortdata);
      }
    },
    droppablelist(event,id,items){
      const draggingid = event.dataTransfer.getData("itemID");
      var data = null;
      var temp = null;
      for(var item in items){
        if(draggingid == items[item].id){
          data = item;
        }
        if(id == items[item].id){
          temp = item;
        }
      }
      var tempsort = this.datas[data].macro_sorting;
      this.datas[data].macro_sorting = this.datas[temp].macro_sorting;
      this.datas[temp].macro_sorting = tempsort;

      var tempdata = this.datas[data];
      this.datas[data] = this.datas[temp];
      this.datas[temp] = tempdata;

      const temporary = this.tosort.filter(sort => sort.target == this.datas[data].id)
      const temporary2 = this.tosort.filter(sort => sort.target == this.datas[temp].id)
      
      if(temporary != ''){
        temporary[0].macro_sorting = this.datas[data].macro_sorting;
      }else{
        var tosortdata = {
          macro_sorting: this.datas[data].macro_sorting,
          target: this.datas[data].id,
        }
        this.tosort.push(tosortdata);
      }

      if(temporary2 != ''){
        temporary2[0].macro_sorting = this.datas[temp].macro_sorting;
      }else{
        tosortdata = {
          macro_sorting: this.datas[temp].macro_sorting,
          target: this.datas[temp].id,
        }
        this.tosort.push(tosortdata);
      }
    },
    startDrag(event, id){
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', id);
    },
    async saveSort(){
      if(this.dragtoggle && this.tosort != ''){
        if(this.title == "Macro Group"){
          const temp = await API.savesortgroup(this.tosort);
        }else{
          const temp = await API.savesortlist(this.tosort);
        }
        this.tosort = [];
      }
      this.dragtoggle = !this.dragtoggle;
    },
    
    async getData(){
      var res = null;
      if(this.title == 'Macro Group'){
        res = await API.getgroup();
      }else if(this.title == 'Money Macro List'){
        res = await API.getlist({type: 'money'});
        this.toedit.type = 'money';
      }else{
        res = await API.getlist({type: 'bonus'});
        this.toedit.type = 'bonus';
      }
      this.datas = res;
    },
    async popupstatus(event){
      this.currentid = event.currentTarget.id;
      
      if(this.title == "Macro Group"){
        var sendData = {
          target: event.currentTarget.id,
          status: this.getstatus
        }
        const res = await API.savestatus(sendData);
      }else{
        var sendData = {
          target: event.currentTarget.id,
          status: this.getliststatus
        }
        const res = await API.savelist(sendData);
      }
    },
    async showpopup(event){
      const id = event.target.id;
      if(this.title == "Macro Group"){
        const res = await API.findgroup(id);
        this.toedit.name  = res.group_name;
        this.toedit.id          = res.id;
      }else{
        const res = await API.findlist(id);
        this.toedit.name  = res.macro_name;
        this.toedit.id          = res.id;
      }
      
      this.popup = true;
    },
    async deletepopup(event){
      if(this.title == "Macro Group"){
        const res = await API.deletegroup(event.target.id);
      }else{
        const res = await API.deletelist(event.target.id);
      }
      
      this.getData();
    },
    closepopup(){
      this.toedit.name = '';
      if(this.title == "Money Macro List"){this.toedit.type = 'money';}
      if(this.title == "Bonus Macro List"){this.toedit.type = 'bonus';}
      this.toedit.id = null;
      this.popup = false;
    },
    async addpopup(){
      if(this.title == "Macro Group"){
        const res = await API.addgroup({name:this.toedit.name});
      }else{
        const res = await API.addlist({name:this.toedit.name,type:this.toedit.type});
      }
      this.closepopup();
      this.getData();
    },
    async editpopup(){
      if(this.title == "Macro Group"){
        const res = await API.editgroup(this.toedit);
      }else{
        const res = await API.editlist(this.toedit);
      }
      this.closepopup();
      this.getData();
    },
  },
  computed:{
    getstatus(){
      for(var data in this.datas){
        if(this.datas[data].id == this.currentid){
          return (this.datas[data].group_status == '1')? 0: 1;
        }
      }
    },
    getliststatus(){
      for(var data in this.datas){
        if(this.datas[data].id == this.currentid){
          return (this.datas[data].macro_status == '1')? 0: 1;
        }
      }
    },
    sorted(){
      return this.datas.sort(function(a,b){
        return a.macro_sorting > b.macro_sorting || a.group_sorting > b.group_sorting;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.popupmodal{
  position: fixed!important;
  top: 50%!important;
  left: 50%!important;
  transform: translate(-50%,-50%)!important;
  // box-shadow: transparent linear-gradient(180deg, #93a6b7 0%, #6b7982 100%);
  .card{
    border-top: 1px solid #d2cfcf;
    width: 600px !important;
    height: auto;
  }
}
</style>
