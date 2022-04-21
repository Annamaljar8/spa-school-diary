<template>
<div class="bg_auth">
  <div class="bg_auth_opacity">
    <v-container>
      <auth />
    </v-container>
  </div>
</div>
</template>

<script>
import Auth from '../components/Auth'
import axios from 'axios';

export default {
  name: 'MainView',

  data: () => ({

  }),
  components: {
    Auth,
  },

  mounted(){
    axios.defaults.baseURL = 'https://school-diary.zografmelitopol.zp.ua';
    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.defaults.baseURL = 'https://school-diary.zografmelitopol.zp.ua/api';
    });

  }
}
</script>

<style>
  .bg_auth{
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/bg_2.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .bg_auth_opacity{
    width: 100vw;
    height: 100vh;
    background-color: rgb(226 232 236 / 10%);
  }
</style>
