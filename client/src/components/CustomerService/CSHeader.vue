<template>
  <div class="columns" style="width: 100%">
    <div class="column">
      <div class="card-header-title">
        <span class="ml-4">{{ title }}</span>
      </div>
      <div
        v-if="title == '일반답변양식'"
        class="is-flex is-flex-direction-row-reverse my-3"
      >
        <div class="buttons is-right">
          <button class="button is-success is-normal">편집</button>
          <button class="button is-info is-normal">답변양식 작성</button>
          <button class="button is-info is-normal">Macro Group</button>
        </div>
      </div>
      <div
        v-if="title == '계좌답변양식' || title == '계좌답변양식'"
        class="is-flex is-flex-direction-row-reverse my-3"
      >
        <div class="buttons is-right">
          <button class="button is-info is-normal">답변양식 작성</button>
        </div>
      </div>
      <div v-else class="is-flex is-justify-content-space-between">
        <div class="is-flex my-3">
          <input class="input is-small ml-2" style="width: 200px" type="date" />
          <input class="input is-small ml-2" style="width: 200px" type="date" />
          <button class="button is-small ml-2 is-info">검색</button>
        </div>
        <div class="buttons is-right">
          <button
            v-if="title == '계좌문의'"
            class="button is-success is-normal"
          >
            계좌전송
          </button>
          <button class="button is-danger is-normal">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
