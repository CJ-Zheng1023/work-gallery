import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts/Index'
import children from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: children[0]['path'],
    component: Layout,
    children
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
