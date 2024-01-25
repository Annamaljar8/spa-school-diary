<template>
  <v-row justify="center" v-if="resetModalOpen">
    <v-dialog
      v-model="resetModalOpen"
      persistent
      max-width="1000"
    >
      <v-card>
        <v-card-text style="font-size:16px; padding-top: 2rem;">Set New Password</v-card-text>
        <v-col class="m-2">
          <v-text-field
            v-model="localPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            @input="updateLocalPassword"
          ></v-text-field>

        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeResetModalAndResetPassword"
          >
            Set Password
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeResetModal"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    data: ()=> ({
      localPassword: '',
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }),
    props: {
      resetModalOpen: Boolean,
      password: String
    },
    methods: {
      closeResetModal(){
        this.$emit('changeResetModalOpen', false)
      },
      updateLocalPassword(value) {
        this.localPassword = value
      },
      closeResetModalAndResetPassword(){
        this.$emit('changeResetModalOpen', false)
        this.$emit('changeResetPassword', this.localPassword)
        this.localPassword = ''
      }
    },
    watch: {
      password(newValue) {
        this.localPassword = newValue || '';
      }
    }
  }
</script>