<template>
  <div class="info-table-wrapper d-flex">
    <div class="info-table-content">
      <div class="info-box-wrapper">
        <div class="info-box-content" onclick="golinkpage(1)">
          <div class="info-title-wrapper">
            <span class="info-title">충전신청</span>
          </div>
          <div class="info-values" id="topinfobox_1">
            <p>NEW: </p>
            <span class="infovalsin">{{ charge_in }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(2)">
          <div class="info-title-wrapper">
            <span class="info-title">충전대기</span>
          </div>
          <div class="info-values" id="topinfobox_2">
            <p>대기: </p>
            <span class="infovalsin" id="infvalin2">{{ charge_hold }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(3)">
          <div class="info-title-wrapper">
            <span class="info-title">충전완료</span>
          </div>
          <div class="info-values" id="topinfobox_3">
            <p>완료: </p>
            <span class="infovalsin" id="infvalin3">{{ charge_done }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(4)">
          <div class="info-title-wrapper">
            <span class="info-title">환전신청</span>
          </div>
          <div class="info-values" id="topinfobox_4">
            <p>NEW: </p>
            <span class="infovalsin" id="infvalin4">{{ withdraw_in }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(5)">
          <div class="info-title-wrapper">
            <span class="info-title">환전대기</span>
          </div>
          <div class="info-values" id="topinfobox_5">
            <p>대기: </p>
            <span class="infovalsin" id="infvalin5">{{ withdraw_hold }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(6)">
          <div class="info-title-wrapper">
            <span class="info-title">환전완료</span>
          </div>
          <div class="info-values" id="topinfobox_6">
            <p>완료: </p>
            <span class="infovalsin" id="infvalin6">{{ withdraw_done }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(7)">
          <div class="info-title-wrapper">
            <span class="info-title">일반문의</span>
          </div>
          <div class="info-values" id="topinfobox_7">
            <p>NEW: </p>
            <span class="infovalsin" id="infvalin7">{{ withdraw_in }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(11)">
          <div class="info-title-wrapper">
            <span class="info-title">계좌문의</span>
          </div>
          <div class="info-values" id="topinfobox_11">
            <span class="infovalsin" id="infvalin11">{{ ask1_1 }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(8)">
          <div class="info-title-wrapper">
            <span class="info-title">가입신청</span>
          </div>
          <div class="info-values" id="topinfobox_8">
            <p>NEW: </p>
            <span class="infovalsin" id="infvalin8">{{ newmember }}</span>
          </div>
        </div>
        <div class="info-box-content d-none" onclick="golinkpage(12)">
          <div class="info-title-wrapper">
            <span class="info-title">승인완료</span>
          </div>
          <div class="info-values" id="topinfobox_9">
            <text>승인:</text
            ><span class="infovalsin" id="infvalin9">{{ memberok }}</span>
          </div>
        </div>
        <div class="info-box-content" onclick="golinkpage(10)">
          <div class="info-title-wrapper">
            <span class="info-title">동접자</span>
          </div>
          <div class="info-values" id="topinfobox_10">
            <p>NOW: </p>
            <span class="infovalsin" id="infvalin10">{{ online_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyCount",
  data() {
    return {
      charge_in: 0,
      charge_hold: 0,
      charge_done: 0,
      withdraw_in: 0,
      withdraw_hold: 0,
      withdraw_done: 0,
      ask1_1: 0,
      newmember: 0,
      memberok: 0,
      online_count: 0,
    };
  },
  created() {
  },
};
</script>
