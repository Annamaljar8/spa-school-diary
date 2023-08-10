<template>
  <div>
    Zadania domowe
     <v-btn
       class="mr-4"
       @click="addHomework()"
     >
       add homework
     </v-btn>
  </div>
</template>

<script>
export default {
    methods: {
      addHomework(){
        console.log('open')
      }
    }
  }
</script>