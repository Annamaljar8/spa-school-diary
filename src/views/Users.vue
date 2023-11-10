<template>
  <div class="library">
    <header-new />
    <users-table v-if="(getUserType === 'teacher')"/>
    <pupil-user-profile v-if="(getUserType === 'pupil')"/>
  </div>
</template>

<script>
  import * as types from '@/store/types'; 
  import { mapGetters } from 'vuex';
  import HeaderNew from '../components/HeaderNew'
  import PupilUserProfile from '../components/PupilUserProfile.vue'
  import UsersTable from '../components/UsersTable'

  export default {
    name: 'Library',

    components: {
      HeaderNew,
      UsersTable,
      PupilUserProfile
    },
    computed: {
      ...mapGetters ({
        getUserType: types.USER_TYPE,
      }),
    }
  }
</script>