<template>
	<div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
        	<div class="col-md-12 col-sm-12">
            <div class="form-group">            
              <h4 class="title">
              	{{detail.title}}              	
              		<a href="#" @click.stop.prevent="goToEditPage(detail.id)">
              			<i class="fa fa-edit pull-right"></i>
              		</a>
              </h4>
              <hr>
            </div>
        		
        	</div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <h4>Description</h4>
              <p class="description">{{detail.description}}</p>
            </div>
            <div class="form-group">
              <h4>Created At</h4>
              <p class="description">{{convertDate(detail.created_at)}}</p>
            </div>
            <div class="form-group">
              <h4>Feature Image</h4>
              <div class="col-xs-12 col-md-12 featured-image">
						    <a href="#" class="thumbnail">
						    	<img 
						    	src="http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716">
						    <!-- 	<img v-else v-bind:src="detail.image">	 -->					      
						    </a>
						  </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
           <div class="form-group">
              <h4>Status</h4>
              <span class="label" :class="labelColor">{{statusVote}}</span>
              <br>
              <h5>Available from <strong>{{detail.started_at}}</strong> until <strong>{{detail.ended_at}}</strong></h5>
            </div>
            <div class="form-group">
              <h4>Options</h4>
              <div class="list-group">
							  <a href="#" class="list-group-item"  v-for="option in options" data-toggle="modal" data-target="#myModal" @click="showModalOption(option.id)">
							   <div class="media"  >
									  <div class="media-left">
									      <img class="media-object" v-if="option.image == ''" 
									      src="http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716">
									      <img class="media-object" v-else v-bind:src="option.image">
									  </div>
									  <div class="media-body">
									    <h4 class="media-heading">{{option.options}}</h4>
									    <ul>
									    	<li>
									    		<span>Percentage</span>: {{option.percentage}}
									    	</li>
									    	<li>
										    	<span>Total Vote</span>:	{{option.total_voter}}
									    	</li>
									    </ul>
									  </div>
									</div>
							  </a>
							</div>
            </div>         
          </div>     
        </div>
      </div>


			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="myModalLabel">Detail Option</h4>
			      </div>
			      <div class="modal-body">
			        	<router-view>
								</router-view>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>		
    </div>    
  </div>
  {{message}}
</template>

<script>
	var request = require('superagent');
	var dateFormat = require('dateformat');
	export default{
		name: 'VoteRead',
		data(){
			return{
				detail: [],
				options: [],
				messages: '',
				idOption: '',
				modalOption: [],
				labelColor:'',
				statusVote:''
			}
		},
		methods: {
			convertDate(converted_date) {
				var dateFull = dateFormat(converted_date, "mmm dS yyyy, h:MM TT");
				return dateFull;
			},
			readDetailVote(){
        self = this;
        var id = this.$route.params.id
        var token = localStorage.getItem('token')
        request.get("http://electa-engine.herokuapp.com/votes/details/"+id)
            .set({'Content-Type': 'application/jsonp'})
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .end(function(err,res){
              if(err){
                console.log(err)
              }else{
                if(res.status=200){
                  console.log(res)
                  self.detail = res.body.data
                  self.options = res.body.data.options
                  self.messages = "messages="+res.body.status
                  self.getStatus(id)
                }else{
                  console.log(request)
                }
              }
            });
      },
      goToEditPage(id){
      	this.$router.push({ name: 'votelist_edit', params: { id: id }});
      },
      getStatus(id){
      	var now = new Date()
      	var nows = dateFormat(now)
      	console.log(nows)
      	if(this.detail.ended_at < nows && this.detail.started_at > nows){
      		this.statusVote = "Open"
      		this.labelColor = "label-success"
      	}else{
      		this.statusVote = "Closed"
      		this.labelColor = "label-danger"
      	}
      }
		},
		created: function(){
			this.readDetailVote();
		}
	}
</script>

<style scoped>
	.form-group label{
		font-weight: 100
	}
	.title{
		color: rgba(0,128,128,.8);
		font-size: 28px;
	}
	.description{
		text-align: justify;
		text-indent: 36px;
	}
	.media-object{
		max-width: 80px;
		max-height: auto;
	}
	ul{
		list-style-type: square;
		padding-left: 16px;
	}
	li span{
		width: 200px !important;
	}
	.featured-image{
		padding: 0px;
	}
</style>