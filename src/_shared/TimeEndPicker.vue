<template>
 <v-row>
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
          v-model="localDateEnd"
          label="Pick Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localDateEnd"
        @input="menu3 = false"
        :first-day-of-week="1"
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
        :return-value.sync="localTimeEnd"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="localTimeEnd"
            label="Pick time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu4"
          v-model="localTimeEnd"
          full-width
          @click:minute="$refs.menu4.save(localTimeEnd)"
          format="24hr"
        ></v-time-picker>
      </v-menu>
  </v-col>
 </v-row>
</template>

<script>
  export default {
    props: {
      dateEnd: String,
      timeEnd: String,
    },
  data() {
    return {
      localDateEnd: this.dateEnd,
      localTimeEnd: this.timeEnd,
      menu3: false,
      menu4: false,
    };
  },
  watch: {
    localTimeEnd(newVal){
      if(newVal){
        this.emitTimeEnd(newVal)
        this.emitDateEnd(this.localDateEnd)
        }
      },
    localDateEnd(newVal){
      if(newVal){
        this.emitDateEnd(newVal)
        this.emitTimeEnd(this.localTimeEnd)
        }
      },
    dateEnd(newVal){
      if(newVal){
        this.localDateEnd = newVal
        }
      },
    timeEnd(newVal){
      if(newVal){
        this.localTimeEnd = newVal
        }
      },
    },
    methods: {
    emitTimeEnd(localTimeEnd){
      this.$emit('changeTimeEnd', localTimeEnd)
    },
    emitDateEnd(localDateEnd){
      this.$emit('changeDateEnd', localDateEnd)
    }
    }
  }
</script>
