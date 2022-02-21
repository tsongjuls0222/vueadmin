const state = {
  authenticated: false,
  darkmode: false,
  mode: "light-active",
  user : {},
};
  
const mutations = {
  setAuthentication(state, status){
    state.authenticated = status;
    console.log(state.authenticated)
  },
  setUserToken(state, userinfo){
    state.user = userinfo;
  },
  setDarkMode(state, darkmode){
    state.darkmode = darkmode;
  },
  setDarkModeClass(state, mode){
    state.mode = mode;
  },
};

const getters = {
  getDarkMode: state => {
    return state.darkmode;
  },
  getDarkModeClass: state => {
    return state.mode;
  },
};

const actions = {
  setNewDarkMode({commit},payload){
    commit('setDarkMode',payload)
  },
  setNewDarkModeClass({commit},payload){
    commit('setDarkModeClass',payload)
  },
};
  
export default {
    state,
    mutations,
    actions,
    getters
}