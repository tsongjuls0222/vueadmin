<template>
  <div class="column is-6">
    <div class="card">
      <div class="card-header">
        <div class="columns" style="width: 100%">
          <div class="column">
            <div class="is-flex is-justify-content-space-between my-3">
              <span class="ml-4">스포츠 기본설정</span>
              <span class="is-clickable mdi mdi-chevron-down"></span>
            </div>
            <div class="is-flex is-justify-content-space-between mt-5 mb-2">
              <div class="ml-4">
                <span class="is-clickable mdi mdi-plus-circle"> </span><span>스페셜 설정</span>
              </div>
              <span class="is-clickable mdi mdi-arrow-down-drop-circle-outline"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">유저페이지에서 경기 시작 몇분전에 리스트에서 사라지는가?</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_timer" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅가능 배당제한:</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_max_odds"/>
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">최대 배팅가능 폴더:</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_max_folder"/>
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅 후 몇분전까지 취소 가능한가?</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_cancel_timer"/>
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅 후 경기시작 몇분전까지 취소 가능한가?</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_cancel_timer_2"/>
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">일일 배팅 취소 가능 횟수</label>
            <div class="sixty">
              <input class="input" type="number" v-model="datas.isc_special_cancel_limit"/>
            </div>
          </div>
          <div class="columns ">
            <div class="column is-one-third">
              <span>4폴더 보너스 배당:</span>
              <input class="input" type="text" v-model="datas.isc_special_bonus_min"/>
            </div>
            <div class="column is-one-third">
              <span>5폴더 보너스 배당</span>
              <input class="input" type="text" v-model="datas.isc_special_bonus_3"/>
            </div>
            <div class="column is-one-third">
              <span>6폴더 보너스 배당:</span>
              <input class="input" type="text" v-model="datas.isc_special_bonus_5"/>
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-third ">
              <span>최소배당:</span>
              <input class="input" type="text" v-model="datas['4_folder_minimum']"/>
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <span>보너스 수령 시 단폴더 배당제한:</span>
              <input class="input" type="text" v-model="datas.playing_type_odds"/>
            </div>
            <div class="column is-one-third">
              <span>보너스 수령 시 폴더 수 제한:</span>
              <input class="input" type="text" v-model="datas.playing_type_min_folder"/>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer is-flex-direction-row-reverse">
        <div class="m-5">
          <button @click="updateData" class="button is-info is-outlined is-pulled-right">
            스포츠 기본설정 수정
          </button>
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
    async getData(){
      const res = await API.getinfosportsconfig();
      this.datas = res[0];
    },
    async updateData(){
      if(confirm("Do you want to save this current settings?")){
        const res  = await API.updateinfosportsconfig(this.datas);

        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status < 1)?"is-danger":"is-success",
        });
        if(res.status > 0){
            this.getData();
        }
      }
    }
  },
  created() {
    this.getData();
  },
}
</script>
<style lang="scss" scoped>
.sixty {
  width: 60%;
}
.input{
  font-size:0.8125rem !important;
}
</style>
