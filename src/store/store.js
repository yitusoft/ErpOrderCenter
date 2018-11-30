import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allowBack: false,
    currentUser: null
  },
  mutations: {
    setAllowBack(state, obj) {
      state.allowBack = obj.allowBack;
    },
    setCurrentUser(state, obj) { 
      state.currentUser = obj;
    }
  },
  actions: {
    setAllowBack({ commit }, obj) {
      commit('setAllowBack', obj);
    },
    setCurrentUser({ commit }, obj) {
      commit('setCurrentUser', obj);
    }
  }
})
