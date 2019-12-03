import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import BookList from '@/views/iae/BookList'
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
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [{
        path: '/book/BookList',
        name: 'BookList',
        component: BookList
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
      }, {
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
        path: '/log/LogLogistics',
        name: 'LogLogistics',
        component: LogLogistics
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
      },
      {
      path: '/log/LogLogisticstransfer',
        name: 'LogLogisticstransfer',
        component: LogLogisticstransfer
      },
      {
      path: '/iae/logistics',
        name: 'logistics',
        component: logistics
      }


    ]
  }]
})
