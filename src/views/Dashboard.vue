<template>
  <div class="dashboard">
    <header-new />
    <calendar v-if="(getUserType === 'teacher') || (getUserType === 'pupil')"/>
  </div>
</template>

<script>
import HeaderNew from '../components/HeaderNew'
import Calendar from '../components/Calendar'
import * as types from '@/store/types'; 
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',

  components: {
    HeaderNew,
    Calendar
  },
  computed: {
    ...mapGetters ({
      getUserType: types.USER_TYPE,
    }),
  },
}
</script>