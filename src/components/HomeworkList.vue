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
          v-model="menu5"
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
            @input="menu5 = false"
            :first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
        <vue-editor v-model="homeworkDescripion" />
        <v-file-input
          v-model="homeworkFiles"
          chips
          multiple
          label="File input"
          v-bind="fileInputAttrs"
        ></v-file-input>
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
            class="mt-8 mr-2">
        <v-expansion-panels 
            class="mb-6" 
            focusable
            >
          <v-expansion-panel
            v-for="(userHomework, i) in userHomeworkList"
            :key="i"
          >
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              <div> {{ userHomework.deadline }}  </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content 
                class="pt-4">
              <v-row class="align-center">
                <v-col cols="9">
                  <div v-html="userHomework.description"></div>
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
              <v-row>
                <v-col
                  v-for="(userHomeworkFile, n) in userHomework.links"
                  :key="n"
                >
                <a :href="userHomeworkFile" target="blank">PDF</a>
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
import { VueEditor } from "vue2-editor";

export default {
    components: { VueEditor },

    data: ()=> ({
      formOpen: false,
      homeworkDeadline: '',
      homeworkDescripion: '',
      menu5: false,
      homeworkFiles: [],
      fileInputAttrs: {
        type: 'file', // Add the type attribute here
        accept: 'application/pdf', // You can specify the accepted file types
      },
      content: ""
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
        description: this.homeworkDescripion,
        files: this.homeworkFiles
        })
      this.closeHomework()
    },
    deleteHomeworkItem(id){
      let userId = this.selectedId
      this.deleteHomework({id, userId})
    },
    closeHomework(){
      this.formOpen = false
      this.homeworkDeadline = ''
      this.homeworkDescripion = ''
    }
  }
}
</script>