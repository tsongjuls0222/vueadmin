<template>
  <div class="card">
    <div class="card-header">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="card-title p-5">수수료 적립내역</div>
          <div class="field is-horizontal">
            <div class="field-body pl-5 pr-4 pb-4">
              <div class="field is-narrow control">
                <div class="select">
                  <select v-model="agent" name="" id="">
                    <option value="-1" >전체파트너</option>
                    <option v-for="agent in agents" :key="agent.ia_idx" :value="agent.ia_idx">{{agent.ia_name}}</option>
                  </select>
                </div>
              </div>
              <div class="field is-narrow">
                <input class="input" type="text" v-model="keyword" placeholder="이름, 닉네임, 아이디로 검색"/>
              </div>
              <div class="field is-narrow">
                <input class="input" type="date" v-model="fromdate" placeholder="검색내용" />
              </div>
              <div class="field is-narrow">
                <input class="input" type="date" v-model="todate" placeholder="검색내용" />
              </div>
              <div class="field is-narrow">
                <button type="button" @click="sendData(1)" class="button is-info">
                  <i class="mdi mdi-account-search"></i>검색
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="columns is-fullwidth">
        <div class="column is-12">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>회원아이디</th>
                <th>회원닉네임</th>
                <th>적립파트너</th>
                <th>배팅금액</th>
                <th>적립수수료</th>
                <th>적립일시</th>
                <th>적립전</th>
                <th>적립후</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="log in feelogs" :key="log.if_idx">
                  <td>{{log.if_idx}}</td>
                  <td>{{log.username}}</td>
                  <td>{{log.iu_nickname}}</td>
                  <td>{{log.ia_name}}</td>
                  <td>{{log.if_amount}}원</td>
                  <td>{{log.if_fee}}원</td>
                  <td>{{formatDate(log.if_datetime)}}</td>
                  <td>{{log.if_before}}원</td>
                  <td>{{log.if_after}}원</td>
                </tr>
            </tbody>
          </table>
          <div v-if="feelogs.length >= 1" class="pagination">
            <a class="pagination-previous" @click="sendData(1)">Start</a>
            <ul class="pagination-list is-justify-content-end">
              <li v-for="(c) in count" :key="c">
                <a :class="`pagination-link ${isHiding(c)} ${isClass(c)}`" @click="sendData(c)">{{c}}</a>
              </li>
            </ul>
            <a class="pagination-next" @click="sendData(count)">End</a>
          </div>
          <div class="is-flex" v-if="feelogs.length <= 0" style="height: 500px">
            <div
              class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
            >
              <span class="icon is-large"
                ><i class="mdi mdi-information-outline mdi-48px"></i></span
              ><span class="is-size-4 is-unselectable"
                >Sorry, no data found.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>  
    <div class="card-footer"></div>
  </div>
</template>
<script>
export default {
  props:['agents','feelogs','filterFunction','count','currentButton','startButton','endButton'],
  data() {
    return {
      fromdate: "2021-11-11",
      todate : new Date().toISOString().slice(0,10),
      agent : '-1',
      keyword : '',
    }
  },
  methods: {
    sendData(param){
      var start = 0;
      if(param > 1){
        start = (param - 1) * 50;
      }
      
      var data = {
        start: start,
        agent :this.agent,
        keyword : this.keyword,
        fromdate : this.fromdate,
        todate : this.todate
      }
      this.filterFunction(data,param);
    },
    isClass(param){
      var isclass ='';
      if(param == this.currentButton){
        isclass = 'is-current';
      }
      return isclass;
    },
    isHiding(param){
      var isclass = '';
      if(this.startButton == 0 && this.endButton == 0){
        if(param > 5){
          isclass = 'is-hidden';
        }
      }else{
        if(param < this.startButton){
          isclass = 'is-hidden';
        }
        if(param > this.endButton){
          isclass = 'is-hidden';
        }
      }
      return isclass;
    },
    formatDate(param){
        if(param == null){
            return " ";
        }
        else{
            let str = param;
            let newstr = str.split(".")[0];
            let d = newstr.split("T")[0];
            let t = newstr.split("T")[1];
            
            newstr = d+" "+t;
            return newstr;
        }
    },
  },
  computed:{
    // setcurrentbutton(){
    //   return t
    // }
  }
};
</script>

<style lang="scss" scoped></style>
