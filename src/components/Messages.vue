<template>

	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<h3>Messages</h3>
			</div>
			<div class="col-md-3 col-sm-12">
				<MessagesNav></MessagesNav>
			</div>
			<div class="col-md-9 col-sm-12">
    		<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import MessagesNav from './messages_comp/MessagesNav'
export default {
	name: 'messages',
	components: {
		MessagesNav
	}
}
</script>

<style scoped>

ul.nav{
	position:absolute;
	width:100%;

}

</style>
