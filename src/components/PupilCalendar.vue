<template>
 <v-row>
  <v-col v-for="(calendarEvent, i) in getCalendarEvents"
                      :key="i">
   <v-card
    class="mx-auto mt-8"
    max-width="344"
  >
    <v-img
     :style="{ backgroundColor: calendarEvent.color }"
      height="200px"
    ></v-img>
    <v-row>
     <v-col cols="8">
       <v-card-title>
        {{ calendarEvent.start | parseCalendarDate }}
        
       </v-card-title>

       <v-card-subtitle>
          {{ lessonTitle }}
       </v-card-subtitle>
     </v-col>
     <v-col cols="4">
       <v-card-text>
        <h3>
        {{ calendarEvent.start | parseCalendarTime }} 
        </h3>
        <h3>
         {{ calendarEvent.end | parseCalendarTime }}
        </h3>
       </v-card-text>
     </v-col>
    </v-row>

    <v-card-actions>
     <p class='pl-2 subtitle-2'>Additional information</p>
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
         Sala 113, I piętro <br>
         Kod do wejścia: 200 klucz 2468
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </v-col>
 </v-row>
</template>

<script>
import * as types from '@/store/types'; 
import { mapActions, mapGetters } from 'vuex';

export default {
 data: () => ({
  lessonTitle: 'Violin Lesson',
  show: false
 }),
 computed: {
   ...mapGetters ({
     getCalendarEvents: types.CALENDAR_EVENTS
   }),

 },
 methods: {
   ...mapActions ({
    getCalendarEventsFromPromise: types.GET_CALENDAR_EVENTS,
   }),
 },
 created(){
    this.getCalendarEventsFromPromise();
  }
}
</script>