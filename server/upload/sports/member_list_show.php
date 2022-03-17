	<div class="row">
        <div class="col-xl-6">
		<?
			include_once("MemberInfos.php");
			$memObj = new MemberInfos();
			$get_Today_trans_in_all = $memObj->get_Today_trans_in($sermbno);
			$get_Today_trans_out_all = $memObj->get_Today_trans_out($sermbno);
			$mem_BetHistory = $memObj->user_cash_historylistGet($sermbno);
			$get_UserBetInfo = $memObj->get_UserBetInfo($sermbno);
			$Plist = $memObj->memberPointLogList($sermbno);
			//print_r($mem_BetHistory);

			$get_Today_trans_in = $get_Today_trans_in_all[0];
			$get_Today_trans_out = $get_Today_trans_out_all[0];
			$totalDeposit =  $get_Today_trans_in_all[1];
			$totalWithdraw =  $get_Today_trans_out_all[1];

			$user_today_income = intval($get_Today_trans_in -$get_Today_trans_out);
			$user_total_income = intval($totalDeposit -$totalWithdraw);

			//echo "get_Today_trans_in: $get_Today_trans_in <Br>";
			$sql="Select * 
					 from info_user as a
					 where a.id='{$sermbno}'";
			$result = $mysqli -> query($sql);
			$row_cnt = $result -> num_rows;
			if ($row_cnt < 1 ) { echo "<script>alert('선택한 회원은 없는 회원이거나 삭제된 회원입니다.');history.back();</script>";exit;}
			$Rs=$result -> fetch_array();
			
			$gofn = "../temp_datas_c5dtd233sxtsd_edksqxx3455/searchhistory.txt";
			if( file_exists($gofn)) $serHis = readFileFrom($gofn, true);
			if(gettype($serHis) != "array") $serHis = array();
			$memInfo =array($Rs["id"],$Rs["iu_name"],$Rs["iu_nickname"]);
			$serHis[$sermbno] = $memInfo;
			saveDataToFile($gofn, serialize($serHis));
			$UHP = explode("-", $Rs["iu_phone"]);

		?>
            <!-- Traffic sources -->
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h6 class="card-title">회원 기본정보</h6>
                    <div class="header-elements">
                        <a class="list-icons-item ml-3" data-action="collapse"></a>
                    </div>
                </div>

                <div class="card-body">

                    <fieldset>
                        <legend class="font-weight-semibold text-uppercase font-size-sm">
                            <i class="icon-user mr-2"></i>
                            회원 계정정보
                            <a href="#" class="float-right text-default" data-toggle="collapse" data-target="#basic-info">
                                <i class="icon-circle-down2"></i>
                            </a>
                        </legend>

                        <div class="collapse show" id="basic-info">
                            <div class="form-group">
                                <label>회원 아이디 / 닉네임:</label>
                                <div class="form-control-plaintext"><?=$Rs["username"]?> / <?=$Rs["iu_nickname"]?></div>
                            </div>

                            <div class="form-group">
                                <label>보유잔액 / 보유포인트: </label><span class="reload-balance"><i class="icon-sync ml-2"></i></span>
                                <div class="row">
                                    <div class="col-md-6">
                                        <input type="text" class="user-cash-now form-control text-right" placeholder="보유잔액" value="<?=number_format($Rs["iu_balance"])?>원" readonly>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="user-point-now form-control text-right" placeholder="보유포인트" value="<?=number_format($Rs["iu_point"])?>P" readonly>
                                    </div>
                                </div>
                            </div>
							
                            <form id="memberChangePasswordForm" action="/admin/member_pass_change.php" method="post">
                               <input type="hidden" name="jobmode" value="changepassword">
							   <input type="hidden" name="membernum" value="<?=$sermbno?>">
							   
                                <div class="form-group">
                                    <label>비밀번호 변경:</label>
                                    <input type="text" name="password" class="form-control" placeholder="비밀번호 변경">
                                </div>

                                <div class="form-group">
                                    <label>비밀번호 변경 확인:</label>
                                    <input type="text" name="password-repeat" class="form-control" placeholder="비밀번호 변경 확인">
                                </div>

                                <div class="text-right">
                                    <button type="submit" class="btn btn-outline-primary">비밀번호 변경 <i class="icon-paperplane ml-2"></i></button>
                                </div>
                            </form>
                        </div>
                        <legend class="font-weight-semibold text-uppercase font-size-sm mt-4">
                            <i class="icon-info22 mr-2"></i>
                            회원 기본정보
                            <a href="#" class="float-right text-default" data-toggle="collapse" data-target="#acc-info">
                                <i class="icon-circle-down2"></i>
                            </a>
                        </legend>
                        <div class="collapse show" id="acc-info">


                            <form id="memberEditInfoForm" action="/admin/member_pass_change.php" method="post">
                               <input type="hidden" name="jobmode" value="changelevel">
							    <input type="hidden" name="membernum" value="<?=$sermbno?>">
                                <div class="form-group">
                                    <label>회원등급 / 계정상태:</label>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <select name="level" class="form-control">
                                                <?for($i=1;$i<11;$i++){
													$i == $Rs["iu_level"]  ? $imon = " selected": $imon = "";
                                                    echo '<option value="'.$i .'" '. $imon. '>레벨 ', $i .'</option>';
												}?>
                                            </select>
                                        </div>
                                        <div class="col-md-9">
											<select name="memtype" class="form-control" style="width:30%;display:inline-block">
												<option value="" <?=$Rs["iu_memtype"] == "" ? 'selected' : ''?>>회원유형</option>
												<option value="정상유저" <?=$Rs["iu_memtype"] == "정상유저" ? 'selected' : ''?>>정상유저</option>
												<option value="의심유저" <?=$Rs["iu_memtype"] == "의심유저" ? 'selected' : ''?>>의심유저</option>
												<option value="불량유저" <?=$Rs["iu_memtype"] == "불량유저" ? 'selected' : ''?>>불량유저</option>
												<option value="기타유저" <?=$Rs["iu_memtype"] == "기타유저" ? 'selected' : ''?>>기타유저</option>

											</select>
                                            <select name="status" class="form-control" style="width:50%;display:inline-block">
                                                <option value="0" <?=$Rs["iu_status"] == 0 ? 'selected' : ''?>>승인대기</option>
												<option value="2" <?=$Rs["iu_status"] == 2 ? 'selected' : ''?>>승인처리중</option>
												<option value="1" <?=$Rs["iu_status"] == 1 ? 'selected' : ''?>>승인완료</option>
												<option value="3" <?=$Rs["iu_status"] == 3 ? 'selected' : ''?>>승인취소</option>
												<option value="4" <?=$Rs["iu_status"] == 4 ? 'selected' : ''?>>계정탈퇴</option>                                                
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <!-- id, username, password, iu_partner, iu_rec, iu_timer, iu_odds, iu_email, iu_level, iu_bank, iu_acc, iu_name, iu_nickname, iu_phone, iu_rolling, iu_balance, iu_point, iu_type, iu_last_login, iu_reg_date, iu_reg_datetime, iu_status, iu_memo, iu_access_ip, iu_access_key, iu_reg_domain, iu_last_ip, iu_reg_ip, admin, remember_token, iu_action, session_id, iu_min_bet, iu_max_bet, iu_max_win, iu_casino_account
							-->
                                <div class="form-group">
                                    <label>배팅한도 설정:</label>
                                    <div class="form-group">
                                        <div class="input-group">
                                        <span class="input-group-prepend">
                                            <button class="btn btn-light" type="button">최소 배팅금액</button>
                                        </span>
                                            <input type="text" name="min" class="form-control text-right" placeholder="최소 배팅금액" value="<?=$Rs["iu_min_bet"]?>">
                                            <span class="input-group-append">
                                            <span class="input-group-text">원</span>
                                        </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                        <span class="input-group-prepend">
                                            <button class="btn btn-light" type="button">최대 배팅금액</button>
                                        </span>
                                            <input type="text" name="max" class="form-control text-right" placeholder="최대 배팅금액" value="<?=$Rs["iu_max_bet"]?>">
                                            <span class="input-group-append">
                                            <span class="input-group-text">원</span>
                                        </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                        <span class="input-group-prepend">
                                            <button class="btn btn-light" type="button">최대 당첨금액</button>
                                        </span>
                                            <input type="text" name="max_win" class="form-control text-right" placeholder="최대 당첨금액" value="<?=$Rs["iu_max_win"]?>">
                                            <span class="input-group-append">
                                            <span class="input-group-text">원</span>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>예금주 / 휴대폰번호:</label>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <input type="text" name="name" class="form-control" placeholder="예금주" value="<?=$Rs["iu_name"]?>">
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control text-center" name="phone1">
                                                <option value="<?=$UHP[0]?>"><?=$UHP[0]?></option>
                                                <option value="010">010</option>
                                                <option value="011">011</option>
                                                <option value="017">017</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" name="phone2" class="form-control text-center numbers" value="<?=$UHP[1]?>" maxlength="4">
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" name="phone3" class="form-control text-center numbers" value="<?=$UHP[2]?>" maxlength="4">
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label>은행 / 계좌번호:</label>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <select class="form-control" name="bank">
                                                <option value="<?=$Rs["iu_bank"]?>" selected><?=$Rs["iu_bank"]?></option>
                                                <option value="신한은행">신한은행</option>
                                                <option value="KB국민은행">KB국민은행</option>
                                                <option value="KEB하나은행">KEB하나은행</option>
                                                <option value="우리은행">우리은행</option>
                                                <option value="케이뱅크">케이뱅크</option>
                                                <option value="카카오뱅크">카카오뱅크</option>
                                                <option value="KDB산업은행">KDB산업은행</option>
                                                <option value="IBK기업은행">IBK기업은행</option>
                                                <option value="NH농협은행">NH농협은행</option>
                                                <option value="수협은행">수협은행</option>
                                                <option value="대구은행">대구은행</option>
                                                <option value="BNK부산은행">BNK부산은행</option>
                                                <option value="BNK경남은행">BNK경남은행</option>
                                                <option value="광주은행">광주은행</option>
                                                <option value="전북은행">전북은행</option>
                                                <option value="제주은행">제주은행</option>
                                                <option value="농·축협">농·축협</option>
                                                <option value="새마을금고">새마을금고</option>
                                                <option value="우체국">우체국</option>
                                                <option value="신용협동조합">신용협동조합</option>
                                                <option value="산림조합">산림조합</option>
                                                <option value="HSBC은행">HSBC은행</option>
                                                <option value="한국씨티은행">한국씨티은행</option>
                                                <option value="한국스탠다드차타드은행">한국스탠다드차타드은행</option>
                                                <option value="신한금융투자">신한금융투자</option>
                                                <option value="하나금융투자">하나금융투자</option>
                                                <option value="DB금융투자">DB금융투자</option>
                                                <option value="유안타증권">유안타증권</option>
                                                <option value="상호저축은행중앙회">상호저축은행중앙회</option>
                                                <option value="미래애셋">미래에셋</option>
                                            </select>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="acc" class="form-control" placeholder="계좌번호" value="<?=$Rs["iu_acc"]?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>회원 메모:</label>
                                    <textarea name="memo" rows="5" cols="5" class="form-control" placeholder="메모가 없습니다."><?=$Rs["iu_memo"]?></textarea>
                                </div>
                                <div class="text-right">
                                    <button type="submit" class="btn btn-outline-primary">회원정보 수정 <i class="icon-paperplane ml-2"></i></button>
                                </div>
                            </form>
                        </div>
                    </fieldset>
                </div>

            </div>
            <!-- /traffic sources -->

        </div>

        <div class="col-xl-6">
            <div class="card card-body border-top-1 border-top-blue" style="padding:0";>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-centered member-table">
                        <thead>
                        <tr>
                            <th class="text-center">오늘 입금액</th>
                            <th class="text-center">오늘 출금액</th>
                            <th class="text-center">오늘 수익금</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="text-center"><?=number_format($get_Today_trans_in)?>원</td>
                            <td class="text-center"><?=number_format($get_Today_trans_out)?>원</td>
                            <td class="text-center"><?=number_format($user_today_income)?>원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--deposit/withdrawal-->
            <div class="card card-body border-top-1 border-top-blue" style="padding:0";>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-centered member-table">
                        <thead>
                        <tr>
                            <th class="text-center">총 입금액</th>
                            <th class="text-center">총 출금액</th>
                            <th class="text-center">총 수익금</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="text-center"><?=number_format($totalDeposit)?>원</td>
                            <td class="text-center"><?=number_format($totalWithdraw)?>원</td>
                            <td class="text-center"><?=number_format($user_total_income)?>원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card card-body border-top-1 border-top-blue" style="padding:0";>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-centered member-table">
                        <thead>
                        <tr>
                            <th class="text-center">오늘 배팅횟수</th>
                            <th class="text-center">오늘 배팅금액</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="text-center"><?=number_format($get_UserBetInfo["todayBetcnt"])?>회</td>
                            <td class="text-center"><?=number_format($get_UserBetInfo["todayBetmoney"])?>원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card card-body border-top-1 border-top-blue" style="padding:0";>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-centered member-table">
                        <thead>
                        <tr>
                            <th class="text-center">총 배팅횟수</th>
                            <th class="text-center">총 배팅금액</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="text-center"><?=number_format($get_UserBetInfo["totalBetcnt"])?>회</td>
                            <td class="text-center"><?=number_format($get_UserBetInfo["totalBetmoney"])?>원</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-body py-0">

            </div>
