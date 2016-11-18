<template>
  <div id="app">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
  </div>
</template>

<script>

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'app',
  components: {
    Navbar, Sidebar
  },
  data()  {
    return{
    }
  }
}
</script>

<style>
</style>
