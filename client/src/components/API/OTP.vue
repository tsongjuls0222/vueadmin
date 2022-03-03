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
          <tbody>
            <tr v-for="row in otp" :key="row.otpid">
              <td>{{row.otpid}}</td>
              <td>{{row.mobile_number}}</td>
              <td>{{row.OTP}}</td>
              <td :class="setcolor">{{setstatus(row.iu_status)}}</td>
              <td>{{row.datetime}}</td>
              <td>{{row.datetime_check}}</td>
              <td>{{row.ia_name}}</td>
              <td>{{row.real_code}}</td>
              <td>{{row.iu_level}}</td>
              <td>{{row.username}}</td>
              <td>{{row.iu_nickname}}</td>
              <td>{{row.iu_name}}</td>
              <td>{{row.iu_recommend}}</td>
              <td>{{row.iu_reg_ip}}</td>
              <td>{{row.iu_memtype}}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="otp.length < 1" class="is-flex" style="height: 500px">
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
  props:['otp'],
  methods: {
    setstatus(status){
      let val = ''
      if(status == '1'){
        val="가입완료";
      }else if(status == '3'){
        val="가입거부";
      }else{
        val="발송중";
      }
      return val;
    },
    setcolor(){
      let val = ''
      if(otp.iu_status == '1'){
        val="pepe-blue";
      }else if(otp.iu_status == '3'){
        val="pepe-red";
      }else{
        val="pepe-green";
      }
      console.log(val);
      return val;
    }
  },
}
</script>
<style lang="scss" scoped>
.pepe-blue{
  color: blue;
}
.pepe-red{
  color: red;
}
.pepe-green{
  color: green;
}
</style>
