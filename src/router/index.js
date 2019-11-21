import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/common/Main'
import BookList from '@/views/book/BookList'

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
      }]
  }]
})
