<template>
    <div>
        <table>
            <thead>
                <tr style="border-top:1px solid #C1C1C1">
                    <th rowspan="2">아이디</th>
                    <th rowspan="2">입금</th>
                    <th rowspan="2">출금</th>
                    <th rowspan="2">순익</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">수익유형</th>
                    <th rowspan="2">수익유형</th>
                    <th colspan="4">배팅유형</th>
                    <th rowspan="2">정산금액</th>
                    <th rowspan="2">회원수</th>
                    <th rowspan="2">정산 지급 날짜</th>
                    <th rowspan="2">보기</th>
                </tr>
                <tr style="border-top:1px solid #C1C1C1">
                    <th>스포츠 </th>
                    <th>라이브 </th>
                    <th>미니게임 </th>
                    <th>카지노 </th>
                </tr>
            </thead>
        </table>
        <div class="is-flex" style="height: 500px">
            <div
            class="m-auto is-flex is-flex-direction-column is-align-items-center has-text-grey-lighter"
            >
            <span class="icon is-large"
                ><i class="mdi mdi-information-outline mdi-48px"></i></span
            ><span class="is-size-4 is-unselectable"
                >Sorry, no data found.</span
            >
            </div>
        </div>
    </div>
</template>