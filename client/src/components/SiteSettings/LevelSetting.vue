<template>
  <div>
    <div class="card">
      <div class="card-hearder">
        <div class="card-header-title">레벨관리</div>
      </div>
      <div class="card-content">
        <div class="content">
          <table>
            <thead>
              <tr>
                <th colspan="2">레벨</th>
                <th>해외스포츠</th>
                <th>국내스포츠</th>
                <th>라이브</th>
                <th>미니게임</th>
                <th>가상게임</th>
                <th>낙첨 (%)</th>
                <th>추천인 낙첨 (%)</th>
                <th>낙첨 최소폴더</th>
                <th>TreeCoin</th>
                <th>BCoin</th>
                <th>은행 입금</th>
                <th>은행 출금</th>
                <th>지월렛</th>
                <th>샵코인</th>
              </tr>
            </thead>
            <tbody v-for="row in datas" :key="row.ilv_idx">
              <tr>
                <td rowspan="5">
                  <span>레벨 {{row.ilv_level}}</span><br />
                  <input class="input-lv-name" type="text" v-model="row.ilv_name" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" v-model="row.ilv_cross_min_bet" />원</td>
                <td><input type="text" v-model="row.ilv_special_min_bet" />원</td>
                <td><input type="text" v-model="row.ilv_realtime_min_bet" />원</td>
                <td><input type="text" v-model="row.ilv_minigame_min_bet" />원</td>
                <td><input type="text" v-model="row.ilv_empty_min_bet" />원</td>
                <td><input class="input-lv-rate" type="text" v-model="row.ilv_lose_bonus" />%</td>
                <td><input class="input-lv-rate" type="text" v-model="row.ilv_rec_lose_bonus" />%</td>
                <td><input class="input-lv-rate" type="text" v-model="row.min_folder" />%</td>
                <td :id="row.ilv_idx" data-type="treecoin" @change="changing"><b-switch :value="row.treecoin_allow" true-value="1" false-value='0' type="is-success"></b-switch></td>
                <td :id="row.ilv_idx" data-type="bcoin" @change="changing"><b-switch :value="row.bcoin_allow" true-value="1" false-value='0' type="is-success"></b-switch></td>
                <td :id="row.ilv_idx" data-type="deposit" @change="changing"><b-switch :value="row.bank_allow" true-value="1" false-value='0' type="is-success"></b-switch></td>
                <td :id="row.ilv_idx" data-type="withdraw" @change="changing"><b-switch :value="row.bank_withdraw" true-value="1" false-value='0' type="is-success"></b-switch></td>
                <td :id="row.ilv_idx" data-type="gwallet" @change="changing"><b-switch :value="row.gwallet_allow" true-value="1" false-value='0' type="is-success"></b-switch></td>
                <td :id="row.ilv_idx" data-type="shopcoin" @change="changing"><b-switch :value="row.shopcoin_allow" true-value="1" false-value='0' type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" v-model="row.ilv_cross_one_max" />원</td>
                <td><input type="text" v-model="row.ilv_special_one_max" />원</td>
                <td><input type="text" v-model="row.ilv_realtime_one_max" />원</td>
                <td><input type="text" v-model="row.ilv_minigame_one_max" />원</td>
                <td><input type="text" v-model="row.ilv_empty_one_max" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" v-model="row.ilv_cross_one_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_special_one_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_realtime_one_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_minigame_one_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_empty_one_max_win" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" v-model="row.ilv_cross_max_bet" />원</td>
                <td><input type="text" v-model="row.ilv_special_max_bet" />원</td>
                <td><input type="text" v-model="row.ilv_realtime_max_bet" />원</td>
                <td><input type="text" v-model="row.ilv_minigame_max_bet" />원</td>
                <td><input type="text" v-model="row.ilv_empty_max_bet" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" v-model="row.ilv_cross_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_special_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_realtime_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_minigame_max_win" />원</td>
                <td><input type="text" v-model="row.ilv_empty_max_win" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column mt-3" style="text-align:right">
            <button @click="updateData" class="button is-info is-outlined">레벨설정 수정 <span class="mdi mdi-near-me ml-2"></span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../api/partner";
