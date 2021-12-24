<template>
<form>
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
    
  
    <v-btn
      class="mr-4"
      @click="submit()"
    >
      submit
    </v-btn>
    <v-btn
      class="mr-4"
      @click="logOut"
    >
      log out
    </v-btn>
    
  </form>
</template>

<script>
import axios from 'axios';
import * as types from '@/store/types'; 
import { mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
    name: 'Auth',

    data: () => ({
      email: '',
      password: '',
      
    }),
    computed: {
       ...mapGetters ({
        status: types.STATUS,
      }),
    },
    methods: {
      ...mapActions ({
        getUser: types.GET_USER,
        deleteUser: types.DELETE_USER,
      }),
      submit(){
        this.getUser({
          email: this.email, 
          password: this.password
          });
        //  this.checkStatus();
        //  this.$router.push('about')
      },
      logOut(){
        this.deleteUser();
      }
    },
    watch: {
      checkStatus(){
        if(this.status == true){
this.$router.push('about')
        }
      }
    }
  }
</script>
