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
                        <label for="">파트너코드 (구분용):</label>
                        <input class="input" type="text" placeholder="아이디를 입력해주세요">
                    </div>
                    <div  class="column p-3">
                        <div v-show="!show">
                            <label for="">파트너명:</label>
                            <input class="input" type="text" placeholder="비밀번호를 입력해주세요.">
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너 루징비율 (%)</label>
                        <input class="input" type="text" placeholder="아이디를 입력해주세요">
                    </div>
                    <div class="column p-3">
                        <label for="">파트너 수수료율 (%)</label>
                        <input class="input" type="text" placeholder="비밀번호를 입력해주세요.">
                    </div>
                    <div class="column p-3">
                        <label for="">수익유형:</label>
                        <div class="select">
                            <select name="" id="">
                                <option value="revenue">수익</option>
                                <option value="rolling">롤링</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">스포츠 (%)</label>
                        <input class="input" type="number">
                    </div>
                    <div class="column p-3">
                        <label for="">라이브 (%)</label>
                        <input class="input" type="number">
                    </div>
                    <div class="column p-3">
                        <label for="">미니게임 (%)</label>
                        <input class="input" type="number">
                    </div>
                    <div class="column p-3">
                        <label for="">카지노 (%)</label>
                        <input class="input" type="number">
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너 상태:</label>
                        <div class="select">
                            <select name="" id="">
                                <option value="0">정상</option>
                                <option value="1">이용불가</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">하부생성:</label>
                        <div class="select">
                            <select name="" id="">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">보기전용:</label>
                        <div class="select">
                            <select name="" id="">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column p-3">
                        <label for="">최대생성</label>
                        <input class="input" type="number">
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-one-quarter p-3">
                        <label for="">포인트지급</label>
                        <div class="select">
                            <select name="" id="">
                                <option value="0">아니오</option>
                                <option value="1">예</option>
                            </select>
                        </div>
                    </div>
                    <div class="column is-one-quarter p-3">
                        <label for="">금액</label>
                        <input class="input" type="number">
                    </div>
                </div>
                <div class="columns">
                    <div class="column p-3">
                        <label for="">파트너 상태</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
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

<script>
export default {
    props:['show'],
}
</script>