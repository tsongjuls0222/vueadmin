import "./assets/css/main.scss"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import CKEditor from 'ckeditor4-vue';
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)
Vue.use(Buefy);
Vue.use(CKEditor);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
