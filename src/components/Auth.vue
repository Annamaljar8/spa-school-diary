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
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn
      class="mr-4"
      @click="logOut"
    >
      log out
    </v-btn>
    <v-btn
      class="mr-4"
      @click="getUser"
    >
      get user
    </v-btn>
  </form>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'Auth',

    data: () => ({
      email: '',
      password: ''
    }),
    methods: {
      submit(){
        let self = this;
        axios.post('/login', {
          email: this.email,
          password: this.password
        })
        .then(function (response) {
          console.log(response);
          self.$router.push('about')
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      logOut(){
        axios.post('/logout', {
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getUser(){
        axios.get('/user')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
