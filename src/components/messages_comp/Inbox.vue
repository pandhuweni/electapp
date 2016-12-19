<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8 col-sm-12 " >
					<h4>Inbox</h4>
				</div>
				<div class="col-md-4 col-sm-12">
					<div class="input-group">
			      <input type="text" class="form-control" placeholder="Search">
			      <div class="input-group-addon">
			      	<i class="fa fa-search"></i>
			      </div>
			    </div>
				</div>
				<div class="col-md-12 col-sm-12">
					<form class="form-inline">
						<div class="form-group">
						  <div class="checkbox select-all">
						    <label>
						      <input type="checkbox"> <span class="hidden-lg hidden-md">Select All</span>
						    </label>
						  </div>
					  </div>
					  <div class="form-group">
					    <select class="form-control" v-model="selected">
						    <option v-for="option in options" v-bind:value="option.value">
							    {{ option.text }}
							  </option>
							</select>
					  </div>
					  <div class="form-group">
						   <button class="btn btn-default" @click.stop.prevent="getAllMessages(selected)">
						   	<i class="fa fa-refresh"></i>
						   </button>
						   <div class="btn-group" role="group" aria-label="...">
							  <button type="button" class="btn btn-default">
							  	<i class="fa fa-archive"></i>
							  </button>
							  <button 
							  	type="button" 
							  	class="btn btn-default" 
							  	@click.stop.prevent="deleteMessage(checkedMessage)"
							  >
							  	<i class="fa fa-trash"></i>
							  </button>
							</div>
								<div class="btn-group visible-sm-inline-block visible-xs-inline-block pull-right" role="group" aria-label="...">
							  <button type="button" class="btn btn-default">
							  	<i class="fa fa-angle-left"></i>
							  </button>
							  <button type="button" class="btn btn-default">
							  	<i class="fa fa-angle-right"></i>
							  </button>
							</div>
					  </div>
					  <div class="form-group pull-right hidden-sm hidden-xs">
					  	<label class="showing">
					  		Showing {{start}} to {{ end }} from {{ total }}
					  	</label>
					   	<div class="btn-group" role="group" aria-label="...">

							  <button type="button" class="btn btn-default" @click.stop.prevent="decrementPage">
							  	<i class="fa fa-angle-left"></i>
							  </button>
							  <button type="button" class="btn btn-default" @click.stop.prevent="incrementPage">
							  	<i class="fa fa-angle-right"></i>
							  </button>
							</div>
					  </div>
					</form>

					<center>
						<p><i :class="loadSpin"></p>
					</center>
					<table class="table table-hover">
						<tbody>
							<tr class="unread" v-for="data in messages"><!--Uread Message-->
								<td>
									<label>
							      <input type="checkbox" 
							      	v-bind:value="data.id"
							      	v-model="checkedMessage"
							      >
							    </label>
								</td>
								<td  @click.stop.prevent="readMessage(data.id)">
									{{data.from_name}}
								</td>
								<td  @click.stop.prevent="readMessage(data.id)">
									{{data.subject}}
								</td>
								<td  @click.stop.prevent="readMessage(data.id)">
									{{convertDate(data.created_at)}}
								</td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>
		</div>
		{{selected}}
		{{checkedMessage}}
		{{page}}
	</div>
</template>

<script>
var request = require('superagent');
var dateFormat = require('dateformat');
	export default {
		name: 'inbox',
		data() {
			return{
				messages: [],
				page: '',
				getStatus:'',
				message: '',
				loadSpin: '',
				count: '',
				start: '',
				end: '',
				total: '',
				selected: '',
		    options: [
		      { text: '20', value: '20' },
		      { text: '50', value: '50' },
		      { text: '100', value: '100' }
		    ],
		    checkedMessage: []
			}
		},
		watch: {
			selected: function(){
				this.getAllMessages(this.selected, this.page)
				localStorage.setItem('selectedCount',this.selected)
			},
			page: function(){
				this.getAllMessages(this.selected, this.page)
			}
		},
		methods:{
			convertDate(converted_date) {
				var dateFull = dateFormat(converted_date, "mmm dS yyyy, h:MM TT");
				return dateFull;
			},
			readMessage(id){
				this.$router.push({ name: 'read', params: { id: id }});
			},
			decrementPage(){
				if(this.page -1 <= 0){
					this.page = this.page;
				}else{
					this.page = this.page - 1
				}
			},
			incrementPage(){
				if(this.total < parseInt(this.count) * this.page){
					this.page = this.page;
				}else{
				  this.page = this.page + 1;
				}
			},
			getAllMessages(limit_count, page_no){
				self = this;
				self.loadSpin="fa fa-spinner fa-pulse fa-fw";
				var auth_token = localStorage.getItem('token')
				request.get("http://electa-engine.herokuapp.com/users/messages?page="+page_no+"&limit="+limit_count)
      		.set({'Content-Type': 'application/json	'})
      		.set({'Authorization': 'Token token='+auth_token})
      		.set({'crossDomain': true})
      		.end(function(err,res){
      			if(err){
      				console.log(err)
      			}else{
      				if(res.status==200){
      					console.log(res)
      					self.messages = res.body.data.messages
      					self.total = res.body.data.total
      					self.count = res.body.data.count
      					self.start = parseInt(self.selected)*(parseInt(page_no)-1)+1
      					self.end = parseInt(self.count)+self.start-1
      					self.message = "Fetch="+res.body.status
      					self.loadSpin=''
      				}else{
      					console.log(res)
      					self.loadSpin ='fa fa-window-close'
      				}
      			}
      		});
				}
			},
			created: function(){
				var selCount = localStorage.getItem('selectedCount')
				this.page = 1
				if(selCount == null){
					this.selected = 20	
				}else{
					this.selected = selCount
				}
				this.getAllMessages(this.selected, this.page)
		}

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
