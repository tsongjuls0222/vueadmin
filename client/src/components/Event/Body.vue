<template>
  <div>
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
        <tr v-for="row in data" :key="row.id">
          <td>{{row.id}}</td>
          <td>{{row.popup_title}}</td>
          <td v-if="title == '이벤트 등록'">{{row.content}}</td>
          <td>{{row.content}}</td>
          <td>{{formatDate(row.created)}}</td>
          <td><b-switch class="is-rounded" v-model="row.status" true-value="1" false-value='0'></b-switch></td>
          <td>
            <button class="button is-primary mr-2">수정</button>
            <button class="button is-danger">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="data.length < 1" class="is-flex" style="height: 500px">
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
</template>

<script>
import global from '../../globalfunction/paging';

export default {
  props: ['data','current','start','end','title'],
  data() {
    return {
      switching: this.checkpopup,
    }
  },
  methods: {
    formatDate(param){
      global.formatDate(param);
    },
  },
  computed:{
    checkpopup(){
      
      return (this.data.status == '1') ? true : false; 
    }
  },
  created(){
    // console.log(this.data);
    this.switching = this.checkpopup;
  },
}
</script>
