<template>
  <div class="column">
    <div class="card-custom-header">
      <div class="tabs is-normal">
        <ul>
          <li
            class="mx-3 tab-item pb-2 is-clickable"
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
        <div class="column subitem is-5">
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
        <div class="column subitem is-5 is-hidden">
          <div class="card">
            <div class="card-header">
              <div class="tabs is-normal">
                <ul>
                  <li 
                  class="subtab-item"
                  v-for="tab in tabs2"
                  :key="tab.id"
                  :id="tab.id"
                  @click="showSubTab"><a>{{tab.value}}</a></li>
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
                          v-model="config.icg_sudden_max_bonus"
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
                    <button class="button is-info is-outlined is-centered">
                      설정 저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column subitem is-5 is-hidden">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">롤링포인트</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="field is-multiline mb-5">
                  <div class="is-flex is-flex-direction-row">
                    <label for="">시간설정</label>
                    <b-switch class="is-success"></b-switch>
                  </div>
                </div>
                <div class="field is-multiline mb-5">
                  <label for="">켜기 / 끄기</label>
                  <div class="mt-2 control">
                    <input class="input is-small" type="time" />
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                      value="200000"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button class="button is-info is-outlined is-centered">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="column subitem is-5 is-hidden">
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                      value="10000000"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
              <div class="card-footer-item is-centered">
                <button class="button is-info is-outlined is-centered">
                  설정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="column subitem is-5 is-hidden">
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                            value="0"
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
                      value="10000000"
                    />
                    <label for="" class="input-group-text">P</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="border: 1px solid rgb(231 227 227)">
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
          class:'is-active'
        },
        {
          id:'tue',
          value:'화요일',
          class:''
        },
        {
          id:'wed',
          value:'수요일',
          class:''
        },
        {
          id:'thu',
          value:'목요일',
          class:''
        },
        {
          id:'fri',
          value:'금요일',
          class:''
        },
        {
          id:'sat',
          value:'토요일',
          class:''
        },
        {
          id:'sun',
          value:'일요일',
          class:''
        },
      ],
      show:false,
      switching: false,
      lefthh:0,
      leftmm:0,
      leftss:0,
      righthh:0,
      rightmm:0,
      rightss:0,
      currentTab: 1,
      subTab: 1,
      config:[],
      daily: [],
      burst:[],
    };
  },
  methods: {
    showSub(event) {
      var tabs = event.currentTarget;
      this.currentTab = tabs.id;
      var elements = document.getElementsByClassName("tab-item");
      var subitems = document.getElementsByClassName("subitem");
      for (var element = 0; element < elements.length; element++) {
        elements[element].classList.remove("is-active");
        if (!subitems[element].matches("is-hidden")) {
          subitems[element].classList.add("is-hidden");
        }
      }
      tabs.classList.add("is-active");
      subitems[tabs.id - 1].classList.remove("is-hidden");
      // console.log(this.currentTab);
      if(this.currentTab == '1'){this.getData();}
      else if(this.currentTab == '2'){this.getBurstData(2); document.getElementById("mon").classList.add('is-active')}
    },
    showSubTab(event){
      var tabs = event.currentTarget;
      this.subTab = tabs.id;
      var elements = document.getElementsByClassName("subtab-item");
      for(var element=0; element < elements.length; element++){
        elements[element].classList.remove("is-active");
      }
      console.log(tabs.id);
      if(tabs.id == 'mon'){this.getBurstData(2); document.getElementById("mon").classList.add('is-active')}
      else if(tabs.id == 'tue'){this.getBurstData(19); document.getElementById("tue").classList.add('is-active')}
      else if(tabs.id == 'wed'){this.getBurstData(20); document.getElementById("wed").classList.add('is-active')}
      else if(tabs.id == 'thu'){this.getBurstData(21); document.getElementById("thu").classList.add('is-active')}
      else if(tabs.id == 'fri'){this.getBurstData(22); document.getElementById("fri").classList.add('is-active')}
      else if(tabs.id == 'sat'){this.getBurstData(23); document.getElementById("sat").classList.add('is-active')}
      else {this.getBurstData(24); document.getElementById("sun").classList.add('is-active')}

      // this.switching = this.checkswitch; 
    },
    async getConfig(){
      const config = await APIFees.getConfig(1);
      this.config = config[0];
    },
    async getData(){
      const daily = await APIFees.getDailyMax();
      this.daily = daily[0];
    },
    async getBurstData(id){
      const temp = await APIFees.getSettings(id);
      this.switching = await this.checkswitch;
      this.burst = temp[0];
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
    
  },
  mounted() {
    var element = document.getElementById("1");
    element.classList.add("is-active");
  },
  created() {
    this.getData();
    this.getConfig();
  },
  computed:{
    checkswitch(){
      // console.log(this.burst.sudden_event);
      if(this.burst.sudden_event == 0){
        // console.log(this.burst.sudden_event);
        return false;
      }
        // console.log(this.burst.sudden_event);
      return true;
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

.is-active {
  border-bottom: 1px solid black;
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
