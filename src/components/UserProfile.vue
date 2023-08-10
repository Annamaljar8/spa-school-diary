<template>
  <v-row justify="center" v-if="dialogOpen">
    <v-dialog
      v-model="dialogOpen"
      persistent
      max-width="700px"
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
                  v-model="userProfile.name"
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
                  v-model="userProfile.age"
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
                  v-model="userProfile.motherName"
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
                  v-model="userProfile.fatherName"
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
                  v-model="userProfile.motherPhone"
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
                  v-model="userProfile.fatherPhone"
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
                  v-model="userProfile.motherEmail"
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
                  v-model="userProfile.fatherEmail"
                ></v-textarea>
              </v-col>
              <!--------------------------------------------> 
              <v-col cols="12"><h4>Adress</h4></v-col>
              <v-col cols="12"
                    sm="12"
                    md="12">
                <v-textarea
                  label="Adress"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="15"
                  v-model="userProfile.address"
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
                  v-model="userProfile.description"
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
            @click="updateUserProfile(userProfile)"
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
       
      }),
      props: {
        dialogOpen: Boolean
      },
      computed: {
        ...mapGetters ({
          userProfile: types.USER_PROFILE,
        }),
      },
      methods: {
        ...mapActions ({
          createAndUpdateUserProfile: types.CREATE_AND_UPDATE_USER_PROFILE,
        }),
        closeForm(){
          this.$emit('changeDialogOpen', false)
        },
        updateUserProfile(userProfile){
          this.createAndUpdateUserProfile(userProfile)
          this.closeForm()
        }
      }
    }
</script>