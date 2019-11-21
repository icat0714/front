import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import BookList from '@/views/book/BookList'

Vue.use(Router)

export default new Router({
  routes: [{
     path:'/',
     name:'LoGin',
     component: () => import('@/components/LoGin')
  },{
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [{
        path: '/book/BookList',
        name: 'BookList',
        component: BookList
      },{
        path: '/dispatch/CheckTableToTurnSingle',
        name: 'CheckTableToTurnSingle',
        component: () => import('@/views/dispatch/CheckTableToTurnSingle')
  },{
        path: '/dispatch/ArtificialScheduling',
        name: 'ArtificialScheduling',
        component: () => import('@/views/dispatch/ArtificialScheduling')
  }]
  }]
})
