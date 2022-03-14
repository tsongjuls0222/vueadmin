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
                  <span class="icon mx-2"
                    ><i class="mdi mdi-chevron-down"></i
                  ></span>
                  <span @click="refresh" class="icon mx-2"
                    ><i class="mdi mdi-refresh"></i
                  ></span>
                  <span class="icon mx-2"
                    ><i class="mdi mdi-close"></i
                  ></span>
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
                  <th>에이전트명</th>
                  <th>Member</th>
                  <th>보유금액</th>
                  <th>보유수수료</th>
                  <th>수수료율</th>
                </tr>
              </thead>
              <tbody>
                  <tr :style="{'color':(data.icd_status > 0)?'red':''}" @click="getinfo" v-for="data in datas" :id="data.key" :key="data.key" :data-set="data.ia_parent" :class="`is-clickable ${(data.key==currentid)?'highlight':''}`" > 
                    <td class="partner-title" :style="{'padding-left':`${data.depth*20}px !important`}"><span :class="`${haschildren(data.children.length)}`"></span>{{data.title}}</td>
                    <td>{{data.member}}</td>
                    <td>{{Number(data.balance).toLocaleString()}}원</td>
                    <td>{{Number(data.fee).toLocaleString()}}원</td>
                    <td>{{data.rate+'% / '+data.loosing+'%'}}</td>
                  </tr>
                </tbody>
            </table>
            <Nodata v-if="datas == ''" />
          </div>
        </div>
      </div>
    </div>
    <div class="column is-5">
      <div class="card">
        <div class="card-header">
          <div class="columns" style="width: 100%">
            <div class="column">
              <div class="is-flex is-justify-content-space-between my-3">
                <span class="ml-3">파트너 정보</span>
                <div class="is-flex is-align-items-center">
                  <button v-if="partnerinfo.ia_idx != 224" style="background-color:grey" class="button is-centered mx-2">편집</button>
                  <button v-if="partnerinfo.ia_idx != 224" class="button is-danger is-centered mx-2">삭제</button>
                  <button @click="subpartner" v-if="partnerinfo.ia_idx != 224" class="button is-info is-centered mx-2">관리</button>
                  <button @click="showlogs=true" class="button is-primary is-centered mx-2">Logs</button>
                  <button @click="setsubpartner" class="button is-success is-centered mx-2">하부생성</button>
                  <span class="icon mx-2"><i class="mdi mdi-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content">
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
                    <tr v-for="code in partnercode" :key="code.icd_idx">
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
      <LogPopup :close="close"/>
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
// import Tree from 'vuejs-tree'
export default {
  data() {
    return {
      datas:[],
      currentid:null,
      partnerinfo:[],
      partnercode:[],
      partneraccount:[],
      showlogs:false,
      ipaddress:null,
    }
  },
  components:{Nodata,LogPopup,AddAccount,AddCode,SubPartner},
  methods: {
    async refresh(){
      // const res = await API.refresh();
      // this.datas = res.data;
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
      this.$modal.show(SubPartner,{show: false},
        {
          width: "600px",
          height: "auto",
          maxHeight: 749,
        }
      );
    },
    setsubpartner(){
      this.$modal.show(SubPartner,{show: true},
        {
          width: "600px",
          height: "auto",
          maxHeight: 749,
        }
      );
    },
    haschildren(value){
      if(value > 0){
        return 'mdi mdi-chevron-down';
      }
      return 'pr-4';
    },
    getinfo(event){
      this.currentid = event.target.parentElement.id;
      this.getpartner(event.target.parentElement.id);
      
    },
    close(){
      this.showlogs = false;
    },
    async getpartner(id){
      const res = await API.getpartnerinfo(id);
      this.partnerinfo =res.agent;
      this.partnercode =res.code;
      this.partneraccount =res.account;
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
</style>
