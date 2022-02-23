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
                    <input class="input is-small" type="number" value="0" />
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
                      value="1000000000"
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
                      value="1000000000"
                    />
                    <span class="input-group-text is-small">만원 환전</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label for="">일일 최대횟수</label>
                  <div class="is-flex is-align-content-stretch mt-2">
                    <span class="input-group-text">일일 최대횟수</span>
                    <input class="input is-small" type="number" value="999" />
                    <span class="input-group-text">까지</span>
                  </div>
                </div>
                <div class="field mb-5">
                  <label>일일 최대횟수</label>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <div class="radio">
                      <input type="radio" />
                      <span>24시간 출금신청 허용</span>
                    </div>
                  </div>
                  <div class="is-flex is-flex-direction-row mt-2">
                    <div class="radio">
                      <input type="radio" />
                      <span>당일 23:00 ~ 00:30 은행점검 출금신청 제한</span>
                    </div>
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
              <div class="tabs is-normal">
                <ul>
                  <li><a>월요일</a></li>
                  <li><a>화요일</a></li>
                  <li><a>수요일</a></li>
                  <li><a>목요일</a></li>
                  <li><a>금요일</a></li>
                  <li><a>토요일</a></li>
                  <li><a>일요일</a></li>
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
                          <b-switch type="is-success"></b-switch>
                        </div>
                        <label class="input-group-text"
                          >11:59:00 - 23:59:00</label
                        >
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">한번만지급/무제한지급</label>
                      <div class="mt-2 control">
                        <div class="select is-small">
                          <select class="" name="" id="">
                            <option value="">adw</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field is-multiline mb-5">
                      <label for="">시간설정</label>
                      <div class="mt-2 control">
                        <input class="input is-small" type="time" />
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                                value="0"
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
                    <b-switch type="is-success"></b-switch>
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
      ]
    };
  },
  methods: {
    showSub(event) {
      var tabs = event.currentTarget;
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
    }
  },
  mounted() {
    var element = document.getElementById("1");
    element.classList.add("is-active");
  }
};
</script>

<style lang="scss" scoped>
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
