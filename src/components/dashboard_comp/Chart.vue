<template>
	<canvas id="myChart"></canvas>
</template>
<script>
export default{ 
	name: 'chart',
	props: ['chartData'],
	data() {
		return {
			data: {
			  labels: [],
			  // Our series array that contains series objects or in this case series data arrays
			  datasets: []
			},
			series: {}
		}
	},
	/*
	computed: {
		chartData: function(){ return this.$store.state.chartData }
	},*/
	watch: {
		chartData: function() {
			this.syncData()
		}
	},
	methods:{
		syncData(){
			this.data.labels = []
			this.data.datasets = []
			this.series = {}
			var ctx = document.getElementById("myChart")
			self = this
			var tmp_series = []
			$.each(self.chartData, function(key, value) {
				tmp_series = []
				self.data.labels.push(key)
		   	console.log(key + " " +value)
		   	$.each(value, function(k1,v1){
		   		if(self.series[k1]==null){
		   			self.series[k1] = [v1]
		   		} else { 
		   			self.series[k1].push(v1)
		   		}
		   	})
			})
			$.each(self.series, function(key, value) {
				self.data.datasets.push(
					{
						'label': key,
						'data': value,
						'borderColor': randomColor(),
						fill: false
					}
				)
			})

			

			var myChart = new Chart(ctx, {
	    	type: 'line',
	    	data: self.data
			})
		}
	}
}
</script>