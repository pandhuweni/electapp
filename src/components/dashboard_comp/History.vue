<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4>{{title}}</h4>
		</div>
		<div class="panel-body history-wrapper">
			<div  class="list-group">
			  <a v-for="item in items" class="list-group-item">{{item.data}}</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['items', 'title'],
		name: 'history',
		data() {
			return {

			}
		}
	}
</script>
<style>
.history-wrapper {
	height: 300px;
	overflow-y: scroll;
}
</style>