<template>
    <div class="custom-card">
        <div class="floating-button">
            <b-button size="is-normal" class="btn" @click="updateInformation()">
              수정&nbsp;&nbsp;
              <b-icon
                class="iconclass"
                pack="fas"
                icon="paper-plane"
                size="is-medium" >
              </b-icon>
            </b-button>
        </div>
        <div class="custom-card-header">
            <div class="tabs is-medium">
                <ul>
                    <li :class="tabClass1" @click="tabChange(1)"><a>회원정보</a></li>
                    <li :class="tabClass2" @click="tabChange(2)"><a>배팅설정</a></li>
                    <li :class="tabClass3" @click="tabChange(3)"><a>접속기록/배팅로그</a></li>
                    <li :class="tabClass4" @click="tabChange(4)"><a>입/출금</a></li>
                    <li :class="tabClass5" @click="tabChange(5)"><a>배팅내역</a></li>
                    <li :class="tabClass6" @click="tabChange(6)"><a>고객센터</a></li>
                    <li :class="tabClass7" @click="tabChange(7)"><a>쪽지</a></li>
                </ul>
            </div>
            <div class="close">
                <b-button
                    class="close card-header-icon"
                    icon-right="close"
                    @click="$emit('close')"
                />
            </div>
        </div>
        <div class="card-content-wrapper">
            <div class="custom-card-content">
                <div id="information" :class="`main-content ${divClass1}`">
                    <div class="columns">
                        <div class="column is-12">
                            <div class="card">
                                <div class="columns is-multiline is-vertical is-mobile">
                                    <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                        <div class="legend">
                                            <div class="left">
                                                <i class="mdi mdi-account"></i>
                                                <span>회원 계정정보</span>
                                            </div>
                                            <div class="right">
                                                <span>모니터링</span>
                                                <b-switch v-model="switch1" type="is-success" @input="changeUnderSurveillance()"></b-switch>
                                            </div>
                                        </div>
                                        <div class="columns is-multiline is-vertical is-mobile">
                                            <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                                <label>아이디</label>
                                                <input class="input" type="text" placeholder="아이디" v-model="userName" readonly>
                                            </div>
                                            <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                                <label>닉네임</label>
                                                <input class="input" type="text" placeholder="닉네임" v-model="userNickname" readonly>
                                            </div>
                                        </div>
                                        <div class="columns is-multiline is-vertical is-mobile">
                                            <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                                <div class="select is-fullwidth">
                                                    <select v-model="selectedLevel">
                                                        <option v-for="n in 10" :key="n" :value="n">레벨 {{n}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                                <div class="select is-fullwidth">
                                                    <select v-model="selectedMemberType">
                                                        <option value="">회원유형</option>
                                                        <option value="정상유저">정상유저</option>
                                                        <option value="의심유저">의심유저</option>
                                                        <option value="불량유저">불량유저</option>
                                                        <option value="기타유저">기타유저</option>
                                                        <option value="장기미접">장기미접</option>
                                                        <option value="정지유저">정지유저</option>
                                                        <option value="테스트아이디">테스트아이디</option>
                                                        <option value="총판전용아이디">총판전용아이디</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                                <div class="select is-fullwidth">
                                                    <select v-model="selectedMemberStatus">
                                                        <option value="0">승인대기</option>
                                                        <option value="2">승인처리중</option>
                                                        <option value="1">승인완료</option>
                                                        <option value="3">승인취소</option>
                                                        <option value="4">계정탈퇴</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                                <div class="select is-fullwidth">
                                                    <select v-model="selectedMemberPaymentStatus">
                                                        <option value="0">보너스 지급</option>
												        <option value="1">보너스 미지급</option>    
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="columns is-multiline is-vertical is-mobile">
                                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                            <label>보유잔액 / 보유포인트: <i class="mdi mdi-refresh" @click="refresBalanceAndPoint()"></i></label>
                                            <b-field expanded>
                                                <p class="control">
                                                <span class="button is-static">보유머니</span>
                                                </p>
                                                <b-input
                                                    @click.native="UserMemberMoney(userID)"
                                                    custom-class="has-text-right"
                                                    v-model="computedUserBalance"
                                                    readonly
                                                    expanded
                                                ></b-input
                                            ></b-field>
                                        </div>
                                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                            <label>&nbsp;</label>
                                            <b-field expanded>
                                                <p class="control">
                                                <span class="button is-static">포인트</span>
                                                </p>
                                                <b-input
                                                custom-class="has-text-right"
                                                @click.native="UserMemberPoint()"
                                                v-model="userPoint"
                                                readonly
                                                expanded
                                                ></b-input
                                            ></b-field>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="columns is-multiline is-vertical is-mobile">
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>에볼루션: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                custom-class="has-text-right"
                                                v-model="userEvolution"
                                                readonly
                                                expanded
                                            ></b-input>
                                        </div>
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>마이크로: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                custom-class="has-text-right"
                                                v-model="userMicro"
                                                readonly
                                                expanded
                                            ></b-input>
                                        </div>
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>드림게이밍: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                custom-class="has-text-right"
                                                v-model="userDreamGaming"
                                                readonly
                                                expanded
                                            ></b-input>
                                        </div>
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>비보게이밍: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                    custom-class="has-text-right"
                                                    v-model="userVivoGaming"
                                                    readonly
                                                    expanded
                                                ></b-input>
                                        </div>
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>아시아게이밍: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                custom-class="has-text-right"
                                                v-model="userAsiaGaming"
                                                readonly
                                                expanded
                                            ></b-input>
                                        </div>
                                        <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                            <label>게임플레이: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                            <b-input
                                                custom-class="has-text-right"
                                                v-model="userGameplay"
                                                readonly
                                                expanded
                                            ></b-input>
                                        </div>
                                    </div>
                                <div class="columns is-multiline is-vertical is-mobile">
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>프라그마틱: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                            custom-class="has-text-right"
                                            v-model="userPragmatic"
                                            readonly
                                            expanded
                                        ></b-input>
                                    </div>
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>QT슬롯: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                            custom-class="has-text-right"
                                            v-model="userQtSlot"
                                            readonly
                                            expanded
                                        ></b-input>
                                    </div>
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>FG슬롯: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                            custom-class="has-text-right"
                                            v-model="userFgSlot"
                                            readonly
                                            expanded
                                        ></b-input>
                                    </div>
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>MODA슬롯: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                                custom-class="has-text-right"
                                                v-model="userModaSlot"
                                                readonly
                                                expanded
                                            ></b-input>
                                    </div>
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>씨큐나인슬롯: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                            custom-class="has-text-right"
                                            v-model="userSecNineSlot"
                                            readonly
                                            expanded
                                        ></b-input>
                                    </div>
                                    <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                        <label>마이크로슬롯: {{userID}} <i class="mdi mdi-refresh" @click="refreshCasinoAndSlot()"></i></label>
                                        <b-input
                                            custom-class="has-text-right"
                                            v-model="userMicroSlot"
                                            readonly
                                            expanded
                                        ></b-input>
                                    </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                    <label>&nbsp;</label>
                                    <button class="button is-info is-fullwidth">카지노 계정생성</button>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="legend">
                                <div class="left">
                                    <i class="mdi mdi-information"></i>
                                    <span>회원 기본정보</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-vertical is-mobile">
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>프리메치 경기목록</span>
                                    <b-switch v-model="prematchSwitch" type="is-success"></b-switch>
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>국내스포츠</span>
                                    <b-switch v-model="prematchkorSwitch" type="is-success"></b-switch>
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>라이브</span>
                                    <b-switch v-model="liveSwitch" type="is-success"></b-switch>
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>미니게임</span>
                                    <b-switch v-model="minigameSwitch" type="is-success"></b-switch>
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>카지노</span>
                                    <b-switch v-model="casinoSwitch" type="is-success"></b-switch>
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile toggles">
                                    <span>슬롯</span>
                                    <b-switch v-model="slotSwitch" type="is-success"></b-switch>
                                </div>
                            </div>
                            <hr/>
                            <div class="columns is-multiline is-vertical is-mobile">
                                <div class="column is-4-desktop is-6-tablet is-12-mobile">
                                    <label>해외스포츠 최소배팅가능 폴더:</label>
                                    <input class="input" type="text" placeholder="해외스포츠 최소배팅가능 폴더" v-model="userMinifoldereu">
                                </div>
                                <div class="column is-4-desktop is-6-tablet is-12-mobile">
                                    <label>국내스포츠 최소배팅가능 폴더:</label>
                                    <input class="input" type="text" placeholder="국내스포츠 최소배팅가능 폴더" v-model="userMinifolderkr">
                                </div>
                                <div class="column is-4-desktop is-6-tablet is-12-mobile">
                                    <label>라이브 최소배팅가능 폴더:</label>
                                    <input class="input" type="text" placeholder="라이브 최소배팅가능 폴더" v-model="userMinifolderlive">
                                </div>
                            </div>
                            <hr/>
                            <div class="columns is-multiline is-vertical is-mobile">
                                <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                    <label>추천인:</label>
                                    <input class="input" type="text" placeholder="추천인" v-model="userRecommender">
                                </div>
                                <div class="column is-3-desktop is-6-tablet is-12-mobile">
                                    <label>예금주:</label>
                                    <input class="input" type="text" placeholder="예금주" v-model="userName2">
                                </div>
                                <div class="column is-2-desktop is-6-tablet is-12-mobile">
                                    <label>국가 코드:</label>
                                    <input class="input" type="text" placeholder="국가 코드" v-model="userCountrycode">
                                </div>
                                <div class="column is-4-desktop is-6-tablet is-12-mobile">
                                    <label>휴대폰번호:</label>
                                    <input class="input" type="text" placeholder="휴대폰번호" v-model="userPhonenumber">
                                </div>
                                <div class="column is-4-desktop is-6-tablet is-12-mobile">
                                    <label>은행 / 계좌번호:</label>
                                    <div class="select is-fullwidth">
                                        <select v-model="userBank">
                                            <option v-for="item in bankList" :key="item.id" :value="item.bank_name">{{item.bank_name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="column is-8-desktop is-6-tablet is-12-mobile">
                                    <label>&nbsp;</label>
                                    <input class="input" type="text" placeholder="000000" v-model="userAccount">
                                </div>
                            </div>
                            <hr/>
                            <div class="columns is-multiline is-vertical is-mobile">
                                <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                    <label>비밀번호 변경:</label>
                                    <input class="input" type="text" placeholder="비밀번호 변경" v-model="userChangepass">
                                </div>
                                <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                    <label>총판:</label>
                                    <input class="input" type="text" placeholder="총판" v-model="userChongpan" readonly>
                                </div>
                                <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                    <label>환전비밀번호:</label>
                                    <input class="input" type="text" placeholder="환전비밀번호" v-model="userCurrencypass">
                                </div>
                                <div class="column is-6-desktop is-6-tablet is-12-mobile">
                                    <label>코드:</label>
                                    <input class="input" type="text" placeholder="코드" v-model="userPartner">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="is-divider"></div>
                    <div class="columns is-multiline is-vertical is-mobile">
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <table>
                                <thead>
                                    <tr>
                                        <th>오늘 입금액</th>
                                        <th>오늘 출금액</th>
                                        <th>오늘 수익금</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{formatNumber(userBetInfos.transinToday)}} ({{formatNumber(userBetInfos.todayCountDeposit)}})</td>
                                        <td>{{formatNumber(userBetInfos.transoutToday)}} ({{formatNumber(userBetInfos.withdrawCount)}})</td>
                                        <td><p v-html="formatIncome(userBetInfos.todayIncome)"></p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>총 입금액</th>
                                        <th>총 출금액</th>
                                        <th>총 수익금</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{formatNumber(userBetInfos.totalDeposit)}} ({{formatNumber(userBetInfos.depositCount)}})</td>
                                        <td>{{formatNumber(userBetInfos.totalWithdraw)}} ({{formatNumber(userBetInfos.todayCountWithdraw)}})</td>
                                        <td><p v-html="formatIncome(userBetInfos.totalIncome)"></p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>스포츠</th>
                                        <th>라이브</th>
                                        <th>미니게임</th>
                                        <th>카지노</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>베팅금액</td>
                                        <td>{{formatNumber(userBetInfos.betAmountSports)}}</td>
                                        <td>{{formatNumber(userBetInfos.betAmountLive)}}</td>
                                        <td>{{formatNumber(userBetInfos.betAmountMinigame)}}</td>
                                        <td>{{formatNumber(userBetInfos.betAmountCasino)}}</td>
                                    </tr>
                                    <tr>
                                        <td>당첨예상금액</td>
                                        <td>{{formatNumber(userBetInfos.betWinSports)}}</td>
                                        <td>{{formatNumber(userBetInfos.betWinLive)}}</td>
                                        <td>{{formatNumber(userBetInfos.betWinMinigame)}}</td>
                                        <td>{{formatNumber(userBetInfos.betWinCasino)}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><p v-html="formatTotalNumber(userBetInfos.betAmountSports,userBetInfos.betWinSports)"></p></td>
                                        <td><p v-html="formatTotalNumber(userBetInfos.betAmountLive,userBetInfos.betWinLive)"></p></td>
                                        <td><p v-html="formatTotalNumber(userBetInfos.betAmountMinigame,userBetInfos.betWinMinigame)"></p></td>
                                        <td><p v-html="formatTotalNumber(userBetInfos.betAmountCasino,userBetInfos.betWinCasino)"></p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>오늘 배팅횟수</th>
                                        <th>오늘 배팅금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>984,122</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>총 배팅횟수</th>
                                        <th>총 배팅금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>13</td>
                                        <td>4,472,092</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Coin</th>
                                        <th>Address</th>
                                        <th>Scan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ETH</td>
                                        <td></td>
                                        <td><a :href="formatLink(userInformation.walletAddress,'https://etherscan.io/address/')" target="_blank"><span class="blue-text">Scan</span></a></td>
                                    </tr>
                                    <tr>
                                        <td>NEM</td>
                                        <td></td>
                                        <td><a :href="formatLink(userInformation.walletAddress_2,'https://explorer.nemtool.com/#/s_account?account=')" target="_blank"><span class="blue-text">Scan</span></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="legend">
                                <div class="left">
                                    <span>회원 메모:</span>
                                </div>
                            </div>
                            <div class="columns is-multiline is-vertical is-mobile">
                                <div class="column is-12-desktop is-12-tablet is-12-mobile">
                                    <textarea class="textarea" rows="20" v-model="userMemo"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="columns is-multiline is-vertical is-mobile">
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="card tables">
                                <div class="table-wrapper">
                                    <div class="table-header">
                                        <p>입금내역/출금내역</p>
                                    </div>
                                    <div class="table-body">
                                        <DepositTable :data="depositData" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="card tables">
                                <div class="table-wrapper">
                                    <div class="table-header">
                                        <p>회원 머니로그</p>
                                    </div>
                                    <div class="table-body">
                                        <MoneyLogTable :data="moneylogData" />
                                    </div>
                                </div>
                            </div>
                        </div>
                                                <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="card tables">
                                <div class="table-wrapper">
                                    <div class="table-header">
                                        <p>베팅 로그</p>
                                    </div>
                                    <div class="table-body">
                                        <BetlogTable1stTab :data="betlogData" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6-desktop is-6-tablet is-12-mobile">
                            <div class="card tables">
                                <div class="table-wrapper">
                                    <div class="table-header">
                                        <p>회원 머니로그</p>
                                    </div>
                                    <div class="table-body">
                                        <MemberPointTable :data="pointlogData" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="newlog" :class="`main-content ${divClass2}`">
                    <p>tab2</p>
                </div>
                <div id="mybetlog" :class="`main-content ${divClass3}`">
                    <p>tab3</p>
                </div>
                <div id="mybetting" :class="`main-content ${divClass4}`">
                    <p>tab4</p>
                </div>
                <div id="deposit" :class="`main-content ${divClass5}`">
                    <p>tab5</p>
                </div>
                <div id="customer" :class="`main-content ${divClass6}`">
                    <p>tab6</p>
                </div>
                <div id="inbox" :class="`main-content ${divClass7}`">
                    <p>tab7</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sha256 } from 'js-sha256';
import DepositTable from "../../components/Tables/Userpopup/DepositTable.vue";
import MoneyLogTable from "../../components/Tables/Userpopup/MoneyLogTable.vue";
import BetlogTable1stTab from "../../components/Tables/Userpopup/BetlogTable1stTab.vue";
import MemberPointTable from "../Tables/Userpopup/MemberPointTable.vue";
import MoneyPopup from "../../components/Popup/MoneyPopup.vue";
import PointPopup from "../../components/Popup/PointPopup.vue";
import API from "../../api/userpopup";
import API2 from "../../api/navbar";
export default {
  name: "UserPopup",
  components : {DepositTable,MoneyLogTable,BetlogTable1stTab,MemberPointTable,MoneyPopup,PointPopup},
  props : ["userID","depositData","moneylogData","betlogData","pointlogData","userInformation","userRecommenderProps","bankList","codeName","userBetInfos"],
  data() {
    return {
        tabClass1 : "is-active",
        tabClass2 : "",
        tabClass3 : "",
        tabClass4 : "",
        tabClass5 : "",
        tabClass6 : "",
        tabClass7 : "",
        divClass1 : "div-show",
        divClass2 : "",
        divClass3 : "",
        divClass4 : "",
        divClass5 : "",
        divClass6 : "",
        divClass7 : "",
        switch1: this.isSwitchedSurveillance,
        userName: null,
        userNickname: null,
        selectedLevel : this.computedSelectedLevel,
        selectedMemberType : this.computedSelectedMemberType,
        selectedMemberStatus : this.computedSelectedMemberStatus,
        selectedMemberPaymentStatus : this.computedSelectedMemberPaymentStatus,
        userBalance : this.computedUserBalance,
        userPoint : this.computedUserPoint,
        userEvolution : this.computedUserEvolution,
        userMicro : this.computedUserMicro,
        userDreamGaming : this.computedUserDreamGaming,
        userVivoGaming : this.computedUserVivoGaming,
        userAsiaGaming : this.computedUserAsiaGaming,
        userGameplay : this.computedUserGameplay,
        userPragmatic : this.computedUserPragmatic,
        userQtSlot : this.computedUserQtSlot,
        userFgSlot : this.computedUserFgSlot,
        userModaSlot : this.computedUserModaSlot,
        userSecNineSlot : this.computedUserSecNineSlot,
        userMicroSlot : this.computedUserMicroSlot,
        prematchSwitch : this.isSwitchedPrematchEu,
        prematchkorSwitch : this.isSwitchedPrematchKor,
        liveSwitch : this.isSwitchedLive,
        minigameSwitch : this.isSwitchedMinigame,
        casinoSwitch : this.isSwitchedCasino,
        slotSwitch : this.isSwitchedSlot,
        userMinifoldereu : null,
        userMinifolderkr : null,
        userMinifolderlive : null,
        userName2 : null,
        userCountrycode : null,
        userPhonenumber : null,
        userBank : null,
        userAccount : null,
        userChongpan : null,
        userPartner : null,
        userCurrencypass : "",
        userChangepass : "",
        userMemo : null,
        userRecommender : this.userRecommenderProps,
    }
  },
  methods : {
    UserMemberPoint(){
        alert('UserMemberPoint')
    },
    UserMemberMoney(){
        this.$modal.show(
            MoneyPopup,
            {
                userID : this.userID,
                userName : this.userName,
                userNickname : this.userNickname,
                userBalance : this.computedUserBalance,
                userPoint : this.userPoint
            },
            {
            adaptive: true,
            draggable: ".card-header",
            classes: "moneypopup-modal",
            width: "460px",
            height: "auto",
            maxHeight: 749,
            }
        );
    },
    async updateInformation(){
        var res;
        var res2;
        var counter = 0;
        var pes = 0;
        var pks = 0;
        var ls = 0;
        var ms = 0;
        var cs = 0;
        var ss = 0;
        var rec = this.userRecommender;
        var pakner = "";
        var pass = "";
        var curpass = "";
        if(this.prematchSwitch === true){ pes = 1; }
        if(this.prematchkorSwitch === true){ pks = 1; }
        if(this.liveSwitch === true){ ls = 1; }
        if(this.minigameSwitch === true){ ms = 1; }
        if(this.casinoSwitch === true){ cs = 1; }
        if(this.slotSwitch === true){ ss = 1; }
        if(rec == "-" || rec == "0000") { rec = "0000"; }
        if(this.userChangepass != ""){ pass = sha256.hex(this.userChangepass); }
        if(this.userCurrencypass != ""){ curpass = sha256.hex(this.userCurrencypass); }
        

        if(confirm("Update full information?")){
            if(rec == ""){}
            else{
                if(rec == "-" || rec == "0000"){}
                else{
                    res = await API.checkRecommender(rec);
                    if(res == ""){
                        counter++;
                    }
                    else{
                        rec = res.id;
                    }
                }
            }

            if(this.userPartner == ""){
                counter++;
            }
            else{
                res2 = await API.checkPartner(this.userPartner);
                if(res2 == ""){
                    counter++
                }
                else{
                    pakner = res2.icd_agent;
                }
            }
            

            if(counter == 0){
                var sendData = {
                    memberNum : this.userID,
                    userName : this.userName,
                    userNickname : this.userNickname,
                    selectedLevel : this.selectedLevel,
                    selectedMemberType : this.selectedMemberType,
                    selectedMemberStatus : this.selectedMemberStatus,
                    selectedMemberPaymentStatus : this.selectedMemberPaymentStatus,
                    userBalance : parseInt(this.userBalance.split(" ")[0]),
                    userPoint : parseInt(this.userPoint.split(" ")[0]),
                    userEvolution : parseInt(this.userEvolution.split(" ")[0]),
                    userMicro : parseInt(this.userMicro.split(" ")[0]),
                    userDreamGaming : parseInt(this.userDreamGaming.split(" ")[0]),
                    userVivoGaming : parseInt(this.userVivoGaming.split(" ")[0]),
                    userAsiaGaming : parseInt(this.computedUserAsiaGaming.split(" ")[0]),
                    userGameplay : parseInt(this.userGameplay.split(" ")[0]),
                    userPragmatic : parseInt(this.userPragmatic.split(" ")[0]),
                    userQtSlot : parseInt(this.userQtSlot.split(" ")[0]),
                    userFgSlot : parseInt(this.userFgSlot.split(" ")[0]),
                    userModaSlot : parseInt(this.userModaSlot.split(" ")[0]),
                    userSecNineSlot : parseInt(this.userSecNineSlot.split(" ")[0]),
                    userMicroSlot : parseInt(this.userMicroSlot.split(" ")[0]),
                    prematchSwitch : pes,
                    prematchkorSwitch : pks,
                    liveSwitch : ls,
                    minigameSwitch : ms,
                    casinoSwitch : cs,
                    slotSwitch : ss,
                    userMinifoldereu : this.userMinifoldereu,
                    userMinifolderkr : this.userMinifolderkr,
                    userMinifolderlive : this.userMinifolderlive,
                    userRecommender : rec,
                    userName2 : this.userName2,
                    userCountrycode : this.userCountrycode,
                    userPhonenumber : this.userPhonenumber,
                    userBank : this.userBank,
                    userAccount : this.userAccount,
                    userChangepass : pass,
                    userChongpan : this.userChongpan,
                    userCurrencypass : curpass,
                    userPartner : this.userPartner,
                    userMemo : this.userMemo,
                    userChongpanPartner : pakner
                };

                console.log(sendData)
                
                const update = await API.updateUserInformation(sendData);
                this.$buefy.toast.open({
                    position: "is-top-right",
                    message: update.message,
                    type: "is-danger",
                });

                this.userChangepass = "";
                this.userCurrencypass = "";
            }
            else{
                this.$buefy.toast.open({
                    position: "is-top-right",
                    message: "Failed to process due to system error",
                    type: "is-danger",
                });
            }
        }
    },
    formatTotalNumber(param1,param2){
        var numeral = require("numeral");
        var amt = param1;
        var win = param2;
        var txt = "";
        if(param1 == "" || param1 === null || param1 === undefined){
            amt = 0;
        }
        if(param2 == "" || param2 === null || param2 === undefined){
            win = 0;
        }

        let total = (parseInt(amt) - parseInt(win));
        let num = numeral(total).format("0,0");

        if(total < 0 ){
            txt = '<span class="red-text">'+num+'</span>';
        }
        else if(total == 0){
            txt = '<span class="">'+num+'</span>';
        }
        else{
            txt = '<span class="blue-text">'+num+'</span>';
        }

        return txt;

    },
    formatIncome(param){
        var numeral = require("numeral");
        var amount = param;
        var html = "";
        if(param == "" || param === null || param === undefined){
            amount = 0;
        }
        let num = numeral(amount).format("0,0");
        if(amount < 0){
            html = '<span class="red-text">'+num+'</span>';
        }
        else if(amount == 0){
            html = '<span>'+num+'</span>';
        }
        else {
            html = '<span class="blue-text">'+num+'</span>';
        }

        return html;

    },
    formatNumber(param){
      var numeral = require("numeral");
      let amt = param;
      if(param === null || param === undefined || param == ''){
          amt = 0;
      }
      let num = numeral(amt).format("0,0");

      return num;
    },
    formatLink(address,link){
        let wallet1 = "#";
        if(address == null || address == ""){
            
        }
        else{
            wallet1 = link+address;
        }
        return wallet1;
    },
    async refreshCasinoAndSlot(){
        var numeral = require("numeral");
        const id = this.userID;
        const res = await API.refreshCasino(id);
        this.userEvolution = numeral(res[0].iu_evolution).format("0,0")+" 원";
        this.userMicro = numeral(res[0].iu_micro).format("0,0")+" 원";
        this.userDreamGaming = numeral(res[0].iu_dream).format("0,0")+" 원";
        this.userVivoGaming = numeral(res[0].iu_vivo).format("0,0")+" 원";
        this.userAsiaGaming = numeral(res[0].iu_asia).format("0,0")+" 원";
        this.userGameplay = numeral(res[0].iu_gameplay).format("0,0")+" 원";
        const res2 = await API.refreshSlot(id);
        this.userPragmatic = numeral(res2[0].iu_pragmatic).format("0,0")+" 원";
        this.userQtSlot = numeral(res2[0].iu_qtslot).format("0,0")+" 원";
        this.userFgSlot = numeral(res2[0].iu_fgslot).format("0,0")+" 원";
        this.userModaSlot = numeral(res2[0].iu_mdslot).format("0,0")+" 원";
        this.userSecNineSlot = numeral(res2[0].iu_cq9slot).format("0,0")+" 원";
        this.userMicroSlot = numeral(res2[0].iu_microslot).format("0,0")+" 원";
    },
    async refresBalanceAndPoint(){
        alert("Method Call")
        var numeral = require("numeral");
        const id = this.userID;
        const res = await API.refreshBalanceAndPoint(id);
        this.userBalance = numeral(res[0].iu_balance).format("0,0")+" P";
        this.userPoint = numeral(res[0].iu_point).format("0,0")+" P";
    },
    async changeUnderSurveillance(){
        let status = 0;
        if(this.switch1 == true){
            status = 1;
        }
        this.switch1 = status;
        const sendData = {
            id : this.userID,
            value : this.switch1
        };
        const res = await API.updateSurveillanceStatus(sendData);
        const res2 = await API2.getNotoriousCount();
        this.$store.dispatch('setNewBadgeCount',res2[0].total);
        const res3 = await API2.getNotoriousData();
        this.$store.dispatch('setNewNotoriousData',res3);
    },
    tabChange(param) {
        this.tabClass1 = "";
        this.tabClass2 = "";
        this.tabClass3 = "";
        this.tabClass4 = "";
        this.tabClass5 = "";
        this.tabClass6 = "";
        this.tabClass7 = "";
        this.divClass1 = "";
        this.divClass2 = "";
        this.divClass3 = "";
        this.divClass4 = "";
        this.divClass5 = "";
        this.divClass6 = "";
        this.divClass7 = "";
        if(param == '1'){
            this.tabClass1 = "is-active";
            this.divClass1 = "div-show";
        }
        else if(param == '2'){
            this.tabClass2 = "is-active";
            this.divClass2 = "div-show";
        }
        else if(param == '3'){
            this.tabClass3 = "is-active";
            this.divClass3 = "div-show";
        }
        else if(param == '4'){
            this.tabClass4 = "is-active";
            this.divClass4 = "div-show";
        }
        else if(param == '5'){
            this.tabClass5 = "is-active";
            this.divClass5 = "div-show";
        }
        else if(param == '6'){
            this.tabClass6 = "is-active";
            this.divClass6 = "div-show";
        }
        else{
            this.tabClass7 = "is-active";
            this.divClass7 = "div-show";
        }
    }
  },
  computed: {
    isSwitchedSurveillance(){
        const user = this.userInformation;
        if(user.under_surveillance == 0){
            return false;
        }
        return true;
    },
    isSwitchedPrematchEu(){
        const user = this.userInformation;
        if(user.block_prematcheu == 0){
            return false;
        }
        return true;
    },
    isSwitchedPrematchKor(){
        const user = this.userInformation;
        if(user.block_prematchkor == 0){
            return false;
        }
        return true;
    },
    isSwitchedLive(){
        const user = this.userInformation;
        if(user.block_live == 0){
            return false;
        }
        return true;
    },
    isSwitchedMinigame(){
        const user = this.userInformation;
        if(user.block_minigame == 0){
            return false;
        }
        return true;
    },
    isSwitchedCasino(){
        const user = this.userInformation;
        if(user.block_casino == 0){
            return false;
        }
        return true;
    },
    isSwitchedSlot(){
        const user = this.userInformation;
        if(user.block_slot == 0){
            return false;
        }
        return true;
    },
    computedSelectedLevel(){
        const user = this.userInformation;
        return user.iu_level;
    },
    computedSelectedMemberType(){
        const user = this.userInformation;
        return user.iu_memtype;
    },
    computedSelectedMemberStatus(){
        const user = this.userInformation;
        return user.iu_status;
    },
    computedSelectedMemberPaymentStatus(){
        const user = this.userInformation;
        return user.block;
    },
    computedUserBalance(){
        var numeral = require("numeral");
        let number = this.$store.getters.getUserBalance;
        let num = numeral(number).format("0,0");
        return num+" 원";
    },
    computedUserPoint(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_point).format("0,0");
    
        return num+" P";
    },
    computedUserEvolution(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_evolution).format("0,0");
        
        return num+" 원";
    },
    computedUserMicro(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_micro).format("0,0");
        
        return num+" 원";
    },
    computedUserDreamGaming(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_dream).format("0,0");
        
        return num+" 원";
    },
    computedUserVivoGaming(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_vivo).format("0,0");
        
        return num+" 원";
    },
    computedUserAsiaGaming(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_asia).format("0,0");
        
        return num+" 원";
    },
    computedUserGameplay(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_gameplay).format("0,0");
        
        return num+" 원";
    },
    computedUserPragmatic(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_pragmatic).format("0,0");
        
        return num+" 원";
    },
    computedUserQtSlot(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_qtslot).format("0,0");
        
        return num+" 원";
    },
    computedUserFgSlot(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_fgslot).format("0,0");
        
        return num+" 원";
    },
    computedUserModaSlot(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_mdslot).format("0,0");
        
        return num+" 원";
    },
    computedUserSecNineSlot(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_cq9slot).format("0,0");
        
        return num+" 원";
    },
    computedUserMicroSlot(){
        var numeral = require("numeral");
        const user = this.userInformation;
        let num = numeral(user.iu_microslot).format("0,0");
        
        return num+" 원";
    },
    computedCountryCode(){
        const user = this.userInformation;
        let str = user.iu_phone;
        let newstr = str.substr(0,2);

        return newstr;
    },
    computedUserPhoneNumber(){
        const user = this.userInformation;
        let str = user.iu_phone;
        let newstr = str.substr(2);
        let first = newstr.substr(0,1);
        if(first != 0){
            newstr = "0"+newstr;
        }

        return newstr;
    }
  },
  mounted(){
    //   console.log(this.userInformation)
  },
  created(){
    const user = this.userInformation;

    this.switch1 = this.isSwitchedSurveillance;
    this.selectedLevel = this.computedSelectedLevel;
    this.selectedMemberType = this.computedSelectedMemberType;
    this.selectedMemberStatus = this.computedSelectedMemberStatus;
    this.selectedMemberPaymentStatus = this.computedSelectedMemberPaymentStatus;
    // this.userBalance = this.computedUserBalance;
    this.userPoint = this.computedUserPoint;
    this.userEvolution = this.computedUserEvolution;
    this.userMicro = this.computedUserMicro;
    this.userDreamGaming = this.computedUserDreamGaming;
    this.userVivoGaming = this.computedUserVivoGaming;
    this.userAsiaGaming = this.computedUserAsiaGaming;
    this.userGameplay = this.computedUserGameplay;
    this.userPragmatic = this.computedUserPragmatic;
    this.userQtSlot = this.computedUserQtSlot;
    this.userFgSlot = this.computedUserFgSlot;
    this.userModaSlot = this.computedUserModaSlot;
    this.userSecNineSlot = this.computedUserSecNineSlot;
    this.userMicroSlot = this.computedUserMicroSlot;
    this.prematchSwitch = this.isSwitchedPrematchEu;
    this.prematchkorSwitch = this.isSwitchedPrematchKor;
    this.liveSwitch = this.isSwitchedLive;
    this.minigameSwitch = this.isSwitchedMinigame;
    this.casinoSwitch = this.isSwitchedCasino;
    this.slotSwitch = this.isSwitchedSlot;
    this.userName = this.userInformation.username;
    this.userNickname = this.userInformation.iu_nickname;
    this.userMinifoldereu = this.userInformation.minfolder_eu;
    this.userMinifolderkr = this.userInformation.minfolder_kr;
    this.userMinifolderlive = this.userInformation.minfolder_live;
    this.userName2 = this.userInformation.iu_name;
    this.userCountrycode = this.computedCountryCode;
    this.userPhonenumber = this.computedUserPhoneNumber;
    this.userBank = this.userInformation.iu_bank;
    this.userAccount = this.userInformation.iu_acc;
    this.userChongpan = this.codeName.ia_name;
    this.userPartner = this.codeName.icd_code;
    this.userMemo = this.userInformation.iu_memo;
    this.userRecommender = this.userRecommenderProps;
    this.$store.commit('setUserBalance',user.iu_balance);
  }
};
</script>
<style scoped>

</style>
