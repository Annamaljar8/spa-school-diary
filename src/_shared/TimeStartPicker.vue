<template>
 <v-row>
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
              v-model="localDateStart"
              label="Pick Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="localDateStart"
            @input="menu = false"
            :first-day-of-week="1"
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
            :return-value.sync="localTimeStart"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="localTimeStart"
                label="Pick time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="localTimeStart"
              full-width
              @click:minute="$refs.menu2.save(localTimeStart)"
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-col>
 </v-row>
</template>

<script>
  export default {
    props: {
      dateStart: String,
      timeStart: String,
    },
  data() {
    return {
      localDateStart: this.dateStart,
      localTimeStart: this.timeStart,
      menu: false,
      menu2: false
    };
  },
  watch: {
    localTimeStart(newVal){
      if(newVal){
        this.emitTimeStart(newVal)
        this.emitDateStart(this.localDateStart)
        }
      },
    localDateStart(newVal){
      if(newVal){
        this.emitDateStart(newVal)
        this.emitTimeStart(this.localTimeStart)
        }
      },
    dateStart(newVal){
      if(newVal){
        this.localDateStart = newVal
        }
      },
    timeStart(newVal){
      if(newVal){
        this.localTimeStart = newVal
        }
      },
    },
    methods: {
    emitTimeStart(localTimeStart){
      this.$emit('changeTimeStart', localTimeStart)
    },
    emitDateStart(localDateStart){
      this.$emit('changeDateStart', localDateStart)
    }
    }
  }
</script>
