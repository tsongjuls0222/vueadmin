import Vue from 'vue';
import store from '../store/index';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import MemberList from '../views/MemberList.vue';
import MemberListTest from '../views/MemberListTest.vue';

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
