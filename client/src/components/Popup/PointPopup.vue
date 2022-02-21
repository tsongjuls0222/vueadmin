<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">회원 머니 가감</p>
      <b-button
        class="close card-header-icon"
        icon-right="close"
        @click="$emit('close')"
      />
    </header>
    <div class="card-content">
      <div class="content">
        <b-field grouped>
          <b-field label="아이디">
            <b-input  disabled></b-input>
          </b-field>
          <b-field label="이름">
            <b-input  disabled></b-input>
          </b-field>
        </b-field>
        <b-field label="보유 포인트">
          <b-input
            custom-class="has-text-right"
            placeholder=""
            disabled
          ></b-input>
        </b-field>
        <b-field label="포인트 가감">
          <b-input
            custom-class="has-text-right"
            placeholder="포인트 가감"
            type="number"
          ></b-input>
        </b-field>
        <b-field label="추가설명">
          <b-input
            placeholder="내용 입력"
            class="balance-msg"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <footer class="card-footer">
      <b-button type="is-ghost" class="card-footer-item has-text-success"
        >지급</b-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  name: "PointPopup",
  data() {
    return {};
  },
  created() {

  },
};
</script>
