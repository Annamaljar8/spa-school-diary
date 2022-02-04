<template>
  <v-row justify="center" v-if="modalOpen">
    <v-dialog
      v-model="modalOpen"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-text style="font-size:16px; padding-top: 2rem;">Do you really want to delete?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeModalAndDelete"
          >
            Delete
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="closeModal"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props: {
      modalOpen: Boolean,
      isDeleteUserProfile: Boolean
    },
    methods: {
      closeModal(){
        this.$emit('changeModalOpen', false)
      },
      closeModalAndDelete(){
        this.$emit('changeModalOpen', false)
        this.$emit('cangeDeleteUserProfile', true)
      }
    }
  }
</script>