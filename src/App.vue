<template>
  <v-app>
    <v-main>
      <router-view/>
      <info-popup></info-popup>
    </v-main>
  </v-app>
</template>

<script>
import InfoPopup from './_shared/InfoPopup'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    InfoPopup
  },
  beforeMount() {
    setTimeout(() => {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }, 0);
  },
};
</script>
