<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <Settings :titles="'sports'" :settings="settings" :getData="getData" :saveSettings="saveSettings" :config="config"
        v-on:settingconfigvalue="changeconfigvalue"/>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import Settings from "../components/FeesManagement/Settings.vue";
import APIFees from '../api/feemanagement';
export default {
  name: "MemInputset",
  components: { Nav, Settings },
  data() {
    return {
      num:1,
      settings:[],
      config:[],
      param:[]
    }
  },
  methods: {
    async getData(num){
      const res = await APIFees.getSettings(num);
      this.settings = res[0];
      this.settings.first_input_bonus_new  = parseInt(this.settings.first_input_bonus_new);
      this.settings.first_input_bonus_level_1  = parseInt(this.settings.first_input_bonus_level_1);
      this.settings.first_input_bonus_level_2  = parseInt(this.settings.first_input_bonus_level_2);
      this.settings.first_input_bonus_level_3  = parseInt(this.settings.first_input_bonus_level_3);
      this.settings.first_input_bonus_level_4  = parseInt(this.settings.first_input_bonus_level_4);
      this.settings.first_input_bonus_level_5  = parseInt(this.settings.first_input_bonus_level_5);
      this.settings.first_input_bonus_level_6  = parseInt(this.settings.first_input_bonus_level_6);
      this.settings.first_input_bonus_level_7  = parseInt(this.settings.first_input_bonus_level_7);
      this.settings.first_input_bonus_level_8  = parseInt(this.settings.first_input_bonus_level_8);
      this.settings.first_input_bonus_level_9  = parseInt(this.settings.first_input_bonus_level_9);
      this.settings.first_input_bonus_level_10  = parseInt(this.settings.first_input_bonus_level_10);
      this.settings.each_input_bonus_level_1  = parseInt(this.settings.each_input_bonus_level_1);
      this.settings.each_input_bonus_level_2  = parseInt(this.settings.each_input_bonus_level_2);
      this.settings.each_input_bonus_level_3  = parseInt(this.settings.each_input_bonus_level_3);
      this.settings.each_input_bonus_level_4  = parseInt(this.settings.each_input_bonus_level_4);
      this.settings.each_input_bonus_level_5  = parseInt(this.settings.each_input_bonus_level_5);
      this.settings.each_input_bonus_level_6  = parseInt(this.settings.each_input_bonus_level_6);
      this.settings.each_input_bonus_level_7  = parseInt(this.settings.each_input_bonus_level_7);
      this.settings.each_input_bonus_level_8  = parseInt(this.settings.each_input_bonus_level_8);
      this.settings.each_input_bonus_level_9  = parseInt(this.settings.each_input_bonus_level_9);
      this.settings.each_input_bonus_level_10  = parseInt(this.settings.each_input_bonus_level_10);
    },
    async getConfig(){
      const config = await APIFees.getConfig(1);
      this.config = config[0];
      // this.configvalue = this.config.icg_bonus_max;
    },
    // setConfig(param){
    //   this.configvalue = this.config[param];
    // },
    changeconfigvalue(value,param){
      this.config[param] = value;
      this.param = {
        param: param,
        value: parseInt(value),
      }
    },
    async saveSettings(){
      this.$buefy.toast.open({
        duration: 3000,
        position: "is-bottom",
        message: 'Successfully Updated',
        type: "is-success",
      });
      const res = await APIFees.setSettings(this.settings);
      const cons = await APIFees.setConfig(this.config);
      console.log(res);
      
      // this.settings = res[0];
    }
  },
  computed:{
  },
  created(){
    this.getData(this.num);
    this.getConfig();
  }
};
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgb(0, 0, 0);
  /* background-color: white; */
}
</style>
