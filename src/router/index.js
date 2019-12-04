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
import IaeDeparture from '@/views/iae/IaeDeparture'
import IaeExtract from '@/views/iae/IaeExtract'
import IaeTimeinput from '@/views/iae/IaeTimeinput'
import LogLogistics from '@/views/log/LogLogistics'
import LogTrack from '@/views/log/LogTrack'
import SelectLogTrack from '@/views/log/SelectLogTrack'
import Time from '@/views/log/Time'
import LogLogisticstransfer from '@/views/log/LogLogisticstransfer'
import logistics from '@/views/iae/logistics'

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
        },
        {
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
          path: '/iae/IaeDeparture',
          name: 'IaeDeparture',
          component: IaeDeparture
        },
        {
          path: '/iae/IaeExtract',
          name: 'IaeExtract',
          component: IaeExtract
        },
        {
          path: '/iae/IaeTimeinput',
          name: 'IaeTimeinput',
          component: IaeTimeinput
        },
        {
          path: '/iae/logistics',
          name: 'logistics',
          component: logistics
        },
        {
          path: '/log/LogLogistics',
          name: 'LogLogistics',
          component: LogLogistics
        },
        {
          path: '/log/LogLogisticstransfer',
          name: 'LogLogisticstransfer',
          component: LogLogisticstransfer
        },
        {
          path: '/log/LogTrack',
          name: 'LogTrack',
          component: LogTrack
        },
        {
          path: '/log/SelectLogTrack',
          name: 'SelectLogTrack',
          component: SelectLogTrack
        },
        {
          path: '/log/Time',
          name: 'Time',
          component: Time
        }

    ]
  }]
})
