<template>
  <v-row justify="center" v-if="eventModalOpen">
    <v-dialog
      v-model="eventModalOpen"
      persistent
    >
      <v-card>
        <v-card-title>
          <v-col cols="12">
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
        <v-card-text>
          <v-container>
            <v-row>
              <!--------------------------------------------> 
              <h3 class="col-12">Start Event</h3>
              <v-col
                cols="6"
              >
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
                      v-model="dateStart"
                      label="Pick Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateStart"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!--------------------------------------------> 
              <v-col
                  cols="6"
                >
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeStart"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="timeStart"
                        label="Pick time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="timeStart"
                      full-width
                      @click:minute="$refs.menu2.save(timeStart)"
                      format="24hr"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <!--------------------------------------------> 
            </v-row>
            <v-row>
              <!--------------------------------------------> 
              <h3 class="col-12">End Event</h3>
              <v-col
                cols="6"
              >
                <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateEnd"
                      label="Pick Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateEnd"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!--------------------------------------------> 
              <v-col
                  cols="6"
                >
                  <v-menu
                    ref="menu4"
                    v-model="menu4"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeEnd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="timeEnd"
                        label="Pick time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu4"
                      v-model="timeEnd"
                      full-width
                      @click:minute="$refs.menu4.save(timeEnd)"
                      format="24hr"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
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

  export default {
      data: () => ({
        dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        timeStart: null,
        dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        timeEnd: null,
        menu: false,
        menu2: false,
        menu3: false,
        menu4: false,
        color: '',
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
      }),
      props: {
        eventModalOpen: Boolean
      },
      computed: {
        ...mapGetters ({
          getCalendarEvents: types.CALENDAR_EVENTS,
        }),
      },
      methods: {
        ...mapActions ({
          postCalendarEvent: types.POST_CALENDAR_EVENT
        }),
        closeForm(){
          this.$emit('changeEventModalOpen', false)
        },
        addEvent() {
          let startDateGlobal = new Date(this.dateStart + ' ' + this.timeStart)
          let endDateGlobal = new Date(this.dateEnd + ' ' + this.timeEnd)
          this.createEvent = {
            name: this.createEvent.name,
            color: this.color,
            start: startDateGlobal.getTime(),
            end: endDateGlobal.getTime(),
            timed: true,
          }
          this.postCalendarEvent(this.createEvent)
          this.closeForm();
        },
      }
    }
</script>