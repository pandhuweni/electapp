<template>	
	<ul class="nav nav-pills nav-stacked ">
	  <li role="presentation " class="compose">
	  	<button class="btn btn-block btn-primary ">
	  		Compose Message
	  	</button>
	  </li>
	  <li role="presentation">
    	<router-link :to="{ name: 'inbox'}">
    			<i class="fa fa-inbox"></i>
					<transition name="fade">
	    			<span>Inbox</span>
					</transition>
    	</router-link>
	  </li>
	  <li role="presentation">
    	<router-link :to="{ name: 'inbox'}">

    			<i class="fa fa-paper-plane"></i>
					<transition name="fade">
	    			<span>Sent</span>
					</transition>
    	</router-link>
	  </li>
	  <li role="presentation">
    	<router-link :to="{ name: 'inbox'}">
    			<i class="fa fa-archive"></i>
					<transition name="fade">
	    			<span>Draft</span>
					</transition>
    	</router-link>
	  </li>

	  <li role="presentation">
    	<router-link :to="{ name: 'inbox'}">
    			<i class="fa fa-trash"></i>
					<transition name="fade">
	    			<span>Trash</span>
					</transition>
    	</router-link>
	  </li>
	</ul>
</template>

<script>
export default {
	name: 'messagesnav',
	components: {
		
	}
}
</script>

<style scoped>
.btn{
	border-color:transparent;
}
ul.nav{
	position:absolute;
	width:90%;
	border-radius:4px ;
	background-color:rgba(0,128,128,.075);
}
a .fa{
	margin-right:8px;
	color:rgba(0,128,128,.8);
}
a{
	color:rgba(0,128,128,.8);
}
a:hover, a:focus, a:active{
	color:rgba(0,128,128,1);
}
li:hover a{
	background-color:rgba(0,128,128,.1);
}
.compose{
	padding: 2px 5px;
	margin:10px 10px;
}
.nav-pills > li > a{
	border-radius:0px;
}
</style>
