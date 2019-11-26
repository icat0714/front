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
  },{
        path: '/dispatch/SignForEntry',
        name: 'SignForEntry',
        component: () => import('@/views/dispatch/SignForEntry')
  },{
        path: '/dispatch/PropagandaTask',
        name: 'PropagandaTask',
        component: () => import('@/views/dispatch/PropagandaTask')
  },{
        path: '/dispatch/CancelReceiptOfApplicationConfirmation',
        name: 'CancelReceiptOfApplicationConfirmation',
        component: () => import('@/views/dispatch/CancelReceiptOfApplicationConfirmation')
  },{
        path: '/returnthegoods/ReturnTheGoodsToApplyFor',
        name: 'ReturnTheGoodsToApplyFor',
        component: () => import('@/views/returnthegoods/ReturnTheGoodsToApplyFor')
  },{
        path: '/returnthegoods/ReturnRequestConfirmation',
        name: 'ReturnRequestConfirmation',
        component: () => import('@/views/returnthegoods/ReturnRequestConfirmation')
  },{
        path: '/returnthegoods/GenerateAReturnNote',
        name: 'GenerateAReturnNote',
        component: () => import('@/views/returnthegoods/GenerateAReturnNote')
  }]
  }]
})
