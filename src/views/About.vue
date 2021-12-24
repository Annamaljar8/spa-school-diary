<template>
  <div class="about">
   
    <div id="nav">
      
      <!-- <router-link to="/">Home</router-link> | -->
      
    </div>
    <!-- <h1>This is an about page</h1> -->
   <header-new />
  </div>
    
</template>

<script>
  import HeaderNew from '../components/HeaderNew'

  export default {
    name: 'About',

    components: {
      HeaderNew,
    },
  }
</script>