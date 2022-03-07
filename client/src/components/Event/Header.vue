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
            <button @click="addpopup" class="button is-info is-normal">이벤트 등록</button>
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
          <tbody>
            <tr v-for="row in datas" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.popup_title}}</td>
              <td v-if="title == '이벤트 등록'">{{row.content}}</td>
              <td>{{row.content}}</td>
              <td>{{format(row.created)}}</td>
              <td :id="row.id" @change="popupstatus"><b-switch class="is-rounded is-success" :value="row.status" true-value="1" false-value='0'></b-switch></td>
              <td>
                <button class="button is-info mr-2">수정</button>
                <button class="button is-danger">삭제</button>
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
  <!-- <div v-show="showmodal" class="popupmodal">
    <AddPopup />
  </div> -->
</div>
  
</template>
<script>
import APIEvent from "../../api/event";
import global from '../../globalfunction/paging';
import AddPopup from './Popup.vue';
export default {
  props: ["title"],
  data() {
    return {
      datas: [],
      currentid: 0,
      showmodal: false,
    }
  },
  components:{
    // AddPopup,
  },
  methods: {
    async getData(){
      const data = await APIEvent.getpopup();
      this.datas = data;
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
    addpopup(){
      this.$modal.show(AddPopup,{
          draggable: ".card",
          classes:'pointpopup-modal',
          width: '600px',
          height: '400px',
      });
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

// .popupmodal{
//   position: fixed!important;
//   top: 50%!important;
//   left: 50%!important;
//   transform: translate(-50%,-50%)!important;
//   // box-shadow: transparent linear-gradient(180deg, #93a6b7 0%, #6b7982 100%);
//   .card{
//     border-top: 1px solid #d2cfcf;
//   }
// }
</style>
