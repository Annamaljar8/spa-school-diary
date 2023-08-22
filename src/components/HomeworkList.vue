<template>
  <div>
    <div class="text-subtitle-1 mb-4">Zadania domowe</div>
      <v-btn
        v-if="selectedId"
        class="mr-4"
        @click="addHomework()"
      >
        add homework
      </v-btn>
      <form v-if="formOpen">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="homeworkDeadline"
              label="Date"
              required
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="homeworkDeadline"
            @input="menu = false"
            :first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
        <v-textarea
          v-model="homeworkDescripion"
          label="Description"
          auto-grow
          outlined
          rows="4"
          row-height="30"
        ></v-textarea>
        <v-btn
          class="mr-4"
          @click="saveHomeworkItem()"
        >
          save
        </v-btn>
        <v-btn
          class="mr-4"
          @click="closeHomework()"
        >
          close
        </v-btn>
      </form>
      <div v-if="selectedId"
            class="mt-8">
        <v-expansion-panels 
            class="mb-6" 
            focusable
            >
          <v-expansion-panel
            v-for="(userHomework, i) in userHomeworkList"
            :key="i"
          >
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              {{ userHomework.deadline }}
            </v-expansion-panel-header>
            <v-expansion-panel-content 
                class="pt-4">
              <v-row class="align-center">
                <v-col cols="9">
                  {{ userHomework.description }}
                </v-col>
                <v-col cols="3"
                        class="text-right">
                  <v-btn
                    text
                    icon
                    color="blue lighten-2"
                    @click="deleteHomeworkItem(userHomework.id)"
                  >
                    <v-icon color="blue darken-2">
                      mdi-trash-can-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

export default {
    data: ()=> ({
      formOpen: false,
      homeworkDeadline: '',
      homeworkDescripion: ''
    }),
    props: {
      selectedId: Number
    },
    computed: {
      ...mapGetters({
        userHomeworkList: types.USER_HOMEWORK_LIST
      })
    },
    methods: {
    ...mapActions({
      postHomework: types.POST_HOMEWORK,
      getUserHomeworkList: types.GET_USER_HOMEWORK_LIST,
      deleteHomework: types.DELETE_HOMEWORK
    }),
    addHomework(){
      this.formOpen = true
    },
    saveHomeworkItem(){
      this.formOpen = false 
      this.postHomework({
        id: this.selectedId, 
        deadline: this.homeworkDeadline, 
        description: this.homeworkDescripion
        })
      this.homeworkDeadline = '',
      this.homeworkDescripion = ''
    },
    deleteHomeworkItem(id){
      let userId = this.selectedId
      this.deleteHomework({id, userId})
    },
    closeHomework(){
      this.formOpen = false
    }
  }
}
</script>