<template>
  <div>
    <div class="card" style="width: 100%">
      <div class="card-header p-5">
          <div class="card-header-title">
              <span class="ml-4">{{ title }}</span>
          </div>
          <div class="buttons is-right">
              <div class="buttons is-right">
                <button class="button is-success is-normal">편집</button>
                <button class="button is-info is-normal">답변양식 작성</button>
                <button class="button is-info is-normal">Macro Group</button>
              </div>
          </div>
      </div>
      <div class="card-content">
          <div class="content">
            <div v-for="row in macros" :key="row.id" class="box">
              <div class="mb-4">
                <span>{{row.group_name}}</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ruw in `${checker(row.id)}`" :key="ruw.ibd_idx">
                      <td>{{ruw.ibd_idx}}</td>
                      <td>{{ruw.ibd_title}}</td>
                      <td>{{ruw.iac_name}}</td>
                      <td>{{formatDate(ruw.ibd_reg_datetime)}}</td>
                      <td>
                        <button class="button is-success">수정</button>
                        <button class="button is-danger">삭제</button>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from '../../api/customer_service';
import global from '../../globalfunction/paging';
export default {
  props: ["title"],
  data() {
    return {
      macros:[],
      boards:[],
    }
  },
  methods: {
    async getData(){
      const res = await API.getforms({type:'form'});
      this.boards = res;
      const temp = await API.getgroup();
      this.macros = temp;
    },
    formatDate(value){
      return global.methods.formatDate(value);
    },
    checker(id){
      console.log(this.boards.filter(board => board.form_group == id));
      return this.boards.filter(board => board.form_group == id);
    },
  },
  computed:{
    // check(id){
    //   return 
    // }
  },
  created() {
    this.getData();
  },
};
</script>
