import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import * as types from './types';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: [],
    languagesData: [],
    success: false
  },
  getters: {
    [types.STATUS]: (state) => state.success,
    [types.USER_DATA]: (state) => state.userData,
  },
  mutations: {
    [types.GET_USER]: (state, payload) => {
      state.userData = payload;
    },
    [types.GET_LANGUAGES]: (state, payload) => {
      state.languagesData = payload;
    },
    [types.GET_STATUS]: (state, payload) => {
      state.success = payload;
    },
  },
  actions: {
    [types.GET_USER]: async ({ commit }, payload) => {
      await axios.post('/login', {
        email: payload.email,
        password: payload.password
      })
      .then(function (response) {
        commit(types.GET_USER, response.data.data.user)
        commit(types.GET_LANGUAGES, response.data.data.languages)
        commit(types.GET_STATUS, response.data.success)
        let token = response.data.data.token;
        axios.defaults.headers.common = {
            'Accept': 'application/json',
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
        router.push('dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_USER]: async({commit}, payload) => {
      axios.post('/logout', {
      })
      .then(function (response) {
        console.log(response);
        router.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.REGISTER_USER]: async ({ commit, dispatch }, payload) => {
      await axios.post('/register', {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        c_password: payload.c_password
      })
      .then(function (response) {
        console.log(response)
        // dispatch
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  modules: {
  }
})
