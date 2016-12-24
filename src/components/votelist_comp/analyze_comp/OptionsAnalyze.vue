<template>
<div>
	<div>
		<label>
			<h3>Options Analysis</h3>
		</label>
	</div>
	<div class="progress" v-for="option in data">
	  <div class="progress-bar" :class="syncProgressColor()" role="progressbar" aria-valuenow="option.percentage"
	  aria-valuemin="0" aria-valuemax="100" :style="{width: (option.percentage).toString()+'%'}">
	    <span>{{option.percentage}}% {{option.options}}  {{syncProgressBar()}}</span>
	  </div>

	</div>
</div>
</template>
<script type="text/javascript">
export default {
	props: ['data'],
	data(){
		return{
			progressCounter: 1,
			optionsData: [],
		}
	}, 
	computed: {
		counter: function(){
			this.progressCounter++
		}
	},
	methods: {
		syncProgressBar(){
			if( this.progressCounter == 4){
				this.progressCounter = 1
			} else {
				this.progressCounter = this.progressCounter+1
			}
		},
		syncProgressColor(){
			var value = this.progressCounter
			if(value==1){
				return "progress-bar-success"
			} else if(value==2) {
				return "progress-bar-info"
			} else if (value==3) {
				return "progress-bar-warning"
			} else {
				return "progress-bar-danger"
			}
		}
	}
}
</script>
<style scoped>
.progress {
    position: relative !important;

}

.progress span {
    position: absolute !important;
    display: block !important;
    width: 100% !important;
    color: rgba(0,0,0,.65) !important;
 }

</style>