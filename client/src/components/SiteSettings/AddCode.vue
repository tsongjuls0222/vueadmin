<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">파트너 계정등록</div>
            <div @click="$emit('close')" class="is-clickable card-header-close pr-4 pt-2"><span class="mdi mdi-close-circle-outline"></span></div>
        </div>
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column p-3">
                        <label for="">Title:</label>
                        <input class="input" type="text" placeholder="Title.">
                    </div>
                    <div class="column p-3">
                        <label for="">코드명:</label>
                        <input class="input" type="text" placeholder="코드명을 입력해주세요.">
                    </div>
                    <div class="column p-3">
                        <label for="">코드상태:</label>
                        <div class="select ">
                            <select name="" id="">
                                <option value="0">정상</option>
                                <option value="1">이용불가</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="buttons is-right">
                    <div @click="$emit('close')" class="button is-dark mr-2">닫기</div>
                    <div class="button is-info">계정등록</div>
                </div>
            </div>
        </div>
    </div>
</template>