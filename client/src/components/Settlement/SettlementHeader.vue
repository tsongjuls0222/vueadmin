<template>
  <div class="columns" style="width: 100%">
    <div class="column">
      <div class="is-flex is-justify-content-space-between my-3">
            <div class="is-flex">
                <div v-if="title == '일일정산'">
                    <div class="tabs m-3">
                        <ul class="is-flex">
                            <li class="mx-3 tab-item pb-2 is-clickable"
                            v-for="tab in tabs" :key="tab.id" :id="tab.id" @click="showSub">{{tab.value}}</li>
                        </ul>
                    </div>
                </div>
                <div v-if="title == '기간별 결산내역'">
                    <div class="is-flex m-2">
                        <div class="is-narrow mr-2 select">
                            <select name="" id="">
                                <option value="all">전체파트너</option>
                                <option v-for="agent in agents" :key="agent.ia_idx" :value="agent.ia_idx">{{agent.ia_name}}</option>
                            </select>
                        </div>
                        <div class="is-narrow mr-2 select">
                            <select name="" id="">
                                <option value="all">코드</option>
                                <option v-for="code in codes" :key="code.icd_code" :value="code.icd_code">{{code.icd_code}}</option>
                            </select>
                        </div>
                        <div class="is-narrow mr-2 select">
                            <select name="" id="">
                                <option value="all">전체회원</option>
                                <option v-for="index in 10" :key="index" :value="index">레벨 {{index}}</option>
                            </select>
                        </div>
                        <div class="is-narrow mr-2 select">
                            <select name="" id="">
                                <option value="username">아이디</option>
                                <option value="iu_nickname">닉네임</option>
                                <option value="iu_name">이름</option>
                                <option value="iu_phone">연락처</option>
                                <option value="iu_acc">계좌번호</option>
                            </select>
                        </div>
                        <div class="is-narrow mr-2 control">
                            <input class="input is-small" type="text" placeholder="검색내용">
                        </div>
                    </div>
                </div>
                <div class="ml-5 is-flex">
                    <div class="field mr-2 is-narrow">
                        <input class="input" type="date" v-model="date" placeholder="검색내용" />
                    </div>
                    <div class="field mr-2 is-narrow">
                        <input class="input" type="date" v-model="date" placeholder="검색내용" />
                    </div>
                    <div class="field mr-2 is-narrow">
                        <button type="button" class="button is-info">
                        <i class="mdi mdi-account-search"></i>검색
                        </button>
                    </div>
                </div>
            </div>
            <div  v-if="title == '일일정산'" class="buttons is-right">
                <button class="button is-info is-normal">정산완료</button>
            </div>
      </div>
      <div v-if="title == '일일정산'">
        <div class="ml-5 sub-item is-hidden">
            <PartnerSettlementAll/>
        </div>
        <div class="ml-5 sub-item is-hidden">
            <PartnerSettlementElse/>
        </div>
      </div>
      <div v-else class="ml-5">
            <MemberHistoryContent/>
      </div>
    </div>
  </div>
</template>
<script>
import API from '@/api/admin';
import PartnerSettlementAll from './PartnerSettlementAll.vue';
import PartnerSettlementElse from './PartnerSettlementElse.vue';
import MemberHistoryContent from './MemberHistoryContent.vue';
export default {
  props: ["title"],
  data() {
      return {
          date : new Date().toISOString().slice(0,10),
          tabs : [
              {
                  id: 1,
                  value:'모두'
              },
              {
                  id: 2,
                  value:'본사'
              },
              {
                  id: 3,
                  value:'부본사'
              },
              {
                  id: 4,
                  value:'총판'
              },
              {
                  id: 5,
                  value:'매장'
              },
          ],
          agents:[],
          codes:[],
      }
  },
  components:{PartnerSettlementAll,PartnerSettlementElse,MemberHistoryContent},
  methods: {
    showSub(event) {
        var tabs = event.currentTarget;
        var elements = document.getElementsByClassName("tab-item");
        var subitems = document.getElementsByClassName("sub-item");
        // console.log(subitems);
        for (var element = 0; element < elements.length; element++) {
            elements[element].classList.remove("is-active");
            if(subitems[element] != undefined){
                if (!subitems[element].matches("is-hidden")) {
                    subitems[element].classList.add("is-hidden");
                }
            }
        }
        tabs.classList.add("is-active");
        subitems[(tabs.id - 1 > 0)? 1: 0].classList.remove("is-hidden");
    },
    async getFilters(){
        const res = await API.getSelectAgent();
        this.agents = res;
        const codes = await API.getSelectCode();
        this.codes = codes;
    }
  },
  mounted() {
      var element = document.getElementById("1");
      var subitem = document.getElementsByClassName("sub-item");
      if(element != null){
        element.classList.add("is-active");
        subitem[0].classList.remove("is-hidden");
      }
  },
  created() {
      this.getFilters();
  },
};
</script>

<style lang="scss" scoped>
    .is-active {
        border-bottom: 1px solid black;
        color: blue;
    }
</style>
