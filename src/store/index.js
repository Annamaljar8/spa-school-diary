import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import * as types from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
    [types.GET_USER]: async ({ commit, state }, payload) => {
      // let self = this;
      console.log(payload)
      axios.post('/login', {
        email: payload.email,
        password: payload.password
      })
      .then(function (response) {
        console.log(response);
      let token = response.data.data.token;
      axios.defaults.headers.common = {
          'Accept': 'application/json',
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
      }
        //self.$router.push('about')
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
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
