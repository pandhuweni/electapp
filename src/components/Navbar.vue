<template>
<div>
	<nav class="navbar navbar-inverse navbar-fixed-top" id="main-nav" >
	  <div class="container-fluid ">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header" >	
	      <button type="button" class="navbar-toggle hidden-lg hidden-md" 
	      @click="sideNavToggle">
	        <span class="sr-only">Toggle navigation</span>
		    <i class="fa fa-bars"></i>
	      </button>
	       <a class="navbar-brand" href="#">
	      	Electapp
	      </a>
	     
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	      <ul class="nav nav-pills navbar-right  hidden-sm hidden-xs">
	        <li class="active">
	        	<a href="#">
	        		<i class="fa fa-search"></i>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-bell-o"></i>
	        	</a>
	        </li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	         	<i class="fa fa-user-o"></i>
	          </a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Profile</a></li>
	            <li><a href="#">Setting</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">Logout</a></li>
	          </ul>
	        </li>
	      </ul>
	  </div>
	</nav>	

	<!--Bottom Navbar-->
	<ul class="nav navbar-inverse nav-pills nav-justified navbar-fixed-bottom visible-sm-inline-block visible-xs-inline-block">
        <li class="active">
        	<a href="#">
        		<i class="fa fa-search"></i>
        	</a>
        </li>
        <li>
        	<a href="#">
        		<i class="fa fa-bell-o"></i>
        	</a>
        </li>

        <li>
        	<a href="#">
        		<i class="fa fa-user-o"></i>
        	</a>
        </li>
      </ul>
	

      <!--side navbar-->
      <div class="sidenav navbar-inverse" id="sidenav">
      	<ul class="nav nav-pills nav-stacked sidenavul">
	        <li>
	        	<router-link :to="{ name: 'dashboard'}">
	        		<i class="fa fa-dashboard" ></i>
								<transition name="fade">
				    				<span>Dashboard</span>
								</transition>
	        	</router-link>
	        </li>
	        <li>
	        	<router-link :to="{ name: 'votelist'}">
	        		<i class="fa fa-list-ul"></i>
								<transition name="fade">
									<span>Vote List</span>
								</transition>
	        	</router-link>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-line-chart"></i>
					<transition name="fade">
	        			<span>Statistic Data</span>
					</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-magic"></i>
					<transition name="fade">
	        			<span>Analysis</span>
					</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-file-text-o"></i>
					<transition name="fade">
	        			<span>Report</span>
					</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-envelope-o"></i>
					<transition name="fade">
	        			<span>Inbox</span>
					</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-gear"></i>
					<transition name="fade">
	        			<span>Setting</span>
					</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-question-circle-o"></i>
					<transition name="fade">
	        			<span>Help</span>
					</transition>
	        	</a>
	        </li>
	      </ul>      	
      </div>
</div>
	
</template>

<script>
  export default {
  	name: 'navbar',
	data() {
		return{
			isSideNavActive: true,
		}
	},
    methods: {
			sideNavToggle() { 
				$('#sidenav').toggleClass('showNav',100);
			}
    }
  }

</script>

<style>
	*{
		border-radius: 0px !important;
	}

	/* animatio*/
	@-webkit-keyframes navTrans {
	    0%   {left: -200px;}
	    25%  {left: -170px;}
	    50%  {left: -150px;}
	    75%  {left: -100px;}
	    100% {left: 0px;}
	}

	/* Standard syntax */
	@keyframes navTrans {
	    0%   {left: -200px;}
	    25%  {left: -170px;}
	    50%  {left: -150px;}
	    75%  {left: -100px;}
	    100% {left: 0px;}
	}
	.navbar{
		border:none !important;
		min-height: 48px !important;
		height: 48px;
	}
	.col-md-2{
		padding: 0px;
	}
	.collapsed-coy{
		width: 48px;
	}
	.hide{
	    opacity:0;
	    transition: opacity 0.5s linear;
	}
	.side-info{
		width: 200px;

	}
	.showNav{
		display: block !important;
		animation-name: navTrans;
	    animation-duration: .1s;

	}
	.container-fluid{
		padding-left: 0px;
		height: 48px !important;
	}
	.navbar-brand{
		margin: 0px;
		height: 48px;
	}
	a{
		color: rgba(255,255,255,.75);
	}
	.nav-pills.navbar-right li a{
		padding:14px 18px;

	}
	.nav-pills li a{
		padding:14px 12px 14px 12px;
	}
	.nav-pills li.active a, .nav-pills li:hover a, .nav-pills li.active:hover a{		
		background-color:rgba(255,255,255,.1) ;
	}
	.nav-pills li a .fa{

		text-align: center;
	}
	.sidenav .nav li .fa{
		width: 24px;
	}
	.navbar-inverse{
		background-color:rgba(0,128,128,1) ;
	}
	.navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:focus, .navbar-inverse .navbar-nav > .active > a:hover,.navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:focus, .navbar-inverse .navbar-nav > .open > a:hover{
		color:white;
		background-color:rgba(255,255,255,.1);
	}
	li:hover a{
		background-color:rgba(255,255,255,.1);
	}
	.navbar-inverse .navbar-brand{
		color:#fff;
	}
	.navbar-inverse .navbar-nav>li>a{
		color:#fff;
	}
	.dropdown-menu > li > a{
		padding: 3px 20px !important;
	}
	.navbar-header{
		height: 48px;
	}
	@media(max-width: 768px){
		.nav.nav-justified > li{
			display: table-cell !important;
			width: 1%; 
		}
		.nav.nav-justified > li > a{
			margin-bottom: 0px;
		}

		.navbar-toggle{
			display: block !important;
		}
		#sidenav{
			display: none;
		}

		.nav-pills li a{
			padding:14px 48px 14px 12px;
		}
	}
	@media(min-width: 767px){
		.navbar-brand{
			padding-left: 30px;
		}		
		.sidenavul a span{
			display: none;
		}
		body{
			padding-left: 48px !important;
		}
	}
	.sidenav{
		min-height: 100% !important;
		min-width: 48px;
		position: fixed;
		overflow: visible;
		left: 0px;
		z-index:9999;
	}
	.navbar-inverse .navbar-toggle, 
	.navbar-inverse .navbar-toggle:focus{
		background-color: transparent;
		color: #fff;
		border-color:#fff;
		padding:4px 8px;
		margin: 8px 8px;
		float: left;
		margin-left: 24px;
	}
	.navbar-inverse .navbar-toggle:hover{
		background-color: rgba(0,128,128,.1);
		color: #fff;
		border-color:#fff;
		padding:4px 8px;
		margin: 8px 8px;
		float: left;
		margin-left: 24px;
	}

</style>