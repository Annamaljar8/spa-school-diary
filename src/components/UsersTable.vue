<template>
  <div>
    <v-btn style="margin: 1rem!important" @click="formOpen = true;" >
      Register User
    </v-btn>
    <register-form :form-open="formOpen" @changeFormOpen="changeFormOpen" ></register-form>
      <v-data-table v-if="!formOpen"
        :headers="headers"
        :items="usersResult"
        hide-default-footer
        disable-sort
        color="#a9b1bd"
      >
      <template v-slot:body="{items}">
        <tbody>
          <tr v-for="(item,index) in items" :key="index">
            <td>
              <div></div>
            </td>
            <td>
              <img  class="avatar-img" :src="item.avatar"/>
            </td>
            <td>
              <div>{{ item.id }}</div>
            </td>
            <td>
              <div>{{ item.name }}</div>
            </td>
            <td>
              <div>{{ item.active }}</div>
            </td>
            <td>
              <div @click="userProfile(item.id)">
                <svg-icon type="mdi" :path="pathGet" ></svg-icon>
              </div>
            </td>
            <td>
              <div @click="deletedUserProfile(item.id)">
                <svg-icon type="mdi" :path="pathDelete" ></svg-icon>
              </div>
            </td>
            <td>
              <div @click="reserUserPassword(item.id)">
                <svg-icon type="mdi" :path="pathReset"></svg-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <modal-window :modal-open="modalOpen" 
                  @changeModalOpen="changeModalOpen" 
                  :is-delete-user-profile="isDeleteUserProfile" 
                  @changeDeleteUserProfile="changeDeleteUserProfile"></modal-window>
    <user-profile :dialog-open="dialogOpen" 
                  @changeDialogOpen="changeDialogOpen" ></user-profile>
    <reset-password-modal-window :reset-modal-open="resetModalOpen"
                                  :password="password"
                                  @changeResetModalOpen="changeResetModalOpen"
                                  @changeResetPassword="changeResetPassword"></reset-password-modal-window>
    <div class="text-center pt-2">
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountMusicOutline } from '@mdi/js';
import { mdiDeleteOutline } from '@mdi/js';
import { mdiLockReset } from '@mdi/js';

import RegisterForm from './RegisterForm.vue';
import UserProfile from './UserProfile.vue';
import ModalWindow from './ModalWindow.vue';
import ResetPasswordModalWindow from '../_shared/ResetPasswordModalWindow.vue';

  export default {
    name: 'UsersTable',

    data: () => ({
      formOpen: false,
      dialogOpen: false,
      modalOpen: false,
      resetModalOpen: false,
      isDeleteUserProfile: false,
      currentId: 0,
      currentResetId: 0,
      password:'',
      headers: [
        {
          text: '',
          value: '',
        },
        {
          text: 'Avatar',
          value: '',
        },
        {
          text: 'User ID',
          value: '',
        },
        {
          text: 'Name',
          value: '',
        },
        {
          text: 'Status',
          value: '',
        },
        {
          text: 'Get Info',
          value: '',
        },
        {
          text: 'Delete User',
          value: '',
        },
        {
          text: 'Reset Password',
          value: '',
        }
      ],
      pathGet: mdiAccountMusicOutline,
      pathDelete: mdiDeleteOutline,
      pathReset: mdiLockReset
    }),

    components: {
      RegisterForm,
      UserProfile,
      ModalWindow,
      ResetPasswordModalWindow,
      SvgIcon
    },
    computed:{
      ...mapGetters ({
        usersResult: types.USERS_RESULT,
      }),
    },
    methods: {
      ...mapActions ({
        getUsersResult: types.GET_USERS,
        getUserProfile: types.GET_USER_PROFILE,
        deleteUserProfile: types.DELETE_USER_PROFILE,
        resetUserPassword: types.RESET_USER_PASSWORD
      }),
    
      changeFormOpen(val){
        this.formOpen = val;
      },
      changeDialogOpen(val){
        this.dialogOpen = val
      },
      changeModalOpen(val){
        this.modalOpen = val
      },
      changeResetModalOpen(val){
        this.resetModalOpen = val
      },
      changeDeleteUserProfile(val){
        this.isDeleteUserProfile = val
        if(val && this.currentId != 0){
          this.deleteUserProfile(this.currentId)
        }
      },
      changeResetPassword(password){
        let id = this.currentResetId
        this.resetUserPassword({id, password})
      },
      userProfile(id){
        this.dialogOpen = true;
        this.getUserProfile(id)
      },
      deletedUserProfile(id){
        this.currentId = id;
        this.modalOpen = true;
      },
      reserUserPassword(id){
        this.currentResetId = id;
        this.resetModalOpen = true;
      }
    },
    mounted(){
      this.getUsersResult()
    }
  }
</script>

<style>
  .user-table-form{
    display: flex;
    justify-content: center;
  }
  .avatar-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: aliceblue;
  }
</style>