<template>
  <div class="box">
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="hover-point"></div>
    <div class="box-contents"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: unset !important;
  box-shadow: unset !important;
}
.box-contents {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("~@/assets/img/logo2.png") 100% 100% / cover no-repeat;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  transition: 0.5s ease;
}
.hover-point {
  position: absolute;
  z-index: 2;
  width: calc(100% / 3);
  height: calc(100% / 3);
}
.hover-point:nth-child(1) {
  top: 0;
  left: 0;
}
.hover-point:nth-child(2) {
  top: 0;
  left: calc(100% / 3);
}
.hover-point:nth-child(3) {
  top: 0;
  right: 0;
}
.hover-point:nth-child(4) {
  top: calc(100% / 3);
  left: 0;
}
.hover-point:nth-child(5) {
  top: calc(100% / 3);
  right: 0;
}
.hover-point:nth-child(6) {
  bottom: 0;
  left: 0;
}
.hover-point:nth-child(7) {
  bottom: 0;
  left: calc(100% / 3);
}
.hover-point:nth-child(8) {
  bottom: 0;
  right: 0;
}
.hover-point:nth-child(1):hover ~ .box-contents {
  box-shadow: 15px 15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: right top;
  transform: perspective(1000px) rotateX(10deg) rotateY(-10deg) rotateZ(2deg);
}
.hover-point:nth-child(2):hover ~ .box-contents {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: center top;
  transform: perspective(1000px) rotateX(10deg);
}
.hover-point:nth-child(3):hover ~ .box-contents {
  box-shadow: -15px 15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: left top;
  transform: perspective(1000px) rotateX(10deg) rotateY(10deg) rotateZ(-2deg);
}
.hover-point:nth-child(4):hover ~ .box-contents {
  box-shadow: 15px 5px 50px rgba(0, 0, 0, 0.3);
  transform-origin: left center;
  transform: perspective(1000px) rotateY(-10deg);
}
.hover-point:nth-child(5):hover ~ .box-contents {
  box-shadow: -15px 5px 50px rgba(0, 0, 0, 0.3);
  transform-origin: right center;
  transform: perspective(1000px) rotateY(10deg);
}
.hover-point:nth-child(6):hover ~ .box-contents {
  box-shadow: 15px -15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: right bottom;
  transform: perspective(1000px) rotateX(-10deg) rotateY(-10deg) rotateZ(-2deg);
}
.hover-point:nth-child(7):hover ~ .box-contents {
  box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: center bottom;
  transform: perspective(1000px) rotateX(-10deg);
}
.hover-point:nth-child(8):hover ~ .box-contents {
  box-shadow: -15px -15px 50px rgba(0, 0, 0, 0.3);
  transform-origin: left bottom;
  transform: perspective(1000px) rotateX(-10deg) rotateY(10deg) rotateZ(2deg);
}
</style>