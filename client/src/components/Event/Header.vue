<template>
  <div class="columns" style="width: 100%">
    <div class="column">
      <div class="is-flex is-justify-content-space-between my-3">
        <span class="ml-4">{{ title }}</span>
        <div class="buttons is-right">
          <button
            class="button is-success is-normal mr-3"
            v-if="title == '이벤트 등록' || title == '공지 목록'"
          >
            편집
          </button>
          <button class="button is-info is-normal">이벤트 등록</button>
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
