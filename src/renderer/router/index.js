import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weixin',
      component: require('@/components/Weixin').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
