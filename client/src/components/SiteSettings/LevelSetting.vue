<template>
  <div>
    <div class="card">
      <div class="card-hearder">
        <div class="card-header-title">레벨관리</div>
      </div>
      <div class="card-content">
        <div class="content">
          <table>
            <thead>
              <tr>
                <th colspan="2">레벨</th>
                <th>해외스포츠</th>
                <th>국내스포츠</th>
                <th>라이브</th>
                <th>미니게임</th>
                <th>가상게임</th>
                <th>낙첨 (%)</th>
                <th>추천인 낙첨 (%)</th>
                <th>낙첨 최소폴더</th>
                <th>TreeCoin</th>
                <th>BCoin</th>
                <th>은행 입금</th>
                <th>은행 출금</th>
                <th>지월렛</th>
                <th>샵코인</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 2</span><br />
                  <input class="input-lv-name" type="text" value="레벨2일반" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="2" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="7,000,000" />원</td>
                <td><input type="text" value="7,000,000" />원</td>
                <td><input type="text" value="7,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 3</span><br />
                  <input class="input-lv-name" type="text" value="레벨3일반" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="2" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 4</span><br />
                  <input class="input-lv-name" type="text" value="레벨4정회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="4" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="3,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 5</span><br />
                  <input class="input-lv-name" type="text" value="레벨5VIP" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="4" />%</td>
                <td><input class="input-lv-rate" type="text" value="5" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="20,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="10,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="30,000,000" />원</td>
                <td><input type="text" value="30,000,000" />원</td>
                <td><input type="text" value="30,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td rowspan="5">
                  <span>레벨 1</span><br />
                  <input class="input-lv-name" type="text" value="신규회원" />
                </td>
                <td>최소배팅</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="5,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><input class="input-lv-rate" type="text" value="3" />%</td>
                <td><input class="input-lv-rate" type="text" value="1" />%</td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
                <td><b-switch type="is-success"></b-switch></td>
              </tr>
              <tr>
                <td>단폴배팅</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>단폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>다폴배팅</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="2,000,000" />원</td>
                <td><input type="text" value="1,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr class="separate-level">
                <td>다폴당첨</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="5,000,000" />원</td>
                <td><input type="text" value="0" />원</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-lv-name {
  max-width: 60px;
  margin-top: 10px;
}
.input-lv-rate {
  max-width: 30px;
  margin-top: 3px;
}
.separate-level {
  border-bottom: 10px solid #dddddd;
}
</style>
