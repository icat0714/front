import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import Lineresource from '@/views/iae/Lineresource'
import IaeArrival from '@/views/iae/IaeArrival'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [{
        path: '/iae/Lineresource',
        name: 'Lineresource',
        component: Lineresource
      },
      {
        path: '/iae/IaeArrival',
        name: 'IaeArrival',
        component: IaeArrival
      }]
  }]
})
