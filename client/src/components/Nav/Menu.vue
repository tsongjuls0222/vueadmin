<template>
  <div class="menu-wrapper">
    <div class="main-menu-wrapper">
      <ul class="menu-list level">
        <li
          v-for="(item, key) of items"
          :data-id="item.id"
          @click="showSub"
          :key="key"
          :class="setClass(item.checker)"
        >
          <div>
            {{ item.title }}
            <span class="navmenucount" v-if="item.id == 'game-list-ended'"
              >({{ memberlist_count }})</span
            >
          </div>
        </li>
        <li class="notorius-badge">
          <i class="mdi mdi-account" @click="closeDropdownBadge"></i>
          <div class="custom-badge" @click="closeDropdownBadge">
            {{ badgeCount }}
          </div>
          <div :class="`custom-badge-dropdown ${badgeClass}`">
            <div class="list-header">
              <h5>Notorious User Betting</h5>
              <i
                class="mdi mdi-close-circle-outline"
                @click="closeDropdownBadge"
              ></i>
            </div>
            <div class="list-content">
              <b-table :data="notoriusData">
                <b-table-column
                  :centered="true"
                  field="ia_name"
                  label="총판"
                  v-slot="props"
                >
                  {{ props.row.ia_name }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="real_code"
                  label="코드"
                  v-slot="props"
                >
                  {{ props.row.real_code }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="username"
                  label="아이디"
                  v-slot="props"
                >
                  {{ props.row.username }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="iu_nickname"
                  label="닉네임"
                  v-slot="props"
                >
                  {{ props.row.iu_nickname }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="iu_name"
                  label="이름"
                  v-slot="props"
                >
                  {{ props.row.iu_name }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="bet_amount"
                  label="베팅금액"
                  v-slot="props"
                >
                  {{ props.row.bet_amount }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="estimated_win"
                  label="당첨금액"
                  v-slot="props"
                >
                  {{ props.row.estimated_win }}
                </b-table-column>
                <b-table-column
                  :centered="true"
                  field="is_realtime"
                  label="유형"
                  v-slot="props"
                >
                  {{ props.row.is_realtime }}
                </b-table-column>
                <template #empty>
                  <div class="is-flex" style="height: 250px">
                    <div
                      class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
                    >
                      <b-icon
                        icon="information-outline"
                        size="is-large"
                      ></b-icon>
                      <span class="is-size-4 is-unselectable"
                        >Sorry, no data found.</span
                      >
                    </div>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </li>
        <li class="toggle">
          <div class="theme-toggle-wrapper">
            <div class="theme-toggle-content">
              <div
                :class="`theme-toggle ${darkModeClass}`"
                @click="changeMode()"
              >
                <div class="moon-sun">
                  <div class="moon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10.518"
                      height="11.768"
                      viewBox="0 0 10.518 11.768"
                    >
                      <path
                        id="icon-moon"
                        d="M7.8,11.768A5.873,5.873,0,0,0,12.368,9.59a.276.276,0,0,0-.266-.445A4.61,4.61,0,0,1,8.959.609.276.276,0,0,0,8.873.1,5.885,5.885,0,1,0,7.8,11.768Z"
                        transform="translate(-1.913 0)"
                        fill="#ffee01"
                      ></path>
                    </svg>
                  </div>
                  <div class="sun">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.949"
                      height="14.949"
                      viewBox="0 0 14.949 14.949"
                    >
                      <path
                        id="icon-sun"
                        d="M7.475,4.672a2.8,2.8,0,1,0,2.8,2.8A2.807,2.807,0,0,0,7.475,4.672Zm7.194,2.35L11.9,5.641l.978-2.931a.5.5,0,0,0-.639-.639l-2.931.978L7.927.28a.506.506,0,0,0-.905,0L5.641,3.045,2.707,2.067a.5.5,0,0,0-.639.639l.978,2.931L.28,7.022a.506.506,0,0,0,0,.905L3.045,9.308l-.978,2.934a.5.5,0,0,0,.639.639L5.638,11.9l1.381,2.765a.506.506,0,0,0,.905,0L9.305,11.9l2.931.978a.5.5,0,0,0,.639-.639L11.9,9.311,14.663,7.93a.506.506,0,0,0,.006-.908Zm-4.552,3.1a3.737,3.737,0,1,1,0-5.285A3.741,3.741,0,0,1,10.117,10.117Z"
                        transform="translate(0 0)"
                        fill="#ffee01"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <circle
                      id="circle"
                      data-name="Ellipse 125"
                      cx="8.5"
                      cy="8.5"
                      r="8.5"
                      fill="#fff"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="sub-menu-wrapper">
      <ul
        :class="setClass2(item.checker)"
        v-for="(item, key) in items"
        :id="item.id"
        :key="key"
      >
        <li
          :class="setClass3(subItem.idto)"
          v-for="(subItem, key) in item.subItems"
          :key="key"
        >
          <a class="" :href="subItem.to" exact-active-class="is-active">
            {{ subItem.subTitle }}
            <span class="navmenucount" v-if="subItem.id == 'member-list-sub1'"
              >({{ memberlist_count }})</span
            >
            <span class="navmenucount" v-if="subItem.id == 'member-list-sub2'"
              >({{ memberlisttest_count }})</span
            >
            <span class="navmenucount" v-if="subItem.id == 'member-list-sub3'"
              >({{ memberlistchongpan_count }})</span
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from "../../api/navbar";
export default {
  data() {
    return {
      name: "Menu",
      mode: "light-active",
      memberlist_count: 0,
      memberlistchongpan_count: 0,
      memberlisttest_count: 0,
      badgeClass: "inactive",
      dir: "",
      items: [
        {
          title: "회원관리",
          to: { name: "member-list" },
          id: "member-list",
          checker: ["member-list", "member-list-test", "member-list-chongpan"],
          subItems: [
            {
              subTitle: "회원목록",
              id: "member-list-sub1",
              to: "/admin/member-list",
              idto: "member-list"
            },
            {
              subTitle: "본사테스트 아이디",
              id: "member-list-sub2",
              to: "/admin/member-list-test",
              idto: "member-list-test"
            },
            {
              subTitle: "총판테스트 아이디",
              id: "member-list-sub3",
              to: "/admin/member-list-chongpan",
              idto: "member-list-chongpan"
            },
            {
              subTitle: "접속기록",
              id: "member-list-sub4",
              to: "/admin/login-list",
              idto: "login-list"
            },
            {
              subTitle: "동접자",
              id: "member-list-sub5",
              to: "/admin/online-list",
              idto: "online-list"
            },
            {
              subTitle: "블랙유저",
              id: "member-list-sub6",
              to: "/admin/black-list",
              idto: "black-list"
            },
            {
              subTitle: "가입신청",
              id: "member-list-sub7",
              to: "/admin/newmember-list",
              idto: "newmember-list"
            },
            {
              subTitle: "수동아이디등록",
              id: "member-list-sub8",
              to: "/admin/manual-registration",
              idto: "manual-registration"
            },
            {
              subTitle: "포인트 일괄지급",
              id: "member-list-sub9",
              to: "/admin/sum-payment",
              idto: "sum-payment"
            }
          ]
        },
        {
          title: "스포츠 경기관리",
          to: { name: "gameList-prematch" },
          id: "game-list",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "game-list",
              to: "/admin/game-list-prematch",
              idto: "game-list-prematch"
            },
            {
              subTitle: "국내스포츠",
              id: "game-list",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "마감경기",
          to: { name: "gameListEnded-prematch" },
          id: "game-list-ended",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "game-list-ended",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "game-list-ended",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "리그 관리",
          to: { name: "league-list" },
          id: "league-list",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "league-list",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "league-list",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "배팅관리",
          to: { name: "bet-management-prematch" },
          id: "bet-management",
          subItems: [
            {
              subTitle: "프리메치 배팅목록",
              id: "bet-management",
              to: "member-list-test"
            },
            {
              subTitle: "실시간 배팅목록",
              id: "bet-management",
              to: "member-list-test"
            },
            {
              subTitle: "미니 게임 배팅목록",
              id: "bet-management",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "정산",
          to: { name: "dailySettlement-prematch" },
          id: "daily-settlement",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "daily-settlement",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "daily-settlement",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "고객센터",
          to: { name: "cs-list" },
          id: "customer-service",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "customer-service",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "customer-service",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "쪽지관리",
          to: { name: "message-list" },
          id: "message-list",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "message-list",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "사이트설정",
          to: { name: "partner-list" },
          id: "site-settings",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "site-settings",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "site-settings",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "공지/이벤트",
          to: { name: "attendance-list" },
          id: "event-management",
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "event-management",
              to: "member-list-test"
            },
            {
              subTitle: "국내스포츠",
              id: "event-management",
              to: "member-list-test"
            }
          ]
        },
        {
          title: "API 로그",
          to: { name: "apiSettings-settings" },
          id: "api-settings",
          checker: ["otp-log", "casino-log"],
          subItems: [
            {
              subTitle: "프리메치 경기목록",
              id: "otp",
              to: "/admin/otp-log",
              idto: "otp-log"
            },
            {
              subTitle: "국내스포츠",
              id: "casino",
              to: "/admin/casino-log",
              idto: "casino-log"
            }
          ]
        },
        {
          title: "충전/수수료관리",
          to: { name: "fees-settings" },
          id: "fees-management",
          checker: [
            "fee-log",
            "mem-inputset",
            "mem-inputset-casino",
            "mem-inputset-others"
          ],
          subItems: [
            {
              subTitle: "수수료적립내역",
              id: "fee",
              to: "/admin/fee-log",
              idto: "fee-log"
            },
            {
              subTitle: "충환 설정 Sports",
              id: "mem",
              to: "/admin/mem-inputset",
              idto: "mem-inputset"
            },
            {
              subTitle: "충환 설정 Casino",
              id: "casino",
              to: "/admin/mem-inputset-casino",
              idto: "mem-inputset-casino"
            },
            {
              subTitle: "돌발/환전 설정",
              id: "others",
              to: "/admin/mem-inputset-others",
              idto: "mem-inputset-others"
            }
          ]
        },
        {
          title: "관리자 접속",
          id: "online-admin-list",
          to: "/admin/online-admin-list",
          checker: ["online-admin-list"],
          subItems: [
            {
              subTitle: "관리자 접속",
              id: "admin",
              to: "/admin/online-admin-list",
              idto: "online-admin-list"
            }
          ]
        },
        {
          title: "로그아웃",
          id: "logout",
          to: "member-list-test"
        }
      ],
      darkMode: false,
      subActive: "",
      mainActive: ""
    };
  },
  methods: {
    closeDropdownBadge() {
      if (this.badgeClass == "inactive") {
        this.badgeClass = "active";
      } else {
        this.badgeClass = "inactive";
      }
    },
    setClass(param) {
      let c = "main";
      if (this.dir == "") {
        return c;
      } else {
        if (param != undefined) {
          for (let i = 0; i < param.length; i++) {
            if (param[i] == this.dir) {
              c = "main is-active";
              return c;
            }
          }
        } else {
          return c;
        }
      }
    },
    setClass2(param) {
      let c = "submenu-list level";

      if (this.dir == "") {
        return c;
      } else {
        if (param != undefined) {
          if (param.indexOf(this.dir) >= 0) {
            c = "submenu-list level show";
            return c;
          } else {
            return c;
          }
        } else {
          return c;
        }
      }
    },
    setClass3(param) {
      let c = "sub";
      if (param == this.dir) {
        c = "sub is-active-sub";
      }
      console.log(param);
      return c;
    },
    showSub(event) {
      var mainMenuID = event.currentTarget;
      // console.log(mainMenuID);
      if (mainMenuID.classList.contains("is-active")) {
        // mainMenuID.classList.remove("is-active");
      } else {
        Array.prototype.forEach.call(
          mainMenuID.parentElement.children,
          (child) => {
            child.classList.remove("is-active");
          }
        );
        mainMenuID.classList.add("is-active");
      }

      var subMenu = document.getElementById(mainMenuID.dataset.id);
      this.subActive = subMenu;
      let subMenu1 = document.getElementsByClassName("submenu-list");
      // console.log(subMenu1);
      for (let x = 0; x < subMenu1.length; x++) {
        var subMenuID = subMenu1[x].getAttribute("id");
        let subMenu2 = document.getElementById(subMenuID);
        subMenu2.classList.remove("show");
      }
      subMenu.classList.add("show");
      // console.log(subMenu.children.length);
      if (subMenu.children.length < 1) {
      }
    },
    activeSub() {},
    changeMode() {
      if (this.darkModeClass == "light-active") {
        this.$store.dispatch("setNewDarkModeClass", "dark-active");
        this.darkMode = true;
      } else {
        this.$store.dispatch("setNewDarkModeClass", "light-active");
        this.darkMode = false;
      }
    },
    async getters() {
      const res = await API.getNotoriousCount();
      this.$store.dispatch("setNewBadgeCount", res[0].total);
      const res2 = await API.getNotoriousData();
      this.$store.dispatch("setNewNotoriousData", res2);
    },
    async getNotoriousCount() {
      this.getters();
      setInterval(this.getters, 10000);
    }
  },
  mounted() {
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
      htmlElement.setAttribute("theme", "dark");
      this.darkMode = true;
    } else {
      htmlElement.setAttribute("theme", "light");
      this.darkMode = false;
    }

    //show submenu
    let dir = this.$route.fullPath;
    dir = dir.split("/")[2];
    if (dir != undefined) {
      this.dir = dir;
      // console.log(this.dir);
    }
  },
  watch: {
    darkMode() {
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
      }
    }
  },
  computed: {
    darkModeTheme() {
      return this.$store.getters.getDarkMode;
    },
    darkModeClass() {
      return this.$store.getters.getDarkModeClass;
    },
    badgeCount() {
      return this.$store.getters.getBadgeCount;
    },
    notoriusData() {
      return this.$store.getters.getNotoriousData;
    }
  },
  created() {
    this.getNotoriousCount();
  }
};
</script>
<style lang="scss" scoped>
.navmenucount {
  color: red;
  font-weight: bold;
  margin-left: 1px;
  font-size: 12px;
}
.is-active-sub {
  border: 1px solid;
}

/* scss */
</style>
