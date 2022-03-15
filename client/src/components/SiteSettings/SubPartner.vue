<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">파트너 계정등록</div>
            <div @click="$emit('close')" class="is-clickable card-header-close pr-4 pt-2"><span class="mdi mdi-close-circle-outline"></span></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너코드 (구분용):</label>
                        <input class="input" v-model="code" type="text" placeholder="아이디를 입력해주세요">
                    </div>
                    <div  class="column p-3">
                        <div v-show="!show">
                            <label for="">파트너명:</label>
                            <input class="input" v-model="name" type="text" placeholder="비밀번호를 입력해주세요.">
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label for="">파트너 루징비율 (%)</label>
                        <input class="input" v-model="loosing" type="text" maxlength="3" placeholder="아이디를 입력해주세요">
                    </div>
                    <div class="column">
                        <label for="">파트너 수수료율 (%)</label>
                        <input class="input" v-model="fee" type="text" maxlength="3" placeholder="비밀번호를 입력해주세요.">
                    </div>
                    <div class="column">
                        <label for="">수익유형:</label>
                        <div class="select" style="width:100%">
                            <select v-model="partnertype" name="" id="" style="width:100%">
                                <option value="revenue">수익</option>
                                <option value="rolling">롤링</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">스포츠 (%)</label>
                        <input class="input" v-model="prematch" type="number" maxlength="3">
                    </div>
                    <div class="column p-3">
                        <label for="">라이브 (%)</label>
                        <input class="input" v-model="live" type="number" maxlength="3">
                    </div>
                    <div class="column p-3">
                        <label for="">미니게임 (%)</label>
                        <input class="input" v-model="minigame" type="number" maxlength="3">
                    </div>
                    <div class="column p-3">
                        <label for="">카지노 (%)</label>
                        <input class="input" v-model="casino" type="number" maxlength="3">
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너 상태:</label>
                        <div class="select" style="width:100%">
                            <select v-model="status" name="" id="" style="width:100%">
                                <option value="0">정상</option>
                                <option value="1">이용불가</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">하부생성:</label>
                        <div class="select" style="width:100%">
                            <select v-model="allowchildren" name="" id="" style="width:100%">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">보기전용:</label>
                        <div class="select" style="width:100%">
                            <select v-model="viewingonly" name="" id="" style="width:100%">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">최대생성</label>
                        <input v-model="maxchildren" class="input" type="number">
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-one-quarter p-3">
                        <label for="">포인트지급</label>
                        <div class="select" style="width:100%">
                            <select v-model="blastpoints" name="" id="" style="width:100%">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column is-one-quarter p-3">
                        <label for="">금액</label>
                        <input v-model="pointslimit" class="input" type="number">
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너 상태</label>
                        <textarea v-model="memo" style="width:100%" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="buttons is-right">
                    <div @click="$emit('close')" class="button is-dark mr-2">닫기</div>
                    <div @click="addagent" class="button is-info">계정등록</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../../globalfunction/paging';
import API from '../../api/partner';
export default {
    props:['show','ipaddress','refresh','partnerinfo','currentinfo'],
    data() {
        return {
            code:'',
            name:'',
            loosing:'',
            fee:'',
            partnertype:'revenue',
            prematch:'',
            live:'',
            minigame:'',
            casino:'',
            status:0,
            allowchildren:0,
            viewingonly:0,
            maxchildren:0,
            blastpoints:0,
            pointslimit:'',
            memo:'',
        }
    },
    methods: {
        formatDate(){
            return global.methods.formatDateAndTime();
        },
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        },
        setfields(){
            if(this.currentinfo != null){
                this.code = this.currentinfo.ia_code;
                this.name = this.currentinfo.ia_name;
                this.loosing = this.currentinfo.ia_loosing;
                this.fee = this.currentinfo.ia_fee;
                this.partnertype = this.currentinfo.ia_partnertype;
                this.prematch = this.currentinfo.ia_prematch;
                this.live = this.currentinfo.ia_realtime;
                this.minigame = this.currentinfo.ia_minigame;
                this.casino = this.currentinfo.ia_casino;
                this.status = this.currentinfo.ia_status;
                this.allowchildren = this.currentinfo.allowChildren;
                this.viewingonly = this.currentinfo.viewingOnly;
                this.maxchildren = this.currentinfo.maxChildren;
                this.blastpoints = this.currentinfo.blastPoints;
                this.pointslimit = this.currentinfo.pointsLimit;
                this.memo = this.currentinfo.agent_memo;
            }
        },
        async addagent(){
            if(this.code == ''){
                this.$buefy.toast.open({
                    duration: 3000,
                    position: "is-top",
                    message: 'Fields cannot be empty!',
                    type: "is-danger",
                });
                return;
            }

            var sendData = {};
            var res = null;

            if(this.currentinfo == null){
                sendData = {
                    code:this.code,
                    loosing:this.loosing,
                    fee:this.fee,
                    partnertype:this.partnertype,
                    prematch:this.prematch,
                    live:this.live,
                    minigame:this.minigame,
                    casino:this.casino,
                    status:this.status,
                    allowchildren:this.allowchildren,
                    viewingonly:this.viewingonly,
                    maxchildren:this.maxchildren,
                    blastpoints:this.blastpoints,
                    pointslimit:this.pointslimit,
                    memo:this.memo,
                    ipaddress:this.ipaddress,
                    datenow: this.formatDate(),
                    action: this.computedUserInfo().user.id,
                    parentagent:this.partnerinfo.ia_idx,
                }
                res = await API.addagent(sendData);       
            }else{
                sendData = {
                    code:this.code,
                    name:this.name,
                    loosing:this.loosing,
                    fee:this.fee,
                    partnertype:this.partnertype,
                    prematch:this.prematch,
                    live:this.live,
                    minigame:this.minigame,
                    casino:this.casino,
                    status:this.status,
                    allowchildren:this.allowchildren,
                    viewingonly:this.viewingonly,
                    maxchildren:this.maxchildren,
                    blastpoints:this.blastpoints,
                    pointslimit:this.pointslimit,
                    memo:this.memo,
                    id: this.partnerinfo.ia_idx,
                }
                // console.log(sendData);
                res = await API.editagent(sendData);   
            }
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
            if(res.status > 0){
                // this.getpartner(this.partnerinfo.ia_idx);
                this.refresh();
                this.$emit('close');
            }
        },
    },
    created() {
        this.setfields();
    },
}
</script>