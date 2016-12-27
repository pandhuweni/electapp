<template>
	<div>
		this is overview
		<div>
			<canvas :id="oId"></canvas>
		</div>
	</div>
</template>
<script>
export default {
	name: 'overview',
	props: ['oData', 'oId'],
	data() {
		return {
			data: {
				labels: [],
	    	datasets: [
	        {
	            data: [],
	            backgroundColor: []
	        }]
			}
		}
	}, 
	watch: {
		oData: function(){
			this.loadData()
		}
	},
	methods:{
		loadData(){
			var ctx = document.getElementById(this.oId)
			self = this
			$.each(self.oData, function(key, value) {
				self.data.labels.push(key)
				self.data.datasets[0].data.push(value)
				self.data.datasets[0].backgroundColor.push(randomColor())
			})
			var myPieChart = new Chart(ctx,{
			  type: 'pie',
			  data: self.data
			})
		}
	},
	mounted() {
		//alert('aneh lu')
	}
}
</script>