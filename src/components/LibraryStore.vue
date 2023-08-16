<template>
  <div>
    <v-card>
      <v-card-title class="indigo white--text text-h5">
        User Directory
      </v-card-title>
      <v-row
        class="pa-4"
        justify="space-between"
      >
        <v-col cols="3">
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
          cols="6"
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
              min-width="400"
            >
              <v-card-text>
                <h3 class="text-h5 mb-2">
                  {{ selected.name }}
                </h3>
              </v-card-text>
              <v-divider></v-divider>
              <v-row
                class="text-left"
                tag="v-card-text"
              >
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="3"
                >
                  E-mail:
                </v-col>
                <v-col
                  cols="8">
                  {{ selectedEmail(selected) }}
                </v-col>
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
        <v-col cols="3">
        <homework-list 
          :selected-id="selectedId">
        </homework-list>
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

import HomeworkList from './HomeworkList.vue';

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
      selectedId: null
    }),

    components: {
      HomeworkList,
      SvgIcon
    },
    computed:{
      ...mapGetters ({
        usersResult: types.USERS_RESULT,
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
        this.selectedId = id
        this.getUserHomeworkList(this.selectedId)
        return this.usersResult.find(user => user.id === id)
      },
    },
    methods: {
      ...mapActions ({
        getUsersResult: types.GET_USERS,
        getUserHomeworkList: types.GET_USER_HOMEWORK_LIST
      }),
      selectedEmail(selected){
        let selectedEmail = ''
        if (selected.fatherEmail !=='-' || ''){
          selectedEmail = selected.fatherEmail
        } else if (selected.motherEmail !=='-' || ''){
          selectedEmail = selected.motherEmail
        }
        return selectedEmail
      },
    },
    mounted(){
      this.getUsersResult();
    }
  }
</script>