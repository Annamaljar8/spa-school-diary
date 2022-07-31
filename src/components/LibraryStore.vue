<template>
  <div>
    <!-- <v-btn style="margin: 1rem!important" @click="formOpen = true;" >
      Register User
    </v-btn> -->
    <v-card>
      <v-card-title class="indigo white--text text-h5">
        User Directory
      </v-card-title>
      <v-row
        class="pa-4"
        justify="space-between"
      >
        <v-col cols="5">
          <v-treeview
            :active.sync="active"
            :items="items"
            activatable
            :open.sync="open"
            color="warning"
            open-on-click
            transition
          >
            <template v-slot:prepend="{ item }">
              <v-icon v-if="!item.children">
                mdi-account
              </v-icon>
            </template>
          </v-treeview>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col
          class="d-flex text-center"
        >
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="text-h6 grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >
              Select a User
            </div>
            <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
            >
              <v-card-text>
                <!-- <v-avatar
                  v-if="avatar"
                  size="88"
                >
                  <v-img
                    :src="`https://avataaars.io/${avatar}`"
                    class="mb-6"
                  ></v-img>
                </v-avatar> -->
                <h3 class="text-h5 mb-2">
                  {{ selected.name }}
                </h3>
                <!-- <div class="blue--text mb-2">
                  {{ selected.motherName }}
                </div>
                <div class="blue--text subheading font-weight-bold">
                  {{ selected.fatherName }}
                </div> -->
              </v-card-text>
              <v-divider></v-divider>
              <v-row
                class="text-left"
                tag="v-card-text"
              >
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                >
                  Company:
                </v-col>
                <!-- <v-col>{{ selected.company.name }}</v-col> -->
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                >
                  Website:
                </v-col>
                <v-col>
                  <!-- <a
                    :href="`//${selected.website}`"
                    target="_blank"
                  >{{ selected.website }}</a> -->
                </v-col>
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                >
                  Phone:
                </v-col>
                <!-- <v-col>{{ selected.phone }}</v-col> -->
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>


<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountMusicOutline } from '@mdi/js';
import { mdiDeleteOutline } from '@mdi/js';

import RegisterForm from './RegisterForm.vue';
import UserProfile from './UserProfile.vue';
import ModalWindow from './ModalWindow.vue';

  export default {
    name: 'LibraryStore',

    data: () => ({
      formOpen: false,
      pathGet: mdiAccountMusicOutline,
      pathDelete: mdiDeleteOutline,
      active: [],
      avatar: null,
      open: [],
      users: [],
    }),

    components: {
      RegisterForm,
      UserProfile,
      ModalWindow,
      SvgIcon
    },
    computed:{
      ...mapGetters ({
        usersResult: types.USERS_RESULT,
        userProfile: types.USER_PROFILE,
      }),
      items () {
        return [
          {
            name: 'Users',
            children: this.usersResult,
          },
        ]
      },
      selected () {
        if (!this.active.length) return undefined
        const id = this.active[0]
        console.log(id)
        return id
        // return this.usersResult.find(user => user.id === id)
      },
    },
    methods: {
      ...mapActions ({
        getUserProfile: types.GET_USER_PROFILE,
        getUsersResult: types.GET_USERS,
      }),
    
      changeFormOpen(val){
        this.formOpen = val;
      },
    },
    mounted(){
      this.getUsersResult();
    }
  }
</script>