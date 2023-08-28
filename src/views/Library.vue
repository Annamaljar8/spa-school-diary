<template>
  <div class="library">
    <header-new />
    <library-store  v-if="(getUserType === 'teacher')"/>
    <pupil-library-store  v-if="(getUserType === 'pupil')"/>
  </div>
</template>

<script>
import HeaderNew from '../components/HeaderNew'
import LibraryStore from '../components/LibraryStore'
import PupilLibraryStore from '../components/PupilLibraryStore'
import * as types from '@/store/types'; 
import { mapGetters } from 'vuex';

export default {
  name: 'Library',

  components: {
    HeaderNew,
    LibraryStore,
    PupilLibraryStore
  },
    computed: {
    ...mapGetters ({
      getUserType: types.USER_TYPE,
    }),
  },
}
</script>