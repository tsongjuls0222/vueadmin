<template>
  <div>
     
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">출석 이벤트</div>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="column is-7">
              <div class="card">
                <div class="card-header">
                  <div class="card-header-title is-centered">설정</div>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div class="columns">
                      <div class="column">
                        <div class="is-flex control mb-5">
                          <input class="input" type="number" v-model="datas.lvl1_thirty" />
                          <span class="input-group-text">일 지급 포인트</span>
                          <input class="input" type="number" v-model="datas.lvl1_seven" />
                        </div>
                        <div class="is-flex control mb-5">
                          <span class="input-group-text">최소 입금액</span>
                          <input class="input" type="number" v-model="datas.lvl1_fifteen" />
                        </div>
                        <div class="is-flex control">
                          <span class="input-group-text">View</span>
                          <input class="input" type="text" :value="currentDate" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="card-footer-item is-centered">
                      <button class="button is-success" @click="saveData" >수정</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  
import API from "../api/event";
export default {
  name: "Attendance",
  data() {
    return {
      datas:[],
      currentDate: new Date().toISOString().slice(0,10),
    }
  },
  methods: {
    async getData(){
      const res = await API.getrewards();
      this.datas = res[0];
    },
    async saveData(){
      var checker = false;
      if(confirm("Do you really want to save?")){
        checker = true;
      }
      if(!checker){
        return;
      }
      var sendData = {
        lvl1_seven: this.datas.lvl1_seven,
        lvl1_fifteen: this.datas.lvl1_fifteen,
        lvl1_thirty: this.datas.lvl1_thirty,
      };
      const res = await API.saverewards(sendData);
      console.log(res);
    }
  },
  created(){
    this.getData();
  },
};
</script>
<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  color: #333;
}

.custom {
  width: 60% !important;
}
</style>
