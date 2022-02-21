import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authenticated: false,
        user : {},
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
        tableCounter2 : -1
    },
    mutations: {
        setAuthentication(state, status){
            state.authenticated = status;
        },
        setUserToken(state, userinfo){
            state.user = userinfo;

            // console.log(state.user)
        },
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
        }
    },
    getters: {
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
        }
    },
    actions : {
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
        }
    }
});

export default store
