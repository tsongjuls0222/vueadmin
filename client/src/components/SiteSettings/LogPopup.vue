<template>
    <div class="card" style="width:98%;height: 98%;">
        <div class="card-header">
            <div class="card-header-title">
                <div class="tabs p-2 is-clickable">
                    <ul>
                        <li :class="`px-5 ${setselected(head.id)}`" @click="calllogs" v-for="head in header" :id="head.id" :key="head.id">{{head.name}}</li>
                    </ul>
                </div>
            </div>
            <div @click="closethis" class="card-header-close is-clickable  p-5"><span class="mdi mdi-close-circle-outline"></span></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="card">
                    <div class="card-header p-5">
                        <div class="card-header-title">
                            {{`${currenttitle}`}}
                        </div>
                        <div class="card-header-title">
                            <input class="input" type="date">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div v-if="currentid==1">
                            <table >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date From</th>
                                        <th>Date To</th>
                                        <th>Date Claimed</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="logs in partnerlogs" :key="logs.id">
                                        <td>{{partnername}}</td>
                                        <td>{{formatDate(logs.date_from)}}</td>
                                        <td>{{formatDate(logs.date_to)}}</td>
                                        <td>{{formatDate(logs.date_save)}}</td>
                                        <td>{{logs.amount}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Nodata v-if="partnerlogs.length < 1"/>
                            </div>
                            <div v-else>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>From Partner</th>
                                        <th>Transfer Amount</th>
                                        <th>Before Balance</th>
                                        <th>After Balance</th>
                                        <th>Date Save</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in datas" :key="data.id">
                                        <td>{{data.agent_name}}</td>
                                        <td>{{data.from_agent}}</td>
                                        <td>{{data.transfer_amount}}</td>
                                        <td>{{data.beforeBalance}}</td>
                                        <td>{{data.afterBalance}}</td>
                                        <td>{{formatD(data.date_save)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Nodata v-if="datas.length < 1"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nodata from '../GlobalTemplate/Nodata.vue';
import global from '../../globalfunction/paging';
import API from '../../api/partner';
export default {
    props:['close','partnerlogs','partnername','partnerid'],
    data() {
        return {
            header:[
                {
                    id:1,
                    name:'정산로그',
                },
                {
                    id:2,
                    name:'Transfer Logs',
                }
            ],
            datas:[],
            currentid:1,
            currenttitle:null,
        }
    },
    components:{Nodata},
    methods: {
        setname(){
            const res = this.header.filter(head => head.id == this.currentid);
            return res[0].name;
        },
        closethis(){
            this.close();
        },
        formatDate(){
            return global.methods.formatDateAndTime();
        },
        formatD(value){
            return global.methods.formatDate(value);
        },
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        },
        setselected(id){
            if(this.currentid == id){
                return 'is-active';
            }
            return '';
        },
        async calllogs(event){
            this.currentid = event.target.id;
            const res = await API.transferlogs(this.partnerid);
            this.datas = res;
        },
    },
    created(){
        this.currenttitle = this.setname();
    },
}
</script>

<style lang="scss" scoped>
.is-active{
    color: blue;
    border-bottom: 1px solid blue;
}
</style>