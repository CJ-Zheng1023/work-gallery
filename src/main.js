import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import { Modal } from 'ant-design-vue'
import Contextmenu from '@cj_zheng1023/vue2-contextmenu'
import '@cj_zheng1023/vue2-contextmenu/dist/styles/styles.css'
Vue.use(Contextmenu)
Vue.use(Modal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
