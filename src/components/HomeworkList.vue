<template>
  <div>
   <div class="text-subtitle-1 mb-4">Zadania domowe</div>
     <v-btn
       class="mr-4"
       @click="addHomework()"
     >
       add homework
     </v-btn>
      <form v-if="formOpen" >
        <v-text-field
         
          label="Date"
          required
        ></v-text-field>
        <v-textarea
          label="Description"
          auto-grow
          outlined
          rows="4"
          row-height="30"
        ></v-textarea>
        <v-btn
          class="mr-4"
          @click="saveHomework()"
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
  </div>
</template>

<script>
export default {
 data: ()=> ({
  formOpen: false
 }),
 props: {
  selectedId: Number
 },
 methods: {
   addHomework(){
    this.formOpen = true
   },
   saveHomework(){
    this.formOpen = false
   },
   closeHomework(){
    this.formOpen = false
   }
 }
}
</script>