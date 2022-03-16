<template>
<div class="card">
  <div class="card-header">
    <div class="columns" style="width: 100%">
      <div class="column">
        <div class="is-flex is-justify-content-space-between my-3">
          <span class="ml-4">{{ title }}</span>
          <div class="buttons is-right">
            <button @click="showpopup" class="button is-info is-normal">Upload Bank</button>
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
              <th>은행명</th>
              <th>로고</th>
              <th>닫기/열기</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody >
            <tr :id="row.id" v-for="row in datas" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.bank_name}}</td>
              <td style="width:6%"><img @click="viewimage"  :data-title="row.ibd_title" class="is-clickable" :src="`${pathing}/bank_logo/${checkimage(row.bank_image)}`" style="max-height:100px"></td>
              <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.bank_status" true-value="1" false-value='0'></b-switch></td>
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
  <div @click="imagepreview = false">
    <ImagePreview  v-show="imagepreview" :preview="preview" :preview_title="preview_title" />
  </div>
</div>
  
</template>
<script>
import API from "../../api/partner";
import global from '../../globalfunction/paging';
import ImagePreview from '../Event/ImagePreview.vue';
import Nodata from '../GlobalTemplate/Nodata.vue';
import AddBank from './AddBank.vue';
export default {
  props: ["title"],
  data() {
    return {
      datas: [],
      currentid: 0,
      imagepreview: false,
      preview:'',
      preview_title: '',
      toedit: 
      {
        id: null,
        bank_name: '',
      },
      pathing: 'http://192.168.10.50:5000/api/upload',
    }
  },
  components:{
     Nodata, ImagePreview
  },
  methods: {
    checkimage(temp)
    {
      var name = temp.split('.');
      if(name[1] == ''){
        return temp+'jpg';
      }
      return temp;
    },
    async getData(){
      const res = await API.getbanklist();
      this.datas = res;
    },
    format(param){
      var param = param;
      return global.methods.formatDate(param);
    },
    async popupstatus(event){
      this.currentid = event.currentTarget.id;
      console.log(this.getstatus);
      var sendData = {
        target: event.currentTarget.id,
        status: this.getstatus
      }
      const res = await API.bankstatus(sendData);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status < 1)?"is-danger":"is-success",
      });
      this.getData();
    },
    viewimage(event){
      this.imagepreview=true;
      this.preview = event.target.src;
      this.preview_title = event.target.dataset.title;
    },
    closepopup(){
      this.toedit.bank_name = '';
      this.toedit.id = null;
      this.showmodal = false;
    },
    async addpopup(fileselected){
      const formData = new FormData();
      formData.append("bank_image", fileselected);
      formData.append("bank_name", this.toedit.bank_name);
      formData.append("bank_status", 1);
      const res = await API.addbank(formData);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status < 1)?"is-danger":"is-success",
      });
      this.getData();
    },
    async editpopup(fileselected,id){
      const formData = new FormData();
      formData.append("bank_image", fileselected);
      formData.append("bank_name", this.toedit.bank_name);
      const res = await API.editbank(id,formData);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status < 1)?"is-danger":"is-success",
      });
      this.getData();
    },
    async deletepopup(event){
      const res = await API.deletebank(event.target.id);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status < 1)?"is-danger":"is-success",
      });
      this.getData();
    },
    showpopup(){
      this.$modal.show(AddBank,{addpopup:this.addpopup,toedit:this.toedit,editpopup:this.editpopup},{
          draggable: ".card",
          width: '600px',
          height: 'auto',
      });
    },
    async showspopup(event){
      const id = event.target.id;
      const res = await API.findbank(id);
      this.toedit.id = id;
      this.toedit.bank_name = res.bank_name;
      this.showpopup();
    },
  },
  computed:{
    getstatus(){
      for(var data in this.datas){
        if(this.datas[data].id == this.currentid){
          return (this.datas[data].bank_status == '1')? 0: 1;
        }
      }
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

