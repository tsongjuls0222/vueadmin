<template>
  <div class="columns">
    <div class="column is-7">
      <div class="card">
        <div class="card-header">
          <div class="columns" style="width: 100%">
            <div class="column">
              <div class="is-flex is-justify-content-space-between my-3">
                <span class="ml-4">파트너관리</span>
                <div class="buttons">
                  <input @keyup="searchcode" type="text" name="" id="" placeholder="Code Search">
                  <span @click="collapsii" id="qwekqwek" class="mdi mdi-chevron-down is-clickable mx-2"></span>
                  <span @click="refresh" class="icon mx-2"><i class="is-clickable mdi mdi-refresh"></i></span>
                  <span class="icon mx-2"><i class="mdi mdi-close"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content" id="qwekqwek2" style="display:block">
          <div class="content">
            <table>
              <thead>
                <tr>
                  <th>에이전트명</th>
                  <th>Member</th>
                  <th>보유금액</th>
                  <th>보유수수료</th>
                  <th>수수료율</th>
                </tr>
              </thead>
              <tbody>
                  <tr :style="{'color':(data.icd_status > 0)?'red':''}" @click="getinfo" v-for="data in datas" :id="data.key" :key="data.key" :data-set="data.parent" :class="`kwekwek${data.parent} is-clickable ${(data.key==currentid)?'highlight':''}`" > 
                    <td :class="`partner-title ${hascolor(data.status)}`" :style="{'padding-left':`${data.depth*20}px !important`}">
                      <span @click="collapsiitable" :data-set="data.key" :class="`${haschildren(data.children.length)} is-clickable`"></span>
                      <span :class="`${hasfolder(data.children.length)} is-clickable`"></span>
                      <span>{{data.title}}</span>
                    <!-- <td :class="`partner-title ${hascolor(data.status)}`" :style="{'padding-left':`${data.depthvalue*20}px !important`}">
                      <span :class="`${haschildren(data.children)}`"></span>
                      <span>{{data.ia_name +" ("+data.ia_code+")"}}</span> -->
                    </td>
                    <td>{{data.member}}</td>
                    <td>{{Number(data.balance).toLocaleString()}}원</td>
                    <td>{{Number(data.fee).toLocaleString()}}원</td>
                    <td>{{data.rate+'% / '+data.loosing+'%'}}</td>
                  </tr>
                </tbody>
            </table>
            <Nodata v-if="datas.length < 1" />
          </div>
        </div>
      </div>
    </div>
    <div class="column is-5">
      <div class="card main-right">
        <div class="card-header">
          <div class="columns" style="width: 100%">
            <div class="column">
              <div class="is-flex is-justify-content-space-between my-3">
                <span class="ml-3">파트너 정보</span>
                <div class="is-flex is-align-items-center">
                  <button @click="showtransfer" v-if="partnerinfo.ia_idx != 224" style="background-color:grey" class="button is-centered mx-2">편집</button>
                  <button @click="deletepartner" v-if="partnerinfo.ia_idx != 224" class="button is-danger is-centered mx-2">삭제</button>
                  <button @click="setsubpartner" v-if="partnerinfo.ia_idx != 224" class="button is-info is-centered mx-2">관리</button>
                  <button @click="showlogs=true" class="button is-primary is-centered mx-2">Logs</button>
                  <button @click="subpartner" class="button is-success is-centered mx-2">하부생성</button>
                  <span @click="collapsii" id="rightcollapse" class="mdi mdi-chevron-down is-clickable icon mx-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content" id="rightcollapse2" style="display:block">
          <div class="content">
            <div class="is-flex is-flex-direction-column">
              <label><span class="partner-name">{{partnerinfo.ia_name}}</span> </label>
              <label>보유잔액 : <span>{{Number(partnerinfo.ia_balance).toLocaleString()}}원</span> </label>
              <label>보유수수료 : <span>{{Number(partnerinfo.ia_fee).toLocaleString()}}원</span> </label>
              <label>수수료율 : <span> {{partnerinfo.ia_rate}}% / 루징 : {{partnerinfo.ia_loosing}}%</span> </label>
              <label>수익유형 : <span>{{(partnerinfo.ia_partnertype == 'revenue')?'수익':''}}</span> </label>
              <label>스포츠 : <span> {{partnerinfo.ia_prematch}}%</span> </label>
              <label>라이브 : <span> {{partnerinfo.ia_realtime}}%</span> </label>
              <label>미니게임 : <span> {{partnerinfo.ia_minigame}}%</span> </label>
              <label>카지노 : <span> {{partnerinfo.ia_casino}}%</span> </label>
            </div>
            <div class="box">
              <div class="columns" style="width: 100%">
                <div class="column">
                  <div class="is-flex is-justify-content-space-between my-3">
                    <span class="ml-3">파트너 정보<br />
                      <span class="has-text-grey-light">등록되어있는 파트너계정으로 로그인이 가능합니다.</span></span>
                    <div class="is-flex is-align-items-center">
                      <button @click="addpartneraccount" class="button is-success is-centered mx-2">계정등록</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>별칭</th>
                      <th>아이디</th>
                      <th>상태</th>
                      <th>off duty</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="acc in partneraccount" :key="acc.id">
                      <td>{{acc.iac_name}}</td>
                      <td>{{acc.username}}</td>
                      <td><span :style="{'color':(acc.iac_status > 0)?'red':'blue'}">{{(acc.iac_status > 0)?'stop':'normal'}}</span></td>
                      <td>{{acc.temp_password}}</td>
                      <td :id="acc.id">
                        <span :id="acc.id" @click="editpartneraccount" class="is-clickable mdi mdi-pencil-box-outline"></span>
                        <span :id="acc.id" @click="deletepartneraccount" class="mdi is-clickable mdi-delete"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box">
              <div class="columns" style="width: 100%">
                <div class="column">
                  <div class="is-flex is-justify-content-space-between my-3">
                    <span class="ml-3">파트너 정보<br />
                      <span class="has-text-grey-light">등록되어있는 코드로 회원가입이 가능합니다.</span></span>
                    <div class="is-flex is-align-items-center">
                      <button @click="addcode" class="button is-success is-centered mx-2">코드등록</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>별칭</th>
                      <th>코드명</th>
                      <th>상태</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="code in partnercode" :key="code.icd_idx" :id="`code`+code.icd_idx" :class="`${(code.icd_code==currentcode)?'highlight':''}`">
                      <td>{{code.icd_name}}</td>
                      <td>{{code.icd_code}}</td>
                      <td><span :style="{'color':(code.icd_status > 0)?'red':'blue'}">{{(code.icd_status > 0)?'stop':'normal'}}</span></td>
                      <td :id="code.icd_idx">
                        <span :id="code.icd_idx" @click="editcode" class="icon is-clickable is-normal"><i class="mdi mdi-pencil-box-outline"></i></span>
                        <span @click="deletecode" class="mdi mdi-delete is-clickable"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showlogs" class="logpopup">
      <LogPopup :close="close" :partnerlogs="partnerlogs" :partnername="partnerinfo.ia_name" :partnerid="currentid"/>
    </div>
  </div>
