import 'bootstrap/dist/css/bootstrap.css'

import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import { firestorePlugin } from 'vuefire'
import VueCompositionAPI from '@vue/composition-api'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faSignOutAlt, faUserPlus, faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faSignOutAlt, faUserPlus, faUsers, faPaperPlane, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
