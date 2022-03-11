<template>
  <div class="column is-7">
    <div class="card">
      <div class="custom-card-header">
        <div class="tabs is-normal">
          <ul>
            <li :class="tabClass1" @click="tabChange((titles == 'sports')?1:10, '월요일')">
              <a>월요일</a>
            </li>
            <li :class="tabClass2" @click="tabChange((titles == 'sports')?4:11, '화요일')">
              <a>화요일</a>
            </li>
            <li :class="tabClass3" @click="tabChange((titles == 'sports')?5:12, '수요일')">
              <a>수요일</a>
            </li>
            <li :class="tabClass4" @click="tabChange((titles == 'sports')?6:13, '목요일')">
              <a>목요일</a>
            </li>
            <li :class="tabClass5" @click="tabChange((titles == 'sports')?7:14, '금요일')">
              <a>금요일</a>
            </li>
            <li :class="tabClass6" @click="tabChange((titles == 'sports')?8:15, '토요일')">
              <a>토요일</a>
            </li>
            <li :class="tabClass7" @click="tabChange((titles == 'sports')?9:16, '일요일')">
              <a>일요일</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-content">
        <div class="card">
          <div class="card-header">
            <span class="card-header-title">{{ this.title }}</span>
          </div>
          <div class="card-content">
            <div class="content">
              <div class="field is-multiline mb-3">
                <label for="">첫충 지급 조건</label>
                <div class="field control is-flex mt-2 ml-5">
                  <input type="radio" :checked="settings.eday_input_bonus_cond == '1'" v-model="settings.eday_input_bonus_cond" value="1" name="radio1" id="" />
                  <label for="radio1">항상 첫충 자동지급</label>
                </div>
                <div class="field control is-flex mt-2 ml-5">
                  <input type="radio" :checked="settings.eday_input_bonus_cond == '2'" v-model="settings.eday_input_bonus_cond" value="2" name="radio2" id="" />
                  <label for="radio2"
                    >당일 환전이 없을시에만 자동지급
                    <br />
                    <span class="pepe-blue"
                      >당일 환전이 있는경우 수동 지급모드로 변경</span
                    >
                  </label>
                </div>
              </div>
              <div class="field is-multiline">
                <div class="columns">
                  <div class="column">
                    <label for="">신규 첫충 보너스</label>
                    <div class="field is-multiline is-flex">
                      <span class="input-group-text">신규 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model.number="settings.first_input_bonus_new" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <label for="">매일 첫 충전</label>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 1 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model.number="settings.first_input_bonus_level_1" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 2 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model.number="settings.first_input_bonus_level_2" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 3 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model.number="settings.first_input_bonus_level_3" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 4 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_4" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 5 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_5" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 6 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_6" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 7 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_7" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 8 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_8" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 9 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_9" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 10 첫충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.first_input_bonus_level_10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                  </div>
                  <div class="column">
                    <label for="">최대 보너스 지급금액</label>
                    <div class="field is-multiline is-flex">
                      <input
                        class="input is-small"
                        type="number"
                        v-model="configval"
                      />
                      <span class="input-group-text">P</span>
                    </div>
                    <label for="">매일 첫 충전</label>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 1 매충 보너스</span>
                      <input class="input is-small" type="number" v-model.number="settings.each_input_bonus_level_1" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 2 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_2" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 3 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_3" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 4 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_4" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 5 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_5" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 6 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_6" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 7 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_7" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 8 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_8" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 9 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_9" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 10 매충 보너스</span>
                      <input class="input is-small" type="number" v-model="settings.each_input_bonus_level_10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="card-footer-item is-centered">
              <button @click="saveSettings" class="button is-info is-outlined is-centered">
                <span class="icon">
                  <i class="icon-paperplane ml-2"></i>
                </span>
                설정 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['titles','settings','getData','saveSettings','config'],
  data() {
    return {
      tabClass1: "is-active",
      tabClass2: "",
      tabClass3: "",
      tabClass4: "",
      tabClass5: "",
      tabClass6: "",
      tabClass7: "",
      title: "월요일",
      currentTab:1,
      param: 'icg_bonus_max',
      configval: '',
    };
  },
  methods: {
    parsing(value){
      return parseInt(value);
    },
    tabChange(param, param2) {
      this.tabClass1 = "";
      this.tabClass2 = "";
      this.tabClass3 = "";
      this.tabClass4 = "";
      this.tabClass5 = "";
      this.tabClass6 = "";
      this.tabClass7 = "";
      if (param == "1" || param == "10") {this.tabClass1 = "is-active";  this.param = (param == '1')?'icg_bonus_max': 'icg_casino_monday_max_bonus';}
      if (param == "4" || param == "11") {this.tabClass2 = "is-active";  this.param = (param == '4')?'icg_tuesday_max_bonus': 'icg_casino_tuesday_max_bonus';}
      if (param == "5" || param == "12") {this.tabClass3 = "is-active";  this.param = (param == '5')?'icg_wednesday_max_bonus': 'icg_casino_wednesday_max_bonus';}
      if (param == "6" || param == "13") {this.tabClass4 = "is-active";  this.param = (param == '6')?'icg_thursday_max_bonus': 'icg_casino_thursday_max_bonus';}
      if (param == "7" || param == "14") {this.tabClass5 = "is-active";  this.param = (param == '7')?'icg_friday_max_bonus': 'icg_casino_friday_max_bonus';}
      if (param == "8" || param == "15") {this.tabClass6 = "is-active";  this.param = (param == '8')?'icg_saturday_max_bonus': 'icg_casino_saturday_max_bonus';}
      if (param == "9" || param == "16") {this.tabClass7 = "is-active";  this.param = (param == '9')?'icg_sunday_max_bonus': 'icg_casino_sunday_max_bonus';}

      this.title = param2;
      this.getData(param);
      this.currentTab = param;
      this.configval = this.configs;
    },
  },
  computed:{
    configs:{
      get:function(){
        return this.config[this.param];
      }
    }
  },
  created(){
    // console.log(this.configs);
    setTimeout(() => {
      this.param = (this.titles == 'sports')?'icg_bonus_max':'icg_casino_monday_max_bonus',
      this.configval = this.config[this.param]
    }, 200)
  },
  mounted(){
    // this.configval = this.config[this.param];
    // console.log(this.configs);
  },
  watch:{
    configval: function(newValue,oldValue){
      this.$emit('settingconfigvalue',newValue,this.param);
    },
    // configvalue: function(){
    //   this.configval = this.config[this.param];
    // }
  }
};
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid rgb(231 227 227);
  label {
    font-size: 0.7125rem;
  }
}
.pepe-blue {
  color: blue;
  margin-left: 12px;
}

.card-content {
  padding: 1.25rem;
  //   width: 100%;
  .columns {
    margin-top: 20px;
  }
  .form-row {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

    .row {
      margin-left: 20px;
    }
    .input-group {
      display: flex;
      //   flex-wrap: wrap;
      margin-bottom: 10px;
      input {
        width: 100%;
      }
    }
  }
}
</style>
