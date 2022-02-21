const state = {
    macro : [],
    macrocontent : {},
    macrogroup: [],
    agents: [],
    codes: [],
    newData: [],
    radioData : {
        bankgwaltotal: 0,
        totalbank: 0,
        totalgwallet: 0,
        totalshop: 0,
        totalnew: 0,
        totalwait: 0,
        totalcompleted: 0,
        totalcancelled: 0,
    },
    tableCounter2 : -1,
    badgeCount : 0,
    notoriusData: [],
    userBalance : 0
};

const mutations = {
    setMacroSelection(state, selection){
        state.macro = selection;
        // console.log(state.macro);
    },
    setMacroGroup(state, macrogroup){
        state.macrogroup = macrogroup;
        // console.log(state.macrogroup);
    },
    setAgents(state, agents){
        state.agents = agents;
        // console.log(state.agents);
    },
    setCodes(state, codes){
        state.codes = codes;
        // console.log(state.codes);
    },
    setTableData(state, data){
        state.newData = data;
        // console.log(state.newData);
    },
    setRadioData(state, data){
        state.radioData = {
            bankgwaltotal: data[0].bankgwaltotal,
            totalbank: data[0].totalbank,
            totalgwallet: data[0].totalgwallet,
            totalshop: data[0].totalshop,
            totalnew: data[0].totalnew,
            totalwait: data[0].totalwait,
            totalcompleted: data[0].totalcompleted,
            totalcancelled: data[0].totalcancelled
        }
        console.log(state.radioData);
    },
    setTableCounter(state, counter){
        state.tableCounter2 = counter;
        console.log(state.tableCounter2)
    },
    setBadgeCount(state, badgeCount){
        state.badgeCount = badgeCount;
    },
    setNotoriousData(state, notoriusData){
        state.notoriusData = notoriusData;
    },
    setUserBalance(state, userBalance){
        state.userBalance = userBalance;
    }
};

const getters = {
    getMacroSelection: state => {
        return state.macro;
    },
    getMacroGroup: state => {
        return state.macrogroup;
    },
    getAgents: state => {
        return state.agents;
    },
    getCodes: state => {
        return state.codes;
    },
    getData: state => {
        return state.newData;
    },
    getRadioData: state => {
        return state.radioData;
    },
    getTableCounter: state => {
        return state.tableCounter2;
    },
    getBadgeCount: state => {
        return state.badgeCount;
    },
    getNotoriousData: state => {
        return state.notoriusData;
    },
    getUserBalance: state => {
        return state.userBalance;
    }
};

const actions = {
    setNewCodes({commit,state},payload){
        state.codes = [];
        commit('setCodes',payload)
    },
    setNewAgents({commit,state},payload){
        state.agents = [];
        commit('setAgents',payload)
    },
    setNewData({commit,state},payload){
        state.newData = [];
        commit('setTableData',payload)
    },
    setNewRadioData({commit,state},payload){
        commit('setRadioData',payload)
    },
    setNewTableCounter({commit,state},payload){
        commit('setTableCounter',payload)
    },
    setNewBadgeCount({commit,state},payload){
        commit('setBadgeCount',payload)
    },
    setNewNotoriousData({commit,state},payload){
        state.notoriusData = [];
        commit('setNotoriousData',payload)
    },
    setNewUserBalance({commit,state},payload){
        commit('setUserBalance',payload)
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}