import global from '../../globalfunction/paging';
export default {
  data() {
    return {
      datas:[],
      currentid:null,
    }
  },
  methods: {
    async getData(){
      const res = await API.getconfiglevel();
      this.datas = res;
      this.datas.forEach(element => {
        element.ilv_cross_max_bet = this.numberWithCommas(element.ilv_cross_max_bet);
        element.ilv_cross_max_win = this.numberWithCommas(element.ilv_cross_max_win);
        element.ilv_cross_min_bet = this.numberWithCommas(element.ilv_cross_min_bet);
        element.ilv_cross_one_max = this.numberWithCommas(element.ilv_cross_one_max);
        element.ilv_cross_one_max_win = this.numberWithCommas(element.ilv_cross_one_max_win);
        element.ilv_empty_max_bet = this.numberWithCommas(element.ilv_empty_max_bet);
        element.ilv_empty_max_win = this.numberWithCommas(element.ilv_empty_max_win);
        element.ilv_empty_min_bet = this.numberWithCommas(element.ilv_empty_min_bet);
        element.ilv_empty_one_max = this.numberWithCommas(element.ilv_empty_one_max);
        element.ilv_empty_one_max_win = this.numberWithCommas(element.ilv_empty_one_max_win);
        element.ilv_minigame_max_bet = this.numberWithCommas(element.ilv_minigame_max_bet);
        element.ilv_minigame_max_win = this.numberWithCommas(element.ilv_minigame_max_win);
        element.ilv_minigame_min_bet = this.numberWithCommas(element.ilv_minigame_min_bet);
        element.ilv_minigame_one_max = this.numberWithCommas(element.ilv_minigame_one_max);
        element.ilv_minigame_one_max_win = this.numberWithCommas(element.ilv_minigame_one_max_win);
        element.ilv_realtime_max_bet = this.numberWithCommas(element.ilv_realtime_max_bet);
        element.ilv_realtime_max_win = this.numberWithCommas(element.ilv_realtime_max_win);
        element.ilv_realtime_min_bet = this.numberWithCommas(element.ilv_realtime_min_bet);
        element.ilv_realtime_one_max = this.numberWithCommas(element.ilv_realtime_one_max);
        element.ilv_realtime_one_max_win = this.numberWithCommas(element.ilv_realtime_one_max_win);
        element.ilv_special_max_bet = this.numberWithCommas(element.ilv_special_max_bet);
        element.ilv_special_max_win = this.numberWithCommas(element.ilv_special_max_win);
        element.ilv_special_min_bet = this.numberWithCommas(element.ilv_special_min_bet);
        element.ilv_special_one_max = this.numberWithCommas(element.ilv_special_one_max);
        element.ilv_special_one_max_win = this.numberWithCommas(element.ilv_special_one_max_win);
      });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async updateData(){
      var sendData = [];
      this.datas.forEach(element => {
        var temp = {
          bank_allow : element.bank_allow,
          bank_withdraw:element.bank_withdraw,
          bcoin_allow:element.bcoin_allow,
          gwallet_allow:element.gwallet_allow,
          ilv_cross_max_bet:parseInt(element.ilv_cross_max_bet.replaceAll(",","")),
          ilv_cross_max_win:parseInt(element.ilv_cross_max_win.replaceAll(",","")),
          ilv_cross_min_bet:parseInt(element.ilv_cross_min_bet.replaceAll(",","")),
          ilv_cross_one_max:parseInt(element.ilv_cross_one_max.replaceAll(",","")),
          ilv_cross_one_max_win:parseInt(element.ilv_cross_one_max_win.replaceAll(",","")),
          ilv_empty_max_bet:parseInt(element.ilv_empty_max_bet.replaceAll(",","")),
          ilv_empty_max_win:parseInt(element.ilv_empty_max_win.replaceAll(",","")),
          ilv_empty_min_bet:parseInt(element.ilv_empty_min_bet.replaceAll(",","")),
          ilv_empty_one_max:parseInt(element.ilv_empty_one_max.replaceAll(",","")),
          ilv_empty_one_max_win:parseInt(element.ilv_empty_one_max_win.replaceAll(",","")),
          ilv_lose_bonus:element.ilv_lose_bonus,
          ilv_minigame_max_bet:parseInt(element.ilv_minigame_max_bet.replaceAll(",","")),
          ilv_minigame_max_win:parseInt(element.ilv_minigame_max_win.replaceAll(",","")),
          ilv_minigame_min_bet:parseInt(element.ilv_minigame_min_bet.replaceAll(",","")),
          ilv_minigame_one_max:parseInt(element.ilv_minigame_one_max.replaceAll(",","")),
          ilv_minigame_one_max_win:parseInt(element.ilv_minigame_one_max_win.replaceAll(",","")),
          ilv_name:element.ilv_name,
          ilv_realtime_max_bet:parseInt(element.ilv_realtime_max_bet.replaceAll(",","")),
          ilv_realtime_max_win:parseInt(element.ilv_realtime_max_win.replaceAll(",","")),
          ilv_realtime_min_bet:parseInt(element.ilv_realtime_min_bet.replaceAll(",","")),
          ilv_realtime_one_max:parseInt(element.ilv_realtime_one_max.replaceAll(",","")),
          ilv_realtime_one_max_win:parseInt(element.ilv_realtime_one_max_win.replaceAll(",","")),
          ilv_rec_lose_bonus:element.ilv_rec_lose_bonus,
          ilv_special_max_bet:parseInt(element.ilv_special_max_bet.replaceAll(",","")),
          ilv_special_max_win:parseInt(element.ilv_special_max_win.replaceAll(",","")),
          ilv_special_min_bet:parseInt(element.ilv_special_min_bet.replaceAll(",","")),
          ilv_special_one_max:parseInt(element.ilv_special_one_max.replaceAll(",","")),
          ilv_special_one_max_win:parseInt(element.ilv_special_one_max_win.replaceAll(",","")),
          min_folder:element.min_folder,
          shopcoin_allow:element.shopcoin_allow,
          treecoin_allow:element.treecoin_allow,
        }
        sendData.push(temp);
      });
      // console.log(sendData);
      const res = await API.updateconfiglevel(sendData);
      this.$buefy.toast.open({
          duration: 3000,
          position: "is-top",
          message: res.message,
          type: (res.status < 1)?"is-danger":"is-success",
      });
      this.getData();
    },
    changing(event){
      const id = event.currentTarget.id;
      const type =event.currentTarget.dataset.type;
      this.currentid = id;
      this.datas.filter(element => {
        if(element.ilv_idx == id){
          if(type == 'treecoin'){
            element.treecoin_allow = (element.treecoin_allow == 0)?1:0;
          }else if(type == 'bcoin'){
            element.bcoin_allow = (element.bcoin_allow == 0)?1:0;
          }else if(type == 'deposit'){
            element.bank_allow = (element.bank_allow == 0)?1:0;
          }else if(type == 'withdraw'){
            element.bank_withdraw = (element.bank_withdraw == 0)?1:0;
          }else if(type == 'gwallet'){
            element.gwallet_allow = (element.gwallet_allow == 0)?1:0;
          }else{
            element.shopcoin_allow = (element.shopcoin_allow == 0)?1:0;
          }
        }
      });
    },
  },
  created() {
    this.getData();
  },
}
</script>
<style lang="scss" scoped>
.input-lv-name {
  max-width: 60px;
  margin-top: 10px;
}
.input-lv-rate {
  max-width: 30px;
  margin-top: 3px;
}
.separate-level {
  border-bottom: 10px solid #dddddd;
}
input{
  text-align: right;
}
</style>
