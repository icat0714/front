import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import BookList from '@/views/book/BookList'
import packagingInformationInput from '@/components/common/packagingInformationInput'
import packagingInformationQuery from '@/components/common/packagingInformationQuery'
import inventoryManagement from '@/components/common/inventoryManagement'
import outboundManagement from '@/components/common/outboundManagement'
import warehousingManagement from '@/components/common/warehousingManagement'
import packagingMaterialManagement from '@/components/common/packagingMaterialManagement'


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
        }






        ]
    }]
})
