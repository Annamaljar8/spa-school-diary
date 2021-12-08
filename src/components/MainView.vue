<template>
<div>
   <v-container>
    <auth />
  </v-container>
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
    console.log('response', response);
    });

  }
}
</script>
