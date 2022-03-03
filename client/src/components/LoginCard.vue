<template>
  <div class="login-card">
    <div class="login-box">
      <div class="level">
        <div class="column login-logo">
          <LogoTilt />
          <img class="logo5" src="../assets/img/logo5.png" alt="IMG" />
        </div>
        <div class="column">
          <h3 class="title has-text-white has-text-centered">로그인</h3>
          <form @submit.prevent="onSubmit()" novalidate>
                <b-field>
                    <b-input
                    ref="username"
                    placeholder="아이디"
                    icon="account"
                    icon-clickable
                    v-model="form.username"
                    required
                    >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input
                    ref="password"
                    placeholder="비밀번호"
                    type="password"
                    icon="lock"
                    v-model="form.password"
                    required
                    >
                    </b-input>
                </b-field>
                <b-button native-type="submit" type="is-success" class="login-btn" expanded>로그인</b-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LogoTilt from "./LogoTilt.vue";
import API from "../api/login";
import { sha256 } from 'js-sha256';
export default {
  name: "LoginCard",
  components: { LogoTilt },
  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
    async onSubmit() {
        if(this.form.username == ""){
            this.$refs.username.focus();
        }
        else{
            if(this.form.password == ""){
                this.$refs.password.focus();
            }
            else{
                var hexval = sha256.hex(this.form.password);
                var sendData = {
                    "username" : this.form.username,
                    "password" : hexval
                };
                
                const res = await API.getLoginWithToken(sendData);
                console.log(res.account)
                if(res.message == "OK"){
                    this.$store.commit("setAuthentication", true);
                    this.$store.commit("setUserToken", res.userinfo);
                    this.$router.replace({ name: "Admin" })
                }
                else{
                  this.$buefy.toast.open({
                    position: "is-top-right",
                    message: res.message,
                    type: "is-danger",
                  });
                }
            }
        }
    }  
  },
  mounted() {
    
  },
  beforeCreate() {},
};
</script>
<style lang="scss" scoped>
#username {
  height: 3em !important;
  &:focus {
    color: #57b846 !important;
  }
}
button {
  background-color: #5d853c;
  border: #5d853c;
}
button:hover {
  background-color: #82c54a;
  border: #82c54a;
}
button:active {
  background-color: #82c54a;
  border: #82c54a;
}
button:focus {
  background-color: #82c54a;
  border: #82c54a;
}
.form-control:focus {
  box-shadow: none !important;
}
.form-control {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  width: 85%;
  border: none;
}
.login-top {
  margin-bottom: 30px;
}
.logo5 {
  display: none;
  width: 100%;
}
.login-card {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}
.login-box {
  width: 960px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 135px 120px 120px 85px;
  border: 5px solid rgba(255, 255, 255, 0.05);
}
.login-field {
  margin-bottom: 10px;
  padding: 0px 20px;
}
.login-field-bottom {
  margin-top: 20px;
  padding: 0px 20px;
}
@media only screen and (max-width: 990px) {
  .login-box {
    width: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .login-field,
  .login-field-bottom {
    padding: 0;
  }
  .logo5 {
    display: block;
  }
  .box, h3 {
    display: none;
  }
  .login-top {
    display: none;
  }
  .login-box {
    padding: 50px 20px;
  }
  .login-logo {
    padding: 20px 60px;
  }
}
</style>