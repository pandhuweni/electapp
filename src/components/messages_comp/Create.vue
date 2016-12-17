<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8 col-sm-12 " >
					<h4>Compose Message</h4>
				</div>
				<div class="col-md-12 col-sm-12">
					
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'create'
	}
</script>

<style scoped>
	form.form-inline{
		margin:12px 0px;
	}
	.pull-right{
		margin-right: 0px !important;
		margin-left: 4px;
	}
	.form-group{
		margin-right:8px;
	}
	.btn .fa{
		color:rgba(0,0,0,.6);
	}
	.btn .fa:hover{
		color:rgba(0,0,0,.7);
	}
	label.showing{
		color:rgba(0,0,0,.5);
		font-variant:normal;
		font-weight:100;
	}
	.panel-body{
		padding-top:12px !important;
	}
	.unread{
		background-color:rgba(0,128,128,.075);
	}
	tr:hover{
		cursor:pointer;
	}
	td{
		line-height: 25px !important;
		min-height: 48px !important;
	}
	.checkbox.select-all{
		margin-left: 8px;
	}
	/*responsive */
	@media(max-width: 768px){
		.input-group{
			padding-bottom: 10px;
			margin-bottom: 10px !important;
		}
	}
</style>