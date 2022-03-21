<template>
    <div>
        <div v-for="row in list" :key="row.id" class="country-title">
            <input class="nyeckbox" type="checkbox" v-model="row.status" :true-value="'open'" :false-value="'close'">
            <img width="16px" :src="`${pathing}/${setimage(row.img_file,row.a2code)}`" alt="">
            <input type="file" name="" id="">
            <input class="input is-small" type="text" :value="row.country_title">
            <div class="league-list"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data() {
        return {
            pathing: 'http://192.168.10.50:5000/api/upload',
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
    },
}
</script>