<template>
  <div>
    <div class="columns is-fullwidth">
      <div class="column is-12">
        <table>
          <thead>
            <tr>
              <th>IDX</th>
              <th>연락처</th>
              <th>OTP</th>
              <th>상태</th>
              <th>발송중</th>
              <th>인증완료</th>
              <th>총판</th>
              <th>코드</th>
              <th>레벨</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이름</th>
              <th>추천인</th>
              <th>IP</th>
              <th>상태</th>
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
</template>
