<script type="text/javascript">

import { Line } from 'vue-chartjs'

export default Line.extend({
  name: 'chart',
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'GitHub Commits',
          height: '100px',
          fill: false,
          lineTension: 0,
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39]
        }
      ]
    })
  }
})
</script>
