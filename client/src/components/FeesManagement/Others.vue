<template>
  <div class="column">
    <div class="card-custom-header">
      <div class="tabs is-normal">
        <ul class="tab-item">
          <li
            :class="{'is-active': currentTab == tab.id}"
            v-for="tab in tabs"
            :key="tab.id"
            :id="tab.id"
            @click="showSub"
          >
            {{ tab.value }}
          </li>
          <!-- <li :class="tabClass1"><a>일일 최대금액</a></li>
          <li :class="tabClass2"><a>돌발 충전</a></li>
          <li :class="tabClass3"><a>롤링포인트</a></li>
          <li :class="tabClass4"><a>페이백</a></li>
          <li :class="tabClass5"><a>추천인 페이백</a></li> -->
        </ul>
      </div>
    </div>
    <div class="card-content">
      <div class="columns">
        <div v-if="currentTab == '1'" class="column subitem is-5">
          <div class="card" style="border: 1px solid rgb(231 227 227)">
            <div class="card-header">
              <div class="card-header-title">일일 최대금액</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="field mb-5">
                  <label for="">추가 환전 대기시간</label>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <span class="input-group-text is-small"
                      >직전 환전완료 시 최근 최근환전신청</span
                    >
                    <input class="input is-small" type="number" v-model="daily.withdraw_next_hour" />
                    <span class="input-group-text is-small">시간 후</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label for="">1회 최대금액</label>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <span class="input-group-text is-small">1회 최대</span>
                    <input
                      class="input is-small"
                      type="number"
                      v-model="daily.withdraw_onetime"
                    />
                    <span class="input-group-text is-small">만원 환전</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label for="">일일 최대금액</label>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <span class="input-group-text is-small">일일 최대</span>
                    <input
                      class="input is-small"
                      type="number"
                      v-model="daily.withdraw_oneday"
                    />
                    <span class="input-group-text is-small">만원 환전</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label for="">일일 최대횟수</label>
                  <div class="is-flex is-align-content-stretch mt-2">
                    <span class="input-group-text">일일 최대횟수</span>
                    <input class="input is-small" type="number" v-model="daily.withdraw_maxcnt" />
                    <span class="input-group-text">까지</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label>일일 최대횟수</label>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <div class="radio">
                      <input type="radio" v-model="daily.available_time" :checked="daily.available_time == '1'" value='1'/>
                      <span>24시간 출금신청 허용</span>
                    </div>
                  </div>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <div class="radio">
                      <input type="radio" v-model="daily.available_time" :checked="daily.available_time == '2'" value='2'/>
                      <span style="color:red">당일 23:00 ~ 00:30 은행점검 출금신청 제한</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button class="button is-info is-outlined is-centered" @click="setDaily">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="currentTab == '2'" class="column subitem is-5">
          <div class="card">
            <div class="card-header">
              <div class="tabs is-normal">
                <ul>
                  <li 
                  v-for="tab in tabs2"
                  :key="tab.id"
                  :id="tab.id"
                  :class="{isActive: tab.id === subTab}"
                  @click="showSubTab">
                  <a>{{tab.value}}</a></li>
                  <!-- <li><a>화요일</a></li>
                  <li><a>수요일</a></li>
                  <li><a>목요일</a></li>
                  <li><a>금요일</a></li>
                  <li><a>토요일</a></li>
                  <li><a>일요일</a></li> -->
                </ul>
              </div>
            </div>
            <div class="card-content">
              <div class="card">
                <div class="card-header">
                  <div class="card-header-title">돌발 충전</div>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div class="field is-multiline mb-5">
                      <div
                        class="is-flex is-flex-direction-row is-justify-content-space-between"
                      >
                        <div>
                          <label for="">켜기 / 끄기</label>
                          <b-switch v-model="switching" type="is-success"></b-switch>
                        </div>
                        <label class="input-group-text" style="width:50%; text-align:left">{{burst.sudden_bonus_date_from}} - {{burst.sudden_bonus_date_to}}</label>
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">한번만지급/무제한지급</label>
                      <div class="mt-2 control">
                        <div class="select is-small" style="width:100%">
                          <select v-model="burst.sudden_event_unlimited" class="" name="" id="" style="width:100%;">
                            <option value="0">한번만지급</option>
                            <option value="1">무제한지급</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">시간설정</label>
                      <div class="mt-2 control">
                        <input type="text" class="input is-small is-clickable" @click="showCustomTimePicker" :value="burst.sudden_bonus_date_from+'-'+burst.sudden_bonus_date_to" readonly>
                        <div v-if='show' class="custom-time is-flex is-flex-direction-column">
                          <div class="is-flex">
                            <div id="left" class="is-flex">
                              <div class="mr-2 select is-small">
                                <select v-model="lefthh" class="" name="" id="">
                                  <option v-for="(n,i) in 24" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                              <div class="mr-2 select is-small">
                                <select v-model="leftmm" class="" name="" id="">
                                  <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                              <div class="mr-2 select is-small">
                                <select v-model="leftss" class="" name="" id="">
                                  <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                            </div>
                            <div id="right" class="is-flex">
                              <div class="mr-2 select is-small">
                                <select v-model="righthh" class="" name="" id="">
                                  <option v-for="(n,i) in 24" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                              <div class="mr-2 select is-small">
                                <select v-model="rightmm" class="" name="" id="">
                                  <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                              <div class="mr-2 select is-small">
                                <select v-model="rightss" class="" name="" id="">
                                  <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="is-flex mt-2">
                            <input type="text" id="getval" class="input is-small" :value="burst.sudden_bonus_date_from+'-'+burst.sudden_bonus_date_to" readonly>
                            <button class="mx-1 is-small button" @click="show=!show">Cancel</button>
                            <button class="mx-1 is-small button is-info" @click="setCustomTimePicker">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">매일 첫 충전</label>
                      <div class="columns">
                        <div class="column">
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 1 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_1"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 2 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_2"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 3 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_3"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 4 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_4"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 5 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_5"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 6 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_6"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 7 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_7"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 8 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_8"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 9 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_9"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                          <div class="field">
                            <div
                              class="control mt-2 is-flex is-flex-direction-row"
                            >
                              <label for="" class="input-group-text"
                                >레벨 10 첫충 보너스</label
                              >
                              <input
                                class="input is-small"
                                type="number"
                                v-model="burst.first_input_bonus_level_10"
                              />
                              <label for="" class="input-group-text">%</label>
                              <label for="" class="input-group-text"
                                >자동지급</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">시간설정</label>
                      <div class="mt-2 control is-flex is-flex-direction-row">
                        <input
                          class="input is-small"
                          type="number"
                          v-model="suddenconfig"
                        />
                        <label for="" class="input-group-text">P</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card-footer"
                  style="border: 1px solid rgb(231 227 227)"
                >
                  <div class="card-footer-item is-centered">
                    <button @click="saveBurstSetting" class="button is-info is-outlined is-centered">
                      설정 저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="currentTab == '3'" class="column subitem is-5">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">롤링포인트</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="field is-multiline mb-5">
                  <div class="is-flex is-flex-direction-row">
                    <label for="">시간설정</label>
                    <b-switch v-model="switching" class="is-success"></b-switch>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">켜기 / 끄기</label>
                  <div class="mt-2 control">
                    <input type="text" class="input is-small is-clickable" @click="showCustomRollingPicker" :value="burst.time_loop" readonly>
                    <div v-if="rollingshow" class="custom-time">
                      <div id="left" class="is-flex is-flex-direction-column">
                        <div class="is-flex">
                          <div class="mr-2 select is-small">
                          <select v-model="rollingtime.hh" class="" name="" id="">
                            <option v-for="(n,i) in 24" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                          </select>
                          </div>
                          <div class="mr-2 select is-small">
                            <select v-model="rollingtime.mm" class="" name="" id="">
                              <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                            </select>
                          </div>
                          <div class="mr-2 select is-small">
                            <select v-model="rollingtime.ss" class="" name="" id="">
                              <option v-for="(n,i) in 60" :key="n" :value="(i &lt; 10)? '0'+i: i">{{(i &lt; 10)? '0'+i: i}}</option>
                            </select>
                          </div>
                        </div>
                        <div class="is-flex mt-2">
                          <input type="text" id="getval" class="input is-small" :value="burst.time_loop" readonly>
                          <button class="mx-1 is-small button" @click="rollingshow=!rollingshow">Cancel</button>
                          <button class="mx-1 is-small button is-info" @click="setCustomRollingPicker">Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">매일 첫 충전</label>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 1 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_1"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 2 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_2"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 3 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_3"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 4 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_4"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 5 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_5"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 6 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_6"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 7 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_7"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 8 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_8"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 9 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_9"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 10 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_10"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">시간설정</label>
                  <div class="mt-2 control is-flex is-flex-direction-row">
                    <input
                      class="input is-small"
                      type="number"
                      v-model="suddenconfig"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button @click="saveBurstSetting" class="button is-info is-outlined is-centered">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="currentTab == '4'" class="column subitem is-5">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">페이백</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="field is-multiline mb-5">
                  <label for="">매일 첫 충전</label>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 1 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_1"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 2 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_2"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 3 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_3"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 4 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_4"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 5 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_5"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 6 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_6"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 7 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_7"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 8 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_8"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 9 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_9"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 10 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_10"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">시간설정</label>
                  <div class="mt-2 control is-flex is-flex-direction-row">
                    <input
                      class="input is-small"
                      type="number"
                      v-model="suddenconfig"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button @click="saveBurstSetting" class="button is-info is-outlined is-centered">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="column subitem is-5">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">추천인 페이백</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="field is-multiline mb-5">
                  <label for="">매일 첫 충전</label>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 1 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_1"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 2 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_2"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 3 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_3"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 4 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_4"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 5 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_5"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 6 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_6"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 7 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_7"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 8 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_8"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 9 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_9"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                      <div class="field">
                        <div class="control mt-2 is-flex is-flex-direction-row">
                          <label for="" class="input-group-text"
                            >레벨 10 첫충 보너스</label
                          >
                          <input
                            class="input is-small"
                            type="number"
                            v-model="burst.first_input_bonus_level_10"
                          />
                          <label for="" class="input-group-text">%</label>
                          <label for="" class="input-group-text"
                            >자동지급</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">시간설정</label>
                  <div class="mt-2 control is-flex is-flex-direction-row">
                    <input
                      class="input is-small"
                      type="number"
                      v-model="suddenconfig"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button @click="saveBurstSetting" class="button is-info is-outlined is-centered">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIFees from '../../api/feemanagement';
