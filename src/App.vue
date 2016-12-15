<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data()  {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    checkAuth(){
      var auth_token = localStorage.getItem('token')
      if(auth_token == null){
        this.isLoggedIn = false
        this.$router.push('login')
      }else{
        this.isLoggedIn = true
        this.$router.push('dashboard')
      } 
    }
  },
  created: function(){
    this.checkAuth();
  }
}
</script>

<style scoped>
</style>
