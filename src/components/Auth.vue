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
        axios.post('/login', {
          email: this.email,
          password: this.password
        })
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
