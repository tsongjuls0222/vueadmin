
const state = {
    userlist: [],
    prematchlist: [],
    livelist: [],
    minigamelist: [],
    casinolist: [],
    inquirylist: [],
    noticelist: [],
    eventlist: [],
    onlineadminlist: [],
};

const mutations = {
    setData(state, data) {
        state.userlist = data.users;
        state.prematchlist = data.prematch;
        state.livelist = data.live;
        state.minigamelist = data.minigame;
        state.casinolist = data.casino;
        state.inquirylist = data.inquiry;
        state.noticelist = data.notice;
        state.eventlist = data.board;
    },
    setAdminList(state, data) {
        state.onlineadminlist = data;
    },
};

const getters = {
    getstate: state => {
        return state;
    },
    getUserList: state => {
        return state.userlist;
    },
    geAdminList: state => {
        return state.onlineadminlist;
    },
};

const actions = {
    setNewUserCount({ commit, state }, payload) {
        state.userlistcount = [];
        commit('setCodes', payload)
    },
    setNewAdminList({ commit, state }, payload) {
        state.onlineadminlist = [];
        commit('setAdminList', payload)
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}