<!--points div -->
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h6 class="card-title">회원 잔액관리</h6>
                    <div class="header-elements">
                        <a class="list-icons-item ml-3" data-action="collapse"></a>
                    </div>
                </div>

                <div class="card-body">
                <div class="popup1-overlay" id="popup1_<?=$Rs['id']?>" >
                                
                
                                <div class="popup1-content" id="content1_<?=$Rs['id']?>">
                                        <div>
                                            <input id="admin_<?=$Rs['id']?>" placeholder="Enter admin name">
                                        </div>

                                        <div >
                                                <input hidden id="pointtemp_<?=$Rs['id']?>" value="<?=$Rs['iu_point']?>">
                                                
                                                <div><label> &nbsp Balance </label> 
                                                <h5>&nbsp <?=number_format($Rs["iu_balance"])?> </h5> </div>
                                                
                                                <div><label>&nbsp Amount</label>
                                                <input style="width: 400px;"  type="text" id="balancechange_<?=$Rs['id']?>" value="" placeholder="머니 입력"> </input></div>
                                                
                                                <div><label> &nbsp Reason &nbsp</label>
                                                <input  style="width: 400px;" type="textbox" id="reason_<?=$Rs['id']?>" value="" placeholder="내용 입력"> </input></div>
                                       
                                                <div><label>EXPIRATION</label>
                                                <input style="width: 300px;" type="date" id="expiration_<?=$Rs['id']?>" value="" placeholder="expiration"> </input> </div>
                                                
                                        </div>
                                    </div>
                                    <center>
                                    <div >
                                                <a type="button" id="addbalance_<?=$Rs['id']?>" onclick="addbalance(<?=$Rs['id']?>, <?=$Rs['iu_balance']?>)" class="btn btn-danger" style="color: #fff; width: 100px">ADD</a>
                                                <a type="button" id="deductbalance_<?=$Rs['id']?>" onclick="deductbalance(<?=$Rs['id']?>, <?=$Rs['iu_balance']?>)" class="btn btn-danger" style="background-color: gray; color: #fff; width: 100px">DEDUCT</a>
                                    </div></center>
                                </div>

                                <div class="popup1-content" id="content1_<?=$Rs['id']?>">
                                        <!-- <div>
                                            <input id="admin_<?=$Rs['id']?>" placeholder="Enter admin name">
                                        </div> -->
                                        <div >
                                                <input hidden id="balancetemp_<?=$Rs['id']?>" value="<?=$Rs['iu_balance']?>">
                                                
                                                <div><label> &nbsp Point </h5> 
                                                <h5>&nbsp <?=number_format($Rs["iu_point"])?> </h5> </div>
                                                
                                                <div><label>&nbsp Amount</h5>
                                                <input style="width: 400px;"  type="text" id="pointchange_<?=$Rs['id']?>" value="" placeholder="머니 입력"> </input></div>
                                                
                                                <div><label> &nbsp Reason &nbsp</h5>
                                                <input  style="width: 400px;" type="textbox" id="reason1_<?=$Rs['id']?>" value="" placeholder="내용 입력"> </input></div>
                                        </div>
                                    </div>
                                    <center>
                                    <div >
                                                <a type="button" id="addpoint_<?=$Rs['id']?>" onclick="addpoint(<?=$Rs['id']?>, <?=$Rs['iu_point']?>)" class="btn btn-danger" style="color: #fff; width: 100px">ADD</a>
                                                <a type="button" id="deductpoint_<?=$Rs['id']?>" onclick="deductpoint(<?=$Rs['id']?>, <?=$Rs['iu_point']?>)" class="btn btn-danger" style="background-color: gray; color: #fff; width: 100px">DEDUCT</a>
                                    </div></center>
                                </div>
                </div>

            </div>

