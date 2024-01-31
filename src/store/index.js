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
    token: null,
    success: false,
    usersResult: [],
    userProfile: [],
    calendarEvents: [],
    calendarEvent: null,
    userHomeworkList: [],
    homeworkFiles: [],
    homeworkFilesLinks: [],
    infoMessage: '',
    infoPopupOpen: false,
    typeOfInfoMessage: '', // success, info, warning, error
    isMustChangePassword: 0
  },
  getters: {
    [types.STATUS]: (state) => state.success,
    [types.USER_DATA]: (state) => state.userData,
    [types.USER_TYPE]: (state) => state.userData.type,
    [types.USERS_RESULT]: (state) => state.usersResult, 
    [types.USER_PROFILE]: (state) => state.userProfile, 
    [types.CALENDAR_EVENTS]: (state) => state.calendarEvents, 
    [types.USER_HOMEWORK_LIST]: (state) => state.userHomeworkList, 
    [types.USER_HOMEWORK_FILES_LINKS]: (state) => state.homeworkFilesLinks, 
    [types.GET_INFO_MESSAGE]: (state) => state.infoMessage, 
    [types.GET_INFO_POPUP_OPEN]: (state) => state.infoPopupOpen, 
    [types.GET_TYPE_OF_INFO_MESSAGE]: (state) => state.typeOfInfoMessage, 
    [types.GET_IS_MUST_CHANGE_PASSWORD]: (state) => state.isMustChangePassword, 
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
    [types.SET_TOKEN]: (state, payload) => {
      state.token =  payload;
    },
    [types.SET_IS_MUST_CHANGE_PASSWORD]: (state, payload) => {
      state.isMustChangePassword =  payload;
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
    [types.GET_USER_HOMEWORK_LIST]: (state, payload) => {
      state.userHomeworkList =  payload;
    },
    [types.SET_HOMEWORK_FILES]: (state, payload) => {
      state.homeworkFiles =  payload;
    },
    [types.GET_HOMEWORK_FILES_LINKS]: (state, payload) => {
      state.homeworkFilesLinks =  payload;
    },
    [types.SET_INFO_MESSAGE]: (state, payload) => {
      state.infoMessage =  payload;
    },
    [types.SET_INFO_POPUP_OPEN]: (state, payload) => {
      state.infoPopupOpen =  payload;
    },
    [types.SET_TYPE_OF_INFO_MESSAGE]: (state, payload) => {
      state.typeOfInfoMessage =  payload;
    },
  },
  actions: {
    [types.GET_USER]: async ({ dispatch, commit }, payload) => {
      const isRefreshed = localStorage.getItem('refreshed');

      if (isRefreshed) {
        localStorage.removeItem('refreshed')
        if (router.currentRoute.path !== '/') {
          router.push('/');
        } else {
          await axios.post('/login', {
            email: payload.email,
            password: payload.password
          })
          .then(function (response) {
            commit(types.GET_USER, response.data.data.user)
            commit(types.GET_LANGUAGES, response.data.data.languages)
            commit(types.GET_STATUS, response.data.success)

            let token = response.data.data.token;
            commit(types.SET_TOKEN, token)
            axios.defaults.headers.common = {
                'Accept': 'application/json',
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
            if((response.data.success == true) && ((response.data.data.user.type === 'teacher') || (response.data.data.user.type  === 'pupil'))) {
              router.push('dashboard')
              dispatch(types.SET_IS_MUST_CHANGE_PASSWORD)
              dispatch(types.GET_CALENDAR_EVENTS)
            } else if ((response.data.success == true) && (response.data.data.user.type  === 'admin')){
              router.push('users')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        return;
      }
    },
    [types.SET_IS_MUST_CHANGE_PASSWORD]: async ({ commit }, payload) => {
      await axios.get('/user/ismustchangepassword')
      .then(function (response) {
        console.log(response)
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
        console.log("response", response)
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
        dispatch(types.GET_USERS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.RESET_USER_PASSWORD]: async ({ commit, dispatch }, payload) => {
      await axios.post(`/user/password/${payload.id}`, {
        password: payload.password
      })
      .then(function (response) {
        commit(types.SET_INFO_MESSAGE, response.data.message)
        commit(types.SET_INFO_POPUP_OPEN, true)
        commit(types.SET_TYPE_OF_INFO_MESSAGE, 'success')
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.SET_NEW_USER_PASSWORD]: async ({commit}, payload) => {
      await axios.post('/user/password', {
        password: payload.newPassword,
        oldPassword: payload.oldPassword
      })
      .then(function (response) {
        commit(types.SET_INFO_MESSAGE, response.data.message)
        commit(types.SET_INFO_POPUP_OPEN, true)
        commit(types.SET_TYPE_OF_INFO_MESSAGE, 'success')
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.POST_CALENDAR_EVENT]: async ({ commit, dispatch }, payload) => {
      await axios.post('/calendarEvent', {
        pupil_id: payload.pupil_id || '',
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
    [types.GET_CALENDAR_EVENTS]: async ({ commit, dispatch }, payload) => {
      await axios.get('/calendarEvents')
      .then(function (response) {
        commit(types.SET_CALENDAR_EVENTS, response.data.data.calendarEvents)
        dispatch(types.GET_USER_HOMEWORK_LIST, response.data.data.calendarEvents[0].pupil_id) 
        dispatch(types.GET_USER_PROFILE, response.data.data.calendarEvents[0].pupil_id)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.UPDATE_CALENDAR_EVENT]: async ({ commit, dispatch }, payload) => {
      await axios.put(`/calendarEvent/${payload.id}`, {
        pupil_id: payload.pupil_id || '',
        name: payload.name || '',
        color: payload.color || '',
        start: payload.start || '',
        end: payload.end || '',
        details: payload.details || '',
        timed: payload.timed || '',
        dialog: payload.dialog,
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_CALENDAR_EVENT]: async ({ dispatch }, payload) => {
      await axios.delete(`/calendarEvent/${payload}`)
      .then(function (response) {
        dispatch(types.GET_CALENDAR_EVENTS)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.POST_HOMEWORK]: async ({ commit, dispatch }, payload) => {
      commit(types.SET_HOMEWORK_FILES, payload.files)
      await axios.post(`/homework/create/${payload.id}`, 
      {
        deadline: payload.deadline,
        description: payload.description,
      })
      .then(function (response) {
        dispatch(types.GET_USER_HOMEWORK_LIST, payload.id)        
        dispatch(types.POST_HOMEWORK_FILES, response.data.data.id)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.POST_HOMEWORK_FILES]: async ({ state }, payload) => {
      const formData = new FormData();
      const homeworkFiles = state.homeworkFiles
      // Append each file to the FormData
      for (const file of homeworkFiles) {
        formData.append('files[]', file);
      }
      // Store the original axios.defaults.headers.common
      const originalHeaders = { ...axios.defaults.headers.common };
    
      let token = state.token
      // Overwrite axios.defaults.headers.common with your custom headers for this request
      axios.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(`homework/files/${payload}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type specifically for this request
        },
      })
      .then(function (response) {
        // Restore the original axios.defaults.headers.common
        axios.defaults.headers.common = { ...originalHeaders };
        commit(types.GET_HOMEWORK_FILES_LINKS, response.data.data.links)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.GET_USER_HOMEWORK_LIST]: async ({ commit }, payload) => {
      await axios.get(`/homework/list/${payload}`)
      .then(function (response) {
        commit(types.GET_USER_HOMEWORK_LIST, response.data.data.homework)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.ARCHIVE_HOMEWORK]: async ({ commit, dispatch }, payload) => {
      await axios.put(`/homework/${payload.id}`)
      .then(function (response) {
        dispatch(types.GET_USER_HOMEWORK_LIST, payload.userId)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    [types.DELETE_HOMEWORK]: async ({ commit, dispatch }, payload) => {
      await axios.delete(`/homework/${payload.id}`)
      .then(function (response) {
        dispatch(types.GET_USER_HOMEWORK_LIST, payload.userId)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  modules: {
  }
})
