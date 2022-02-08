<template>
  <div class="library">
    <header-new />
    <library-store  v-if="(getUserType === 'teacher') || (getUserType === 'pupil')"/>
  </div>
</template>

<script>
import HeaderNew from '../components/HeaderNew'
import LibraryStore from '../components/LibraryStore'
import * as types from '@/store/types'; 
import { mapGetters } from 'vuex';

export default {
  name: 'Library',

  components: {
    HeaderNew,
    LibraryStore
  },
    computed: {
    ...mapGetters ({
      getUserType: types.USER_TYPE,
    }),
  },
}
</script>