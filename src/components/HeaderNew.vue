<template>
  <div style="width: 100vw; height: 14vh;">
      <div class="d-none d-md-flex"> 
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
        >
          <div class="d-flex">
            <router-link to="/dashboard" class="header-new" v-if="(getUserType === 'teacher') || (getUserType === 'pupil')">Calendar</router-link>
            <router-link to="/library" class="header-new" v-if="(getUserType === 'teacher') || (getUserType === 'pupil')">Library</router-link>
            <router-link to="/users" class="header-new" v-if="(getUserType === 'teacher')">Users</router-link>
            <router-link to="/profile" class="header-new" v-if="(getUserType === 'pupil')">Profile</router-link>
          </div>
          <div class="user-info">
            <img
              class="mr-4 avatar-img"
              :src="userData.avatar"
            >
            <div class="mr-4" >
              {{ userData.name }}
            </div>
            <v-btn
            class="mr-4 logout-btn"
            @click="logOut"
          >
            log out
          </v-btn>
          </div>
        </v-app-bar>
      </div>
        <!-----------------mobile-------------------->
      <div class="d-flex d-md-none justify-space-between align-center my-4 mx-2">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-calendar-multiple-check</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link to="/dashboard" class="header-new" v-if="(getUserType === 'teacher') || (getUserType === 'pupil')">Calendar</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-library</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link to="/library" class="header-new" v-if="(getUserType === 'teacher') || (getUserType === 'pupil')">Library</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-group-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link to="/users" class="header-new">Users</router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <div class="user-info">
          <img
            class="mr-4 avatar-img"
            :src="userData.avatar"
          >
          <div class="mr-4" >
            {{ userData.name }}
          </div>
          <v-btn
          class="mr-2 logout-btn"
          @click="logOut"
          >
            log out
          </v-btn>
        </div>
      </div>
    <v-container class="d-none d-md-flex" style="height: 14vh;"></v-container>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'HeaderNew',

  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapGetters ({
      userData: types.USER_DATA,
      getUserType: types.USER_TYPE,
    }),
  },
  methods: {
    ...mapActions ({
      deleteUser: types.DELETE_USER,
    }),
    
    logOut(){
      this.deleteUser();
    }
  },
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
  color: rgb(85 34 150)!important;
  text-decoration: none!important;
  
  @media (min-width: 1200px) {
    color: aliceblue!important;
    text-decoration: none!important;
  }

}
.header-new{
  margin-right: 2rem;
}
.header-new.router-link-active{
  color: #9c3fafcc!important;

  @media (min-width: 1200px) {
    color: #dfade9cc!important;
  }

}
.user-info{
  display: flex;
  align-items: center;

  @media (min-width: 1200px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 60vw;
  }
}

::v-deep .v-list-item__title{
  font-size: 1rem!important;
}

::v-deep .v-toolbar__content {
  justify-content: space-between;
  height: 90px!important;
}

::v-deep .v-toolbar{
  height: 90px!important;
}
</style>