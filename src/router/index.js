import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import BookList from '@/views/book/BookList'
import packagingInformationInput from '@/views/pack/packagingInformationInput'
import packagingInformationQuery from '@/views/pack/packagingInformationQuery'
import inventoryManagement from '@/views/pack/inventoryManagement'
import outboundManagement from '@/views/pack/outboundManagement'
import warehousingManagement from '@/views/pack/warehousingManagement'
import packagingMaterialManagement from '@/views/pack/packagingMaterialManagement'


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