</template>

<script>
import API from '../../api/partner';
import Nodata from '../GlobalTemplate/Nodata.vue';
import LogPopup from './LogPopup.vue';
import AddAccount from './AddAccount.vue';
import AddCode from './AddCode.vue';
import SubPartner from './SubPartner';
import Transfer from './Transfer';
// import Tree from 'vuejs-tree'
export default {
  data() {
    return {
      datas:[],
      currentid:null,
      partnerinfo:[],
      partnercode:[],
      partneraccount:[],
      partnerlogs:[],
      showlogs:false,
      ipaddress:null,
      position:null,
      delay: 1000,
      targetvalue: '',
      timeout:null,
      currentcode:null,
    }
  },
  components:{Nodata,LogPopup,AddAccount,AddCode,SubPartner,Transfer},
  methods: {
    async refresh(){
      const res = await API.refresh();
      this.datas = res.data;
      // const res = await API.refreshs();
      // const tempingdata = res.data;
      // const bubonsa = tempingdata.filter(element => element.parent == '224');
      // const maindata = bubonsa;
      // const mejang = [];
      // const chongpan = [];
      // var temp = bubonsa;
      // var counter = 2;
      // temp.forEach(element => {
      //     const tempchild = tempingdata.filter(data => data.parent == element.id);
      //     element.depthvalue = counter;
          
      //     if(tempchild.length > 0){
      //       // counter = counter + 2;
      //       // console.log(tempchild);
      //       var childcounter = 0;
      //       tempchild.forEach(tempelement =>{
      //         console.log(tempelement.parent+"====="+element.id)
      //         if(tempelement.parent == element.id){
      //           console.log(tempelement);
      //           var index = bubonsa.findIndex(tempo => tempo.id ==  tempelement.parent);
      //           tempelement.depthvalue = counter;
      //           index = index + 1 + childcounter;
                
      //           maindata.splice(index, 0, tempelement);
      //           childcounter++;
      //         }
      //       });
      //     }else{
      //       counter = 2;
      //     }
      // })
      // const rootparent = tempingdata.filter(element => element.parent == 0);
      // maindata.splice(0, 0, rootparent[0]);
      // this.datas = maindata;
    },
    collapsii(event){
      var chevron = event.currentTarget.classList[1];
      console.log(chevron);
      if(chevron == 'mdi-chevron-down'){
        event.currentTarget.classList.replace('mdi-chevron-down','mdi-chevron-up');
      }else{
        event.currentTarget.classList.replace('mdi-chevron-up','mdi-chevron-down');
      }
      var content = document.getElementById(event.currentTarget.id+'2');
      if (content.style.display == 'block'){
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      } 
    },
    collapsiitable(event){
      var target = event.currentTarget.dataset.set;
      var folder = event.currentTarget.nextElementSibling.classList[2];
      var chevron = event.currentTarget.classList[1];
      if(folder == 'mdi-folder-open'){
        event.currentTarget.nextElementSibling.classList.replace('mdi-folder-open','mdi-folder');
      }else{
        event.currentTarget.nextElementSibling.classList.replace('mdi-folder','mdi-folder-open');
      }
      if(chevron == 'mdi-chevron-down'){
        event.currentTarget.classList.replace('mdi-chevron-down','mdi-chevron-right');
      }else{
        event.currentTarget.classList.replace('mdi-chevron-right','mdi-chevron-down');
      }
      const elements = document.getElementsByClassName('kwekwek'+target);
      for(var x=0; x<elements.length; x++){
        const element = elements[x];
        target = element.getAttribute('id');
        this.findchildelement(target);
        if (element.style.display == ''){
          element.style.display = 'none';
        } else {
          element.style.display = '';
        } 
      }
    },
    findchildelement(target){
      const elements = document.getElementsByClassName('kwekwek'+target);
      for(var x=0; x<elements.length; x++){
        const element = elements[x];
        const childtarget = element.getAttribute('id');
        this.findchildelement(childtarget);
        if (element.style.display == ''){
          element.style.display = 'none';
        } else {
          element.style.display = '';
        } 
      }
    },
    searchcode(event){
      const target = event.currentTarget;
      
      if(this.timeout){
        clearInterval(this.timeout);
      }
      this.targetvalue = target.value;
      if(target.value != ''){
        this.timeout = setTimeout(this.findingcode,this.delay);
      }
    },
    async findingcode(){
      const res = await API.findingcode(this.targetvalue);
      this.getpartner(res.icd_agent);
      this.currentid = res.icd_agent;
      this.currentcode = res.icd_code;
      const yOffset = -300; 
      const element = document.getElementById(res.icd_agent);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
      // console.log(res.icd_idx);
      // const elementcode = document.getElementById('code'+res.icd_idx);
      // const yy = elementcode.getBoundingClientRect().top + window.pageYOffset + yOffset;
      // window.scrollTo({top: yy, behavior: 'smooth'});
    },
    addpartneraccount(){
      this.$modal.show(AddAccount,{ip:this.ipaddress,partnerinfo:this.partnerinfo,getpartner:this.getpartner,currentinfo:null},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    editpartneraccount(event){
      const id = event.target.id;
      const accountinfo = this.partneraccount.filter(account => account.id == id);
      this.$modal.show(AddAccount,{ip:this.ipaddress,partnerinfo:this.partnerinfo,getpartner:this.getpartner,currentinfo:accountinfo},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    async deletepartneraccount(event){
      const id = event.target.id;
      const accountinfo = this.partneraccount.filter(account => account.id == id);
      const agent = accountinfo[0].iac_agent;
      var sendData = {
          agent: accountinfo[0].iac_agent,
          id: accountinfo[0].id
      }
      if(confirm('정말 삭제하시겠습니까?')){
        const res = await API.deleteaccount(sendData);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: "is-success",
        });

        this.getpartner(agent);
      }
      
    },
    addcode(){
      this.$modal.show(AddCode,{ip:this.ipaddress,partnerinfo:this.partnerinfo,getpartner:this.getpartner,currentinfo:null},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    editcode(event){
      const id = event.target.parentElement.id;
      const codeinfo = this.partnercode.filter(code => code.icd_idx == id);
      this.$modal.show(AddCode,{ip:this.ipaddress,partnerinfo:this.partnerinfo,getpartner:this.getpartner,currentinfo:codeinfo},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    async deletecode(event){
      const id = event.target.parentElement.id;
      const codeinfo = this.partnercode.filter(code => code.icd_idx == id);
      var sendData = {
        params:{
          icd_agent: codeinfo[0].icd_agent,
          icd_idx: codeinfo[0].icd_idx
        },
        data:{
          icd_status: 2,
          status: 0,
        }
      }

      if(confirm('정말 삭제하시겠습니까?')){
        const res = await API.deletecode(sendData);
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: "is-success",
        });

        this.getpartner(codeinfo[0].icd_agent);
      }
      
    },
    subpartner(){
      this.$modal.show(SubPartner,{show:true,ipaddress:this.ipaddress,partnerinfo:this.partnerinfo,refresh:this.refresh,currentinfo:null},{
        width: "600px",
        height: "auto",
        maxHeight: 749,
      });
    },
    setsubpartner(){
     this.$modal.show(SubPartner,{show:false,ipaddress:this.ipaddress,partnerinfo:this.partnerinfo,refresh:this.refresh,currentinfo:this.partnerinfo},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    async deletepartner(){
      const id = this.partnerinfo.ia_idx;
      if(confirm("do you want to delete this partner?")){
        const res = await API.deleteagent({target:id});
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: "is-danger",
        });
        this.refresh();
      }
    },
    haschildren(value){
      if(value > 0){
        return 'mdi mdi-chevron-down';
      }
      return 'pr-4';
    },
    hasfolder(value){
      if(value > 0){
        return 'pr-4 mdi mdi-folder-open';
      }
      return 'pr-4 mdi mdi-folder';
    },
    hascolor(temp){
      if(temp > 0){
        return 'has-text-danger';
      }
      return '';
    },
    getinfo(event){
      if(event.target.parentElement.id != ''){
        this.currentid = event.target.parentElement.id;
        this.getpartner(event.target.parentElement.id);
        this.currentcode = null;
      }
    },
    close(){
      this.showlogs = false;
    },
    showtransfer(){
      const partnerbalance = this.partnerlogs.filter(log => log.logs_status == 1);
      var amount = (partnerbalance == '')?0:partnerbalance[0].amount;
      this.$modal.show(Transfer,{partnerinfo:this.partnerinfo,refresh:this.refresh,balance:amount,position:this.position,getpartner:this.getpartner},{
          width: "600px",
          height: "auto",
          maxHeight: 749,
      });
    },
    async getpartner(id){
      const res = await API.getpartnerinfo(id);
      this.partnerinfo =res.agent;
      this.partnercode =res.code;
      this.partneraccount =res.account;
      this.partnerlogs = res.logs;
      this.position = res.position
    },
    async getip(){
      await fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
          this.ipaddress = ip;
      });
    },
  },
  computed:{
  },
  created(){
    this.refresh();
    this.getpartner(224);
    this.getip();
  }
}
</script>

<style lang="scss" scoped>
label {
  font-size: 20px;
  .partner-name {
    font-size: 25px !important;
    font-weight: 500 !important;
  }
}
.partner-title{
  text-align: left !important;
}
.highlight{
  background-color:#65ca65;
}
.logpopup{
    position: fixed!important;
    top: 50%!important;
    left: 50%!important;
    transform: translate(-50%,-50%)!important;

    width:98%;
    height: 98%;
    z-index: 500;
}
.main-right{
    position: fixed;
    width: 40vw;
    max-height: calc(100vh - 240px);
    overflow-y: auto;
}
</style>
