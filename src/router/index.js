import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import packagingInformationInput from '@/views/pack/packagingInformationInput'
import packagingInformationQuery from '@/views/pack/packagingInformationQuery'
import inventoryManagement from '@/views/pack/inventoryManagement'
import outboundManagement from '@/views/pack/outboundManagement'
import warehousingManagement from '@/views/pack/warehousingManagement'
import packagingMaterialManagement from '@/views/pack/packagingMaterialManagement'
import Lineresource from '@/views/iae/Lineresource'
import IaeArrival from '@/views/iae/IaeArrival'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'LoGin',
      component: () => import('@/components/LoGin')
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [{
          path: '/',
          name: 'MainHome',
          component: () => import('@/components/Main')
        }, {
          path: '/dispatch/CheckTableToTurnSingle',
          name: 'CheckTableToTurnSingle',
          component: () => import('@/views/dispatch/CheckTableToTurnSingle')
        }, {
          path: '/dispatch/ArtificialScheduling',
          name: 'ArtificialScheduling',
          component: () => import('@/views/dispatch/ArtificialScheduling')
        }, {
          path: '/dispatch/SignForEntry',
          name: 'SignForEntry',
          component: () => import('@/views/dispatch/SignForEntry')
        }, {
          path: '/dispatch/PropagandaTask',
          name: 'PropagandaTask',
          component: () => import('@/views/dispatch/PropagandaTask')
        }, {
          path: '/dispatch/CancelReceiptOfApplicationConfirmation',
          name: 'CancelReceiptOfApplicationConfirmation',
          component: () => import('@/views/dispatch/CancelReceiptOfApplicationConfirmation')
        }, {
          path: '/returnthegoods/ReturnTheGoodsToApplyFor',
          name: 'ReturnTheGoodsToApplyFor',
          component: () => import('@/views/returnthegoods/ReturnTheGoodsToApplyFor')
        }, {
          path: '/returnthegoods/ReturnRequestConfirmation',
          name: 'ReturnRequestConfirmation',
          component: () => import('@/views/returnthegoods/ReturnRequestConfirmation')
        }, {
          path: '/returnthegoods/GenerateAReturnNote',
          name: 'GenerateAReturnNote',
          component: () => import('@/views/returnthegoods/GenerateAReturnNote')
        },
        {
          path: '/packagingInformationInput',
          name: 'packagingInformationInput',
          component: packagingInformationInput
        },
        {
          path: '/packagingInformationQuery',
          name: 'packagingInformationQuery',
          component: packagingInformationQuery
        },
        {
          path: '/inventoryManagement',
          name: 'inventoryManagement',
          component: inventoryManagement
        },
        {
          path: '/outboundManagement',
          name: 'outboundManagement',
          component: outboundManagement
        },
        {
          path: '/warehousingManagement',
          name: 'warehousingManagement',
          component: warehousingManagement
        },
        {
          path: '/packagingMaterialManagement',
          name: 'packagingMaterialManagement',
          component: packagingMaterialManagement
        }, {
          path: '/iae/Lineresource',
          name: 'Lineresource',
          component: Lineresource
        },
        {
          path: '/iae/IaeArrival',
          name: 'IaeArrival',
          component: IaeArrival
        }
      ]
    }
  ]
})
