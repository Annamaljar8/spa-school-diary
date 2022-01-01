<template>
  <div class="dashboard">
    <header-new />
    <calendar />
  </div>
</template>

<script>
  import HeaderNew from '../components/HeaderNew'
  import Calendar from '../components/Calendar'

  export default {
    name: 'Dashboard',

    components: {
      HeaderNew,
      Calendar
    },
  }
</script>