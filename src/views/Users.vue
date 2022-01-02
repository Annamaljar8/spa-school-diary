<template>
  <div class="library">
    <header-new />
    <users-table />
  </div>
</template>

<script>
  import HeaderNew from '../components/HeaderNew'
  import UsersTable from '../components/UsersTable'

  export default {
    name: 'Library',

    components: {
      HeaderNew,
      UsersTable
    },
  }
</script>