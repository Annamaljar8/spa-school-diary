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
      <form v-if="formOpen" >
        <v-text-field
          v-model="homeworkDeadline"
          label="Date"
          required
        ></v-text-field>
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
          @click="saveHomeworkList()"
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
      <div class="mt-8">
        <v-expansion-panels class="mb-6">
          <v-expansion-panel
            v-for="(userHomework, i) in userHomeworkList"
            :key="i"
          >
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              {{ userHomework.deadline }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ userHomework.description }}
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
      getUserHomeworkList: types.GET_USER_HOMEWORK_LIST
    }),
    addHomework(){
      this.formOpen = true
    },
    saveHomeworkList(){
      this.formOpen = false 
      this.postHomework({
        id: this.selectedId, 
        deadline: this.homeworkDeadline, 
        description: this.homeworkDescripion
        })
      this.homeworkDate = '',
      this.homeworkDescripion = '',
      this.getUserHomeworkList(this.selectedId)
    },
    closeHomework(){
      this.formOpen = false
    }
  }
}
</script>