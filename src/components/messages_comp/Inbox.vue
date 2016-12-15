<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="col-md-8 col-sm-12" >
				<h4>Inbox</h4>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="input-group">
		      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Search">
		      <div class="input-group-addon">
		      	<i class="fa fa-search"></i>
		      </div>
		    </div>
			</div>
			<div class="col-md-12">
				<form class="form-inline">
					<div class="form-group">				   
					  <div class="checkbox">
					    <label>
					      <input type="checkbox"> 
					    </label>
					  </div>
				  </div>
				  <div class="form-group">
				    <select class="form-control">
						  <option>All</option>
						  <option>20</option>
						  <option>50</option>
						  <option>100</option>
						</select>
				  </div>
				  <div class="form-group">
				   <button class="btn btn-default">
				   	<i class="fa fa-refresh"></i>
				   </button>
				  </div>

				  <div class="form-group">
				   	<div class="btn-group" role="group" aria-label="...">
						  <button type="button" class="btn btn-default">
						  	<i class="fa fa-archive"></i>
						  </button>
						  <button type="button" class="btn btn-default">
						  	<i class="fa fa-info-circle"></i>
						  </button>
						  <button type="button" class="btn btn-default">
						  	<i class="fa fa-trash"></i>
						  </button>
						</div>
				  </div>
				  <div class="form-group pull-right">
				  	<label class="showing">
				  		Showing 50 from 1200
				  	</label>
				   	<div class="btn-group" role="group" aria-label="..."> 
						  
						  <button type="button" class="btn btn-default">
						  	<i class="fa fa-angle-left"></i>
						  </button>
						  <button type="button" class="btn btn-default">
						  	<i class="fa fa-angle-right"></i>
						  </button>
						</div>
				  </div>
				</form>
				<table class="table table-hover">
					<tbody>
						<tr class="unread"><!--Uread Message-->
							<td>	
								<label>
						      <input type="checkbox"> 
						    </label>
							</td>
							<td>
								Pandhu Weni
							</td>
							<td>
								<span></span>
								Protes vote berkala tidak jelas sekali
							</td>
							<td>
								tanggal / jam
							</td>
						</tr>
						<tr><!--Uread Message-->
							<td>
								<label>
						      <input type="checkbox"> 
						    </label>
							</td>
							<td>
								Pandhu Weni
							</td>
							<td>
								<span></span>
								Protes vote berkala tidak jelas sekali
							</td>
							<td>
								tanggal / jam
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'inbox'
	}
</script>

<style scoped>
	form.form-inline{
		padding-left:8px !important;
		margin:12px 0px;
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
</style>