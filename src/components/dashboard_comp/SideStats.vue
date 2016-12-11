<template>
  <div>
    <div class="top-tab">
      <div class="tab-item text-center active">Recent</div>
      <div class="tab-item text-center">Popular</div>
    </div>
    <ul class="stat">
      <li>
        <span class="bullet-sq"></span>
        Participant
        <span class="pull-right">1345</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Today
        <span class="pull-right">125</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Region
        <span class="pull-right">Sleman</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Education
        <span class="pull-right">Doctor</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Top Profesion
        <span class="pull-right">Doctor</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Modus Choice
        <span class="pull-right">A</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Max Value
        <span class="pull-right">1256</span>
      </li>
      <li>
        <span class="bullet-sq"></span>
        Min Value
        <span class="pull-right">127</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideStats'
}
</script>

<style>
  .bullet-sq {
    display: inline-block;
    width: 10px;
    height: 10px;
    content: "";
    background: #8C8C8C;
  }
  .top-tab {
    border-bottom: 1px solid #ddd;
    overflow: hidden;
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
  }
</style>
