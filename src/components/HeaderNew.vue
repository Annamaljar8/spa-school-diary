<template>
  <div style="width: 100vw;">
    <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>
        <img
          class="mr-4 avatar-img"
          :src="userData.avatar"
        >
        <div class="mr-4">
          {{ userData.name }}
        </div>
        <v-btn
        class="mr-4 logout-btn"
        @click="logOut"
      >
        log out
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab class="header-new-tab"><router-link to="/dashboard">Calendar</router-link></v-tab>
          <v-tab class="header-new-tab"><router-link to="/library">Library</router-link></v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 24vh;"></v-container>
    </v-sheet>
  </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import * as types from '@/store/types'; 
import { mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
    name: 'Header',

    data: () => ({
     
    }),
     computed: {
       ...mapGetters ({
        userData: types.USER_DATA,
      }),
    },
    methods: {
      ...mapActions ({
        deleteUser: types.DELETE_USER,
      }),
     
      logOut(){
        this.deleteUser();
      }
    }
  }
</script>

<style scoped>
.avatar-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: aliceblue;
}
.v-application a{
  color: aliceblue!important;
  text-decoration: none!important;;
}
</style>