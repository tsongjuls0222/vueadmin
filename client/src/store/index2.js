import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store2 = new Vuex.Store({
    state: {
        authenticated: false,
        user : {},
    },
    mutations: {
        setAuthentication(state, status){
            state.authenticated = status;
        },
        setUserToken(state, userinfo){
            state.user = userinfo;
        }
    },
    plugins: [createPersistedState()]
});

export default store2
