import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import admin from './modules/admin'
import minigame from './modules/minigame'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    account,
    admin,
    minigame
  },
  plugins: [
    createPersistedState({
      paths: ['account']
    })
  ],
});

export default store