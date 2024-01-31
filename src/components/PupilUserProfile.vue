<template>
  <div>
    <user-profile :dialog-open="dialogOpen" @changeDialogOpen="changeDialogOpen"></user-profile>
    <div class="user-container d-flex justify-end">
      <v-col cols="9"
              md="5">
        <div class="d-flex mb-8 justify-space-around">
          <v-col cols="5"
                  md="3">
            <h2 > {{ profileTitle }}</h2>
          </v-col>
          <v-col cols="6"
                  md="5">
            <v-btn @click="dialogOpen = true;" >
              Correct Profile
            </v-btn>
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ pupilName }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.name || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ fatherName }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.fatherName || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ motherName }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.motherName || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ fatherPhone }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.fatherPhone || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ motherPhone }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.motherPhone || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ fatherEmail }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.fatherEmail || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ motherEmail }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.motherEmail || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ address }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.address || '-' }}
          </v-col>
        </div>
        <div class="d-flex justify-space-around">
          <v-col cols="5"
                  md="3">
              {{ description }}
          </v-col>
          <v-col cols="6"
                  md="5">
              {{ userProfile.description || '-' }}
          </v-col>
        </div>
      </v-col>
      <v-col cols="3">
        <v-col>
          <v-btn  @click="reserUserProfilePassword()">
            Reset Password
          </v-btn>
        </v-col>
      </v-col>
    </div>
    <reset-user-password-modal-window :reset-user-modal-open="resetUserModalOpen"
                                  @changeResetUserModalOpen="changeResetUserModalOpen"></reset-user-password-modal-window>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapGetters } from 'vuex';

import UserProfile from './UserProfile.vue';
import ResetUserPasswordModalWindow from '../_shared/ResetUserPasswordModalWindow.vue';

export default {
    data: () => ({
      dialogOpen: false,
      profileTitle: 'Profile',
      pupilName: "Pupil's Name",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      fatherPhone: "Father's Phone",
      motherPhone: "Mother's Phone",
      fatherEmail: "Father's Email",
      motherEmail: "Mother's Email",
      address: "Address",
      description: "Description",
      resetUserModalOpen: false,
    }),
    components: {
      UserProfile,
      ResetUserPasswordModalWindow,
    },
    computed: {
      ...mapGetters ({
        userProfile: types.USER_PROFILE,
      }),
      },
    methods: {
      changeDialogOpen(val){
        this.dialogOpen = val
      },
      reserUserProfilePassword(){
        this.resetUserModalOpen = true
      },
      changeResetUserModalOpen(val){
        this.resetUserModalOpen = false
      }
    }
  }
</script>

<style scoped>
.user-container{

  @media (min-width: 1200px) { 
      margin: auto;
  }
}
</style>