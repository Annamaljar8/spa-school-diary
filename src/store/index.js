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
    success: false,
    usersResult: [],
    userProfile: [],
    calendarEvents: [],
    calendarEvent: null,
  },
  getters: {
    [types.STATUS]: (state) => state.success,
    [types.USER_DATA]: (state) => state.userData,
    [types.USER_TYPE]: (state) => state.userData.type,
    [types.USERS_RESULT]: (state) => state.usersResult, 
    [types.USER_PROFILE]: (state) => state.userProfile, 
    [types.CALENDAR_EVENTS]: (state) => state.calendarEvents, 
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
    [types.GET_USERS]: (state, payload) => {
      state.usersResult = payload;
    },
    [types.GET_USER_PROFILE]: (state, payload) => {
      state.userProfile = payload;
    },
    [types.SET_CALENDAR_EVENTS]: (state, payload) => {
      state.calendarEvents =  payload;
    },
    [types.SET_UPDATE_CALENDAR_EVENT]: (state, payload) => {
      state.calendarEvent =  payload;
    },
  },
  actions: {
    [types.GET_USER]: async ({ dispatch, commit }, payload) => {
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
        if((response.data.success == true) && ((response.data.data.user.type === 'teacher') || (response.data.data.user.type  === 'pupil'))) {
          router.push('dashboard')
          dispatch(types.GET_CALENDAR_EVENTS)
        } else if ((response.data.success == true) && (response.data.data.user.type  === 'admin')){
          router.push('users')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_USER]: async({commit}, payload) => {
      axios.post('/logout', {
      })
      .then(function (response) {
        router.push('/')
      })
      .catch(function (error) {
        console.log(error);
        router.push('/')
      });
    },
    [types.GET_USERS]: async ({ commit }, payload) => {
      await axios.get('/users')
      .then(function (response) {
        commit(types.GET_USERS, response.data.data.users)
        console.log(response.data.data.users)
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
        dispatch(types.GET_USERS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.CREATE_AND_UPDATE_USER_PROFILE]: async ({ commit, dispatch }, payload) => {
      await axios.put(`user/${payload.id}`, {
        name: payload.name || '',
        motherName: payload.motherName || '',
        fatherName: payload.fatherName || '',
        motherPhone: payload.motherPhone || '',
        fatherPhone: payload.fatherPhone || '',
        motherEmail: payload.motherEmail || '',
        fatherEmail: payload.fatherEmail || '',
        address: payload.address || '',
        description: payload.description || '',
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.GET_USER_PROFILE]: async ({ commit }, payload) => {
      await axios.get(`user/${payload}`)
      .then(function (response) {
        commit(types.GET_USER_PROFILE, response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_USER_PROFILE]: async ({ dispatch }, payload) => {
      await axios.delete(`user/${payload}`)
      .then(function (response) {
        console.log(response)
        dispatch(types.GET_USERS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.POST_CALENDAR_EVENT]: async ({ commit, dispatch }, payload) => {
      await axios.post('/calendarEvent', {
        name: payload.name || '',
        color: payload.color || '',
        start: payload.start || '',
        end: payload.end || '',
        details: payload.details || '',
        timed: payload.timed || '',
        dialog: payload.dialog || '',
      })
      .then(function (response) {
        dispatch(types.GET_CALENDAR_EVENTS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.GET_CALENDAR_EVENTS]: async ({ commit }, payload) => {
      await axios.get('/calendarEvents')
      .then(function (response) {
        commit(types.SET_CALENDAR_EVENTS, response.data.data.calendarEvents) 
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.UPDATE_CALENDAR_EVENT]: async ({ commit, dispatch }, payload) => {
      await axios.put(`/calendarEvent/${payload.id}`, {
        name: payload.name || '',
        color: payload.color || '',
        start: payload.start || '',
        end: payload.end || '',
        details: payload.details || '',
        timed: payload.timed || '',
        dialog: payload.dialog,
      })
      .then(function (response) {
        console.log('UPDATE_CALENDAR_EVENT', response)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_CALENDAR_EVENT]: async ({ dispatch }, payload) => {
      await axios.delete(`/calendarEvent/${payload}`)
      .then(function (response) {
        console.log(response)
        dispatch(types.GET_CALENDAR_EVENTS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.POST_HOMEWORK]: async ({ commit, dispatch }, payload) => {
      await axios.post(`/homework/create/${payload.id}`, {
        deadline: payload.deadline,
        description: payload.description
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  modules: {
  }
})
