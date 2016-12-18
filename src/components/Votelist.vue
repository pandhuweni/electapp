<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-9 col-sm-12">
				<h3>Votelist</h3>
			</div>
			<div class="col-md-3 col-sm-12">
				<router-link :to="{ name: 'votelist_index'}">
					<button class="btn btn-primary add-vote pull-right hidden-sm hidden-xs" >
						<i class="fa fa-plus"></i> Add Vote
					</button>
				</router-link>
				<router-link :to="{ name: 'votelist_index'}">
					<button class="btn btn-primary add-vote btn-block hidden-md hidden-lg" >
						<i class="fa fa-plus"></i> Add Vote
					</button>
				</router-link>
			</div>
		</div>
		<div class="row">
			<router-view></router-view>
		</div>
		<p>
			{{message}}
		</p>
	</div>
</template>

<script>
var request = require('superagent');
  export default {
	  	name: 'Votelist',
	  	props: [],
		data() {
			return{
				votes: [],
				page: 1,
				limit: 10,
				message: ''
			}
		},
		components: {
		},
		methods:{
			goto(){}
		}
	}
</script>

<style scoped>
.container-fluid{
	padding-left: 16px;
}
.btn.add-vote{
	margin-top: 16px;
	margin-bottom: 16px;
}
.btn-primary{
	background-color:rgba(0,128,128,.9) ;
}
.btn-primary:focus{
	background-color:rgba(0,128,128,.9) ;
}
.btn-primary:active{
	background-color:rgba(0,128,128,.9) ;
}
.btn-primary:hover{
	background-color:rgba(0,128,128,1) ;
}
label{
	padding-left: 0px !important;
}
.control-label{
	line-height: 30px;
	margin-left: 12px;
}
table{
	margin-top: 16px;
}
@media(max-width: 767px){
	.btn-xs{
		margin-bottom: 5px;
	}
}
</style>
