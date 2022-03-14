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
                        <label for="">로그인 아이디:</label>
                        <input v-model="username" class="input" type="text" placeholder="아이디를 입력해주세요">
                    </div>
                    <div class="column p-3">
                        <label for="">비밀번호:</label>
                        <input v-model="password" class="input" type="text" placeholder="비밀번호를 입력해주세요.">
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-three-quarters p-3">
                        <label for="">접근가능 아이피:</label>
                        <input v-model="ipset" class="input" type="text" placeholder="콤마(,)로 구분">
                    </div>
                    <div class="column p-3">
                        <label for="">계정상태:</label>
                        <div class="select">
                            <select v-model="status" name="" id="">
                                <option value="0">정상</option>
                                <option value="1">이용불가</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="buttons is-right">
                    <div @click="$emit('close')" class="button is-dark mr-2">닫기</div>
                    <div @click="addaccount" class="button is-info">계정등록</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../../globalfunction/paging';
import API from '../../api/partner';
export default {
    props:['ip','partnerinfo','getpartner','currentinfo'],
    data() {
        return {
            username:'',
            password:'',
            status:0,
            ipset:'',
        }
    },
    methods: {
        formatDate(){
            return global.methods.formatDateAndTime();
        },
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        },
        async addaccount(){
            if(this.username == '' || this.password == ''){
                this.$buefy.toast.open({
                    duration: 3000,
                    position: "is-top",
                    message: 'Fields cannot be empty!',
                    type: "is-danger",
                });
                return;
            }

            var sendData ={};
            var res = null;

            if(this.currentinfo == null){
                sendData = {
                    username: this.username,
                    password: this.password,
                    status: this.status,
                    ip: this.ip,
                    parentagent: this.partnerinfo.ia_idx,
                    reg_ip: this.ipset,
                    datenow: this.formatDate(),
                    action: this.computedUserInfo().user.id,
                    name:this.partnerinfo.ia_name,
                }
                res = await API.addaccount(sendData);                
            }else{
                sendData = {
                    username: this.username,
                    password: this.password,
                    status: this.status,
                    parentagent: this.partnerinfo.ia_idx,
                    reg_ip: this.ipset,
                    action: this.computedUserInfo().user.id,
                    name:this.partnerinfo.ia_name,
                    id:this.currentinfo[0].id,
                }
                res = await API.editaccount(sendData);   
            }
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
            if(res.status > 0){
                this.getpartner(this.partnerinfo.ia_idx);
                this.$emit('close');
            }
        },
        setfields(){
            if(this.currentinfo != null){
                this.username = this.currentinfo[0].username;
                this.status = this.currentinfo[0].iac_status;
            }
        }
    },
    created() {
        this.setfields();
    },
}
</script>