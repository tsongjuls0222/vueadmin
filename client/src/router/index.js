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
import OnlineAdminList from '../views/OnlineAdminList.vue';
import OTPLogs from '../views/OTPLogs.vue';
import CasinoLogs from '../views/CasinoLogs.vue';
import Attendance from '../views/Attendance.vue';
import BoardList from '../views/BoardList.vue';
import NoticeList from '../views/NoticeList.vue';
import AddPopup from '../views/AddPopup.vue';
import PartnerList from '../views/PartnerList.vue';
import ConfigSports from '../views/ConfigSports.vue';
import Maintenance from '../views/Maintenance.vue';
import ConfigLevel from '../views/ConfigLevel.vue';
import BankList from '../views/BankList.vue';
import IPSet from '../views/IPSet.vue';
import MessageList from '../views/MessageList.vue';
import AccountInquiry from '../views/AccountInquiry.vue';
import GeneralInquiry from '../views/GeneralInquiry.vue';
import CSListForm from '../views/CSListForm.vue';
import ACListForm from '../views/ACListForm.vue';
import BadListForm from '../views/BadListForm.vue';
import MacroGroup from '../views/MacroGroup.vue';
import MoneyMacro from '../views/MoneyMacro.vue';
import BonusMacro from '../views/BonusMacro.vue';
import PartnerSettlement from '../views/PartnerSettlement.vue';
import MemberHistory from '../views/MemberHistory.vue';
import Deposit from '../views/Deposit.vue';
import Withdraw from '../views/Withdraw.vue';
import Prematch from '../views/Prematch.vue';
import Realtime from '../views/Realtime.vue';
import Minigame from '../views/Minigame.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == true) {
        next("/admin");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/member-list',
    name: 'MemberList',
    component: MemberList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/member-list-test',
    name: 'MemberListTest',
    component: MemberListTest,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/fee-log',
    name: 'FeeLog',
    component: FeeLog,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset',
    name: 'MemInputset',
    component: MemInputset,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset-casino',
    name: 'MemInputsetCasino',
    component: MemInputsetCasino,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/mem-inputset-others',
    name: 'MemInputsetOthers',
    component: MemInputsetOthers,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/online-admin-list',
    name: 'OnlineAdminList',
    component: OnlineAdminList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/otp-log',
    name: 'OTPLogs',
    component: OTPLogs,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/casino-log',
    name: 'CasinoLogs',
    component: CasinoLogs,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/attendance',
    name: 'Attendance',
    component: Attendance,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/board-list',
    name: 'BoardList',
    component: BoardList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/notice-list',
    name: 'NoticeList',
    component: NoticeList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/add-popup',
    name: 'AddPopup',
    component: AddPopup,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/partner-list',
    name: 'PartnerList',
    component: PartnerList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/config-sports',
    name: 'ConfigSports',
    component: ConfigSports,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/maintenance',
    name: 'Maintenance',
    component: Maintenance,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/config-level',
    name: 'ConfigLevel',
    component: ConfigLevel,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/bank-list',
    name: 'BankList',
    component: BankList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/ip-set',
    name: 'IPSet',
    component: IPSet,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/message-list',
    name: 'MessageList',
    component: MessageList,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/cs-list&cdtype=9',
    name: 'AccountInquiry',
    component: AccountInquiry,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/cs-list&cdtype=0',
    name: 'GeneralInquiry',
    component: GeneralInquiry,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/cslist-form',
    name: 'CSListForm',
    component: CSListForm,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/aclist-form',
    name: 'ACListForm',
    component: ACListForm,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/badlist-form',
    name: 'BadListForm',
    component: BadListForm,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/macro-group',
    name: 'MacroGroup',
    component: MacroGroup,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/money-macro',
    name: 'MoneyMacro',
    component: MoneyMacro,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/bonus-macro',
    name: 'BonusMacro',
    component: BonusMacro,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/partner-settlement',
    name: 'PartnerSettlement',
    component: PartnerSettlement,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/member-history',
    name: 'MemberHistory',
    component: MemberHistory,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/deposit',
    name: 'Deposit',
    component: Deposit,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/withdraw',
    name: 'Withdraw',
    component: Withdraw,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/prematch',
    name: 'Prematch',
    component: Prematch,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/realtime',
    name: 'Realtime',
    component: Realtime,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: '/admin/minigame',
    name: 'Minigame',
    component: Minigame,
    beforeEnter: (to, from, next) => {
      if (store.state.account.authenticated == false) {
        next("/");
      }
      else {
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
