<template>
  <div class="library">
    <header-new />
    <library-store />
  </div>
</template>

<script>
  import HeaderNew from '../components/HeaderNew'
  import LibraryStore from '../components/LibraryStore'

  export default {
    name: 'Library',

    components: {
      HeaderNew,
      LibraryStore
    },
  }
</script>