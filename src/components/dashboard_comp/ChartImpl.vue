<script type="text/javascript">

import { Line } from 'vue-chartjs'

export default Line.extend({
  name: 'chart',
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April'],
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      },
      datasets: [
        {
          responsive: true,
          maintainAspectRatio: false,
          label: 'GitHub Commits',
          height: '100px',
          fill: false,
          lineTension: 0,
          backgroundColor: '#f87979',
          data: [1, 5, 2, 3]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          label: 'GitHub Commits',
          height: '100px',
          fill: false,
          lineTension: 0,
          backgroundColor: '#f87979',
          data: [1, 2, 5, 4]
        }
      ]
    })
  }
})
</script>
