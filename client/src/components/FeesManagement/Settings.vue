<template>
  <div class="column is-7">
    <div class="card">
      <div class="custom-card-header">
        <div class="tabs is-normal">
          <ul>
            <li :class="tabClass1" @click="tabChange(1, '월요일')">
              <a>월요일</a>
            </li>
            <li :class="tabClass2" @click="tabChange(2, '화요일')">
              <a>화요일</a>
            </li>
            <li :class="tabClass3" @click="tabChange(3, '수요일')">
              <a>수요일</a>
            </li>
            <li :class="tabClass4" @click="tabChange(4, '목요일')">
              <a>목요일</a>
            </li>
            <li :class="tabClass5" @click="tabChange(5, '금요일')">
              <a>금요일</a>
            </li>
            <li :class="tabClass6" @click="tabChange(6, '토요일')">
              <a>토요일</a>
            </li>
            <li :class="tabClass7" @click="tabChange(7, '일요일')">
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
                  <input type="radio" name="radio1" id="" />
                  <label for="radio1">항상 첫충 자동지급</label>
                </div>
                <div class="field control is-flex mt-2 ml-5">
                  <input type="radio" name="radio2" id="" />
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
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <label for="">매일 첫 충전</label>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 1 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 2 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 3 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 4 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 5 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 6 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 7 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 8 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 9 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 10 첫충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
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
                        value="200000"
                      />
                      <span class="input-group-text">P</span>
                    </div>
                    <label for="">매일 첫 충전</label>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 1 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 2 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 3 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 4 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 5 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 6 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 7 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 8 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 9 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
                      <span class="input-group-text">%</span>
                      <span class="input-group-text">자동지급</span>
                    </div>
                    <div class="control mt-2 is-flex">
                      <span class="input-group-text">레벨 10 매충 보너스</span>
                      <input class="input is-small" type="number" value="10" />
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
              <button class="button is-info is-outlined is-centered">
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
  data() {
    return {
      tabClass1: "is-active",
      tabClass2: "",
      tabClass3: "",
      tabClass4: "",
      tabClass5: "",
      tabClass6: "",
      tabClass7: "",
      title: "월요일"
    };
  },
  methods: {
    tabChange(param, param2) {
      this.tabClass1 = "";
      this.tabClass2 = "";
      this.tabClass3 = "";
      this.tabClass4 = "";
      this.tabClass5 = "";
      this.tabClass6 = "";
      this.tabClass7 = "";
      if (param == "1") this.tabClass1 = "is-active";
      if (param == "2") this.tabClass2 = "is-active";
      if (param == "3") this.tabClass3 = "is-active";
      if (param == "4") this.tabClass4 = "is-active";
      if (param == "5") this.tabClass5 = "is-active";
      if (param == "6") this.tabClass6 = "is-active";
      if (param == "7") this.tabClass7 = "is-active";
      this.title = param2;
    }
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
