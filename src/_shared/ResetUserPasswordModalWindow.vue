<template>
  <v-row justify="center" v-if="resetUserModalOpen">
    <v-dialog
      v-model="resetUserModalOpen"
      persistent
      max-width="1000"
    >
      <v-card>
        <v-card-text style="font-size:16px; padding-top: 2rem;">Old Password</v-card-text>
        <v-col class="m-2">
          <v-text-field
            v-model="oldPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 5 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-card-text style="font-size:16px; padding-top: 2rem;">New Password</v-card-text>
        <v-col class="m-2">
          <v-text-field
            v-model="newPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 5 characters"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeResetModalAndSetNewPassword"
          >
            Set New Password
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeResetUserModal"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

export default {
    data: ()=> ({
      oldPassword: '',
      newPassword: '',
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 5 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }),
    props: {
      resetUserModalOpen: Boolean,
    },
    methods: {
      ...mapActions ({
        setNewUserPassword: types.SET_NEW_USER_PASSWORD
      }),
      closeResetUserModal(){
        this.$emit('changeResetUserModalOpen', false)
      },
      closeResetModalAndSetNewPassword(){
        this.$emit('changeResetUserModalOpen', false)
        let oldPassword = this.oldPassword
        let newPassword = this.newPassword
        this.setNewUserPassword({oldPassword, newPassword})
        this.oldPassword = '',
        this.newPassword = ''
      }
    }
  }
</script>