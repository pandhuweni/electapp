<template>
<div>
	<nav class="navbar navbar-inverse navbar-fixed-top">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header col-md-2 col-sm-3">	
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
		    <i class="fa fa-bars"></i>
	      </button>
	       <a class="navbar-brand" href="#" hidden>
	      	<img src="../assets/fav.png">
	      </a>
	      <a class="navbar-brand" href="#">Electapp</a>
	     
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li>
	        	<a href="#" id="sidenav-toggle" @click="sideNavtoggle">
	        		<i class="fa fa-bars"></i>
	        	</a>
	        </li>
	       
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
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
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>	
	<div class="col-md-2 col-xs-2 side navbar-inverse navbar-fixed-top">
	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div  class="collapse navbar-collapse sidenav" >
	      <ul class="nav nav-pills nav-stacked"  id="sidenav">
	        <li>
	        	<a href="#" style="content:''">
	        		<i class="fa fa-dashboard"></i>
							<transition name="fade">
	        		<span v-if="isSidenavActive">Dashboard</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-list-ul"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Vote List</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-line-chart"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Statistic Data</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-magic"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Analysis</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-file-text-o"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Report</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-envelope-o"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Inbox</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-gear"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Setting</span>
							</transition>
	        	</a>
	        </li>
	        <li>
	        	<a href="#">
	        		<i class="fa fa-question-circle-o"></i>
							<transition name="fade">
	        			<span v-if="isSidenavActive">Help</span>
							</transition>
	        	</a>
	        </li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	</div>
	
</div>
	
</template>

<script>
  export default {
  	name: 'navbar',
		data() {
			return{
				isSidenavActive: true,
			}
		},
    methods: {
			sideNavtoggle() { 
				this.isSidenavActive = !this.isSidenavActive
				$('.col-md-2').toggleClass("collapsed-coy",500);
				$('.navbar-brand').toggle();
			}
    }
  }

/*  $(document).ready(function(){
	$('#sidenav-toggle').click(function(){	
		if($('.sidenav .nav li a span').hasClass('unav')){
			$('.sidenav .nav li a span').removeClass('unav');
			$('.sidenav .nav li a span').delay(500).fadeIn(200);
		}else{
			$('.sidenav .nav li a span').addClass('unav');
			$('.sidenav .nav li a span').fadeOut(200);
		}
		$('.col-md-2').toggleClass("collapsed-coy",500);
		$('.navbar-brand').toggle();
	});
  }); */
</script>

<style>
	*{
		border-radius: 0px !important;
	}
	.navbar{
		border:none !important;
	}
	.col-md-2{
		padding: 0px;
	}
	.collapsed-coy{
		width: 48px;
		overflow: hidden;
	}
	.hide{
    opacity:0;
    transition: opacity 0.5s linear;
}

.unav {
	display:none;
}
.show{
    opacity:1;
}
	.container-fluid{
		padding-left: 0px;
	}
	.navbar-brand{
		padding-left: 30px;
	}
	.navbar-collapse.sidenav{
		padding-left: 0px;
		padding-right: 0px;
	}
	.side.navbar-fixed-top{
		top:50px;
		height: 100%;	
	}
	a{
		color: rgba(255,255,255,.75);
	}
	.sidenav .nav li .fa{
		width: 24px;
	}
	.sidenav .nav li a{
		
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
</style>