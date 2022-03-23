<template>
  <div class="columns">
    <div class="column">
      <div class="box">
        <div class="header is-flex is-justify-content-space-between is-bordered">
          <span class="mt-3">점검</span>
          <button @click="setpages" class="mb-3 button is-info">선택수정</button>
        </div>
        <div class="">
          <div class="columns header ml-4 my-4">
            <div class="column is-1">
              <input class="check" type="checkbox" v-model="selectAll"/>
            </div>
            <div class="column">
              <span><b>Page Name</b> </span>
            </div>
          </div>
        </div>
        <div v-for="page in pages" :key="page.id">
          <div>
            <div :class="`columns ml-4 mb-2 ${(page.id == 4 || page.id == 5 || page.id == 6)?'header is-clickable':''}`">
              <div class="column is-1">
                <input :id="page.id" @click="checker" class="check" type="checkbox" v-model="selected" :value="page.id" />
              </div>
              <div class="column">
                <span>{{page.page_kor}}</span>
                <span v-if="page.id == 4 || page.id == 5 || page.id == 6" class="mdi mdi-chevron-down"></span>
              </div>
            </div>
          </div>
          <div v-if="page.id == 4">
            <div v-for="mini in minigame" :key="mini.id">
              <div class="columns child mb-2">
                <div class="column is-1">
                  <input :id="mini.id" @click="checker" class="check" type="checkbox" v-model="selected" :value="mini.id"/>
                </div>
                <div class="column">
                  <span>{{mini.page_kor}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="page.id == 5">
            <div v-for="casi in casino" :key="casi.id">
              <div class="columns child mb-2">
                <div class="column is-1">
                  <input :id="casi.id" @click="checker" class="check" type="checkbox" v-model="selected" :value="casi.id"/>
                </div>
                <div class="column">
                  <span>{{casi.page_kor}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="page.id == 6">
            <div v-for="slut in slot" :key="slut.id">
              <div class="columns child mb-2">
                <div class="column is-1">
                  <input :id="slut.id" @click="checker" class="check" type="checkbox" v-model="selected" :value="slut.id"/>
                </div>
                <div class="column">
                  <span>{{slut.page_kor}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <div
          class="header is-flex is-justify-content-space-between is-bordered">
          <span class="mt-3">회원가입</span>
          <button @click="setsignup" class="mb-3 button is-info">선택수정</button>
        </div>
        <div>
          <div class="columns header ml-4 my-4">
            <div class="column is-1">
              <input class="check" type="checkbox" v-model="rightAll"/>
            </div>
            <div class="column">
              <span><b>Page Name</b> </span>
            </div>
          </div>
        </div>
        <div v-for="row in signup" :key="row.id">
          <div class="columns ml-4">
            <div class="column is-1">
              <input class="check" type="checkbox" v-model="rightselected" :value="row.id"/>
            </div>
            <div class="column">
              <span>회원가입</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../api/partner';
export default {
  data() {
    return {
      casino:[],
      pages:[],
      minigame:[],
      slot:[],
      selected:[],
      rightselected:[],
      signup:[],
    }
  },methods: {
      async getData(){
        const res = await API.getmaintenance();
        this.casino = res.casino;
        this.pages = res.pages;
        this.minigame = res.minigame;
        this.slot = res.slot;
        this.signup = res.signup;

        this.checkers();
        this.rigthcheckers();
      },
      arrayRemove(arr, value) { 
          return arr.filter(function(ele){ 
              return ele != value; 
          });
      },
      checker(event){
        const id = event.target.id;
        var selected = this.selected;
        if(id == 4){
          this.minigame.forEach(function (temp) {
              const temp2 = selected.filter(value => value == temp.id);
              if(temp2 != ''){
                selected = selected.filter(value => value != temp.id );
              }else{
                selected.push(temp.id);
              }
          });
        }else if(id == 5){
          this.casino.forEach(function (temp) {
              const temp2 = selected.filter(value => value == temp.id);
              if(temp2 != ''){
                selected = selected.filter(value => value != temp.id );
              }else{
                selected.push(temp.id);
              }
          });
        }else if(id == 6){
          this.slot.forEach(function (temp) {
              const temp2 = selected.filter(value => value == temp.id);
              if(temp2 != ''){
                selected = selected.filter(value => value != temp.id );
              }else{
                selected.push(temp.id);
              }
          });
        }else{
          const temp2 = selected.filter(value => value == id);
          if(temp2 != ''){
            selected = selected.filter(value => value != id );
          }else{
            selected.push(parseInt(id));
          }
        }
        this.selected = selected;
      },
      checkers(){
        var selected = [];
        this.pages.forEach(function (temp) {
            if(temp.maintenance == 1){
              selected.push(temp.id);
            }
        });
        this.casino.forEach(function (temp) {
            if(temp.maintenance == 1){
              selected.push(temp.id);
            }
        });
        this.minigame.forEach(function (temp) {
            if(temp.maintenance == 1){
              selected.push(temp.id);
            }
        });
        this.slot.forEach(function (temp) {
            if(temp.maintenance == 1){
              selected.push(temp.id);
            }
        });

        this.selected = selected
      },
      rigthcheckers(){
        var selected = [];
        this.signup.forEach(function (temp) {
            if(temp.maintenance == 1){
              selected.push(temp.id);
            }
        });
        this.rightselected = selected;
      },
      async setpages(){
        var sendData = [];
        this.pages.forEach(function (temp) {
              sendData.push(temp.id);
        });
        this.casino.forEach(function (temp) {
          sendData.push(temp.id);
        });
        this.minigame.forEach(function (temp) {
              sendData.push(temp.id);
        });
        this.slot.forEach(function (temp) {
              sendData.push(temp.id);
        });
        const res = await API.setpages({toone:this.selected,tozero:sendData});
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status < 1)?"is-danger":"is-success",
        });
        this.getData();
      },
      async setsignup(){
        var sendData = [];
        this.signup.forEach(function (temp) {
              sendData.push(temp.id);
        });
        const res = await API.setpages({toone:this.rightselected,tozero:sendData});
        this.$buefy.toast.open({
            duration: 3000,
            position: "is-top",
            message: res.message,
            type: (res.status < 1)?"is-danger":"is-success",
        });
        this.getData();
      },
  },
  computed:{
    selectAll: {
        get: function () {
            // return this.users ? this.selected.length == this.users.length : false;
        },
        set: function (value) {
            var selected = [];
            if (value) {
                this.pages.forEach(function (temp) {
                    selected.push(temp.id);
                });
                this.casino.forEach(function (temp) {
                    selected.push(temp.id);
                });
                this.minigame.forEach(function (temp) {
                    selected.push(temp.id);
                });
                this.slot.forEach(function (temp) {
                    selected.push(temp.id);
                });
            }
            this.selected = selected;
        }
    },
    rightAll: {
        get: function () {
            // return this.users ? this.selected.length == this.users.length : false;
        },
        set: function (value) {
            var selected = [];
            if (value) {
                var selected = [];
                this.signup.forEach(function (temp) {
                    selected.push(temp.id);
                });
            }
            this.rightselected = selected;
        }
    },
  },
  created(){
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #cecdcd;
}
input {
  width: 22px !important;
  height: 22px !important;
}
.column {
  padding: 0.5rem !important;
}
.child{
  margin-left:90px;
}
</style>
