<template>
  <div id="app">
    <Top class="fontsetting"></Top>
    <navbar></navbar>
    <router-view class="fontsetting"></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Top from './components/Top.vue'
import Navbar from './components/navbar.vue'
import ContactUs from './components/ContactUs.vue'
import Bottom from './components/bottom.vue'
import AboutUs from './components/AboutUs.vue'

export default {
  name: 'App',
  components: {
    Home,
    Top,
    Navbar,
    ContactUs,
    Bottom,
    AboutUs
  }
}
</script>

<style lang="less" scoped>
@import './assets/static/css/font.css';
@import './assets/static/css/reset.css';

.fontsetting {
  font-family: lato-light;
}
</style>