export default {
  data() {
    return {
      tabs: [
        {
          id: "1",
          value: "일일 최대금액"
        },
        {
          id: "2",
          value: "돌발 충전"
        },
        {
          id: "3",
          value: "롤링포인트"
        },
        {
          id: "4",
          value: "페이백"
        },
        {
          id: "5",
          value: "추천인 페이백"
        }
      ],
      tabs2:[
        {
          id:'mon',
          value:'월요일',
        },
        {
          id:'tue',
          value:'화요일',
        },
        {
          id:'wed',
          value:'수요일',
        },
        {
          id:'thu',
          value:'목요일',
        },
        {
          id:'fri',
          value:'금요일',
        },
        {
          id:'sat',
          value:'토요일',
        },
        {
          id:'sun',
          value:'일요일',
        },
      ],
      show:false,
      rollingshow:false,
      switching: false,
      lefthh:0,
      leftmm:0,
      leftss:0,
      righthh:0,
      rightmm:0,
      rightss:0,
      currentTab: 1,
      subTab: 'mon',
      config:[],
      daily: [],
      burst:[],
      suddenconfig: this.checkcheck, 
      suddenkey: '',
      rollingtime:{
        hh:'',
        mm:'',
        ss:'',
      },
    };
  },
  methods: {
    showSub(event) {
      var tabs = event.currentTarget;
      this.currentTab = tabs.id;
      this.show = false;
      if(this.currentTab != '2')this.subTab = 'mon'; 
      if(this.currentTab == '1'){this.getData();}
      else if(this.currentTab == '2'){this.getBurstData(2);this.suddenkey = "icg_sudden_max_bonus";}
      else if(this.currentTab == '3'){this.getBurstData(18);this.suddenkey = "icg_casino_payback_bonus";}
      else if(this.currentTab == '4'){this.getBurstData(3);this.suddenkey = "icg_payback_max_bonus";}
      else {this.getBurstData(17);this.suddenkey = "icg_recommender_payback_bonus";}
    },
    showSubTab(event){
      var tabs = event.currentTarget;
      this.subTab = tabs.id
      this.show = false;
      if(tabs.id == 'mon'){this.getBurstData(2);this.suddenkey = "icg_sudden_max_bonus";}
      else if(tabs.id == 'tue'){this.getBurstData(19);this.suddenkey = "icg_sudden_max_bonus_tuesday";}
      else if(tabs.id == 'wed'){this.getBurstData(20);this.suddenkey = "icg_sudden_max_bonus_wednesday";}
      else if(tabs.id == 'thu'){this.getBurstData(21);this.suddenkey = "icg_sudden_max_bonus_thursday";}
      else if(tabs.id == 'fri'){this.getBurstData(22);this.suddenkey = "icg_sudden_max_bonus_friday";}
      else if(tabs.id == 'sat'){this.getBurstData(23);this.suddenkey = "icg_sudden_max_bonus_saturday";}
      else {this.getBurstData(24);this.suddenkey = "icg_sudden_max_bonus_sunday";}
      // console.log("frdgertg");
    },
    async getConfig(){
      
    },
    async getData(){
      const daily = await APIFees.getDailyMax();
      this.daily = daily[0];
    },
    async getBurstData(id){
      const temp = await APIFees.getSettings(id);
      const config = await APIFees.getBurstConfig(1);
      this.burst = temp[0];
      if(id != 18){
        this.burst.first_input_bonus_new  = parseInt(this.burst.first_input_bonus_new);
        this.burst.first_input_bonus_level_1  = parseInt(this.burst.first_input_bonus_level_1);
        this.burst.first_input_bonus_level_2  = parseInt(this.burst.first_input_bonus_level_2);
        this.burst.first_input_bonus_level_3  = parseInt(this.burst.first_input_bonus_level_3);
        this.burst.first_input_bonus_level_4  = parseInt(this.burst.first_input_bonus_level_4);
        this.burst.first_input_bonus_level_5  = parseInt(this.burst.first_input_bonus_level_5);
        this.burst.first_input_bonus_level_6  = parseInt(this.burst.first_input_bonus_level_6);
        this.burst.first_input_bonus_level_7  = parseInt(this.burst.first_input_bonus_level_7);
        this.burst.first_input_bonus_level_8  = parseInt(this.burst.first_input_bonus_level_8);
        this.burst.first_input_bonus_level_9  = parseInt(this.burst.first_input_bonus_level_9);
        this.burst.first_input_bonus_level_10  = parseInt(this.burst.first_input_bonus_level_10);
        this.burst.each_input_bonus_level_1  = parseInt(this.burst.each_input_bonus_level_1);
        this.burst.each_input_bonus_level_2  = parseInt(this.burst.each_input_bonus_level_2);
        this.burst.each_input_bonus_level_3  = parseInt(this.burst.each_input_bonus_level_3);
        this.burst.each_input_bonus_level_4  = parseInt(this.burst.each_input_bonus_level_4);
        this.burst.each_input_bonus_level_5  = parseInt(this.burst.each_input_bonus_level_5);
        this.burst.each_input_bonus_level_6  = parseInt(this.burst.each_input_bonus_level_6);
        this.burst.each_input_bonus_level_7  = parseInt(this.burst.each_input_bonus_level_7);
        this.burst.each_input_bonus_level_8  = parseInt(this.burst.each_input_bonus_level_8);
        this.burst.each_input_bonus_level_9  = parseInt(this.burst.each_input_bonus_level_9);
        this.burst.each_input_bonus_level_10  = parseInt(this.burst.each_input_bonus_level_10);
      }
      
      
      this.config = config[0];
      this.switching = this.checkswitch;
      this.suddenconfig = this.checksudden;
    },
    // async setBurstData(){
    //   const temp = await APIFees.setBurstSettings(this.burst);
    // },
    async setBurstConfig(sendData){
      
      const temp = await APIFees.setBurstConfig(sendData);
      // console.log(this.config);
      console.log(temp);
    },
    async setDailyMax(data){
      const daily = await APIFees.setDailyMax(data);
    },
    setDaily(){
      if(this.currentTab == '1'){this.setDailyMax(this.daily);}
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
    showCustomTimePicker(){
      this.show = true;
      let from = this.burst.sudden_bonus_date_from;
      let to = this.burst.sudden_bonus_date_to;
      from = from.split(":");
      to = to.split(":");
      
      this.lefthh = from[0];
      this.leftmm = from[1];
      this.leftss = from[2];
      this.righthh = to[0];
      this.rightmm = to[1];
      this.rightss = to[2];
    },
    setCustomTimePicker(){
      this.show = !this.show;
      this.burst.sudden_bonus_date_from = this.lefthh+':'+this.leftmm+':'+this.leftss;
      this.burst.sudden_bonus_date_to = this.righthh+':'+this.rightmm+':'+this.rightss;
      // console.log(this.lefthh+':'+this.leftmm+':'+this.leftss);
    },
    showCustomRollingPicker(){
      this.rollingshow = true;
      let time = this.burst.time_loop;
      time = time.split(":");
      this.rollingtime.hh = time[0];
      this.rollingtime.mm = time[1];
      this.rollingtime.ss = time[2];
    },
    setCustomRollingPicker(){
      this.rollingshow = false;
      this.burst.time_loop = this.rollingtime.hh+':'+this.rollingtime.mm+':'+this.rollingtime.ss;
    },
    saveBurstSetting(){
      // this.setBurstData();
      this.burst.sudden_event = (this.switching)? 1: 0;
      this.rollingshow = false;
      this.show = false;
      const sendData = {
        config: {
          param:this.suddenkey,
          value:this.suddenconfig,
          id: this.config.icg_idx
        },
        burst: this.burst
      }
      this.setBurstConfig(sendData);
      this.$buefy.toast.open({
        duration: 3000,
        position: "is-bottom",
        message: 'Successfully Updated',
        type: "is-success",
      });
    },
  },
  created() {
    this.getData();
  },
  computed:{
    checkswitch(){
      let val = true;
      if(this.burst.sudden_event == 0){
        val = false;
      }
      return val;
    },
    checksudden(){
      return this.config[this.suddenkey];
    },
    checkcheck(){
      this.config[this.suddenkey] = parseInt(this.suddenconfig);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-time{
  width: 58%;
  border: 1px solid #e7e3e3;
  padding: 5px;
  margin-top: 10px;
  position: absolute;
  font-size: 15px;
  border-radius: 4px;
  z-index: 5;
  background-color: white;
      // font-family: arial;
}

.tab-item li{
  margin: 1px 15px;
  cursor: pointer;
}

.is-active{
  border-bottom: 1px solid black;
}
.isActive a{
  border-bottom-color: #7957d5;
  color: #7957d5
}
.input-group-text {
  align-items: center;
  padding: 0.4375rem 0.875rem;
  margin-bottom: 0;
  font-size: 0.7125rem;
  font-weight: 400;
  line-height: 1.5385;
  color: #333;
  text-align: center;
  white-space: nowrap;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 0.1875rem;
  height: 30px;
}
.card {
  border: 1px solid rgb(231 227 227);
}
</style>
