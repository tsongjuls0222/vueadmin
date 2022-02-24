<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="columns" style="width: 100%">
            <div class="column">
              <div class="is-flex is-justify-content-space-between my-3">
                <span class="ml-4">쪽지목록</span>
                <span class="ml-4">></span>
              </div>
              <div class="is-flex is-justify-content-space-between">
                <div class="is-flex my-3">
                  <input class="input ml-2" style="width: 200px" type="date" />
                  <input class="input ml-2" style="width: 200px" type="date" />
                  <button class="button ml-2 is-info">검색</button>
                </div>
                <div class="buttons is-right">
                  <button class="button is-info is-normal">쪽지발송</button>
                  <button class="button is-danger is-normal">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="content"></div>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" style="width: 20px; height: 20px" />
                </th>
                <th>대상</th>
                <th>쪽지제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>확인여부</th>
                <th>관리</th>
              </tr>
            </thead>
          </table>
          <div class="is-flex" style="height: 500px">
            <div
              class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-gray-lighter"
            >
              <span class="icon is-large">
                <i class="mdi mdi-information-outline mdi-48px"></i>
              </span>
              <span class="is-size-4 is-unselectable"
                >Sorry, no data found!</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
export default {
  name: "MessageList",
  components: { Nav }
};
</script>
<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  /* color: #333; */
}
</style>
