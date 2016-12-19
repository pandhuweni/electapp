<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8 col-sm-12 " >
					<h4>Read Message</h4>
				</div>
			  <div class="form-group col-md-6 col-sm-12">
			    <label>From</label>
			    <p>{{detail.from_name}}</p>
			  </div>	
			  <div class="form-group  col-md-6 col-sm-12">
			    <label>Date</label>
			    <p>{{convertDate(detail.created_at)}}</p>
			  </div>	
				  
			  <div class="col-md-12 col-sm-12">
			  	<div class="form-group">
				    <label>Subject</label>
				    <p>{{detail.subject}}</p>
				  </div>
				  <hr>
				  <div class="form-group">
			  		{{detail.message}}
			  	</div>
				  <hr>
				  <button type="submit" class="btn btn-default" @click="replyMessage">
				  	<i class="fa"  :class="isSendProgress"></i>
				  	{{isButtonSending}}
				  </button>
				  <p>{{messages}}</p>
				</div>				  
			</div>			   
		</div>
	</div>		
</template>

<script>
	var request = require('superagent');
	var dateFormat = require('dateformat');
	export default{
		name: 'read',
		data(){
			return {
				messages:'',
				detail: {},
				isSendProgress: '',
				isButtonSending: ''
			}
		},
		methods: {
			convertDate(converted_date) {
				var dateFull = dateFormat(converted_date, "mmm dS yyyy, h:MM TT");
				return dateFull;
			},
			readMessage(){
        self = this;
        var id = this.$route.params.id
        var token = localStorage.getItem('token')
        request.get("http://electa-engine.herokuapp.com/users/messages/"+id)
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
                  self.messages = "messages="+res.body.status
                }else{
                  console.log(request)
                }
              }
            });

      },
      replyMessage(){

      }
		},
		created: function(){

			this.isButtonSending="Reply";
			this.isSendProgress="fa-reply"
			this.readMessage();
		}
	}
</script>

<style scoped>

</style>