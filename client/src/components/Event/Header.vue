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
            >
              편집
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
          <tbody  v-if="title=='공지 목록'" >
            <tr @dragenter.prevent @dragover.prevent @drop="droppablelist($event, row.sort_julius, datas)" @dragstart="startDrag($event, row)" draggable="true" v-for="row in datas" :key="row.ibd_idx">
              <td>{{row.sort_julius}}</td>
              <td>{{row.ibd_title}}</td>
              <td><img @click="viewimage" :data-title="row.ibd_title" class="is-clickable" :src="`${pathing}/notice/${row.content}`" style="max-height:100px"></td>
              <td>{{format(row.ibd_reg_datetime)}}</td>
              <td :id="row.ibd_idx" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.ibd_status" true-value="1" false-value='0'></b-switch></td>
              <td>
                <button class="button is-info mr-2" @click="showspopup" :id="row.ibd_idx" >수정</button>
                <button class="button is-danger" @click="deletepopup" :id="row.ibd_idx" >삭제</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="row in datas" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.popup_title}}</td>
              <td><img @click="viewimage" :data-title="row.popup_title" class="is-clickable" :src="`${pathing}/popup/${row.content}`" style="max-height:100px"></td>
              <td>{{format(row.created)}}</td>
              <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.status" true-value="1" false-value='0'></b-switch></td>
              <td>
                <button class="button is-info mr-2" @click="showspopup" :id="row.id" >수정</button>
                <button class="button is-danger" @click="deletepopup" :id="row.id" >삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="datas.length < 1" class="is-flex" style="height: 500px">
          <div
            class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-gray-lighter"
          >
            <span class="icon is-large">
              <i class="mdi mdi-information-outline mdi-48px"></i>
            </span>
            <span class="is-size-4 is-unselectable">Sorry, no data found!</span>
          </div>
        </div>
      </div>
  </div>
  <div v-show="showmodal" class="popupmodal">
    <AddPopup :showmodal="showmodal" :closepopup="closepopup" :addpopup="addpopup" :toedit="toedit" :editpopup="editpopup"/>
  </div>
  <div v-show="imagepreview" @click="imagepreview=false" class="image-preview-wrapper" style="display: none">
    <div class="image-preview-content">
        <div class="close-image-preview">
            <!-- <i class="fas fa-times"></i> -->
        </div>
        <div class="image-preview-container">
            <img class="image-preview" :src="preview" alt="">
        </div>
        <div class="image-title">
            <span class="image-title">{{preview_title}}</span>
        </div>
    </div>
</div>
</div>
  
</template>
<script>
import APIEvent from "../../api/event";
import global from '../../globalfunction/paging';
import AddPopup from './Popup.vue';
export default {
  props: ["title"],
  data() {
    const startDrag = (event, item) => {
      console.log(item.sort_julius);
      const sortid = item.sort_julius;
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', sortid);
      // console.log(event.dataTransfer);
    }
    const onDrop = (event, list, items) => {
      console.log(list);
      const draggingid = event.dataTransfer.getData('itemID');
      // const item = items.value.find((item) => item.sort_julius == draggingid);
      var data = '';
      for(var item in items){
        // console.log(items[item]);
        if(draggingid == items[item].sort_julius){
          data = items[item];
          break;
          // console.log(items[item]);
        }
      }
      console.log(data.sort_julius);
      items.list = data;
      // console.log(item);
    }
    return {
      datas: [],
      currentid: 0,
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
      },
      pathing: 'http://192.168.10.50:5000/api/upload',
      startDrag,
      onDrop,
    }
  },
  components:{
    AddPopup,
  },
  methods: {
    droppablelist(event,id,items){
      console.log(items);
    },
    async getData(){
      if(this.title == '공지 목록'){
        const data = await APIEvent.getnotice();
        this.datas = data;
      }else{
        const data = await APIEvent.getpopup();
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
      this.selectedfile = null;
      this.showmodal = false;
    },
    async addpopup(fileselected){
      const formData = new FormData();
      formData.append("content", fileselected);
      formData.append("popup_title", this.toedit.title);
      formData.append("widthpx", this.toedit.width);
      formData.append("heightpx", this.toedit.height);
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
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
// .vm--container{
//     .vm--modal{
//       top: 318px;
//       left: 651px;
//       width: 600px;
//       height: 401px;
//     }
    
// }
.image-preview-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: #000000d9;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    .close-image-preview{
        position: absolute;
        top: 30px;
        cursor: pointer;
    }
    .image-preview-container{
      padding-top: 100px;
    }
    .image-title{
        margin-top: 15px;
        text-align: center;
        color: #dfdfdf;
        font-size: 18px;
        font-weight: 400;
    }
}
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
