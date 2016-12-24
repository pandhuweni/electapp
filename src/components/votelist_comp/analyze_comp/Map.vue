<template>
	<div id="gmap"></div>
</template>

<script>
export default {
	name: 'map', 
	props: ['data'],
	data(){
		return {

		}
	},
	methods: {
		initMap() {
      var uluru = {lat: -25.363, lng: 131.044};
      var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 4,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
	},
	mounted(){
		this.initMap()
	}
}
</script>
<style>
  #map {
    width: 100%;
    height: 400px;
    background-color: grey;
  }
</style>