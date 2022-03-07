<template>
    <div class="card" >
        <div class="card-header" draggable="true">
            <div class="card-header-title">팝업등록</div>
            <div class="card-header-close"><button class="button" @click="$emit('close')"><span class="mdi mdi-close"></span></button></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="row mb-5">
                    <label for="">Title</label>
                    <input type="text" class="input">
                </div>
                <div class="row mb-5">
                    <div class="columns">
                        <div class="column">
                            <label for="">Width</label>
                            <input type="number" class="input">
                        </div>
                        <div class="column">
                            <label for="">Height</label>
                            <input type="number" class="input">
                        </div>
                    </div>
                </div>
                <div class="row mb-5 is-flex">
                    <input type="file" class="input" id="upload-file">
                    <label for="upload-file" class="input-group-text">Browse</label>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item ">
                <div class="pr-5"><button class="button is-success">등록</button></div>
                <div class=""><button class="button is-dark">취소</button></div>
            </div>
        </div>
    </div>
</template>