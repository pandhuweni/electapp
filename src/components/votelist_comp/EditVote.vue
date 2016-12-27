<template>
	<div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
        	<div class="col-md-12 col-sm-12 form-horizontal">
            <div class="form-group">  
              	<div class="col-md-12 col-sm-12">
            			<h4>Title</h4>
              		<input  
              			v-model="detail.title"
			            	class="input-lg form-control" 
			            	/>	
              	</div>
              <hr>
            </div>        		
        	</div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <h4>Description</h4>
              <textarea class="form-control" rows="3" v-model="detail.description"></textarea>
            </div>
            <div class="form-group">
              <h4>Created At</h4>	
              <p class="description">{{convertDate(detail.created_at)}}</p>
            </div>            
            <div class="form-group">
              <h4>Category</h4>
              <category :catList="categories" :selectedCat="detail.category_id"></category>
            </div>
            <div class="form-group">
              <label>Featured Image</label>
              <input v-if="!image"  type="file" @change="onFileChange" class="btn btn-primary btn-block" />
               <div class="col-xs-12 col-md-12 featured-image">
                <div href="#" class="thumbnail">
                  <a v-if="image"  href="#" @click.stop.prevent="removeImage" class="btn btn-default btn-sm pull-right absolute-top">
                    <i class="fa fa-close"></i>
                  </a>
                  <img  v-if="!image" src="http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716">
                  <img  v-else="image" :src="image">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
           <div class="form-group">
              <h4>Status</h4>
              <span class="label" :class="labelColor">{{statusVote}}</span>
              <br>

              <h5>Available from {{startDate}}</h5>

              <input  type="text" id="idStart" name="dateStart" class="form-control" v-model="startDate"/>
              <!-- <input  type="text" name="daterange" v-bind:value="convertShortDate(detail.started_at)"  class="form-control" /> -->
              <h5>Until {{endDate}}</h5>
              <input type="text" name="dateEnd" class="form-control"  id="idEnd"/>
            </div>
            <div class="form-group">
              <h4>Options
              	<sup>*</sup>
              	<br>
              	<small>*) You can't edit the options</small>
              </h4>
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

        	<div class="col-md-12 col-sm-12 pull-right">
        		<button class="btn btn-primary pull-right hidden-sm hidden-xs" href="#" @click.stop.prevent="editVote(detail.id)">
							<i class="fa fa-check"></i>
							Finish
						</button>
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
	import category from './Category'
	var request = require('superagent');
	var dateFormat = require('dateformat');
	export default{
		name: 'editvote',
		components: {
			category
		},
		data(){
			return{
				detail: [],
				options: [],
				messages: '',
				idOption: '',
				modalOption: [],
				labelColor:'',
				statusVote:'',
				title:'',
				image:'',
				startDate:'',
				endDate:'',
				categories: [],
				selected:'',
				category1:''
			}
		},
		mounted(){
			this.getAllCategories();
			$(function() {
		    $('input[name="dateStart"]').daterangepicker({
		        singleDatePicker: true,
		        showDropdowns: true
		    });
		    $('input[name="dateEnd"]').daterangepicker({
		        singleDatePicker: true,
		        showDropdowns: true
		    });
			});	
		},
		computed:{
			category: function(){
				return this.$store.state.selectedCategoryEdit
			}
		},
		watch:{
			category:function(){
				return category
			}
		},
		methods: {
			convertDate(converted_date) {
				var dateFull = dateFormat(converted_date, "mmm dS yyyy, h:MM TT");
				return dateFull;
			},
			convertShortDate(converted_date){
				var dateShort = dateFormat(converted_date, "mm/dd/yyyy");
				console.log("dateshort "+dateShort);
				return dateShort;
			},
			convertAcceptedDate(converted_date){
				var acceptedDate = dateFormat(converted_date, "yyyy/mm/dd");
				console.log("accepted "+acceptedDate);
				return acceptedDate;
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
                  self.image = res.body.data.vote_pict_url
                  self.messages = "messages="+res.body.status
                  self.getStatus(id)
                }else{
                  console.log(request)
                }
              }
            });
      },
      editVote(id){
      	self = this;
        var id = this.$route.params.id
        var token = localStorage.getItem('token')
        console.log("desc "+self.detail.description)
        console.log("title "+self.detail.title)
        var req_body = {
        	'title': self.detail.title,
        	'description': self.detail.description,
        	'vote_category_id': self.category,
        	'started_at': self.convertAcceptedDate($('#idStart').val()),
        	'ended_at': self.convertAcceptedDate($('#idEnd').val())
        }	
        request.patch("http://electa-engine.herokuapp.com/users/vote/"+id)
            .set({'Content-Type': 'application/json'})
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .send(req_body)
            .end(function(err,res){
              if(err){
                console.log(err)
              }else{
                if(res.status=200){
                  console.log(res.status)
                  console.log(self.detail.description)
                 	console.log(self.detail.title)
            			self.$router.push({ name: 'votelist_read'})
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
      	console.log(this.detail.status)
      	console.log("date"+this.detail.ended_at)
      	if(this.detail.status == "open"){
      		this.statusVote = "Open"
      		this.labelColor = "label-success"
      	}else{
      		this.statusVote = "Closed"
      		this.labelColor = "label-danger"
      	}
      },
      onFileChange(e) {
	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length)
	        return;
	        this.createImage(files[0]);
	    },
	    createImage(file) {
	      var image = new Image();
	      var reader = new FileReader();
	      var vm = this;

	      reader.onload = (e) => {
	        vm.image = e.target.result;
	      };
	      reader.readAsDataURL(file);
	      console.log(image)
	    },
	    removeImage: function (e) {
	      this.image = '';
	    },
	    getAllCategories(){
	      self = this;
	      request.get("https://electa-engine.herokuapp.com/votes/categories")
	        .set({'Content-Type': 'application/json'})
	        .end(function(err,res){
	          if (err) {
	          console.log("Error Get Category");
	          console.log(err);
	          }
	          if (res.status==200) {
	            console.log(res)
	            self.categories = res.body.data.categories
	            console.log(self.categories)
	          }else {
	            console.log(res)
	          }
	      });
	    }

		},
		created: function(){
			this.readDetailVote();
			console.log("token "+localStorage.getItem('token'))			
		}
	}
</script>

<style scoped>
  .btn-primary{
   background-color:rgba(0,128,128,.9) ;
   border-width: 0px;
   margin-bottom: 10px;
  }
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

  .absolute-top{
    position: absolute;
    right: 5px;
    top: 5px;
    border-color: transparent !important;
    border-radius: 0px;
  }
</style>