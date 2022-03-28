<template>
    <div>
        <div v-for="row in list" :key="row.id" :id="row.id" class="country-content">
            <div class="country-title" @drop="droppablelist($event,row.sort_num)" @dragenter.prevent @dragstart="startDrag($event,row.sort_num)" @dragover.prevent draggable="true">
                <input @change="setcountrybox" :data-code="row.country_code" class="nyeckbox" type="checkbox" v-model="row.status" :true-value="'open'" :false-value="'close'">
                <form action="" enctype="multipart/form-data">
                    <label :for="`file-input${row.id}`">
                        <img width="16px" class="is-clickable" :src="`${pathing}/${setimage(row.img_file,row.a2code)}`" alt="">
                    </label>
                </form>
                <input :data-code="row.country_code" @change="onfilechange" type="file" name="" :id="`file-input${row.id}`">
                <input @focusout="setcountryname" :data-id="row.id" :data-code="row.country_code" @click="showleagues" class="input is-small" type="text" :value="row.country_title">
            </div>
            <div class="league-list" v-if="datas.length > 0 && currentleague == row.id">
                <div class="league-title" v-for="ruw in datas" :id="ruw.num" :key="ruw.num" :data-code="row.country_code" @drop="leagueDrop($event, ruw.league_sort)" @dragstart="leagueDrag($event, ruw.league_sort)" @dragover.prevent @dragenter.prevent draggable="true" :data-league="ruw.leagu_id">
                    <input @change="setleaguebox" class="nyeckbox" v-model="ruw.status" type="checkbox" :true-value="'open'" :false-value="'close'">
                    <input @focusout="setleaguename" @click="setcurrent" class="input is-small" type="text" :value="ruw.leagu_name">
                </div>
                <!-- <div class="save-settings">
                    <button @click="savecountry" class="button is-info is-small">Save Country Settings</button>
                </div> -->
            </div>
            
        </div>
    </div>
