<template>
  <div>
    <div class="columns is-fullwidth">
      <div class="column is-12">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>신청일시</th>
              <th>총판</th>
              <th>코드</th>
              <th>레벨</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이름</th>
              <th>구분</th>
              <th>금액</th>
              <th>보유금</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.it_idx">
              <td>{{row.it_idx}}</td>
              <td>{{row.it_update_datetime}}</td>
              <td>{{row.ia_name}}</td>
              <td>{{row.real_code}}</td>
              <td>{{row.iu_level}}</td>
              <td>{{row.username}}</td>
              <td>{{row.iu_nickname}}</td>
              <td>{{row.iu_name}}</td>
              <td>{{row.casino_name}}</td>
              <td>{{row.it_amount}}</td>
              <td>{{row.it_after_balance}}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="data.length >= 1" class="pagination">
          <a class="pagination-previous" @click="getData(1)">Start</a>
          <ul class="pagination-list is-justify-content-end">
            <li v-for="(c) in count" :key="c">
              <a :class="`pagination-link ${isHiding(c)} ${isClass(c)}`" @click="getData(c)">{{c}}</a>
            </li>
          </ul>
          <a class="pagination-next" @click="getData(count)">End</a>
        </div>
        <div v-if="data.length < 1" class="is-flex" style="height: 500px">
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
</template>

<script>
export default {
   props:['data','currentButton','getData','isHiding','isClass','count'],
}
</script>
