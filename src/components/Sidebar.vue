<template>
	<div>
		<div class="col-md-2">
			<ul class="nav nav-pills nav-stacked">
			  <li role="presentation" class="active"><a href="#">Home</a></li>
			  <li role="presentation"><a href="#">Profile</a></li>
			  <li role="presentation"><a href="#">Messages</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
  export default {
  	name: 'sidebar'
}
</script>

<style>
.col-md-2{
	padding: 0px;
	height: 100% !important;
	z-index: 1;
}
*{
	border:none;
	border-radius:0px !important;
}
</style>