<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">쪽지발송</p>
      <b-button
        class="close card-header-icon"
        icon-right="close"
        @click="$emit('close')"
      />
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline is-vertical is-mobile">
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <p>Send To:</p>
          </div>
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <multiselect
              v-model="musername"
              :options="mid"
              :multiple="true">
            </multiselect>
          </div>
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <div class="select is-fullwidth" >
              <select v-model="member">
                <option value="0">레벨선택</option>
                <option value="all">모두</option>
                <option v-for="n in 10" :value="n" :key="n">레벨 {{n}}</option>
              </select>
            </div>
          </div>
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <p>답변양식:</p>
            <div class="select is-fullwidth" style="z-index: 10;">
              <!-- <select v-model="macroid" @change="getContentByMacroId()">
                <option value="" >매크로선택</option>
                <option v-for="macro in getMacroSelection" :value="macro.ibd_idx" :key="macro.id">{{macro.ibd_title}}</option>
              </select> -->
              <div class="accordion-btn" @click="openCloseSelect()" ref="main_selection">매크로선택</div>
              <div class="accordion-content" ref="acc_content">
                <div class="accordion-content-btn" v-for="(macrogroup, index) in getMacroGroup" :key="index" @click="showTick = index">
                  {{macrogroup.group_name}}
                  <div class="accordion-content-sub" v-if="showTick == index">
                    <div v-for="macro in getMacroSelection" :key="macro.ibd_idx">
                      <div v-if="macrogroup.id == macro.form_group" @click="closeAll(`${macro.ibd_title}`,`${macro.ibd_idx}`)">{{macro.ibd_title}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <p>쪽지제목:</p>
            <input class="input is-normal" type="text" placeholder="쪽지제목">
          </div>
          <div class="column is-12-desktop is-12-tablet is-12-mobile">
            <p>내용:</p>
            <ckeditor v-model="ckEditorData"></ckeditor>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer is-flex is-justify-content-right is-align-content-right pr-4 pt-4 pb-4">
      <div class="columns">
        <div class="column">
            <b-button type="is-info" size="is-normal"  outlined @click="getSendMessagePopup()">
              쪽지등록&nbsp;&nbsp;&nbsp;&nbsp;
              <b-icon
                class="iconclass"
                type="is-info"
                pack="fas"
                icon="paper-plane"
                size="is-medium" >
              </b-icon>
            </b-button>
        </div>
      </div>
      <!-- <b-button type="is-ghost" class="card-footer-item has-text-success">지급</b-button> -->
      
    </footer>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import API from "../../api/admin";
export default {
  name: "SendMessagePopUp",
  components: { Multiselect },
  props: ["mid", "musername"],
  data() {
    return {
      ckEditorData : "",
      macroid: "",
      member: 0,
      showTick: -1
      
    };
  },
  methods : {
    async getContentByMacroId(param){
      const id = param;
      const res = await API.getMacroSelectionContent(id);
      this.ckEditorData = res[0].ibd_contents;
    },
    getSendMessagePopup(){

    },
    closeAll(param,param2){
      this.$refs.main_selection.innerText = param;
      this.openCloseSelect();
      this.getContentByMacroId(param2)
    },
    openCloseSelect(){
      this.showTick = -1;
      if(this.$refs.acc_content.style.display == "block"){
        this.$refs.acc_content.style.display = "none";
      }
      else{
        this.$refs.acc_content.style.display = "block";
      }
    }
    
  },
  computed: {
    getMacroSelection () {
      return this.$store.getters.getMacroSelection;
    },
    getMacroGroup () {
      return this.$store.getters.getMacroGroup;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
* {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.8125rem;
    font-weight: 400;
    color: #333;
}
//scss
.card{
  .card-header{
    background: transparent linear-gradient(180deg, #93a6b7 0%, #6b7982 100%);
    p, button {
      color: white;
    }
  }
  .card-content{
    height: 749px;
    overflow-y: scroll;
    .content{
      .is-fullwidth{
        select{
          height: 3.12em;
        }
      }
      .accordion-btn{
        width: 100%;
        height: 3.12em;
        border: 1px solid #b5b5b5;
        border-radius: 4px;
        text-align: left;
        padding-left: .7em;
        vertical-align: middle;
        line-height: 3.12em; 
        cursor: pointer;
      }
      .accordion-content{
        display: none;
        background-color: whitesmoke;
        height: 120px;
        border: 1px solid #b5b5b5;
        overflow-y: scroll;
        padding-left: .7em;
        .accordion-content-btn{
          cursor: pointer;
          font-weight: bold;
          .accordion-content-sub div{
            cursor: pointer;
            padding-left: .6em;
            // display: none;
          } 
          
        }
      }
    }
  }
  .card-footer{
    button:hover{
      .iconclass{
        color: white !important;
      }
    }
  }
}
</style>
