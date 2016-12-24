<template>
	<div class="panel panel-default">
		<div class="panel-body">
		  <div>
		    <div class="top-tab">
		    {{statsData.vote_option_title}}
		    </div>
		    <ul class="stat">
		      <li>
		        <span class="bullet-sq"></span>
		        Total
		        <span class="pull-right secondary-text">{{statsData.total_voter}}</span>
		      </li>
		      <li>
		        <span class="bullet-sq"></span>
		        Ratio
		        <span class="pull-right secondary-text">{{statsData.ratio}}</span>
		      </li>
		      <li>
		        <span class="bullet-sq"></span>
		        Top Region
		        <span class="pull-right secondary-text">{{statsData.top_region}}</span>
		      </li>
		      <li>
		        <span class="bullet-sq"></span>
		        Top Education
		        <span class="pull-right secondary-text">{{statsData.top_education}}</span>
		      </li>
		      <li>
		        <span class="bullet-sq"></span>
		        Top Profesion
		        <span class="pull-right secondary-text">{{statsData.top_profession}}</span>
		      </li>
		    </ul>
		  </div>
		</div>
	</div>
</template>
<script>
export default{
	name: 'options-stats',
	props: ['data'],
	data(){
		return {
			statsData : {
				vote_option_title: '',
				total_voter: '',
				ratio: '',
				top_region: '',
				top_education: '',
				top_profession: '',
			}	
		}
	},
	watch: {
		data: function(){
			this.statsData = this.data
		}
	},
}
</script>
<style scoped>
  .bullet-sq {
    display: inline-block;
    width: 10px;
    height: 10px;
    content: "";
    background: #8C8C8C;
    margin-right: 5px;
  }
  .top-tab {
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    font-weight: 600;
  }
  .tab-item {
    line-height: 3em;
    width: 50%;
    float: left;
    position: relative;
    cursor: pointer;
  }
  .tab-item.active {
    background: #f4f4f4;
  }
  .stat {
    margin: 10px !important;
    padding: 0px !important;
  }
  .stat li {
    list-style: none;
    line-height: 40px;
  }

</style>
