<template>
    <div class="card">
        <div class="card-header">
            <div class="is-flex m-5" style="width:100%">
                <span>검색기간</span>
                <div class="is-flex ml-5">
                    <input class="input is-small" type="date" v-model="date">
                    <input class="input is-small" type="date" v-model="date">
                </div>
                <div class="is-flex ml-5">
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
                </div>
                <span class="mx-5" >회원ID</span>
                <div class="is-narrow"> 
                    <input class="input is-small" type="text" placeholder="회원아이디">
                </div>
                <button type="button" class="button is-info mx-3">
                    <i class="mdi mdi-account-search"></i>검색
                </button>
                <div class="tabs">
                    <button type="button" class="button sub-item mx-1" :style="[title == '프리매치' ? {'background-color':'#fe5e00'}:{'background-color':'grey'}]" >
                        <a :href="'/admin/prematch'">프리매치</a> 
                    </button>
                    <button type="button" class="button sub-item mx-1" :style="[title == '라이브' ? {'background-color':'#fe5e00'}:{'background-color':'grey'}]">
                        <a :href="'/admin/realtime'">라이브</a> 
                    </button>
                    <button type="button" class="button sub-item mx-1" :style="[title == '미니게임' ? {'background-color':'#fe5e00'}:{'background-color':'grey'}]">
                        <a :href="'/admin/minigame'">미니게임</a> 
                    </button>
                </div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                <table>
                    <thead>
                        <th>총판</th>
                        <th>코드</th>
                        <th>아이디</th>
                        <th>닉네임</th>
                        <th>이름</th>
                        <th>베팅일</th>
                        <th>배팅유형</th>
                        <th>배팅액</th>
                        <th>당첨예상금액</th>
                        <th>승/패</th>
                        <th>보유금액</th>
                        <th>보유포인트</th>
                        <th>배팅수</th>
                        <th>배당</th>
                    </thead>
                </table>
                <div class="is-flex" style="height: 500px">
                    <div class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter">
                        <span class="icon is-large">
                            <i class="mdi mdi-information-outline mdi-48px"></i>
                        </span>
                        <span class="is-size-4 is-unselectable">Sorry, no data found.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '@/api/admin.js';
export default {
    props:['title'],
    data() {
        return {
            date : new Date().toISOString().slice(0,10),
            agents:[],
            codes:[],
        }
    },
    methods: {
    async getFilters(){
        const res = await API.getSelectAgent();
        this.agents = res;
        const codes = await API.getSelectCode();
        this.codes = codes;
    }
  },
  mounted() {
  },
  created() {
      this.getFilters();
  },
}
</script>