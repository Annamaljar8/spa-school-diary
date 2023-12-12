<template>
  <div>
    <h2 class="mx-4 text-center text-md-left">
      {{ pupilHomeworkTitle }}
    </h2>
    <!--------Homework Card------------>
    <v-row>
    <v-col v-for="(userHomeworkItem, index) in userHomeworkList"
                      :key="userHomeworkItem.id"
          cols="12"
          sm="6"
          md="3">
      <v-card class="mx-auto my-12"
              max-width="300"
      >
        <v-img
          height="250"
          :src="`img/${index+1}.jpg`"
        />

        <v-card-title>{{ userHomeworkItem.deadline }}</v-card-title>

        <v-card-text>
          <div v-html="userHomeworkItem.description"></div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text class="d-flex">
          <v-chip-group v-for="(userHomeworkFile, i) in userHomeworkItem.links"
                    :key="i"
                    active-class="deep-purple accent-4 white--text"
                    mandatory
          >
              <a :href="userHomeworkFile" target="blank"> <v-chip>PDF </v-chip> </a>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
    </v-row>

  </div>
</template>

<script>
import * as types from '@/store/types'; 
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    pupilHomeworkTitle: 'Homework',
  }),
  computed: {
    ...mapGetters ({
      userHomeworkList: types.USER_HOMEWORK_LIST
    }),
    ramdomPhoto() {
      const imageUrls = [
        '../assets/1.jpg',
        '../assets/2.jpg',
        '../assets/3.jpg',
        '../assets/4.jpg',
        '../assets/5.jpg',
        '../assets/6.jpg',
        '../assets/7.jpg',
        '../assets/8.jpg',
        '../assets/9.jpg'
      ]
      const randomIndex = Math.floor(Math.random() * 9) + 1;
      return imageUrls[randomIndex]
    }
  },
}
</script>