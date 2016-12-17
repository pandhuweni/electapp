<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8 col-sm-12 " >
					<h4>Compose Message</h4>
				</div>
				<div class="col-md-12 col-sm-12">
					<div class="alert alert-danger alert-dismissible" role="alert" hidden>
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					  <strong>Failed to send message!</strong>
					</div>
					<div class="alert alert-success alert-dismissible" role="alert" hidden>
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					  <strong>Failed to send message!</strong>
					</div>
					<div class="alert alert-danger alert-dismissible" role="alert" hidden>
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					  <strong>Failed to send message!</strong>
					</div>
				  <div class="form-group">
				    <label>To</label>
				    	<input type="text" class="form-control" placeholder="Username" value="" v-model="toValue">
				    <label class="label-below">example: john.doe</label> 
				  </div>
				  <div class="form-group">
				    <label>Subject</label>
				    	<input type="text" class="form-control" placeholder="Subject " value="" v-model="subjectValue">
				    <label class="label-below">example: Protes Vote Berkala Tidak Jelas Sekali</label> 
				  </div>
				  <div class="form-group">
				  	<label>Message Content</label>
				  	<textarea class="form-control" v-model="contentValue">
				  		
				  	</textarea>
				  </div>
				  <button type="submit" class="btn btn-default" @click="sendMessages">
				  	<i class="fa"  :class="isSendProgress"></i>
				  	{{isButtonSending}}
				  </button>
				  <p>{{toValue}}</p>
				  <p>{{subjectValue}}</p>
				  <p>{{contentValue}}</p>
				  <p></p>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
  var request = require('superagent')
	export default {
		name: 'create',
		data(){
			return{
				isSendProgress: '',
				isButtonSending: '',
				toValue:'',
				subjectValue:'',
				contentValue:''
			}
		},
		methods: {
			sendMessages(){
				self = this;
        self.isSendProgress = 'fa-spinner fa-pulse fa-fw';
        self.isButtonSending = 'Sending...';  
        var auth_token = localStorage.getItem('token');        
        var req_body = {
          'to': self.toValue,
          'subject': self.subjectValue,
          'message': self.contentValue
        }
        request.post("https://electa-engine.herokuapp.com/users/messages")
          .set({'Content-Type': 'application/json'})
          .set({'Authorization': 'Token token='+auth_token})
          .set({'crossDomain': true})
          .send(req_body)
          .end(function(err,res){
            if (err) {
            self.isLoginProgress = '';
            console.log("Network Failed");
            console.log(err);
            }
            if (res.status==201) {
              self.isLoginProgress = '';
              self.$router.push({ name: 'inbox'});
              console.log("Succes Sending Message")
            }else {
              self.isLoginProgress = '';
              console.log("Failed Send");
            }

		        self.isSendProgress = 'fa-paper-plane';
		        self.isButtonSending = 'Send'; 
        });
      }
		},
		created: function(){
			this.isButtonSending="Send";
			this.isSendProgress="fa-paper-plane"
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
	.label-below{
		font-size: 10px;
		font-weight: 100;
	}
	/*responsive */
	@media(max-width: 768px){
		.input-group{
			padding-bottom: 10px;
			margin-bottom: 10px !important;
		}
	}
</style>