<template>
	<div class="panel panel-default">
    <div class="panel-heading">
      <h4> {{title}}</h4>
    </div>
    <div class="panel-body">
    	<ul class="card">
    		<li v-for="item in items">
    			{{item}}
    		</li>
    	</ul>
    </div>
  </div>
</template>
<script>
export default {
	name: 'card',
	props: ['title', 'items'], 
	data() {
		return {
			
		}
	}
}
</script>
<style>
	.card {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>