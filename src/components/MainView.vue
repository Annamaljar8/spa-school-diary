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
    axios.get('/sanctum/csrf-cookie').then(response => {
    console.log('response', response);
    });

  }
}
</script>
