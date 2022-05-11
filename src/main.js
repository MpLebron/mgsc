import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from './router/router.js'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)


const router = new VueRouter({
  routes: Router,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
