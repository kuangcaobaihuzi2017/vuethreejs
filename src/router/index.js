import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/CommonHome'),
  },
  {
    path: '/research',
    component: () => import('@/components/CommonResearch'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
