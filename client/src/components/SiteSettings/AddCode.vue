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
                        <label for="">Title:</label>
                        <input class="input" v-model="title" type="text" placeholder="Title.">
                    </div>
                    <div class="column p-3">
                        <label for="">코드명:</label>
                        <input class="input" v-model="code" type="text" placeholder="코드명을 입력해주세요.">
                    </div>
                    <div class="column p-3">
                        <label for="">코드상태:</label>
                        <div class="select ">
                            <select v-model="status" name="" id="">
                                <option value="0">정상</option>
                                <option value="1">이용불가</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="buttons is-right">
                    <div @click="$emit('close')" class="button is-dark mr-2">닫기</div>
                    <div @click="addcode" class="button is-info">계정등록</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card{
    height: auto !important;
}
</style>
<script>
import global from '../../globalfunction/paging';
import API from '../../api/partner';
export default {
    props:['ip','partnerinfo','getpartner','currentinfo'],
    data() {
        return {
            title:'',
            code:'',
            status:0,
        }
    },
    methods: {
        formatDate(){
            return global.methods.formatDateAndTime();
        },
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        },
        async addcode(){
            if(this.title=='' || this.code == ''){
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
                    icd_agent:this.partnerinfo.ia_idx,
                    icd_name:this.title,
                    icd_code:this.code,
                    icd_status:this.status,
                    status:this.status,
                    icd_reg_datetime:this.formatDate(),
                    icd_reg_ip:this.ip,
                    icd_action:this.computedUserInfo().user.id,
                }

                res = await API.addcode(sendData);
            }else{
                sendData = {
                    icd_agent:this.partnerinfo.ia_idx,
                    icd_name:this.title,
                    icd_code:this.code,
                    icd_status:this.status,
                    status:this.status,
                }
                console.log(this.currentinfo[0].icd_idx);
                res = await API.editcode(this.currentinfo[0].icd_idx,sendData);
            }
            
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
            if(res.status > 0){
                this.$emit('close');
                this.getpartner(this.partnerinfo.ia_idx);
            }
        },
        async setfields(){
            if(this.currentinfo != null){
                this.title = this.currentinfo[0].icd_name;
                this.code = this.currentinfo[0].icd_code;
                this.status = this.currentinfo[0].icd_status;
            }
        }
    },
    created() {
        this.setfields();
    },
}
</script>