<template>
<div class="card">
  <div class="card-header">
    <div class="columns" style="width: 100%">
      <div class="column">
        <div class="is-flex is-justify-content-space-between my-3">
          <span class="ml-4">{{ title }}</span>
          <div class="buttons is-right">
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
              <th>Date Uploaded</th>
              <th>Hide/Show</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in datas" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.popup_title}}</td>
              <td><img @click="viewimage" :data-title="row.popup_title" class="is-clickable" :src="`${pathing}/team_icon/${row.content}`" style="max-height:100px"></td>
              <td>{{format(row.created)}}</td>
              <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.status" true-value="1" false-value='0'></b-switch></td>
              <td>
                <button class="button is-info mr-2" @click="showspopup" :id="row.id" >수정</button>
                <button class="button is-danger" @click="deletepopup" :id="row.id" >삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Nodata v-if="datas.length < 1" />
      </div>
  </div>
  <div v-show="showmodal" class="popupmodal">
    <AddItem :showmodal="showmodal" :closepopup="closepopup" :addpopup="addpopup" :toedit="toedit" :editpopup="editpopup"/>
  </div>
  <div @click="imagepreview = false">
    <ImagePreview  v-show="imagepreview" :preview="preview" :preview_title="preview_title" />
  </div>
</div>
  
</template>
<script>
import APIEvent from "../../api/event";
import global from '../../globalfunction/paging';
import AddItem from './AddItem.vue';
import ImagePreview from './ImagePreview.vue';
import Nodata from '../GlobalTemplate/Nodata.vue';
export default {
  props: ["title"],
  data() {
    return {
      datas: [],
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
        width: null,
        height: null,
        location: null,
      },
      pathing: 'http://localhost:5000/api/upload',
    }
  },
  components:{
    AddItem, Nodata, ImagePreview
  },
  methods: {
    async getData(){
      const data = await APIEvent.getpopup();
      if(this.title == "팝업"){
        this.datas = data.filter(d=> d.location == 'inside');
        this.toedit.location = 'inside';
      }else{
        this.datas = data.filter(d=> d.location == 'outside');
        this.toedit.location = 'outside';
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
      const res = await APIEvent.setpopupstatus(sendData);
    },
    viewimage(event){
      this.imagepreview=true;
      this.preview = event.target.src;
      this.preview_title = event.target.dataset.title;
    },
    closepopup(){
      this.toedit.title = '';
      this.toedit.id = null;
      this.toedit.width = null;
      this.toedit.height = null;
      if(this.title == "팝업"){
        this.toedit.location = 'inside';
      }else{
        this.toedit.location = 'outside';
      }
      this.showmodal = false;
    },
    async addpopup(fileselected){
      const formData = new FormData();
      formData.append("content", fileselected);
      formData.append("popup_title", this.toedit.title);
      formData.append("widthpx", this.toedit.width);
      formData.append("heightpx", this.toedit.height);
      formData.append("location", this.toedit.location);
      const res = await APIEvent.addpopup(formData);
      this.getData();
    },
    async editpopup(fileselected,id){
      const formData = new FormData();
      formData.append("content", fileselected);
      formData.append("popup_title", this.toedit.title);
      formData.append("widthpx", this.toedit.width);
      formData.append("heightpx", this.toedit.height);
      const res = await APIEvent.editpopup(id,formData);
      this.getData();
    },
    async deletepopup(event){
      const res = await APIEvent.deletepopup(event.target.id);
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
      const res = await APIEvent.findpopup(id);
      this.toedit.id = id;
      this.toedit.title = res.popup_title;
      this.toedit.width = res.widthpx;
      this.toedit.height = res.heightpx;
      if(this.title == "팝업"){
        this.toedit.location = 'inside';
      }else{
        this.toedit.location = 'outside';
      }
      this.showmodal= true;
    },
  },
  computed:{
    getstatus(){
      for(var data in this.datas){
        if(this.datas[data].id == this.currentid){
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
  }
}
</style>