<!--end of balance div-->         

            

        </div>
<!-- put ouside div -->
            <div class="card" style="max-height:400px; width: 100%">
                <div class="card-header header-elements-inline">
                    <h6 class="card-title">회원 머니로그</h6>
                    <div class="header-elements">
                        <a class="list-icons-item ml-3" data-action="collapse"></a>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table text-nowrap">
                        <thead>
                        <tr>
                            <th class="text-center">user id</th>
                            <th class="text-center">Payment/collection</th>
                            <th class="text-center">amount</th>
                            <th class="text-center">status before and after</th>
                            <th class="text-center">reason</th>
                            <th class="text-center">date and time</th>
                            <th class="text-center">admin</th>
                        </tr>
                        </thead>
                        <tbody>
						<?
							//{{ ($item->ibl_bet_key != '') ? '/manager/sports/bet/list?key='.$item->ibl_bet_key.'&member='.$item->ibl_user : '#' }}
						?>
                        <?for($x = 0; $x < count($mem_BetHistory); $x++){
							$mvAmount = $mem_BetHistory[$x]["cash_move_amouint"];
							$ref_num = $mem_BetHistory[$x]["ref_num"];
							?>
                            <tr>
                                <td> <?=$Rs["username"]?></td>
                                <td><? if($mem_BetHistory[$x]["cash_move_type"] !='출금' ){?>
                                                        <i class="icon-plus3"></i> <text style="color:green">입금</text>
									<?}else{?>
                                                        <i class="icon-minus3"></i> <text style="color:red">출금</text>
                                    <?}?> 
                                </td>

                                <td> <?=$mvAmount?></td>
                                <td>
                                    처리전 -> <?=number_format($mem_BetHistory[$x]["cash_before"])?> , 처리후 -> <?=number_format($mem_BetHistory[$x]["cash_after"])?>     
                                </td>
                                <td> <?=$mem_BetHistory[$x]["cash_move_reason"]?> </td>
                               
                                <td>
                                    <?=dateTimeToRead($mem_BetHistory[$x]["move_date"], 3)?>
                                </td>
                                <td>
                                    Manager
                                </td>
                            </tr>
                       <?}?>
                        </tbody>
                    </table>
                </div>            
            </div>




        <div class="card" style="max-height:400px; width: 100%">
                <div class="card-header header-elements-inline">
                    <h6 class="card-title">회원 포인트 로그</h6>
                    <div class="header-elements">
                        <a class="list-icons-item ml-3" data-action="collapse"></a>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table text-nowrap">
                        <thead>
                        <tr>
                            <th class="text-center">user id</th>
                            <th class="text-center">Payment/collection</th>
                            <th class="text-center">amount</th>
                            <th class="text-center">status before and after</th>
                            <th class="text-center">reason</th>
                            <th class="text-center">date and time</th>
                            <th class="text-center">admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?foreach($Plist as $item){?>
                            <tr>
                                <td> <?=$Rs["username"]?></td>
                                <td><?if($item["ipl_info"] == '포인트 전환'){?>
                                                        <i class="icon-minus3"></i> <text style="color:red"> deduct </text>
                                                    <?}else{?>
                                                        <i class="icon-plus3"></i>  <text style="color:green"> give </text>
                                                    <?}?>
                                </td>
                                <td> <?=number_format($item["ipl_amount"])?>P </td>
                                <td>
                                    적립 전 금액 <?=number_format($item["ipl_before"])?>P -> 적립 후 금액 <?=number_format($item["ipl_after"])?>P
                                </td>
                                <td><?=$item["ipl_info"]?></td>
                                <td>
                                    <span class="text-muted font-size-sm"><?=dateTimeToRead($item["ipl_datetime"])?></span>
                                </td>
                                <td>
                                    Manager
                                </td>
                            </tr>
                        <?}?>
                        </tbody>
                    </table>
                </div>              
            </div>






    </div>
    <!-- /main charts -->
    <script>

        $("#memberChangePasswordForm").submit(function (e) {
            var password = $("input[name=password]");
            var password_repeat = $("input[name=password-repeat]");

            if(password.val() === '') {
                alert('변경할 비밀번호를 입력해주세요.');
                password.focus();
                return false;
            }

            if(password_repeat.val() === '') {
                alert('변경할 비밀번호를 다시한번 입력해주세요.');
                password_repeat.focus();
                return false;
            }

            if(password.val() !== password_repeat.val()) {
                alert('비밀번호가 서로 다릅니다.');
                password_repeat.focus();
                return false;
            }

            $("#memberChangePasswordForm")[0].submit();
        });
		
		function giveBalance(ctype, act){
			var givebalreason = document.getElementById("givebalreason").value;
			var givebalamount = parseInt(document.getElementById("givebalamount").value);
			var adr = "_api_process_tings_01.php";
			var rea = "giveBalance";
			if( act < 0  && ctype =="cash") {
				rea = "returnBalance";
				givebalreason = document.getElementById("returnreson").value;
				givebalamount = parseInt(document.getElementById("returnprice").value);
			}else if( act > 0 && ctype =="point") {
				rea = "givePoint";
				givebalreason = document.getElementById("givepointreason").value;
				givebalamount = parseInt(document.getElementById("givepointamount").value);
			}else if( act < 0 && ctype =="point") { // givePoint  returnPoint
				rea = "returnPoint";
				givebalreason = document.getElementById("returnpointreason").value;
				givebalamount = parseInt(document.getElementById("returnpointamount").value);
			}
			var sermbno = parseInt(<?=$sermbno?>);
			if( sermbno < 1 ){alert("대상값이 없거나 에러입니다.");return;}
			if( isNaN(givebalamount)) givebalamount = 0;
			if( givebalamount < 10 || givebalreason.length < 2 ){alert("사유와 금액을 입력해 주세요"); return;}
			
			var sendData = {"jobtype":rea, "givebalreason":givebalreason,"givebalamount":givebalamount,"sermbno":sermbno};
			console.log( sendData );
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				console.log( data );
				var data = JSON.parse(data);
				if( data.result == true && data.result == true){
					alert("처리되었습니다.");
					document.location.reload();
				}else{
					if( data.error ){
						alert(data.error);
					}else{
						alert("시스템 에러, 개발실 문의 바랍니다.");
					}
				}
			}});
        }
        
        jQuery(document).ready(function(){
            jQuery("span.reload-balance").click(function(){
                jQuery('input.user-cash-now').val('.....');
                jQuery('input.user-point-now').val('.....');
                var adr = "_api_process_tings_01.php";
                var sermbno = parseInt(<?=$sermbno?>);
                var sendData = {"jobtype":"fetchBalance", "sermbno":sermbno};
                $.ajax({type:"POST", url:adr , data:sendData , success:function(data){
                    var data = JSON.parse(data);
                    console.log(data);

                    jQuery("input.user-cash-now").val(addCommas(data.UserCashNow)+"원");
                    jQuery("input.user-point-now").val(addCommas(data.UserPointNow)+"P");
                }});
            });
        });

        function addCommas(nStr){
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
		
        function addbalance(id, balance){
            var addvalue= $("#balancechange_"+id).val(); //amount
            var amount= parseInt(balance) + parseInt(addvalue);
            //things needed to save
            var expiry= $("#expiration_"+id).val();
            var balanceBefore= parseInt(balance);
            var balanceAfter= parseInt(balance) + parseInt(addvalue);
            var admin= $("#admin_"+id).val();
            var reason= $("#reason_"+id).val();
            var point= $("#pointtemp_"+id).val();

            alert(expiry);

            if(confirm("Add to user balance?")){
                var sendData= {"jobtype":"addbalance" , "data":amount, "id":id, "amount":addvalue, "expiry":expiry, "balanceBefore":balanceBefore, "balanceAfter":balanceAfter, "admin":admin, "reason":reason, "point":point};
				var adr = "_ajax_game_adds_showhideset.php";
				console.log(sendData);
				$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
					console.log(data);
					var data = JSON.parse(data);

					if(data.success == 1){
						alert("SUCCESS");
						location.reload();
					}else{
						alert("ERROR ! Please try again later.");
					}
				}});
            }
            // alert(amount);
            
        }

        function deductbalance(id, balance){
            var deductvalue= $("#balancechange_"+id).val();
            var amount= parseInt(balance) - parseInt(deductvalue);

            var expiry= $("#expiration_"+id).val();
            var balanceBefore= parseInt(balance);
            var balanceAfter= parseInt(balance) - parseInt(deductvalue);
            var admin= $("#admin_"+id).val();
            var reason= $("#reason_"+id).val();
            var point= $("#pointtemp_"+id).val();


            if(confirm("Deduct to user balance?")){
                var sendData= {"jobtype":"deductbalance" , "data":amount, "id":id, "amount":deductvalue, "expiry":expiry, "balanceBefore":balanceBefore, "balanceAfter":balanceAfter, "admin":admin, "reason":reason, "point":point };
				var adr = "_ajax_game_adds_showhideset.php";
				console.log(sendData);
				$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
					console.log(data);
					var data = JSON.parse(data);

					if(data.success == 1){
						alert("SUCCESS");
						location.reload();
					}else{
						alert("ERROR ! Please try again later.");
					}
				}});
            }
        }

    </script>