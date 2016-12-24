<template>
	<div  style="padding-top: 15px">
		<div class="col-md-3">
			<label><h4>{{title}}</h4></label>
		</div>
		<div class="form-group col-md-3 pull-right">
	    <select class="form-control" v-model='selected1'>
				<option v-for="option in options1" v-bind:value="option.value">
			    {{ option.text }}
			  </option>
			</select>
	  </div>
	  <div class="form-group col-md-3 pull-right">
	    <select class="form-control" v-model='selected2'>
				<option v-for="option in options2" v-bind:value="option.value">
			    {{ option.text }}
			  </option>
			</select>
	  </div>
	 
	<div>
		<canvas id="myChart"></canvas>
	</div>
	</div>
</template>
<script>
export default{ 
	name: 'chart',
	props: ['chartData', 'titleData'],
	data() {
		return {
			title: '',
			selected1: 'date',
			selected2: 'gender',
			options1: [
				{ text: 'Date', value: 'date' },
		    { text: 'Month', value: 'month' },
		    { text: 'Years', value: 'years' }
		  ],
		  options2: [
				{ text: 'Gender', value: 'gender' },
		    { text: 'Education', value: 'degree' },
		    { text: 'Profession', value: 'job' },
		    { text: 'Region', value: 'city' }
		  ],
			data: {
			  labels: [],
			  // Our series array that contains series objects or in this case series data arrays
			  datasets: []
			},
			series: {}
		}
	},
	computed: {
		chartFilter: function(){ return this.$store.state.chartFilter },
		chartX: function(){ return this.$store.state.chartX },
	},
	watch: {
		chartData: function() {
			this.syncData()
		},
		titleData: function() {
			this.title = this.titleData
		},
		selected1: function() {
			this.$store.dispatch('syncChartFilterX', this.selected1)
		},
		selected2: function() {
			this.$store.dispatch('syncChartFilterY', this.selected2)
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
		   		if(k1!="" && k1!=null) {
			   		if(self.series[k1]==null){
			   			self.series[k1] = [v1]
			   		} else { 
			   			self.series[k1].push(v1)
			   		}
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