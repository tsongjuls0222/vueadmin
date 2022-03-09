<template>
<div class="card">
  <div class="card-header">
    <div class="columns" style="width: 100%">
      <div class="column">
        <div class="is-flex is-justify-content-space-between my-3">
          <span class="ml-4">{{ title }}</span>
          <div class="buttons is-right">
            <button
              class="button is-success is-normal mr-3"
              v-if="title == '이벤트 등록' || title == '공지 목록'"
              @click="saveSort"
            >
              {{(dragtoggle)?'확인':'편집'}}
            </button>
            <button @click="showpopup" class="button is-info is-normal">이벤트 등록</button>
          </div>
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
              <th>Title</th>
              <th>Image</th>
              <th v-if="title == '이벤트 등록'">Content</th>
              <th>Date Uploaded</th>
              <th>Hide/Show</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            <tr @dragenter.prevent @dragover.prevent @drop="droppablelist($event, row.sort_julius, datas)" :id="row.sort_julius" :draggable="dragtoggle" @dragstart="startDrag($event, row)" v-for="row in datas" :key="row.ibd_idx">
              <td>{{row.ibd_idx}}</td>
              <td>{{row.ibd_title}}</td>
              <td v-if="title == '이벤트 등록'" style="width:6%"><img @click="viewimage"  :draggable="dragtoggle" :data-title="row.ibd_title" class="is-clickable" :src="`${pathing}/team_icon/${row.ibd_thumbnail}`" style="max-height:100px"></td>
              <td style="width:6%"><img @click="viewimage"  :draggable="dragtoggle" :data-title="row.ibd_title" class="is-clickable" :src="`${pathing}/team_icon/${checkimage(row.ibd_contents)}`" style="max-height:100px"></td>
              <td>{{format(row.ibd_reg_datetime)}}</td>
              <td :id="row.ibd_idx" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.ibd_status" true-value="1" false-value='0'></b-switch></td>
              <td>
                <button class="button is-info mr-2" @click="showspopup" :id="row.ibd_idx" >수정</button>
                <button class="button is-danger" @click="deletepopup" :id="row.ibd_idx" >삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Nodata v-if="datas.length < 1" />
      </div>
  </div>
  <div v-show="showmodal" class="popupmodal">
    <AddItem v-if="title=='이벤트 등록'" :closepopup="closepopup" :addpopup="addboard" :toedit="toedit" :editpopup="editboard" :title="title"/>
    <AddItem v-else :closepopup="closepopup" :addpopup="addpopup" :toedit="toedit" :editpopup="editpopup" :title="title"/>
  </div>
  <div @click="imagepreview = false">
    <ImagePreview  v-show="imagepreview" :preview="preview" :preview_title="preview_title" />
  </div>
</div>
  
