<template>
    <div>
        <div class="">
            <table>
                <thead>
                <tr>
                    <th colspan="4"></th>
                    <th colspan="3">원배당</th>
                    <th colspan="2"></th>
                </tr>
                <tr>
                    <th>미니 게임</th>
                    <th>미니 게임 선택</th>
                    <th>마켓</th>
                    <th>첫 번째 제목</th>
                    <th>승</th>
                    <th>무</th>
                    <th>패</th>
                    <th>두 번째 제목</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                    <input disabled type="text" class="input-group-text" :value="`${setvalue(minigame.game_id)}`" readonly>
                    </td>
                    <td>
                    <div class="select">
                        <select v-model="game_id" class="qwekqwek" name="" id="">
                        <option v-for="(game, index) in gametitle" :key="index" :value="index">{{game}}</option>
                        </select>
                    </div>
                    </td>
                    <td>
                    <div class="select">
                        <select v-model="market_id" class="qwekqwek" name="" id="">
                        <option v-for="(market, index) in marketarray" :key="index" :value="index">{{index+'  -  '+market}}</option>
                        </select>
                    </div>
                    </td>
                    <td>
                    <input type="text" class="input-group-text qwekqwek" v-model="first_title">
                    </td>
                    <td style="background-color: #a4a4c4">
                    <input type="text" class="input-group-text qwekqwek odds" v-model="first_odd">
                    </td>
                    <td style="background-color: #a4a4c4">
                    <input type="text" class="input-group-text qwekqwek odds" v-model="data_center">
                    </td>
                    <td style="background-color: #a4a4c4">
                    <input type="text" class="input-group-text qwekqwek odds" v-model="second_odd">
                    </td>
                    <td>
                    <input type="text" class="input-group-text qwekqwek" v-model="second_title">
                    </td>
                    <td>
                    <button @click ="save" :id="minigame.id" class="button is-info mr-3">SAVE EDIT</button>
                    <button @click="deleteminigame" :id="minigame.id" class="button is-danger">DELETE</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div  v-if="extra_market != '{}'" class="">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Bet Title</th>
                    <th>odds</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(extra, index) in extra_market" :key="index">
                    <td><span @click="deletesub" :id="index" :data-id="minigame.id" class="mdi mdi-close is-clickable" style="color:red"></span></td>
                    <td>
                    <input type="text" class="input-group-text qwekqwek" v-model="extra.homeTitle">
                    </td>
                    <td>
                    <input type="text" class="input-group-text qwekqwek" v-model="extra.homeTeam1">
                    </td>
                    <td>
                    <input type="text" class="input-group-text qwekqwek" v-model="extra.homeOdds1">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props:['minigame','gametitle','marketarray','deleteminigame','saveedit','deletesubgame'],
    data() {
        return {
            game_id:null,
            market_id:null,
            first_odd:null,
            second_odd:null,
            data_center:null,
            first_title:null,
            second_title:null,
            extra_market:{},
        }
    },
    methods: {
        setvalues(){
            this.game_id = this.minigame.game_id;
            this.market_id = this.minigame.market_id;
            this.first_odd = this.minigame.first_odd;
            this.second_odd = this.minigame.second_odd;
            this.data_center = this.minigame.data_center;
            this.first_title = this.minigame.first_title;
            this.second_title = this.minigame.second_title;
            this.extra_market = JSON.parse(this.minigame.extra_market);
        },
        setvalue(param){
            for(var key in this.gametitle){
                if(param == key){
                    return key+" - "+this.gametitle[key];
                }
            }
        },
        save(event){
            const sendData = {
                id:event.currentTarget.id,
                game_id:this.game_id,
                market_id:this.market_id,
                first_odd:this.first_odd,
                second_odd:this.second_odd,
                data_center:this.data_center,
                first_title:this.first_title,
                second_title:this.second_title,
                extra_market:this.extra_market,
            }
            this.saveedit(sendData);
        },
        deletesub(event){
            const eve = event.currentTarget;
            var sendData = {
                id : eve.dataset.id,
                subid : eve.id,
            }
            this.deletesubgame(sendData);
            this.watching();
        },
        watching(){
            this.extra_market = JSON.parse(this.minigame.extra_market);
        },
    },
    created() {
        this.setvalues();
    },
}
</script>
<style lang="scss" scoped>
.qwekqwek{
  border: 1px solid black;
}
.odds{
  width:80px;
}
</style>