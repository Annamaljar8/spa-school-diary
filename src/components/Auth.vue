<template>
<form>
    <v-text-field
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      required
    ></v-text-field>
    
  
    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
   
  </form>
</template>

<script>
  export default {
    name: 'Auth',

    data: () => ({
      
    }),
    methods: {
      submit(){
        console.log('1234')
      }
    }
  }
</script>
