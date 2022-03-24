<template>
    <div class="card">
        <div class="card-header">
            <div class="is-flex is-justify-content-space-between p-5" style="width:100%">
                <div>
                    <span class="pt-5">New Minigame</span>
                    <button @click="addFormElement" class="button">+</button>
                </div>
                <div class="buttons">
                    <button @click="backtolist" class="button is-info">MINI GAMES LIST</button>
                    <button @click="addmini" class="button is-info">선택수정</button>
                </div>
            </div>
        </div>
        <div class="card-content">
            <div v-for="(game,index) in addedgame" :key="index" >
                <div class="">
                    <table>
                        <thead>
                        <tr>
                            <th colspan="4"></th>
                            <th colspan="3">원배당</th>
                            <th colspan="1"></th>
                        </tr>
                        <tr>
                            <th>미니 게임</th>
                            <th>스페셜</th>
                            <th>마켓</th>
                            <th>첫 번째 제목</th>
                            <th>승</th>
                            <th>무</th>
                            <th>패</th>
                            <th>두 번째 제목</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="select">
                                    <select v-model="game.game_id" class="qwekqwek" name="" id="">
                                    <option value="0">Minigames</option>
                                    <option v-for="(game, index) in gametitle" :key="index" :value="index">{{game}}</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <button @click="addsubgame(index)" class="button">+</button>
                            </td>
                            <td>
                                <div class="select">
                                    <select v-model="game.market_id" class="qwekqwek" name="" id="">
                                    <option value="0">market</option>
                                    <option v-for="(market, index) in marketarray" :key="index" :value="index">{{market}}</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <input type="text" class="input-group-text qwekqwek" v-model="game.first_title" placeholder="Title">
                            </td>
                            <td style="background-color: #a4a4c4">
                                <input type="number" class="input-group-text qwekqwek odds" v-model="game.first_odd" placeholder="0">
                            </td>
                            <td style="background-color: #a4a4c4">
                                <input type="number" class="input-group-text qwekqwek odds" v-model="game.data_center" placeholder="0">
                            </td>
                            <td style="background-color: #a4a4c4">
                                <input type="number" class="input-group-text qwekqwek odds" v-model="game.second_odd" placeholder="0">
                            </td>
                            <td>
                                <input type="text" class="input-group-text qwekqwek" v-model="game.second_title" placeholder="Title">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="game.extra_market != ''" class="">
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
                            <tr v-for="(extra, extraindex) in game.extra_market" :key="extraindex">
                                <td><span @click="removethis(index,extraindex)" class="mdi mdi-close is-clickable" style="color:red"></span></td>
                                <td>
                                <input type="text" class="input-group-text qwekqwek" v-model="extra.homeTitle" placeholder="Title">
                                </td>
                                <td>
                                <input type="text" class="input-group-text qwekqwek" v-model="extra.homeTeam1"  placeholder="Title">
                                </td>
                                <td>
                                <input type="number" class="input-group-text qwekqwek" v-model="extra.homeOdds1"  placeholder="0">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props:['gametitle','marketarray','addminigame','backtolist'],
    data() {
        return {
            currentselected:null,
            addedgame:[],
        }
    },
    methods: {
        addsubgame(index){
            this.addedgame[index].extra_market.push({marketid:0,homeTitle:'',homeTeam1:'',homeOdds1:'',cell_id:0});
        },
        removethis(index,extraindex){
            this.addedgame[index].extra_market.splice(extraindex,1)
        },
        async saveedit(){

        },
        addmini(){
            this.addminigame(this.addedgame);
        },
        addFormElement(){
            this.addedgame.push({
                game_id:0,
                market_col_id:0,
                market_id:0,
                first_odd:'',
                second_odd:'',
                data_center:'',
                first_title:'',
                second_title:'',
                extra_market:[],
            });
        },
    },
    created() {
        this.addFormElement();
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