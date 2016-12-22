<template>
  <div>
    <div class="top-tab">
      <div class="tab-item text-center" selected @click="tabClickRecent" :class="{ active: isActiveRecent }">Recent</div>
      <div class="tab-item text-center" @click="tabClickPopular" :class="{ active: isActivePopular }">Popular</div>
    </div>
    <ul class="stat">
      <li>
        <span class="bullet-sq"></span>
        Participant
        <span class="pull-right secondary-text">{{stats[0].participant}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Today
        <span class="pull-right secondary-text">{{stats[0].today}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Region
        <span class="pull-right secondary-text">{{stats[0].top_region}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Education
        <span class="pull-right secondary-text">{{stats[0].top_education}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Profesion
        <span class="pull-right secondary-text">{{stats[0].top_profesion}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Modus Choice
        <span class="pull-right secondary-text">{{stats[0].modus_choice}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Max Value
        <span class="pull-right secondary-text">{{stats[0].max_value}}</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Min Value
        <span class="pull-right secondary-text">{{stats[0].min_value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideStats',
  props: ['stats'],
  computed: {
    currentTab: function() { return this.$store.state.sideStatsTab }
  },
  data(){
    return {
      isActiveRecent: true,
      isActivePopular: false,
      participant: 0,
      today: 0,
      top_region: "",
      top_education: "",
      top_profesion: "",
      modus_choice: "",
      max_value: "",
      min_value: ""
    }
  },
  methods: {
    tabClickRecent() {
      this.isActivePopular = false
      this.isActiveRecent = true
      this.tryChangeTab('recent')
      console.log(this.currentTab)
    },
    tabClickPopular() {
      this.isActivePopular = true
      this.isActiveRecent = false
      this.tryChangeTab('popular')
      console.log(this.currentTab)
    },
    tryChangeTab(tab) {
      this.$store.dispatch('changeTab', tab)
    }
  },/*
  watch: {
    currentTab: function() {
      this.syncData()
    }
  },*/
  mounted: function() {
    //this.syncData()
    console.log(this.currentTab)
  }
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
