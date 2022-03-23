<template>
    <div class="card">
        <div class="card-header" draggable="true">
            <div class="card-header-title">팝업등록</div>
            <div class="card-header-close"><button class="button" @click="closemodal"><span class="mdi mdi-close"></span></button></div>
        </div>
        <div class="card-content">
            <div class="content">
                <form action=""  enctype="multipart/form-data">
                    <div class="row mb-5">
                        <label for="">Title</label>
                        <input type="text" class="input" v-model="toedit.title">
                    </div>
                    <div class="row mb-5">
                        <div class="columns">
                            <div class="column">
                                <label for="">Width</label>
                                <input type="number" class="input" v-model="toedit.width" >
                            </div>
                            <div class="column">
                                <label for="">Height</label>
                                <input type="number" class="input" v-model="toedit.height">
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row mb-5">
                        <label for="">Location</label>
                        <div class="select" style="width:100%">
                            <select v-model="toedit.location" name="" id=""  style="width:100%">
                                <option value="inside">inside</option>
                                <option value="outside">outside</option>
                            </select>
                        </div>
                    </div> -->
                    <div class="row mb-5 is-flex" >
                        <input type="file" class="input" ref="fileupload" id="upload-file" @change="onfileselected">
                        <label for="upload-file" class="input-group-text">Browse</label>
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
    props:['showmodal','closepopup','addpopup','toedit','editpopup'],
    data() {
        return {
            fileselected:null,
        }
    },
    methods: {
        closemodal(){
            this.$refs.fileupload.value=null;
            this.fileselected = null;
            this.closepopup();
        },
        add(){
            if(this.fileselected == null || this.toedit.title == ''){
                console.log("bonak");
                return;
            }
            if(this.toedit.id != null){
                this.editpopup(this.fileselected,this.toedit.id);
            }else{
                this.addpopup(this.fileselected);
            }
            this.closemodal();
        },
        onfileselected(event){
            console.log(event.target.files[0]);
            this.fileselected =  event.target.files[0];
        }
    },
}
</script>