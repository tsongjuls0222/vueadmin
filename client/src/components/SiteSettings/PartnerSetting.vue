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
                
              </tbody>
            </table>
            <div class="is-flex" style="height: 500px">
              <div
                class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-gray-lighter"
              >
                <span class="icon is-large">
                  <i class="mdi mdi-information-outline mdi-48px"></i>
                </span>
                <span class="is-size-4 is-unselectable"
                  >Sorry, no data found!</span
                >
              </div>
            </div>
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
                  <button class="button is-success is-small is-centered mx-2">
                    하부생성
                  </button>
                  <span class="icon mx-2"
                    ><i class="fa-solid fa-angle-down"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="is-flex is-flex-direction-column">
              <label><span class="partner-name">마스터</span> </label>
              <label>보유잔액 : <span>9,851원</span> </label>
              <label>보유수수료 : <span>272,878,335원</span> </label>
              <label>수수료율 : <span> 3% / 루징 : 100%</span> </label>
              <label>수익유형 : <span>수익</span> </label>
              <label>스포츠 : <span> 0%</span> </label>
              <label>라이브 : <span> 0%</span> </label>
              <label>미니게임 : <span> 0%</span> </label>
              <label>카지노 : <span> 0%</span> </label>
            </div>
            <div class="box">
              <div class="columns" style="width: 100%">
                <div class="column">
                  <div class="is-flex is-justify-content-space-between my-3">
                    <span class="ml-3"
                      >파트너 정보<br />
                      <span class="has-text-grey-light"
                        >등록되어있는 파트너계정으로 로그인이 가능합니다.</span
                      ></span
                    >
                    <div class="is-flex is-align-items-center">
                      <button
                        class="button is-success is-small is-centered mx-2"
                      >
                        계정등록
                      </button>
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
                      <th>관리</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div class="box">
              <div class="columns" style="width: 100%">
                <div class="column">
                  <div class="is-flex is-justify-content-space-between my-3">
                    <span class="ml-3"
                      >파트너 정보<br />
                      <span class="has-text-grey-light"
                        >등록되어있는 코드로 회원가입이 가능합니다.</span
                      ></span
                    >
                    <div class="is-flex is-align-items-center">
                      <button
                        class="button is-success is-small is-centered mx-2"
                      >
                        코드등록
                      </button>
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
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../api/partner';
export default {
  data() {
    return {
      datas:[],
    }
  },
  methods: {
    async refresh(){
      const res = await API.refresh();
      console.log(res);
    }
  },
  created(){
    this.refresh();
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
</style>
