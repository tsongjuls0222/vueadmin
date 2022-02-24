<template>
  <div class="columns" style="width: 100%">
    <div class="column">
      <div class="card-header-title">
        <span class="ml-4">{{ title }}</span>
      </div>
      <div
        v-if="title == '은행목록'"
        class="is-flex is-flex-direction-row-reverse my-3"
      >
        <div class="buttons is-right">
          <button class="button is-info is-normal">Upload Bank</button>
        </div>
      </div>
      <div v-else class="is-flex is-justify-content-space-between">
        <div class="is-flex my-3">
          <input
            class="input is-small ml-5"
            type="text"
            placeholder="차단된 아이피주소검색 : 예) 192.168"
            style="width: 300px"
          />
          <input class="input is-small ml-2" style="width: 200px" type="date" />
          <input class="input is-small ml-2" style="width: 200px" type="date" />
          <button class="button is-small ml-2 is-info">검색</button>
        </div>
        <div class="buttons is-right">
          <button class="button is-info is-normal">신규 차단등록</button>
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
