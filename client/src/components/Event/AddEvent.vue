<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">{{title}}</div>
            <div class="card-header-close"><button class="button" @click="closemodal"><span class="mdi mdi-close"></span></button></div>
        </div>
        <div class="card-content">
            <div class="content">
                <form action="" enctype="multipart/form-data">
                    <div class="row mb-5">
                        <label  class="mb-2" for="">게시글제목:</label>
                        <input type="text" class="input" v-model="toedit.title" placeholder="게시글제목">
                    </div>
                    <div v-if="title=='공지 목록'" class="row mb-5">
                        <label  class="mb-2" for="">상단고정:</label>
                        <input type="color" class="input" v-model="toedit.color">
                    </div>
                    <div class="row mb-5">
                        <div class="columns">
                            <div class="column pr-2">
                                <label class="mb-2" for="">상단고정:</label>
                                <div class="select control" style="width:100% !important">
                                    <select name="" id="" v-model="toedit.fix" style="width:100% !important">
                                        <option class="input" value="0">미사용</option>
                                        <option class="input" value="1">사용</option>
                                    </select>
                                </div>
                            </div>
                            <div class="column pr-2">
                                <label class="mb-2" for="">게시글타입:</label>
                                <div class="select control" style="width:100% !important">
                                    <select v-model="toedit.type" name="" id="" style="width:100% !important">
                                        <option class="input" value="notice">공지사항</option>
                                        <option class="input" value="event">이벤트</option>
                                        <option class="input" value="popup">팝업</option>
                                    </select>               
                                </div>
                            </div>
                            <div class="column">
                                <label class="mb-2" for="">게시글상태:</label>
                                <div class="select control" style="width:100% !important">
                                    <select v-model="toedit.status" name="" id="" style="width:100% !important">
                                        <option class="input" value="0">표시</option>
                                        <option class="input" value="1">미표시</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <label class="mb-2">Image:</label>
                        <input type="file" class="input" ref="contentupload" id="content-file" @change="oncontentfileselected">
                    </div>
                    <div class="row" v-if="title == '이벤트 등록'" >
                        <label  class="mb-2">Thumbnail:</label>
                        <input type="file" class="input" ref="thumbnailupload" id="thumbnail-file" @change="onthumbfileselected">
                    </div>
                </form>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item ">
                <div class="pr-5"><button @click="add" class="button is-success">등록</button></div>
                <div class=""><button @click="closemodal" class="button is-dark">취소</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['toedit','title','closepopup','editpopup','addpopup'],
    data() {
        return {
            thumbfileSelected:null,
            contentfileSelected:null,
        }
    },
    methods: {
        closemodal(){
            this.$refs.contentupload.value=null;
            if(this.title=='이벤트 등록')this.$refs.thumbnailupload.value=null;
            this.thumbfileSelected = null;
            this.contentfileSelected = null;
            this.closepopup();
        },
        add(){
            if(this.contentfileSelected == null || this.toedit.title == '' || (this.title=='이벤트 등록' && this.thumbfileSelected == null)){
                console.log("bonak");
                return;
            }
            if(this.toedit.id != null){
                if(this.title=='이벤트 등록'){this.editpopup(this.contentfileSelected,this.toedit.id,this.thumbfileSelected);}
                else{this.editpopup(this.contentfileSelected,this.toedit.id);}
            }else{
                if(this.title=='이벤트 등록'){this.addpopup(this.contentfileSelected,this.thumbfileSelected);}
                else{this.addpopup(this.contentfileSelected);}
            }
            this.closemodal();
        },
        onthumbfileselected(event){
            this.thumbfileSelected =  event.target.files[0];
        },
        oncontentfileselected(event){
            this.contentfileSelected =  event.target.files[0];
        },
    },
}
</script>

<style lang="scss" scoped>
    .card-header{
        border-top: 1px solid #d2cfcf;
    }
</style>