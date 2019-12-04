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

import columnManage from '@/views/power/columnManage'
import EmpManage from '@/views/power/EmpManage'
import UnitsManage from '@/views/power/UnitsManage'


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
        },
        {
          path: '/storage',
          name: 'storage',
          component: () => import('@/views/sortingManagement/storage')
        },
        {
          path: '/theLibrary',
          name: 'theLibrary',
          component: () => import('@/views/sortingManagement/theLibrary')
        },
        {
          path: '/check',
          name: 'check',
          component: () => import('@/views/sortingManagement/check')
        },
        {
          path: '/package',
          name: 'package',
          component: () => import('@/views/sortingManagement/package')
        },
        {
          path: '/unpacking',
          name: 'unpacking',
          component: () => import('@/views/sortingManagement/unpacking')
        },
        {
          path: '/outOfStorageQuery',
          name: 'outOfStorageQuery',
          component: () => import('@/views/sortingManagement/outOfStorageQuery')
        },
        {
          path: '/stockQuery',
          name: 'stockQuery',
          component: () => import('@/views/sortingManagement/stockQuery')
        },
        {
          path: '/packageQuery',
          name: 'packageQuery',
          component: () => import('@/views/sortingManagement/packageQuery')
        },
        {
          path: '/singleCargoExceptionMonitoring',
          name: 'singleCargoExceptionMonitoring',
          component: () => import('@/views/sortingManagement/singleCargoExceptionMonitoring')
        },
        {
          path: '/columnManage',
          name: 'columnManage',
          component: columnManage
        },
        {
          path: '/EmpManage',
          name: 'EmpManage',
          component: EmpManage
        },
        {
          path: '/UnitsManage',
          name: 'UnitsManage',
          component: UnitsManage
        },{
          path: '/singleCargoExceptionMonitoring',
          name: 'singleCargoExceptionMonitoring',
          component: () => import('@/views/sortingManagement/singleCargoExceptionMonitoring')
        },
        {
          path: '/deliveryStandard',
          name: 'deliveryStandard',
          component: () => import('@/views/basicData/deliveryStandard')
        },
        {
          path: '/basicArchives',
          name: 'basicArchives',
          component: () => import('@/views/basicData/basicArchives')
        },
        {
          path: '/shuttleBusSet',
          name: 'shuttleBusSet',
          component: () => import('@/views/basicData/shuttleBusSet')
        },
        {
          path: '/dispatchingPersonnelSet',
          name: 'dispatchingPersonnelSet',
          component: () => import('@/views/basicData/dispatchingPersonnelSet')
        },
        {
          path: '/areaSet',
          name: 'areaSet',
          component: () => import('@/views/basicData/areaSet')
        }

      ]
    }
  ]
})
