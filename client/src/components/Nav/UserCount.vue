<template>
  <div class="views-count-wrapper">
    <div class="views-count-content">
      <div class="views-count-box-wrapper" id="prematch-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">프리매치</span>
          </div>
          <div class="views-count-box-body" @click="showUser(1)">
            <i class="far fa-eye"></i>
            <span class="count noselect">2</span>
          </div>
          <div :class="`viewers-wrapper ${class1}`">
            <div class="viewers-content">
              <ul class="viewers-list">
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="1363">kyletest</a
                  ><i class="fas fa-times" @click="forceLogout(1363)"></i>
                </li>
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="11475">kyle1212</a
                  ><i class="fas fa-times" @click="forceLogout(11475)"></i>
                </li>
              </ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="live-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">라이브</span>
          </div>
          <div class="views-count-box-body" @click="showUser(2)">
            <i class="far fa-eye"></i>
            <span class="count noselect">1</span>
          </div>
          <div :class="`viewers-wrapper ${class2}`">
            <div class="viewers-content">
              <ul class="viewers-list">
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="1363">kyletest</a
                  ><i class="fas fa-times" @click="forceLogout(1363)"></i>
                </li>
              </ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="minigame-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">미니게임</span>
          </div>
          <div class="views-count-box-body" @click="showUser(3)">
            <i class="far fa-eye"></i>
            <span class="count noselect">1</span>
          </div>
          <div :class="`viewers-wrapper ${class3}`">
            <div class="viewers-content">
              <ul class="viewers-list">
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="1363">kyletest</a
                  ><i class="fas fa-times" @click="forceLogout(1363)"></i>
                </li>
              </ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="casino-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">카지노</span>
          </div>
          <div class="views-count-box-body" @click="showUser(4)">
            <i class="far fa-eye"></i>
            <span class="count noselect">0</span>
          </div>
          <div :class="`viewers-wrapper ${class4}`">
            <div class="viewers-content">
              <ul class="viewers-list"></ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="cs-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">1:1문의</span>
          </div>
          <div class="views-count-box-body" @click="showUser(5)">
            <i class="far fa-eye"></i>
            <span class="count noselect">1</span>
          </div>
          <div :class="`viewers-wrapper ${class5}`">
            <div class="viewers-content">
              <ul class="viewers-list">
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="11489">tlsghtjd</a
                  ><i class="fas fa-times" @click="forceLogout(11489)"></i>
                </li>
              </ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="notice-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">공지사항</span>
          </div>
          <div class="views-count-box-body" @click="showUser(6)">
            <i class="far fa-eye"></i>
            <span class="count noselect">0</span>
          </div>
          <div :class="`viewers-wrapper ${class6}`">
            <div class="viewers-content">
              <ul class="viewers-list"></ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-count-box-wrapper" id="board-count">
        <div class="views-count-box-content">
          <div class="views-count-box-header">
            <span class="header-text noselect">이벤트</span>
          </div>
          <div class="views-count-box-body" @click="showUser(7)">
            <i class="far fa-eye"></i>
            <span class="count noselect">1</span>
          </div>
          <div :class="`viewers-wrapper ${class7}`">
            <div class="viewers-content">
              <ul class="viewers-list">
                <li class="viewer noselect casino-balance">
                  <a href="#" class="open-me" data-target="1363">kyletest</a
                  ><i class="fas fa-times" @click="forceLogout(1363)"></i>
                </li>
              </ul>
              <div class="casino-balance-wrapper" style="display: none">
                <div class="casino-balance-content">
                  <ul class="balance-list">
                    <li class="casino-co">
                      보유금액:<span id="user-bal">0</span>
                    </li>
                    <li class="casino-co">
                      보유포인트:<span id="user-points">0</span>
                    </li>
                    <li class="casino-co">
                      에볼루션:<span id="evo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로:<span id="micro-bal">0</span>
                    </li>
                    <li class="casino-co">
                      드림게이밍:<span id="dream-bal">0</span>
                    </li>
                    <li class="casino-co">
                      비보게이밍:<span id="vivo-bal">0</span>
                    </li>
                    <li class="casino-co">
                      프라그마틱:<span id="pragmatic-bal">0</span>
                    </li>
                    <li class="casino-co">
                      QT슬롯:<span id="qtslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      FG슬롯:<span id="fgslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      MODA슬롯:<span id="mdslot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      씨큐나인슬롯:<span id="cq9slot-bal">0</span>
                    </li>
                    <li class="casino-co">
                      마이크로슬롯:<span id="microslot-bal">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCount",
  data() {
    return {
      class1 : "",
      class2 : "",
      class3 : "",
      class4 : "",
      class5 : "",
      class6 : "",
      class7 : "",
    };
  },
  methods : {
    forceLogout(param){
      alert(param);
    },
    showUser(param){
      this.class1 = "";
      this.class2 = "";
      this.class3 = "";
      this.class4 = "";
      this.class5 = "";
      this.class6 = "";
      this.class7 = "";
      if(param == 1){
        this.class1 = "active";
      }
      else if(param == 2){
        this.class2 = "active";
      }
      else if(param == 3){
        this.class3 = "active";
      }
      else if(param == 4){
        this.class4 = "active";
      }
      else if(param == 5){
        this.class5 = "active";
      }
      else if(param == 6){
        this.class6 = "active";
      }
      else{
        this.class7 = "active";
      }
    }
  }
};
</script>
