<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">{{title}}</div>
            <div class="card-header-close"><button class="button" @click="closemodal"><span class="mdi mdi-close"></span></button></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div>
                    <span>{{(title == 'Upload Group')?'Group Name:':'Macro Name:'}}</span>
                    <div class="control">
                        <input class="input" v-model="toedit.name" type="text" :placeholder="(title == 'Upload Group')?'Group Name:':'Macro Name:'">
                    </div>
                </div>
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
    props:['title','toedit','closepopup','addpopup','editpopup'],
    methods: {
        closemodal(){
            this.closepopup();
        },
        add(){
            if(this.toedit.id != null){
                this.editpopup();
                return;
            }
            this.addpopup();
        },
    },
}
</script>