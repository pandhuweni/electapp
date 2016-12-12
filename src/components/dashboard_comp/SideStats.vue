<template>
  <div>
    <div class="top-tab">
      <div class="tab-item text-center" @click="tabClick" :class="{ active: isActiveRecent }">Recent</div>
      <div class="tab-item text-center" @click="tabClick" :class="{ active: isActivePopular }">Popular</div>
    </div>
    <ul class="stat">
      <li>
        <span class="bullet-sq"></span>
        Participant
        <span class="pull-right secondary-text" >1345</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Today
        <span class="pull-right secondary-text">125</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Region
        <span class="pull-right secondary-text">Sleman</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Education
        <span class="pull-right secondary-text">Doctor</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Profesion
        <span class="pull-right secondary-text">Doctor</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Modus Choice
        <span class="pull-right secondary-text">A</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Max Value
        <span class="pull-right secondary-text">1256</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Min Value
        <span class="pull-right secondary-text">127</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SideStats',
  data(){
    return {
      isActiveRecent: true,
      isActivePopular: false
    }
  },
  methods: {
    tabClick() {
      this.isActivePopular = !this.isActivePopular
      this.isActiveRecent = !this.isActiveRecent
    }
  }
}
</script>

<style>
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
