<template>
  <v-row justify="center" v-if="eventModalOpen">
    <v-dialog
      v-model="eventModalOpen"
      persistent
    >
      <v-card>
        <v-card-title  class="pb-0 pt-8">
          <v-col cols="12" class="pa-0">
              <v-textarea
                label="Title Event"
                auto-grow
                outlined
                rows="1"
                row-height="15"
                v-model="createEvent.name"
              ></v-textarea>
            </v-col>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container class="pt-0">
            <v-row>
              <!--------------------------------------------> 
              <v-col cols="12" 
                    :class="[{'d-flex': titleVisible, 'd-none': !titleVisible}]">
                <v-row class="my-2 mx-0">
                  <h3> Pupil:</h3> &nbsp;
                  <h3 class="font-italic">{{ userResultName }}</h3> 
                </v-row>
              </v-col>
              <v-list :class="[{'d-flex': !titleVisible, 'd-none': titleVisible}]">
                <v-list-group
                    prepend-icon="mdi-account-circle"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>Pupil</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item
                      v-for="(userResult, i) in usersResult"
                      :key="i"
                      link
                    >
                      <v-list-item-title v-text="userResult.name"
                                        @click="getUserId(userResult.id, userResult.name)">
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </v-list>
            </v-row>
            <v-row>
              <!--------------------------------------------> 
              <h3 class="col-12">Start Event</h3>
              <time-start-picker-vue 
                          :date-start="addEventDateStart"
                          :time-start="addEventTimeStart"
                          @changeTimeStart="changeTimeStart"
                          @changeDateStart="changeDateStart"
                      />
                <!--------------------------------------------> 
            </v-row>
            <v-row>
              <!--------------------------------------------> 
              <h3 class="col-12">End Event</h3>
              <time-end-picker-vue 
                      :date-end="addEventDateEnd"
                      :time-end="addEventTimeEnd"
                      @changeTimeEnd="changeTimeEnd"
                      @changeDateEnd="changeDateEnd"
                  />
              <!--------------------------------------------> 
            </v-row>
            <v-row>
              <h3 class="col-12">Pick Color</h3>
              <v-btn class="col-4 blue" 
                    @click="color='blue'">
                Blue
              </v-btn>
              <v-btn class="col-4 green" 
                    @click="color='green'">
                Green
              </v-btn>
              <v-btn class="col-4 red" 
                    @click="color='red'">
                Red
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addEvent(createEvent)"
          >
            Save
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeForm"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

import TimeStartPickerVue from '../_shared/TimeStartPicker.vue';
import TimeEndPickerVue from '../_shared/TimeEndPicker.vue';

  export default {
      data: () => ({
        addEventDateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        addEventTimeStart: null,
        addEventDateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        addEventTimeEnd: null,
        // menu: false,
        // menu2: false,
        // menu3: false,
        // menu4: false,
        color: '',
        createEvent: {
          pupil_id: '', 
          name: '',
          color: '',
          start: null,
          end: null,
          details: null,
          timed: false,
          dialog: false
        },
        userResultName: '',
        titleVisible: false
      }),
      props: {
        eventModalOpen: Boolean,
        usersResult: Array
      },
      components: {
        TimeStartPickerVue,
        TimeEndPickerVue
      },
      computed: {
        ...mapGetters ({
          getCalendarEvents: types.CALENDAR_EVENTS
        }),
      },
      methods: {
        ...mapActions ({
          postCalendarEvent: types.POST_CALENDAR_EVENT
        }),
        closeForm(){
          this.$emit('changeEventModalOpen', false)
          this.createEvent = {
            pupil_id: '', 
            name: '',
            color: '',
            start: null,
            end: null
          }
          this.titleVisible = false
        },
        getUserId(id, name){
          this.createEvent = {
            ...this.createEvent,
            pupil_id: id
          }
          this.userResultName = name,
          this.createEvent.name = name
          this.titleVisible = true
        },
        addEvent() {
          let startDateGlobal = new Date(this.addEventDateStart + ' ' + this.addEventTimeStart)
          let endDateGlobal = new Date(this.addEventDateEnd + ' ' + this.addEventTimeEnd)
          this.createEvent = {
            ...this.createEvent,
            name: this.createEvent.name,
            color: this.color,
            start: startDateGlobal.getTime(),
            end: endDateGlobal.getTime(),
            timed: true,
          }
          this.postCalendarEvent(this.createEvent)
          this.closeForm();
        },
        changeTimeStart(val){
          this.addEventTimeStart = val
        },
        changeDateStart(val){
          this.addEventDateStart = val
        },
        changeTimeEnd(val){
          this.addEventTimeEnd = val
        },
        changeDateEnd(val){
          this.addEventDateEnd = val
        }
      }
    }
</script>