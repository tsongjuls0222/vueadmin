<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>아이디</th>
                    <th>입금</th>
                    <th>출금</th>
                    <th>순익</th>
                    <th>Type</th>
                    <th>수익유형</th>
                    <th>수익유형</th>
                    <th>이월</th>
                    <th>정산금액 </th>
                    <th>실지급정산</th>
                    <th>총판</th>
                    <th>회원수</th>
                    <th><input class="check" type="checkbox"><span class="pl-2">정산 지급 날짜</span></th>
                    <th>보기</th>
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