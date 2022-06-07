import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from './router/router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)

const router = new VueRouter({
  routes: Router,
  mode: "history"
})

const store = new Vuex.Store({
  // state中存放的是全局共享的数据
  state: {
    userName: '',
    userEmail: '',
    MemberStatus: ''
  },
  mutations: {
    changeUserInfo(state, obj) {
      state.userName = obj.userName
      state.userEmail = obj.userEmail
      state.MemberStatus = 'Unregistered Member'
    }
  }
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
  render: h => h(App),
  // 将创建的共享数据对象，挂载到Vue实例中
  // 所有的组件，就可以直接从store中获取全局的数据了
  store
}).$mount('#app')
