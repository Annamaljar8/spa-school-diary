<template>
  <div>
    <v-btn style="margin: 1rem!important" @click="formOpen = true" >
      Register Pupil
    </v-btn>
    <register-form :form-open="formOpen" @changeFormOpen="changeFormOpen"></register-form>
      <v-data-table
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
            <!-- <td>
              <div class="icons-color">
                <v-icon v-if="item.gender === 'Female'"> {{ mdiGenderFemale }}</v-icon>
                <v-icon v-if="item.gender === 'Male'">{{ mdiGenderMale }}</v-icon>
                <v-icon v-if="item.gender === 'Genderless'">{{ mdiClose }}</v-icon>
                <v-icon v-if="item.gender === 'unknown'">{{ mdiMinus }}</v-icon>
                {{ item.gender }}
              </div>
            </td> -->
            <td>
              <div>{{ item.active }}</div>
            </td>
            <td>
              <div @click="dialogOpen = true">
                <svg-icon type="mdi" :path="path"  ></svg-icon>
              </div>
            </td>
            <!-- <td>
              <v-btn v-if="!checkItem(item)" @click="addToFavorite(item)" class="btn-click" height=43 min-width=43><v-icon color="#11B0C8">{{ mdiStar }}</v-icon></v-btn>
              <v-btn v-if="checkItem(item)" @click="deleteFromFavorite(item)" class="btn-unclick" height=43 min-width=43><v-icon color="white">{{ mdiStar }}</v-icon></v-btn>
            </td> -->
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <user-profile :dialog-open="dialogOpen" @changeDialogOpen="changeDialogOpen"></user-profile>
    <div class="text-center pt-2">
      <!-- <v-pagination 
        color="#11B0C8"
        v-model="currentPage"
        :length="pagesLength"
        :total-visible="7"
      ></v-pagination> -->
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapMutations, mapGetters } from 'vuex';

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountMusicOutline } from '@mdi/js';

import RegisterForm from './RegisterForm.vue';
import UserProfile from './UserProfile.vue';

  export default {
    name: 'UsersTable',

    data: () => ({
      formOpen: false,
      dialogOpen: false,
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
        }
      ],
      path: mdiAccountMusicOutline,
      // usersResult: {
      //   avatar: '',
      //   idd: '',
      //   name: '',
      //   active: null,
      // },
    }),

    components: {
      RegisterForm,
      UserProfile,
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
      }),
    
      changeFormOpen(val){
        this.formOpen = val
      },
      changeDialogOpen(val){
        this.dialogOpen = val
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