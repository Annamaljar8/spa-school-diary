<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
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
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          
          :type="type"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          locale="pl"
          :weekdays="weekdays"
          @change="getEventsFromPromise"
          @mousedown:time="startTime"
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
              <form v-if="createEvent !== selectedEvent.id">
                <b>Time Start:</b> {{ selectedEvent.start }}
              </form>
              <form v-else>
                <b>Time Start:</b>
                <v-text-field
                  v-model="selectedEvent.start"
                ></v-text-field>
              </form>
              <form v-if="createEvent !== selectedEvent.id">
                <b>Time End:</b> {{ selectedEvent.end }}
              </form>
              <form v-else>
                <b>Time End:</b>
                <v-text-field
                  v-model="selectedEvent.end"
                ></v-text-field>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                v-if="createEvent !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Edit
              </v-btn>
              <v-btn
                color="info"
                v-else
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
  </v-row>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
      value: '',
      events: [],
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      dragEvent: null,
      dragStart: null,
      createEvent: {
          id: null, // currentEditId
          name: null,
          color: null,
          start: null,
          end: null,
          details: null,
          timed: false,
          dialog: false
      },
      createStart: null,
      extendOriginal: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      newEvent: true,
    }),
    computed:{
      ...mapGetters({
        getCalendarEvents: types.CALENDAR_EVENTS,
      })
    },
    methods: {
      ...mapActions({
        getCalendarEventsFromPromise: types.GET_CALENDAR_EVENTS,
        updateCalendarEvent: types.UPDATE_CALENDAR_EVENT,
        deleteCalendarEvent: types.DELETE_CALENDAR_EVENT,
        postCalendarEvent: types.POST_CALENDAR_EVENT
      }), 
      getEventsFromPromise () {
        setTimeout(() => {
          this.events = this.getCalendarEvents
        }, 500)
      },
      updateEvent(event){
        this.updateCalendarEvent(event);
        this.selectedOpen = false;
        this.createEvent = null
      },
      deleteEvent(id){
        this.deleteCalendarEvent(id);
        this.selectedOpen = false;
        setTimeout(() => {
          this.events = this.getCalendarEvents
        }, 500)        
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
        roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000
        console.log('@@@@@@ time', time)

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      startTime (tms, element) {
        let el = element.path[0];
        if(el.className == 'v-calendar-daily__day-interval'){
          let date = new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute)
          let userTimezoneOffset = date.getTimezoneOffset() * 60000;
          let newDate = new Date(date.getTime() - userTimezoneOffset);
          this.createStart = this.roundTime(newDate)
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: this.rndElement(this.colors),
            start: this.createStart,
            end: this.createStart,
            timed: true,
          }
          this.postCalendarEvent(this.createEvent)
          setTimeout(() => {
            this.events = this.getCalendarEvents
          }, 500)
        }
      },

      getEventColor (event) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF

        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event.color
      },
      
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
      editEvent(event) {
        this.createEvent = event.id
      },
      showEvent ({ nativeEvent, event }) {
        nativeEvent.stopPropagation()
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
    },
    created(){
      this.getCalendarEventsFromPromise();
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
</style>