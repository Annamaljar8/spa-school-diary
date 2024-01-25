<template>
  <div >
    <v-row justify="center" v-if="infoPopupOpen">
      <v-dialog
        v-model="infoPopupOpen"
        persistent
        max-width="1000"
      >
        <v-card>
          <v-card-text style="font-size:16px; padding-top: 2rem;">
            <v-alert 
              :type="typeOfInfoMessage">
            {{ infoMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import * as types from '@/store/types'; 
import {mapMutations, mapGetters } from 'vuex';

export default {
    data: ()=> ({
      //
    }),
    computed:{
      ...mapGetters ({
        infoMessage: types.GET_INFO_MESSAGE,
        infoPopupOpen: types.GET_INFO_POPUP_OPEN,
        typeOfInfoMessage: types.GET_TYPE_OF_INFO_MESSAGE
      }),
    },
    methods: {
      ...mapMutations({
        setInfoPopupOpen: types.SET_INFO_POPUP_OPEN
      })
    },
    created() {
      this.intervalId = setInterval(() => {
        this.setInfoPopupOpen(false);
      }, 5000);
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
  }
</script>