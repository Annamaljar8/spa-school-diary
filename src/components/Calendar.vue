<template>
  <div class="fill-height d-flex">
    <v-col class="pa-0">
      <v-sheet height="64" class="overflow-custom-hidden">
        <v-toolbar
          flat
          extended
          class="overflow-custom"
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            outlined
            class="ml-4"
            color="grey darken-2"
            @click="eventModalOpen = true"
          >
            + Add Event
          </v-btn>
          <add-event-modal :event-modal-open="eventModalOpen" 
                            @changeEventModalOpen="changeEventModalOpen"
                            :users-result="usersResult">
          </add-event-modal>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="100vh">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          interval-height="38"
          :type="type"
          :events="this.getCalendarEvents"
          :event-ripple="false"
          locale="pl"
          :weekdays="weekdays"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        >
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-if="createEvent !== selectedEvent.id" v-html="selectedEvent.name"></v-toolbar-title>
                <v-text-field v-else
                  v-model="selectedEvent.name">
                </v-text-field>
              <v-spacer></v-spacer>
              <v-btn @click="selectedOpen = false" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <form v-if="createEvent !== selectedEvent.id">
                {{ selectedEvent.details }}
              </form>
              <form v-else>
                <textarea
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%;"
                  min-height="100"
                  placeholder="add note"
                ></textarea>
              </form>
            </v-card-text>
            <v-card-text>
              <form>
                <time-start-picker-vue 
                    :date-start="startDateTime[0]"
                    :time-start="startDateTime[1]"
                    @changeTimeStart="changeTimeStartCalendar"
                    @changeDateStart="changeDateStartCalendar"
                />
                <b>Start Event:</b> {{ startDateTime[0] }} {{ startDateTime[1]  }}
              </form>
              <form>
                <time-end-picker-vue 
                    :date-end="endDateTime[0]"
                    :time-end="endDateTime[1]"
                    @changeTimeEnd="changeTimeEndCalendar"
                    @changeDateEnd="changeDateEndCalendar"
                />
                <b>End Event:</b> {{ endDateTime[0] }} {{ endDateTime[1] }}
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="info"
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="error"
                @click="deleteEvent(selectedEvent.id)" 
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

import AddEventModal from './AddEventModal.vue';
import TimeStartPickerVue from '../_shared/TimeStartPicker.vue';
import TimeEndPickerVue from '../_shared/TimeEndPicker.vue';

export default {
    data: () => ({
      value: '',
      events: [],
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      createEvent: {
          id: null, 
          name: null,
          color: null,
          start: null,
          end: null,
          details: null,
          timed: false,
          dialog: false
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      newEvent: true,
      eventModalOpen: false,
      selectedEventStart: '',
      selectedEventTimeStart: '',
      selectedEventDateStart: '',
      selectedEventEnd: '',
      selectedEventTimeEnd: '',
      selectedEventDateEnd: '',
    }),
    components: {
      AddEventModal,
      TimeStartPickerVue,
      TimeEndPickerVue
    },
    watch: {
      selectedEventTimeStart(newVal){
        if(newVal){
          this.selectedEventStart = this.selectedEventDateStart + ' ' + newVal   
        }
      },
      selectedEventDateStart(newVal){
        if(newVal){
          this.selectedEventStart = newVal + ' ' + this.selectedEventTimeStart   
        }
      },
      selectedEventTimeEnd(newVal){
        if(newVal){
          this.selectedEventEnd = this.selectedEventDateEnd + ' ' + newVal   
        }
      },
      selectedEventDateEnd(newVal){
        if(newVal){
          this.selectedEventEnd = newVal + ' ' + this.selectedEventTimeEnd   
        }
      }
    },
    computed:{
      ...mapGetters({
        getCalendarEvents: types.CALENDAR_EVENTS,
        usersResult: types.USERS_RESULT
      }),
      startDateTime: {
          get() {
            // Getter function
            return this.selectedEventStart.split(' ');
          },
          set(value) {
            // Setter function
            this.selectedEventStart = value.join(' ');     
          }
        },
      endDateTime: {
          get() {
            // Getter function
            return this.selectedEventEnd.split(' ');
          },
          set(value) {
            // Setter function
            this.selectedEventEnd = value.join(' ');     
          }
        }
    },
    methods: {
      ...mapActions({
        getCalendarEventsFromPromise: types.GET_CALENDAR_EVENTS,
        updateCalendarEvent: types.UPDATE_CALENDAR_EVENT,
        deleteCalendarEvent: types.DELETE_CALENDAR_EVENT,
        postCalendarEvent: types.POST_CALENDAR_EVENT,
        getUsersResult: types.GET_USERS
      }),    
      updateEvent(event){
        event.start = this.selectedEventStart
        event.end = this.selectedEventEnd
        this.updateCalendarEvent(event);
        this.selectedOpen = false;
        this.createEvent = null
      },
      deleteEvent(id){
        this.deleteCalendarEvent(id);
        this.selectedOpen = false;     
      },
      changeEventModalOpen(val){
        this.eventModalOpen = val
      },
      setToday () {
        this.value = ''
      },
      viewDay ({ date }) {
        this.value = date
        this.type = 'day'
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },   
      showEvent ({ nativeEvent, event }) {
        nativeEvent.stopPropagation()
        this.selectedEventStart = event.start
        this.selectedEventEnd = event.end
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }   
      },
      changeTimeStartCalendar(val){
        this.selectedEventTimeStart = val
      },
      changeDateStartCalendar(val){
        this.selectedEventDateStart = val
      },
      changeTimeEndCalendar(val){
        this.selectedEventTimeEnd = val
      },
      changeDateEndCalendar(val){
        this.selectedEventDateEnd = val
      }
    },
    created(){
      this.getCalendarEventsFromPromise();
      this.getUsersResult()
    }
}
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}

.overflow-custom-hidden{
  overflow: hidden;
}

.overflow-custom{
  overflow-x: auto;
  
  @media (min-width: 1200px){
    overflow: hidden;
  }
}
</style>