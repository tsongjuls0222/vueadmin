<template>
    <div class="image-preview-wrapper" style="display: none">
        <div class="image-preview-content">
            <div class="close-image-preview">
                <!-- <i class="fas fa-times"></i> -->
            </div>
            <div class="image-preview-container">
                <img class="image-preview" style="max-height:800px" :src="preview" alt="">
            </div>
            <div class="image-title">
                <span class="image-title">{{preview_title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['preview_title', 'preview'],
}
</script>

<style lang="scss" scoped>
.image-preview-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: #000000d9;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    .close-image-preview{
        position: absolute;
        top: 30px;
        cursor: pointer;
    }
    .image-preview-container{
      padding-top: 64px;
    }
    .image-title{
        margin-top: 15px;
        text-align: center;
        color: #dfdfdf;
        font-size: 18px;
        font-weight: 400;
    }
}
</style>