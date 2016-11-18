<template>
	<el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
	  <el-menu-item index="1">
	  	<i class="material-icons">menu</i>
	  </el-menu-item>
	  <el-menu-item index="2" class="right">
	  	<i class="material-icons">account_circle</i>
	  </el-menu-item>
	  <el-menu-item index="3" class="right">
	  	<i class="material-icons">search</i>
	  </el-menu-item>	  
	  <el-menu-item index="4" class="right">
	  	<i class="material-icons">notifications</i>
	  </el-menu-item>
	</el-menu>
</template>

<script>
  export default {
  	name: 'navbar',
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
</style>