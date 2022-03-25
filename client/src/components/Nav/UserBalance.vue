<template>
    <div class="views-count-box-wrapper" id="prematch-count">
        <div class="views-count-box-content">
            <div class="views-count-box-header">
                <span class="header-text noselect">{{korpage}}</span>
            </div>
            <div class="views-count-box-body" @click="toggleset">
                <i class="far fa-eye"></i>
                <span class="count noselect">{{setcounter(list)}}</span>
            </div>
            <div v-if="currentpage==currenttoggle" :class="`viewers-wrapper`">
                <div class="viewers-content">
                <ul class="viewers-list">
                    <li v-for="(row,index) in list" :key="index" class="viewer noselect casino-balance">
                        <a href="#" class="open-me" @mouseleave="mouseleave" @mouseover="mouseover(row[6],row[4])" data-target="1363">{{row[1]}}</a>
                        <i class="fas fa-times" @click="forceLogout(row[0])"></i>
                    </li>
                </ul>
                <div class="casino-balance-wrapper" id="page" :style="`${setstyle()}`">
                    <div class="casino-balance-content">
                        <ul class="balance-list">
                            <li class="casino-co">
                                보유금액:<span id="user-bal">{{formatNumber(parseInt(currenthovered.balance))}}</span>
                            </li>
                            <li class="casino-co">
                                보유포인트:<span id="user-points">{{formatNumber(parseInt(currenthovered.points))}}</span>
                            </li>
                            <li class="casino-co">
                                마이크로:<span id="micro-bal">{{formatNumber(parseInt(currenthovered.micro_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                드림게이밍:<span id="dream-bal">{{formatNumber(parseInt(currenthovered.dream_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                비보게이밍:<span id="vivo-bal">{{formatNumber(parseInt(currenthovered.vivo_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                프라그마틱:<span id="pragmatic-bal">{{formatNumber(parseInt(currenthovered.slot_pragmatic_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                QT슬롯:<span id="qtslot-bal">{{formatNumber(parseInt(currenthovered.slot_qtslot_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                FG슬롯:<span id="fgslot-bal">{{formatNumber(parseInt(currenthovered.slot_fgslot_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                MODA슬롯:<span id="mdslot-bal">{{formatNumber(parseInt(currenthovered.slot_mdslot_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                씨큐나인슬롯:<span id="cq9slot-bal">{{formatNumber(parseInt(currenthovered.slot_cq9slot_balance))}}</span>
                            </li>
                            <li class="casino-co">
                                마이크로슬롯:<span id="microslot-bal">{{formatNumber(parseInt(currenthovered.slot_microslot_balance))}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../../api/gamelist';
export default {
    props:['list','currenthovered','setcurrenthovered','formatNumber','togglesetttings','currentpage','currenttoggle','korpage'],
    data() {
        return {
            toggle:false,
        }
    },
    methods: {
        toggleset(){
            if(this.setcounter(this.list) != 0){
                this.togglesetttings(this.currentpage);
                this.toggle=!this.toggle;
            }
        },
        async forceLogout(param){
            const res = await API.forceLogout({userid:param});
            this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: 'is-success',
        });
        },
        setcounter(param){
            if(param == undefined || param == '' || Object.keys(param).length < 1 || param == null){
                return 0;
            }
            return Object.keys(param).length;
        },
        mouseover(param){
            this.setcurrenthovered(param);
            const prematchbalance = document.getElementById('page');
            prematchbalance.style.display = 'block';
        },
        mouseleave(){
            const prematchbalance = document.getElementById('page');
            prematchbalance.style.display = 'none';
        },
        setstyle(){
            if(this.currentpage == 'noticelist' || this.currentpage == 'eventlist'){
                return 'left:-175px !important;display:none';
            }
            return 'display:none';
        }
    },
    mounted() {
    },
}
</script>