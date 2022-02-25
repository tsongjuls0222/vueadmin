<template>
  <div class="card">
    <div class="card-header">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="card-title p-5">수수료 적립내역</div>
          <div class="field is-horizontal">
            <div class="field-body pl-5 pr-4 pb-4">
              <div class="field is-narrow control">
                <div class="select">
                  <select name="" id="">
                    <option value="0">default</option>
                    <option v-for="agent in agents" :key="agent.ia_idx" :value="agent.ia_idx">{{agent.name}}</option>
                  </select>
                </div>
              </div>
              <div class="field is-narrow">
                <input class="input" type="text" />
              </div>
              <div class="field is-narrow">
                <input class="input" type="date" placeholder="검색내용" />
              </div>
              <div class="field is-narrow">
                <input class="input" type="date" placeholder="검색내용" />
              </div>
              <div class="field is-narrow">
                <button type="button" class="button is-info">
                  <i class="mdi mdi-account-search"></i>검색
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="columns is-fullwidth">
        <div class="column is-12">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>회원아이디</th>
                <th>회원닉네임</th>
                <th>적립파트너</th>
                <th>배팅금액</th>
                <th>적립수수료</th>
                <th>적립일시</th>
                <th>적립전</th>
                <th>적립후</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <div class="is-flex" style="height: 500px">
            <div
              class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
            >
              <span class="icon is-large"
                ><i class="mdi mdi-information-outline mdi-48px"></i></span
              ><span class="is-size-4 is-unselectable"
                >Sorry, no data found.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>
<script>
export default {
  props:['agents']
};
</script>

<style lang="scss" scoped></style>
