import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faSignOutAlt, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
