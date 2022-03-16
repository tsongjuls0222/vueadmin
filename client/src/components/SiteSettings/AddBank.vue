<template>
    <div class="card">
        <div class="card-header" draggable="true">
            <div class="card-header-title">Upload Bank</div>
            <div @click="$emit('close')" class="is-clickable card-header-close pr-4 pt-2"><span class="mdi mdi-close-circle-outline"></span></div>
        </div>
        <div class="card-content">
            <div class="content">
                <form action=""  enctype="multipart/form-data">
                    <div class="row mb-5">
                        <label for="">Bank Name:</label>
                        <input type="text" class="input" v-model="toedit.bank_name">
                    </div>
                    <div class="row mb-5">
                        <label for="upload-file">Bank Image:</label>
                        <input type="file" class="input" ref="fileupload" id="upload-file" @change="onfileselected">
                    </div>
                </form>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item ">
                <div class="pr-5"><button @click="add" class="button is-success">등록</button></div>
                <div class=""><button @click="$emit('close')" class="button is-dark">취소</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['addpopup','toedit','editpopup'],
    data() {
        return {
            fileselected:null,
        }
    },
    methods: {
        add(){
            if(this.fileselected == null || this.toedit.bank_name == ''){
                this.$buefy.toast.open({
                    duration: 3000,
                    position: "is-top",
                    message: 'Fields cannot be empty!',
                    type: "is-danger",
                });
                return;
            }

            if(this.toedit.id != null){
                this.editpopup(this.fileselected,this.toedit.id);
            }else{
                this.addpopup(this.fileselected);
            }
            this.$emit('close');
        },
        onfileselected(event){
            this.fileselected =  event.target.files[0];
        }
    },
}
</script>