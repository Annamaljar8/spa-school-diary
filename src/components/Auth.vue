<template>
  <div class="log-in-form-wrap">
    <div class="log-in-form">
      <form style="width:22vw!important">
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
          sign in
        </v-btn>
      </form>
    </div>
  </div>
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
          this.$router.push('dashboard')
        }
      }
    }
  }
</script>

<style>
.log-in-form-wrap{
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.log-in-form{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22vw;
  padding: 3rem;
  background-color: #e7ebef;
  border-radius: 10px;
  box-shadow: 10px 10px 10px gray;
}
</style>
