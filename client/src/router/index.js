import Vue from 'vue';
import store from '../store/index';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import MemberList from '../views/MemberList.vue';
import MemberListTest from '../views/MemberListTest.vue';
import FeeLog from '../views/FeeLog.vue';
import MemInputset from '../views/MemInputset.vue';
import MemInputsetCasino from '../views/MemInputsetCasino.vue';
import MemInputsetOthers from '../views/MemInputsetOthers.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == true){
        next("/admin");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/member-list',
    name: 'MemberList',
    component: MemberList,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/member-list-test',
    name: 'MemberListTest',
    component: MemberListTest,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/fee-log',
    name: 'FeeLog',
    component: FeeLog,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset',
    name: 'MemInputset',
    component: MemInputset,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset-casino',
    name: 'MemInputsetCasino',
    component: MemInputsetCasino,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset-others',
    name: 'MemInputsetOthers',
    component: MemInputsetOthers,
    beforeEnter: (to, from, next) => {
      if(store.state.account.authenticated == false){
        next("/");
      }
      else{
        next();
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
