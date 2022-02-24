<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">출석 이벤트</div>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="column is-7">
              <div class="card">
                <div class="card-header">
                  <div class="card-header-title is-centered">설정</div>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div class="columns">
                      <div class="column">
                        <div class="is-flex control mb-5">
                          <input class="input" type="number" value="7" /><span
                            class="input-group-text"
                            >일 지급 포인트</span
                          >
                          <input class="input" type="number" value="50000" />
                        </div>
                        <div class="is-flex control">
                          <span class="input-group-text">최소 입금액</span>
                          <input class="input" type="number" value="50000" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="card-footer-item is-centered">
                      <button class="button is-success">수정</button>
                    </div>
                  </div>
                </div>
              </div>
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
  name: "Attendance",
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
  color: #333;
}

.custom {
  width: 60% !important;
}
</style>