</template>
<script>
import APIEvent from "../../api/event";
import global from '../../globalfunction/paging';
import AddItem from './AddEvent.vue';
import ImagePreview from './ImagePreview.vue';
import Nodata from '../GlobalTemplate/Nodata.vue';
export default {
  props: ["title"],
  data() {
    return {
      datas: [],
      tosort: [],
      currentid: 0,
      dragtoggle: false,
      showmodal: false,
      imagepreview: false,
      preview:'',
      preview_title: '',
      toedit: 
      {
        id: null,
        title: '',
        color:'#49d47f',
        fix:0,
        type:'notice',
        status:0,
      },
      pathing: 'http://192.168.10.50:5000/api/upload',
    }
  },
  components:{
    AddItem, Nodata, ImagePreview
  },
  methods: {
    droppablelist(event,id,items){
      const draggingid = event.dataTransfer.getData("itemID");
      var data = null;
      var temp = null;
      for(var item in items){
        if(draggingid == items[item].sort_julius){
          data = item;
        }
        if(id == items[item].sort_julius){
          temp = item;
        }
      }

      var tempsort = this.datas[data].sort_julius;
      this.datas[data].sort_julius = this.datas[temp].sort_julius;
      this.datas[temp].sort_julius = tempsort;

      var tempdata = this.datas[data];
      this.datas[data] = this.datas[temp];
      this.datas[temp] = tempdata;

      const temporary = this.tosort.filter(sort => sort.target == this.datas[data].ibd_idx)
      const temporary2 = this.tosort.filter(sort => sort.target == this.datas[temp].ibd_idx)
      
      if(temporary != ''){
        temporary[0].sort_julius = this.datas[data].sort_julius;
      }else{
        var tosortdata = {
          sort_julius: this.datas[data].sort_julius,
          target: this.datas[data].ibd_idx,
        }
        this.tosort.push(tosortdata);
      }

      if(temporary2 != ''){
        temporary2[0].sort_julius = this.datas[temp].sort_julius;
      }else{
        tosortdata = {
          sort_julius: this.datas[temp].sort_julius,
          target: this.datas[temp].ibd_idx,
        }
        this.tosort.push(tosortdata);
      }      
    },
    startDrag(event, item){
      const sortid = item.sort_julius;
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', sortid);
    },
    async saveSort(){
      if(this.dragtoggle && this.tosort != ''){
        const temp = await APIEvent.savesorting(this.tosort);
        console.log(temp);
        this.tosort = [];
      }
      this.dragtoggle = !this.dragtoggle;
    },
    checkimage(temp)
    {
      var name = temp.split('.');
      if(name[1] == ''){
        return temp+'jpg';
      }
      return temp;
    },
    async getData(){
      if(this.title == '공지 목록'){
        const data = await APIEvent.getnotice();
        this.datas = data;
      }else{
        const data = await APIEvent.getboard();
        this.datas = data;
      }
    },
    format(param){
      var param = param;
      return global.methods.formatDate(param);
    },
    async popupstatus(event){
      this.currentid = event.currentTarget.id;
      var sendData = {
        target: event.currentTarget.id,
        status: this.getstatus
      }
      const res = await APIEvent.setnoticestatus(sendData);
      console.log(res);
    },
    viewimage(event){
      this.imagepreview=true;
      this.preview = event.target.src;
      this.preview_title = event.target.dataset.title;
    },
    closepopup(){
      this.toedit.title = '';
      this.toedit.id = null;
      this.toedit.fix = 0;
      this.toedit.color = '#49d47f';
      this.toedit.type = 'notice';
      this.toedit.status = 0;
      this.showmodal = false;
    },
    async addpopup(fileselected){
      const formData = new FormData();
      formData.append("ibd_contents", fileselected);
      formData.append("ibd_title", this.toedit.title);
      formData.append("ibd_titlecolor", this.toedit.color);
      formData.append("ibd_type", this.toedit.type);
      formData.append("ibd_fix", this.toedit.fix);
      formData.append("ibd_status", this.toedit.status);
      formData.append("sort_julius", this.datas.length+1);
      const res = await APIEvent.addnotice(formData);
      this.getData();
    },
    async addboard(firstselected,secondselected){
      const formData = new FormData();
      formData.append("ibd_contents", firstselected);
      formData.append("ibd_thumbnail", secondselected);
      formData.append("ibd_title", this.toedit.title);
      formData.append("ibd_titlecolor", this.toedit.color);
      formData.append("ibd_type", this.toedit.type);
      formData.append("ibd_fix", this.toedit.fix);
      formData.append("ibd_status", this.toedit.status);
      formData.append("sort_julius", this.datas.length+1);
      const res = await APIEvent.addboard(formData);
      this.getData();
    },
    async editpopup(fileselected,id){
      const formData = new FormData();
      formData.append("ibd_contents", fileselected);
      formData.append("ibd_title", this.toedit.title);
      formData.append("ibd_titlecolor", this.toedit.color);
      formData.append("ibd_type", this.toedit.type);
      formData.append("ibd_fix", this.toedit.fix);
      formData.append("ibd_status", this.toedit.status);
      const res = await APIEvent.editnotice(id,formData);
      this.getData();
    },
    async editboard(firstselected,id,secondselected){
      const formData = new FormData();
      formData.append("ibd_contents", firstselected);
      formData.append("ibd_thumbnail", secondselected);
      formData.append("ibd_title", this.toedit.title);
      formData.append("ibd_titlecolor", this.toedit.color);
      formData.append("ibd_type", this.toedit.type);
      formData.append("ibd_fix", this.toedit.fix);
      formData.append("ibd_status", this.toedit.status);
      const res = await APIEvent.editboard(id,formData);
      this.getData();
    },
    async deletepopup(event){
      if(this.title == '공지 목록'){const res = await APIEvent.deletenotice(event.target.id);}
      else{const res = await APIEvent.deleteboard(event.target.id);}
      
      this.getData();
    },
    showpopup(){
      // this.$modal.show(AddPopup,{
      //     draggable: ".card",
      //     classes:'pointpopup-modal',
      //     width: '600px',
      //     height: 'auto',
      // });
      this.showmodal= true;
    },
    async showspopup(event){
      const id = event.target.id;
      let res = null;
      if(this.title == '공지 목록'){res = await APIEvent.findnotice(id);}
      else{res = await APIEvent.findboard(id);}
      this.toedit.id = id;
      this.toedit.title = res.ibd_title;
      this.toedit.type = res.ibd_type;
      this.toedit.color = res.ibd_titlecolor;
      this.toedit.fix = res.ibd_fix;
      this.toedit.status = res.ibd_fix;
      this.showmodal= true;
    },
  },
  computed:{
    getstatus(){
      for(var data in this.datas){
        if(this.datas[data].ibd_idx == this.currentid){
          return (this.datas[data].status == '1')? 0: 1;
        }
      }
    },
    sorted(){
      return this.datas.sort(function(a,b){
        return a.sort_julius > b.sort_julius;
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
