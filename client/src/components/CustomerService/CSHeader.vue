<template>
  <div>
    <div v-if="toggle" class="card" style="width: 100%">
      <div class="card-header p-5">
          <div class="card-header-title">
              <span class="ml-4">{{ title }}</span>
          </div>
          <div class="buttons is-right">
              <div class="buttons is-right">
                <button @click="savesort" class="button is-success is-normal">{{(dragtoggle)?'확인':'편집'}}</button>
                <button @click="toggle=false" class="button is-info is-normal">답변양식 작성</button>
                <button class="button is-info is-normal">Macro Group</button>
              </div>
          </div>
      </div>
      <div class="card-content">
          <div class="content">
            <!-- <div @dragenter.prevent @dragover.prevent v-for="row in macros" :key="row.id" class="box" :draggable="draggercheck" @dragstart="(draggercheck)?draggableMacro($event, row.id, 'macro'):''" @drop="(draggercheck)?droppableItem($event, row.id, macros):''"> -->
            <div @dragenter.prevent @dragover.prevent v-for="row in macros" :key="row.id" class="box" :draggable="dragtoggle" @dragstart="draggableMacro($event, row.id, 'macro')" @drop="droppableItem($event, row.id, macros, row.id)">
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
                <tbody >
                  <!-- <tr @dragenter.prevent @dragover.prevent v-for="ruw in boards.filter(board => board.form_group == row.id)" :key="ruw.ibd_idx" :draggable="toggle" @dragstart="draggercheck=false, draggableForm($event, ruw.ibd_idx, 'form',row.id)" @drop="(!draggercheck)?droppableItem($event, ruw.ibd_idx, boards, row.id):''"> -->
                  <tr @dragenter.prevent @dragover.prevent v-for="ruw in boards.filter(board => board.form_group == row.id)" :key="ruw.ibd_idx" :draggable="dragtoggle" @dragstart="draggableForm($event, ruw.ibd_idx, 'form',row.id)" @drop="droppableItem($event, ruw.ibd_idx, boards, row.id)">
                      <td>{{ruw.ibd_idx}}</td>
                      <td>{{ruw.ibd_title}}</td>
                      <td>{{ruw.iac_name}}</td>
                      <td>{{formatDate(ruw.ibd_reg_datetime)}}</td>
                      <td>
                        <button :id="ruw.ibd_idx" @click="editform" class="button is-success">수정</button>
                        <button :id="ruw.ibd_idx" @click="deleteforms" class="button is-danger">삭제</button>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
    <div v-else>
        <FormMessage :type="'form'" :close="close" :currentid="currentid"/>
    </div>
  </div>
</template>
<script>
import API from '../../api/customer_service';
import global from '../../globalfunction/paging';
import FormMessage from './FormMessage.vue';
export default {
  props: ["title"],
  data() {
    return {
      macros:[],
      boards:[],
      currentid:null,
      dragtoggle:false,
      draggercheck:false,
      toggle: true,
      macrosort:[],
      boardsort:[],
    }
  },
  components:{FormMessage},
  methods: {
    draggableMacro(event, id , type){
      event.stopImmediatePropagation();
      event.dataTransfer.setData('itemID', id);
      event.dataTransfer.setData('type', type);
    },
    draggableForm(event, id , type, rowid){
      event.stopImmediatePropagation();
      event.dataTransfer.setData('itemID', id);
      event.dataTransfer.setData('type', type);
      event.dataTransfer.setData('group', rowid);
    },
    droppableItem(event,id, items, dropgroupid){
      event.stopImmediatePropagation();
      const draggingid = event.dataTransfer.getData('itemID');
      const droppingid = id;
      const draggingtype = event.dataTransfer.getData('type')
      // console.log(draggingid);
      // console.log(droppingid);
      // console.log(draggingtype);

      if(draggingtype == 'macro'){
        this.macrodrop(items,draggingid,droppingid);
      }else{
        const groupid = event.dataTransfer.getData('group');
        // console.log(groupid);
        // console.log(dropgroupid);
        this.formdrop(items,draggingid,droppingid,groupid,dropgroupid);
      }
    },
    formdrop(items,dragid,dropid,draggroupid,dropgroupid){

      if(draggroupid != dropgroupid){
        const board = this.boards.filter(board => {
          if(board.ibd_idx == dragid){
              board.form_group = dropgroupid;
              return board;
          }
        });

        const temporary = this.boardsort.filter(sort => sort.target == board[0].ibd_idx);
        if(temporary != ''){
          temporary[0].form_group = board[0].form_group;
        }else{
          var tosortdata = {
            form_group: board[0].form_group,
            target: board[0].ibd_idx,
          }
          this.boardsort.push(tosortdata);
        }
      }
    },
    macrodrop(items,dragid,dropid){
      var draggingKey = null;
      var droppedKey = null;

      for(var item in items){
        if(items[item].id == dragid){
          draggingKey = item;
        }
        if(items[item].id == dropid){
          droppedKey = item;
        }
      }

      var tempsort = this.macros[draggingKey].group_sorting;
      this.macros[draggingKey].group_sorting = this.macros[droppedKey].group_sorting;
      this.macros[droppedKey].group_sorting = tempsort;

      var tempdata = this.macros[draggingKey];
      this.macros[draggingKey] = this.macros[droppedKey];
      this.macros[droppedKey] = tempdata;
      
      const temporary = this.macrosort.filter(sort => sort.target == this.macros[draggingKey].id)
      const temporary2 = this.macrosort.filter(sort => sort.target == this.macros[droppedKey].id)
      
      if(temporary != ''){
        temporary[0].group_sorting = this.macros[draggingKey].group_sorting;
      }else{
        var tosortdata = {
          group_sorting: this.macros[draggingKey].group_sorting,
          target: this.macros[draggingKey].id,
        }
        this.macrosort.push(tosortdata);
      }

      if(temporary2 != ''){
        temporary2[0].group_sorting = this.macros[droppedKey].group_sorting;
      }else{
        tosortdata = {
          group_sorting: this.macros[droppedKey].group_sorting,
          target: this.macros[droppedKey].id,
        }
        this.macrosort.push(tosortdata);
      }

      this.sortedmacros;
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
    async deleteforms(event){
      const res = await API.deleteforms(event.target.id);
      this.getData();
    },
    async getData(){
      const res = await API.getforms({type:'form',id:2});
      this.boards = res;
      const temp = await API.getgroup();
      this.macros = temp;
    },
    formatDate(value){
      return global.methods.formatDate(value);
    },
    async savesort(){
      if(this.dragtoggle){
        if(this.macrosort != ''){
          const temp = await API.savemacrosorting(this.macrosort);
          console.log(temp);
        }

        if(this.boardsort != ''){
          const temp = await API.saveboardgroup(this.boardsort);
          console.log(temp);
        }
        
        this.macrosort = [];
        this.boardsort = [];
      }
      this.dragtoggle = !this.dragtoggle;
      this.draggercheck = true;
    },
  },
  computed:{
    sortedmacros(){
      return this.macros.sort(function(a,b){
        return a.group_sorting > b.group_sorting;
      });
    }
  },
  created() {
    this.getData();
  },
};
</script>
