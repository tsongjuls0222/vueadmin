<template>
    <div>
        <div v-if="toggle" class="card" style="width: 100%">
            <div class="card-header">
                <div class="card-header-title">
                    <span class="ml-4">{{ title }}</span>
                </div>
                <div class="is-flex is-flex-direction-row-reverse m-3">
                    <div class="buttons is-right">
                        <button @click="toggle=!toggle" class="button is-info is-normal">답변양식 작성</button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="content">
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>콘텐츠</th>
                                <th>작성일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row ,index) in datas" :key="row.ibd_idx">
                                <td>{{index+1}}</td>
                                <td>{{row.ibd_title}}</td>
                                <td>{{row.iac_name}}</td>
                                <td v-html="row.ibd_contents"></td>
                                <td>{{formatDate(row.ibd_reg_datetime)}}</td>
                                <td><button :id="row.ibd_idx" @click="editform" class="button is-success">수정</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <Nodata v-if="datas.length < 1" />
                </div>
            </div>
        </div>
        <div v-else>
            <FormMessage :type="type" :close="close" :currentid="currentid"/>
        </div>
        
    </div>
</template>
<script>
import Nodata from '../GlobalTemplate/Nodata.vue';
import API from '../../api/customer_service';
import global from '../../globalfunction/paging';
import FormMessage from './FormMessage.vue';
export default {
  props: ["title"],
  data() {
      return {
          datas:[],
          toggle: true,
          type:'',
          currentid: null,
      }
  },
  components:{Nodata, FormMessage},
  methods: {
      async getData(){
          var res = null;
          if(this.title == '계좌답변양식'){
              res = await API.getforms({type:'form'});
              this.type = 'form';
          }else{
              res = await API.getforms({type:'badform'});
              this.type = 'badform';
          }
          this.datas = res;
      },
      formatDate(value){
          return global.methods.formatDate(value);
      },
      close(){
          this.currentid = null;
          this.getData();
          this.toggle=true;
      },
      editform(event){
          this.currentid = event.target.id;
          this.toggle=false;
      },
  },
  created() {
      this.getData();
  },
};
</script>
