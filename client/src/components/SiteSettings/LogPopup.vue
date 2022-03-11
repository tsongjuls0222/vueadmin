<template>
    <div class="card" style="width:98%;height: 98%;">
        <div class="card-header">
            <div class="card-header-title">
                <div class="tabs p-2 is-clickable">
                    <ul>
                        <li class="px-5" v-for="head in header" :id="head.id" :key="head.id">{{head.name}}</li>
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
                            <table v-if="currentid==1">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date From</th>
                                        <th>Date To</th>
                                        <th>Date Claimed</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <table v-else>
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
                                <tbody></tbody>
                            </table>
                            <Nodata v-if="datas.length < 1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nodata from '../GlobalTemplate/Nodata.vue';
export default {
    props:['close'],
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
    },
    created(){
        this.currenttitle = this.setname();
    },
}
</script>