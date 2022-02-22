<template>
  <div>
    <Nav />
    <div class="column">
      <div class="card">
        <div class="card-header is-flex-direction-column">
          <div class="columns is-multiline is-vertical is-mobile">
            <div
              class="column is-12-desktop is-12-tablet is-12-mobile admin-filter-list"
            >
              <ul class="pt-5 pr-5 pb-3 has-text-right">
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="cancelled"
                    />&nbsp;취소건
                    <span class="has-text-danger"
                      >({{ radioData["totalcancelled"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="acnotyetdone"
                    />&nbsp;대기건
                    <span class="has-text-danger"
                      >({{ radioData["totalwait"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="acnotdone"
                    />&nbsp;신청건
                    <span class="has-text-danger"
                      >({{ radioData["totalnew"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="actonlydone"
                    />&nbsp;입금완료<span class="has-text-danger"
                      >({{ radioData["totalcompleted"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="shopcoin"
                    />&nbsp;SHOPCOIN
                    <span class="has-text-danger"
                      >({{ radioData["totalshop"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="gwallet"
                    />&nbsp;GWALLET
                    <span class="has-text-danger"
                      >({{ radioData["totalgwallet"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="bank"
                    />&nbsp;은행
                    <span class="has-text-danger"
                      >({{ radioData["totalbank"] }})</span
                    ></label
                  >
                </li>
                <li class="ml-4">
                  <label class="radio"
                    ><input
                      type="radio"
                      v-model="worktype"
                      value="all"
                    />&nbsp;전체
                    <span class="has-text-danger"
                      >({{ radioData["bankgwaltotal"] }})</span
                    ></label
                  >
                </li>
              </ul>
            </div>
            <div
              class="column is-12-desktop is-12-tablet is-12-mobile admin-filter-language"
            >
              <ul class="pl-5 pb-3 has-text-right">
                <li class="ml-2"><a href="/">Korean</a></li>
                <li class="ml-2">|</li>
                <li class="ml-2"><a href="/">English</a></li>
              </ul>
            </div>
            <div class="column is-12-desktop is-12-tablet is-12-mobile">
              <AdminMainFilter
                :agents="agents"
                :codes="codes"
                :worktype="worktype"
                :transaction="transaction"
              />
            </div>
          </div>
        </div>
        <div class="card-content">
          <AdminMainTable :newData="newData" :isEmpty="isEmpty" />
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav/Nav.vue";
import AdminMainTable from "../components/Tables/AdminMain.vue";
import AdminMainFilter from "../components/Filter/AdminMain.vue";
import API from "../api/admin";
export default {
  name: "Admin",
  components: { Nav, AdminMainTable, AdminMainFilter },
  data() {
    return {
      transaction: "deposit",
      worktype: "actonlydone",
      newData: [],
      isEmpty: false,
      agents: [],
      codes: []
    };
  },
  methods: {
    async getRadioData() {
      const res = await API.getRadioButtonData();
      this.$store.commit("setRadioData", res);
    },
    async getTableData() {
      const res = await API.getTableData();
      this.$store.commit("setTableData", res);
    },
    async getSelectAgent() {
      const res = await API.getSelectAgent();
      this.$store.commit("setAgents", res);
      this.agents = res;
    },
    async getSelectCode() {
      const res = await API.getSelectCode();
      this.$store.commit("setCodes", res);
      this.codes = res;
    },
    async getMacroSelection() {
      const res = await API.getMacroSelection();
      const res2 = await API.getMacroGroup();
      this.$store.commit("setMacroSelection", res);
      this.$store.commit("setMacroGroup", res2);
    }
  },
  created() {
    document.title = "VS Admin - Admin Main";
    this.$store.dispatch("setNewTableCounter", -1);
    this.getRadioData();
    this.getTableData();
    this.getSelectAgent();
    this.getSelectCode();
    this.getMacroSelection();
  },
  mounted() {
    // this.$store.commit("setAuthentication", false);
  },
  computed: {
    radioData() {
      return this.$store.getters.getRadioData;
    }
  }
};
</script>
<style scoped>
* {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  color: #333;
}
.admin-filter-list ul li {
  float: right;
}
.admin-filter-language ul li {
  float: left;
}
.admin-filter-language ul li a {
  color: #2196f3;
}
</style>
