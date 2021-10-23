import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faSignOutAlt, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  
  providers: {
    github: {
      tokenPath: 'token',
      clientId: '75691eac3da77485bbef',
      // redirectUri: 'http://localhost:3000/auth/callback' // Your client app URL
      redirectUri: 'http%3A%2F%2Flocalhost:3000%2auth%2callback' // Your client app URL
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