</template>
<script>
import API from "../../api/league";
export default {
    props:['list','game_section','swapping','getleaguesorting'],
    data() {
        return {
            pathing: 'http://localhost:5000/api/upload',
            datas:[],
            currentleague:null,
            countriesupdate:[],
            currentname:null,
        }
    },
    methods: {
        setimage(param1,param2){
            if(param1 == null || param1 == ''){
                if(param2 == null){
                    return 'flags_s/-.gif';
                }else{
                    return 'flags_s/'+param2+'.gif';
                }
            }
            return 'country_icon/'+param1;
        },
        setnyeckbox(param){
            if(param == 'open'){
                return true;
            }else{
                return false;
            }
        },
        async showleagues(event){
            this.currentname = event.currentTarget.value;
            const data_set = event.currentTarget.dataset;
            this.currentleague = (this.currentleague == data_set.id)? null: data_set.id;
            const sendData = {
                game_code :this.game_section,
                reg_countrycode :data_set.code,
                type:'prematch',
            }
            if(this.currentleague != null){
                const res = await API.getleagues(sendData);
                this.datas = res;
            }else{
                this.datas = [];
            }
            this.sortleague;
        },
        async setcountrybox(event){
            const target = event.currentTarget;
            const sendData = {
                game_code: this.game_section,
                country_code: target.dataset.code,
                status: (target.checked)?'open':'close',
                type:'prematch',
            }
            // console.log(sendData);
            const res = await API.setcountrybox(sendData);
            console.log(res);
        },
        async setleaguebox(event){
            const target = event.currentTarget;
            const parent = target.parentElement;
            const sendData = {
                game_code: this.game_section,
                country_code: parent.dataset.code,
                leagu_id: parent.dataset.league,
                status: (target.checked)?'open':'close',
                type:'prematch',
            }
            const res = await API.setleaguebox(sendData);
        },
        setcurrent(event){
            const temp = event.currentTarget.value;
            this.currentname = temp;
        },
        async setleaguename(event){
            const target = event.currentTarget;
            const parent = target.parentElement;
            var sendData = {
                game_code: this.game_section,
                reg_countrycode: parent.dataset.code,
                leagu_id:parent.dataset.league,
                leagu_name: target.value,
                type:'prematch',
            }

            if(this.currentname != target.value){
                const res = await API.setleaguename(sendData);
            }
        },
        async setcountryname(event){
            const target = event.currentTarget;
            var sendData = {
                game_code: this.game_section,
                country_code: target.dataset.code,
                country_title: target.value,
                type:'prematch',
            }
            if(this.currentname != target.value){
                const res = await API.setcountryname(sendData);
                this.getleaguesorting();
            }
        },
        droppablelist(event,drop){
            // console.log(event.currentTarget);
            event.stopImmediatePropagation();
            const dragid = event.dataTransfer.getData('itemID');
            const dropid = drop;
            this.swapping(dragid,dropid,this.game_section);
            this.sortcountry;
        },
        startDrag(event,id){
            // console.log(event.currentTarget);
            event.stopImmediatePropagation();
            this.currentleague = null;
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('itemID',id);
        },
        leagueDrag(event, id){
            event.stopImmediatePropagation();
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('itemID',id);
            event.dataTransfer.setData('itemLeague',id);
            event.dataTransfer.setData('itemCode',id);
        },
        leagueDrop(event,drop){
            event.stopImmediatePropagation();
            const dragid = event.dataTransfer.getData('itemID');
            const dropid = drop;

            const dragged = this.datas.findIndex(element=>element.league_sort == dragid);
            const dropped = this.datas.findIndex(element=>element.league_sort == dropid);
            
            this.datas[dragged].league_sort = parseInt(dropid);
            this.datas[dropped].league_sort = parseInt(dragid);

            var temp = this.datas[dragged];
            this.datas[dragged] = this.datas[dropped];
            this.datas[dropped] = temp;
            this.sortleague;

            const sendData = [];
            var temp1 = {
                game_code: this.game_section,
                country_code: this.datas[dragged].reg_countycode,
                leagu_id:this.datas[dragged].leagu_id,
                sort: this.datas[dragged].league_sort,
                type:'prematch',
            }
            var temp2 = {
                game_code: this.game_section,
                country_code: this.datas[dropped].reg_countycode,
                leagu_id:this.datas[dropped].leagu_id,
                sort: this.datas[dropped].league_sort,
                type:'prematch',
            }

            sendData.push(temp1);
            sendData.push(temp2);
            this.setsort(sendData);
        },
        async setsort(param){
            const res = await API.setleaguesort(param);
        },
        async onfilechange(event){
            var imgsrc = event.currentTarget.files[0];
            // console.log(event.currentTarget.parentElement.children[1].firstChild);
            const inputfile = event.currentTarget.parentElement.children[1].firstChild.firstChild;
            var reader = new FileReader();
            reader.onload = function(e) {
            inputfile.src = e.target.result;
            }
            reader.readAsDataURL(imgsrc);
            const formData = new FormData();
            formData.append('img_file', imgsrc);
            formData.append('game_section', this.game_section);
            formData.append('country_code', event.currentTarget.dataset.code);
            formData.append('type','prematch');

            const res = await API.countryupload(formData);
            this.$buefy.toast.open({
                duration: 3000,
                position: "is-top",
                message: res.message,
                type: (res.status < 1)?"is-danger":"is-success",
            });
        }
    },
    computed:{
        sortcountry(){
            return this.list.sort(function(a,b){
                return a.sort_num > b.sort_num;
            });
        },
        sortleague(){
            return this.datas.sort(function(a,b){
                return a.league_sort > b.league_sort;
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.nyeckbox{
    width: 20px;
    height: 20px;
    position: relative;
    top: 3px;
    margin-left: 5px;
    cursor: pointer;
}
.country-content{
    background-color: #eeeeee;
    border:1px solid #cccccc;
    height: auto;
    margin: 5px;
    .country-title{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 3px;
        padding: 5px;
        input[type="file"]{
            display: none;
        }
        input[type="text"]{
            width: 150px !important;
            border-radius: 5px;
        }
        input[type="checkbox"]{
            top:0px !important;
        }
    }
}
.league-list{
    
    .league-title{
        display: flex;
        justify-content: space-evenly;
        height: 40px;
        align-items: center;
        // border:1px solid #cccccc;
        background-color: #c5c2c2 !important;
        border-radius: 3px;
        margin: 5px;
        width: 200px;
        padding: 5px;
        margin-left: 23px;
        input[type="file"]{
            display: none;
        }
        input[type="text"]{
            width: 150px !important;
            border-radius: 2px;
        }
        input[type="checkbox"]{
            top:0px !important;
        }
    }
    // .save-settings{
    //     width: 200px;
    //     padding: 5px;
    //     margin-left: 41px;
    // }
}
</style>