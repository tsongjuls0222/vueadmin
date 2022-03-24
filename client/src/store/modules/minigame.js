const state = {
    mingigameData: []
};

const mutations = {
    setMinigame(state, mingigameData) {
        state.mingigameData = mingigameData;
        console.log(state.mingigameData)
    }
};

const getters = {
    getMinigame: state => {
        return state.mingigameData;
    }
};

const actions = {
    setNewMinigame({ commit, state }, payload) {
        state.mingigameData = [];
        commit('setCodes', payload)
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}