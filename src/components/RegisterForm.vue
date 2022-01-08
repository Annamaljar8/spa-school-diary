<template>
  <div>
    <div class="user-table-form" >
      <form v-if="formOpen" style="width:35vw!important" >
        <v-text-field
        v-model="name"
        label="Name"
        required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="c_password"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click="register()"
        >
          sign up
        </v-btn>
        <v-btn
          class="mr-4"
          @click="closeForm"
        >
          close
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
    name: 'RegisterForm',

    data: () => ({
      name: '',
      email: '',
      password: '',
      c_password: '',
      
      // formOpen: false
    }),
    props: {
      formOpen: Boolean
    },
    computed: {
      // ...mapGetters ({
      //   userData: types.USER_DATA,
      // }),
    },
    methods: {
      ...mapActions ({
        registerUser: types.REGISTER_USER,
      }),
      closeForm(){
        this.$emit('changeFormOpen', false)
      },
      register(){
        this.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
          c_password: this.c_password,
        })
        this.closeForm()
      }
      
    }
  }
</script>

<style>
.user-table-form{
  display: flex;
  justify-content: center;
}
</style>