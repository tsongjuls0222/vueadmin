<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">
                <span class="ml-4">게시글 수정</span>
            </div>
            <div class="is-flex is-flex-direction-row-reverse m-3">
                <div class="buttons is-right">
                    <!-- <button class="button is-info is-normal">답변양식 작성</button> -->
                    <span class="mdi mdi-chevron-down"></span>
                </div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column">
                        <span>게시글제목:</span>
                        <div class="control">
                            <input class="input" v-model="toedit.title" type="text" placeholder="게시글제목">
                        </div>
                    </div>
                    <div class="column">
                        <span class="">Macro Group:</span>
                        <div class="select control">
                            <select v-model="toedit.group" name="" id="">
                                <option v-for="opt in macros" :value="opt.id" :key="opt.id">{{opt.group_name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <ckeditor v-model="toedit.contents"></ckeditor>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item">
                <div class="buttons is-right">
                    <button @click="closethis" class="button is-outlined">
                        <span class="mdi mdi-arrow-left"></span>
                        <span>게시글목록</span>
                    </button>
                    <button @click="add" class="button is-info is-outlined">
                        <span class="mdi mdi-near-me"></span>
                        <span>게시글등록</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../../api/customer_service';
export default {
    props:['type','close','currentid'],
    data() {
        return {
            macros:[],
            toedit:{
                id:null,
                title:'',
                contents:'',
                type:'',
                writer: '',
                group:1,
            },
        }
    },
    methods: {
        async getData(){
            const res = await API.getgroup();
            this.macros = res;
        },
        async getwithid(){
            const res = await API.getformsid(this.currentid);
            this.toedit.title = res.ibd_title;
            this.toedit.contents = res.ibd_contents;
            this.toedit.group = res.form_group;
        },
        closethis(){
            this.close();
        },
        async add(){
            if(this.toedit.title==''||this.toedit.contents==''){
                return;
            }
            if(this.toedit.id != null){
                const sendData = {
                    ibd_idx: this.toedit.id,
                    ibd_title:this.toedit.title,
                    ibd_contents:this.toedit.contents,
                    ibd_type:this.toedit.type,
                    ibd_writer: this.toedit.writer,
                    form_group:parseInt(this.toedit.group),
                };
                const res = await API.editforms(sendData);
                console.log(res);
            }else{
                const sendData = {
                    form_group:parseInt(this.toedit.group),
                    ibd_title:this.toedit.title,
                    ibd_contents:this.toedit.contents,
                    ibd_type:this.toedit.type,
                    ibd_writer: this.toedit.writer,
                };
                console.log(sendData);
                const res = await API.addforms(sendData);
                console.log(res);
            }
            this.close();
        }
    },
    computed:{
        computedUserInfo(){
            return this.$store.getters.getUserInfo;
        }
    },
    created() {
        this.getData();
        this.toedit.type = this.type;
        this.toedit.writer = this.computedUserInfo.user.id;
        if(this.currentid != null){
            this.toedit.id = this.currentid;
            this.getwithid();
        }
    },
}
</script>