<template>
		<div class="container">
	    <div class="row">
	        <div class="col-sm-6 col-md-4 col-md-offset-4">
	            <h1 class="text-center login-title">Sign in to Electa</h1>
	            <div class="account-wall">
	                <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120s"
	                    alt="">
	                <form class="form-signin">
	                <input type="text" class="form-control" v-model="email" placeholder="Email" required  autofocus>
	                <input type="password" v-model="password" class="form-control" placeholder="Password" required>
	                <button class="btn btn-lg btn-primary btn-block" type="submit" @click.stop.prevent='login' >
                    <i :class="inLoginProgress"></i>
	                    {{loginButton}}
                  </button>
	                <label class="checkbox pull-left remember">
	                    <input type="checkbox" value="remember-me">
	                    Remember me
	                </label>
	                <a href="#" class="pull-right need-help">
                        Need help?
                    </a>
                    <span class="clearfix"></span>
	                </form>
	            </div>
	            <a  class="text-center new-account">Create an account </a>
	        </div>
	    </div>
		</div>
</template>

<script>
  var request = require('superagent')
  export default {
  	name: 'login',
    data(){
      return{
        loginButton: 'Login',
        inLoginProgress: '',
        email: '',
        password: ''
      }
    },
    watch: {
        title () {
            // only used when the title changes after page load
            document.title = this.title;
        }
    },
  	methods: {
		    checkAuth(){
		      var auth_token = localStorage.getItem('token')
		      if(auth_token == null){
		        this.isLoggedIn = false
		        this.$router.push({name:'login'})
		      }else{
		        this.isLoggedIn = true
		        this.$router.push({name:'dashboard'})
		      }
		    },
        login(){
          self = this;
          self.inLoginProgress = 'fa fa-spinner fa-pulse fa-fw';
          self.loginButton = 'Loading...';
          var req_body = {
            'email': self.email,
            'password': self.password
          }
          console.log(req_body)
          request.post("http://electa-engine.herokuapp.com/users/sessions")
            .set({'Content-Type': 'application/json'})
            .set({'crossDomain': true})
            .send(req_body)
            .end(function(err,res){
              if (err) {
              self.isLoginProgress = '';
              console.log("Error Login");
              console.log(err);
              }
              if (res.status==200) {
                self.isLoginProgress = '';
                localStorage.clean;
                localStorage.setItem('token', res.body.data.authentication_token);
                self.$router.push({ name: 'dashboard'});
              }else {
                self.isLoginProgress = '';
                alert('Invalid username or password!')
                console.log("Password Salah");
              }
          });
        }
		  },
		  created: function(){
		    this.checkAuth();
		  }
		}

</script>
<style scoped>
.btn-primary{
  background-color: rgba(0,128,128,.8);
}
	.form-signin

{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title
{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.need-help
{
    margin-top: 10px;
}
.new-account
{
    display: block;
    margin-top: 10px;
}
label.remember{
    margin-left: 20px;
    line-height:25px;
}
label.remember input{
    margin-right: 4px;
}
.btn-primary:active{
    background-color:rgba(0,128,128,1) !important;
}
a, a:hover, a:focus, a:active{
    color: rgba(0,128,128,.8);
    text-decoration: none;
    cursor: pointer;
}
a:hover{
    color: rgba(0,128,128,1);
}
</style>
