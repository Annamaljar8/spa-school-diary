<template>
  <v-row justify="center" v-if="dialogOpen">
    <v-dialog
      v-model="dialogOpen"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!--------------------------------------------> 
              <v-col
                cols="12"
                sm="6"
                md="10"
              >
              <v-textarea
                  label="Name"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
                <v-col
                cols="12"
                sm="6"
                md="2"
              >
              <v-textarea
                  label="Age"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Parents Name</h4></v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Mother's Name"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Father's Name"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Parents Phone Number</h4></v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Mother's Phone Number"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Father's Phone Number"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Parents Email</h4></v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Mother's Email"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12"
                    sm="6"
                    md="6">
                <v-textarea
                  label="Father's Email"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Adress</h4></v-col>
              <v-col cols="12"
                    sm="6"
                    md="8">
                <v-textarea
                  label="Adress"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12"
                    sm="6"
                    md="4">
                <v-textarea
                  label="House/Flat"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Description</h4></v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  auto-grow
                  outlined
                  rows="4"
                  row-height="30"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeForm"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="closeForm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
      data: () => ({
        dialog: false,
      }),
      props: {
        dialogOpen: Boolean
      },
      methods: {
        closeForm(){
        this.$emit('changeDialogOpen', false)
      },
      }
    }
</script>