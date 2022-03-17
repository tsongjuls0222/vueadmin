<?
	session_start();
	header('Content-Type: text/html; charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	include_once("../do_con_config.php");	
	include_once("bet_list_detail_info.php");
	
	if(isset($_POST)){
		$sermbno = $_POST["target"];
	}

	$dateserSt = date("Y-m-d");
	$dateserEn = date("Y-m-d");
	$prematch_dt = date("Y-m-d 00:00:00")." - ".date("Y-m-d H:i:s");
	$dA = explode(" - ", $prematch_dt);
	$date_en  = $dA[1];
	$date_st  = $dA[0];

	


?>
<style>
	#ui-datepicker-div {
		z-index: 1080 !important;
	}
	.zero-margin{
		margin: 0px;
	}
	.betting-tab-wrapper{
		display: flex;
		justify-content: space-evenly;
		width: 20%;
	}
	.betting-tab-wrapper .mybettingtab.active{
		background-color: #ea5101 !important;
		color: #fff;
	}

	.betting-tab-content-wrapper .mybettingtab-content{
		display: none;
	}

	.betting-tab-content-wrapper .mybettingtab-content.active{
		display: block;
	}

	.mybettingtab{
		width: 33.33%;
		text-align: center;
		cursor: pointer;
	}
	.juls-active{
		display: table-row;
	}
	.juls-inactive{
		display: none;
	}
	.floating-button{
		position: absolute;
    	z-index: 99;
    	bottom: 10px;
    	right: 25px;
		/* background-color: #fff; */
	}
	.floating-button .userinfo-button-global{
		margin: 0px !important;
	}
</style>
<div class="popup-tab">
	<div class="tab-list">
		<div class="tabs active" data-id="<?=$sermbno?>" data-target="#information"><span>회원정보</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#monelog"><span>머니로그</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#betlog"><span>접속기록/배팅로그 </span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#mybetting"><span>배팅내역</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#deposit"><span>입금내역</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#withdrawal"><span>출금내역</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#customer"><span>고객센터</span></div>
		<div class="tabs" data-id="<?=$sermbno?>" data-target="#inbox"><span>쪽지</span></div>
	</div>
</div>

<div class="popup-tab-content">
	<div id="information" class="popup-main-content active">
		<div class="floating-button">
			<button class="userinfo-button-global btn">수정<i class="icon-paperplane ml-2"></i></button>
		</div>
		<div class="row">
			<div class="col-xl-12">
			<?
				include_once("MemberInfos.php");
				$memObj = new MemberInfos();
				$get_Today_trans_in_all 	= $memObj->get_Today_trans_in($sermbno);
				$get_Today_trans_out_all 	= $memObj->get_Today_trans_out($sermbno);
				$get_UserBetInfo 			= $memObj->get_UserBetInfo($sermbno);
				$Plist 						= $memObj->memberPointLogList($sermbno);


				$get_Today_trans_in 	= $get_Today_trans_in_all[0];
				$totalDeposit 			= $get_Today_trans_in_all[1];
				$depositCount 			= $get_Today_trans_in_all[2];
				$depositCountToday 		= $get_Today_trans_in_all[3];

				$get_Today_trans_out 	= $get_Today_trans_out_all[0];
				$totalWithdraw 			= $get_Today_trans_out_all[1];
				$withdrawToday 			= $get_Today_trans_out_all[2];
				$withdrawAll 			= $get_Today_trans_out_all[3];

				$user_today_income = intval($get_Today_trans_in - $get_Today_trans_out);
				$user_total_income = intval($totalDeposit -$totalWithdraw);


				$sql="Select * 
						from info_user as a
						where a.id='{$sermbno}'";
				$result = $mysqli -> query($sql);
				$row_cnt = $result -> num_rows;
				if ($row_cnt < 1 ) { echo "<script>alert('선택한 회원은 없는 회원이거나 삭제된 회원입니다.');history.back();</script>";exit;}
				$Rs	= $result -> fetch_array();
				$userlevel = $Rs["iu_level"];
				

			?>
				<div class="card">
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
								<div class="row">
									<div class="col-md-6">
										<div class="form-group row" style="display: flex; justify-content: space-between;">
											<div class="user-details col-md-6">
												<label style='margin-bottom: 0px; font-weight: bold;'>아이디</label>
												<? if($Rs['iu_memtype'] == '의심유저' || $Rs['iu_memtype'] == '불량유저'){  ?>
													<!-- <div class="form-control-plaintext" style="color: red"><?=$Rs["username"]?> / <?=$Rs["iu_nickname"]?></div> -->
													<input type="text" class="form-control" value="<?=$Rs["username"]?>" readonly>
												<? }else{ ?>
													<!-- <div class="form-control-plaintext"><?=$Rs["username"]?> / <?=$Rs["iu_nickname"]?></div> -->
													<input type="text" class="form-control" value="<?=$Rs["username"]?>" readonly>
												<? } ?>
											</div>
											<div class="user-button col-md-6">
												<label style='margin-bottom: 0px; font-weight: bold;'>닉네임</label>
												<? if($Rs['iu_memtype'] == '의심유저' || $Rs['iu_memtype'] == '불량유저'){  ?>
													<!-- <div class="form-control-plaintext" style="color: red"><?=$Rs["username"]?> / <?=$Rs["iu_nickname"]?></div> -->
													<input type="text" class="form-control" value="<?=$Rs["iu_nickname"]?>" readonly>
												<? }else{ ?>
													<!-- <div class="form-control-plaintext"><?=$Rs["username"]?> / <?=$Rs["iu_nickname"]?></div> -->
													<input type="text" class="form-control" value="<?=$Rs["iu_nickname"]?>" readonly>
												<? } ?>
												<div class="wallet-button" style="margin-bottom: 3px; text-align: right;">
													<?
														$ethwallet = $Rs["walletAddress"];
														$nemwallet = $Rs["walletAddress_2"];
														$wallet1 = "#";
														$wallet2 = "#";
														$target1 = "";
														$target2 = "";
														if($Rs["walletAddress"] != NULL || $Rs["walletAddress"] != ""){
															$wallet1 = "https://etherscan.io/address/".$Rs["walletAddress"];
															$target1 = "target='_blank'";
														}

														if($Rs["walletAddress_2"] != NULL || $Rs["walletAddress_2"] != ""){
															$wallet2 = "https://explorer.nemtool.com/#/s_account?account=".$Rs["walletAddress_2"];
															$target2 = "target='_blank'";
														}

														$recommender = $Rs["iu_recommend"];
														if($recommender == 0000){
															$recommender = "-";
														}else{
															$recsql = "select username from info_user where id='{$recommender}'";
															$recres = $mysqli->query($recsql);
															$recrs	= $recres->fetch_array();
															$recommender = $recrs["username"];
														}
													?>

												</div>
												<div class="casino-button" style="text-align: right;">
												<!--<button class="btn btn-primary casino-connect-me slot-connect-real" data-id="<?=$Rs["id"]?>">Slot Games Connect</button>-->
												</div>
											</div>
										</div>
									</div>	
								</div>

								<form id="memberEditInfoForm" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="userlevel-jobmode" value="changelevel">
									<input type="hidden" name="membernum" class="userlevel-userid" value="<?=$sermbno?>">
									<div class="form-group">
										<!-- <label>회원등급 / 계정상태:</label> -->
										<div class="row">
											<div class="col-md-3">
												<select name="level" class="userlevel-level form-control">
													<?for($i=1;$i<11;$i++){
														$i == $Rs["iu_level"]  ? $imon = " selected": $imon = "";
														echo '<option value="'.$i .'" '. $imon. '>레벨 ', $i .'</option>';
													}?>
												</select>
											</div>
											<div class="col-md-9">
												<select name="memtype" class="form-control userlevel-memtype" style="width:30%;display:inline-block">
													<option value="" <?=$Rs["iu_memtype"] == "" ? 'selected' : ''?>>회원유형</option>
													<option value="정상유저" <?=$Rs["iu_memtype"] == "정상유저" ? 'selected' : ''?>>정상유저</option>
													<option value="의심유저" <?=$Rs["iu_memtype"] == "의심유저" ? 'selected' : ''?>>의심유저</option>
													<option value="불량유저" <?=$Rs["iu_memtype"] == "불량유저" ? 'selected' : ''?>>불량유저</option>
													<option value="기타유저" <?=$Rs["iu_memtype"] == "기타유저" ? 'selected' : ''?>>기타유저</option>
													<option value="장기미접" <?=$Rs["iu_memtype"] == "장기미접" ? 'selected' : ''?>>장기미접</option>
													<option value="정지유저" <?=$Rs["iu_memtype"] == "정지유저" ? 'selected' : ''?>>정지유저</option>
													<option value="테스트아이디" <?=$Rs["iu_memtype"] == "테스트아이디" ? 'selected' : ''?>>테스트아이디</option>
													<option value="총판전용아이디" <?=$Rs["iu_memtype"] == "총판전용아이디" ? 'selected' : ''?>>총판전용아이디</option>
												</select>
												<select name="status" class="form-control userlevel-status" style="width:40%;display:inline-block">
													<option value="0" <?=$Rs["iu_status"] == 0 ? 'selected' : ''?>>승인대기</option>
													<option value="2" <?=$Rs["iu_status"] == 2 ? 'selected' : ''?>>승인처리중</option>
													<option value="1" <?=$Rs["iu_status"] == 1 ? 'selected' : ''?>>승인완료</option>
													<option value="3" <?=$Rs["iu_status"] == 3 ? 'selected' : ''?>>승인취소</option>
													<option value="4" <?=$Rs["iu_status"] == 4 ? 'selected' : ''?>>계정탈퇴</option>                                                
												</select>
												<select name="block" class="form-control userlevel-block" style="width:25%;display:inline-block">
													<option value="0" <?=$Rs["block"] == 0 ? 'selected' : ''?>>보너스 지급</option>
													<option value="1" <?=$Rs["block"] == 1 ? 'selected' : ''?>>보너스 미지급</option>                                               
												</select>
											</div>
										</div>

									</div>
									<!-- id, username, password, iu_partner, iu_rec, iu_timer, iu_odds, iu_email, iu_level, iu_bank, iu_acc, iu_name, iu_nickname, iu_phone, iu_rolling, iu_balance, iu_point, iu_type, iu_last_login, iu_reg_date, iu_reg_datetime, iu_status, iu_memo, iu_access_ip, iu_access_key, iu_reg_domain, iu_last_ip, iu_reg_ip, admin, remember_token, iu_action, session_id, iu_min_bet, iu_max_bet, iu_max_win, iu_casino_account
								-->
									<hr/>
									<div class="form-group">
										<div class="collapse show" id="acc-info">
											<div class="form-group">
												<label>보유잔액 / 보유포인트: </label><span class="reload-balance"><i class="icon-sync ml-2"></i></span>
												<div class="row">
													<div class="col-md-6 user-cash-col">
														<div class="input-group">
															<span class="input-group-prepend">
																<button class="btn btn-light zero-margin" type="button">보유머니</button>
															</span>
															<input type="text" data-target="<?=$Rs["id"]?>" data-username="<?=$Rs["username"]?>" data-name="<?=$Rs["iu_name"]?>" data-balance="<?=$Rs["iu_balance"]?>" class="user-cash-now form-control text-right" placeholder="보유잔액" value="<?=number_format($Rs["iu_balance"])?> 원" readonly>
														</div>
													</div>
													<div class="col-md-6 user-points-col">
														<div class="input-group">
															<span class="input-group-prepend">
																<button class="btn btn-light zero-margin" type="button">포인트</button>
															</span>
															<input type="text" data-target="<?=$Rs["id"]?>" data-username="<?=$Rs["username"]?>" data-name="<?=$Rs["iu_name"]?>" data-point="<?=$Rs["iu_point"]?>" class="user-point-now form-control text-right" placeholder="보유포인트" value="<?=number_format($Rs["iu_point"])?> P" readonly>
															
														</div>
													</div>
												</div>
											</div>
											<hr/>
											<div class="form-group">
												<div class="row">
													<div class="col-md-3">에볼루션: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">마이크로: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">드림게이밍: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">비보게이밍: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
												</div>
												<div class="row">
													<div class="col-md-3">
														<input type="text" class="user-evo-bal form-control text-right" placeholder="에볼루션" value="<?=number_format($Rs["iu_evolution"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-micro-bal form-control text-right" placeholder="마이크로" value="<?=number_format($Rs["iu_micro"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-dream-bal form-control text-right" placeholder="드림게이밍" value="<?=number_format($Rs["iu_dream"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-vivo-bal form-control text-right" placeholder="비보게이밍" value="<?=number_format($Rs["iu_vivo"])?>원" readonly>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="row">
													<div class="col-md-3">아시아게이밍: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">게임플레이: <?=$Rs["iu_casino_account"]?> <span class="reload-casino"><i class="icon-sync ml-2"></i></span></div>
												</div>
												<div class="row">
													<div class="col-md-3">
														<input type="text" class="user-asia-bal form-control text-right" placeholder="에볼루션" value="<?=number_format($Rs["iu_asia"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-gameplay-bal form-control text-right" placeholder="마이크로" value="<?=number_format($Rs["iu_gameplay"])?>원" readonly>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="row">
													<div class="col-md-3">프라그마틱: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">QT슬롯: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">FG슬롯: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">MODA슬롯: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
												</div>
												<div class="row">
													<div class="col-md-3">
														<input type="text" class="user-pragmatic-bal form-control text-right" placeholder="에볼루션" value="<?=number_format($Rs["iu_pragmatic"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-qtslot-bal form-control text-right" placeholder="마이크로" value="<?=number_format($Rs["iu_qtslot"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-fgslot-bal form-control text-right" placeholder="드림게이밍" value="<?=number_format($Rs["iu_fgslot"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-mdslot-bal form-control text-right" placeholder="드림게이밍" value="<?=number_format($Rs["iu_mdslot"])?>원" readonly>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="row">
													<div class="col-md-3">씨큐나인슬롯: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
													<div class="col-md-3">마이크로슬롯: <?=$Rs["iu_casino_account"]?> <span class="reload-slot"><i class="icon-sync ml-2"></i></span></div>
												</div>
												<div class="row">
													<div class="col-md-3">
														<input type="text" class="user-cq9slot-bal form-control text-right" placeholder="에볼루션" value="<?=number_format($Rs["iu_cq9slot"])?>원" readonly>
													</div>
													<div class="col-md-3">
														<input type="text" class="user-microslot-bal form-control text-right" placeholder="마이크로" value="<?=number_format($Rs["iu_microslot"])?>원" readonly>
													</div>
													<div class="col-md-3 text-right">
													</div>
													<div class="col-md-3">
														<button class="btn btn-primary casino-connect-me casino-connect-real" data-id="<?=$Rs["id"]?>">카지노 계정생성</button>
													</div>
												</div>
											</div>
										</div>
										<br/>
										<legend class="font-weight-semibold text-uppercase font-size-sm mt-4">
											<i class="icon-info22 mr-2"></i>
											회원 기본정보
											<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#acc-info">
												<i class="icon-circle-down2"></i>
											</a>
										</legend>
										<div class="form-group">
											<div class="row">
												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery mb-3">
														<label class="form-check-label"><input type="checkbox" name="block_prematcheu" class="block_prematcheu form-check-input-switchery" data-fouc <?=$Rs["block_prematcheu"] == 1 ? 'checked' : ''?> value="0">
														프리메치 경기목록
														</label>
													</div>
												</div>
												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery">
														<label class="form-check-label">
															국내스포츠
															<input type="checkbox" name="block_prematchkor" class="block_prematchkor form-check-input-switchery" data-fouc <?=$Rs["block_prematchkor"] == 1 ? 'checked' : ''?> value="0">
														</label>
													</div>
												</div>
												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery">
														<label class="form-check-label">
															라이브
															<input type="checkbox" name="block_live" class="block_live form-check-input-switchery" data-fouc <?=$Rs["block_live"] == 1 ? 'checked' : ''?> value="0">
														</label>
													</div>
												</div>
												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery">
														<label class="form-check-label">
															미니게임
															<input type="checkbox" name="block_minigame" class="block_minigame form-check-input-switchery" data-fouc <?=$Rs["block_minigame"] == 1 ? 'checked' : ''?> value="0">
														</label>
													</div>
												</div>

												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery">
														<label class="form-check-label">
															카지노
															<input type="checkbox" name="block_casino" class="block_casino form-check-input-switchery" data-fouc <?=$Rs["block_casino"] == 1 ? 'checked' : ''?> value="0">
														</label>
													</div>
												</div>

												<div class="col-3">
													<div class="form-group form-check form-check-right form-check-switchery">
														<label class="form-check-label">
															슬롯
															<input type="checkbox" name="block_slot" class="block_slot form-check-input-switchery" data-fouc <?=$Rs["block_slot"] == 1 ? 'checked' : ''?> value="0">
														</label>
													</div>
												</div>
											</div>
										</div>
										<hr>
										<div class="form-group">
											<div class="row">
												<div class="col-md-4">
													<label>해외스포츠 최소배팅가능 폴더:</label>
													<input type="text" name="minfolder_eu" class="form-control userlevel-minfolder_eu" placeholder="폴더" value="<?=$Rs["minfolder_eu"]?>">
												</div>
												<div class="col-md-4">
													<label>국내스포츠 최소배팅가능 폴더:</label>
													<input type="text" name="minfolder_kr" class="form-control userlevel-minfolder_kr" placeholder="폴더" value="<?=$Rs["minfolder_kr"]?>">
												</div>
												<div class="col-md-4">
													<label>라이브 최소배팅가능 폴더:</label>
													<input type="text" name="minfolder_live" class="form-control text-right userlevel-minfolder_live" placeholder="폴더"  value="<?=$Rs["minfolder_live"]?>">
												</div>
											</div>
										</div>
										<hr>
									<div class="form-group">
										<div class="row">
											<div class="col-md-3">
												<label>추천인:</label>
												<input type="text" name="recommender" class="form-control userlevel-recommend" placeholder="추천인" value="<?=$recommender?>">
											</div>
											<div class="col-md-3">
												<label>예금주:</label>
												<input type="text" name="name" class="form-control userlevel-name" placeholder="예금주" value="<?=$Rs["iu_name"]?>">
											</div>
											<?
												  $phone  = substr($Rs["iu_phone"],2);
												  $first  = substr($phone,0,1);
												  if($first != 0){
													  $phone = "0".$phone;
												  }
											?>
											<div class="col-md-2">
												<label>국가 코드:</label>
												<input type="text" class="form-control text-right userlevel-country" name="countrycode" value="<?=substr($Rs["iu_phone"],0,2)?>">
											</div>
											<div class="col-md-4">
												<label>휴대폰번호:</label>
												<input type="text" class="form-control text-right userlevel-phone" name="phone1" value="<?=$phone?>">
											</div>
										</div>
									</div>

									<div class="form-group">
										<label>은행 / 계좌번호:</label>
										<div class="row">
											<div class="col-md-3">
												<select class="form-control userlevel-bank" name="bank">
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
													<option value="토스뱅크">토스뱅크</option>
												</select>
											</div>
											<div class="col-md-9">
												<input type="text" name="acc" class="form-control userlevel-account" placeholder="계좌번호" value="<?=$Rs["iu_acc"]?>">
											</div>
										</div>
									</div>
									<div class="text-right">
										<button type="submit" class="userlevel-button btn btn-outline-primary d-none">수정<i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
							<hr/>
							<form id="memberChangePasswordForm" action="/admin/member_pass_change.php" method="post">
								<input type="hidden" name="jobmode" class="user-jobmode" value="changepassword">
								<input type="hidden" name="membernum" class="user-userid" value="<?=$sermbno?>">
								<div class="form-group row">
									<div class="col-6">
										<label>비밀번호 변경:</label>
										<input type="text" name="password" class="user-new-password form-control" placeholder="비밀번호 변경">
									</div>
									<div class="col-6">
										<label>총판:</label>
										<?
											$userCode 	= $Rs["real_code"];
											$partquery 	= "select * from info_code as a left join info_agent as b on a.icd_agent=b.ia_idx where a.icd_code='{$userCode}'";
											$resultp 	= $mysqli->query($partquery);
											$rsp 		= $resultp->fetch_array();
											$pakner		= $rsp["icd_code"];
											$chongpan 	= $rsp["ia_name"];
											
										?>
										<input type="text" name="chongpan" class="form-control" readonly value="<?=$chongpan?>" placeholder="파트너">
									</div>
								</div>

								<div class="form-group row">
									<div class="col-6">
										<label>환전비밀번호:</label>
										<input type="text" name="wpass" class="user-new-wpassword form-control" placeholder="환전비밀번호">
									</div>
									<div class="col-6">
										<label>코드:</label>
										<input type="text" name="usercode" class="user-new-code form-control" <?=($_SESSION["istopmanager"] != 1) ? "readonly" : "" ;?> value="<?=$pakner?>" placeholder="총판">
									</div>
								</div>

								<div class="form-group d-none">
									<label>비밀번호 변경 확인:</label>
									<input type="text" name="password-repeat" class="form-control" placeholder="비밀번호 변경 확인">
								</div>

								<div class="text-right">
									<button type="submit" class="userinfo-button btn btn-outline-primary d-none">비밀번호 변경 <i class="icon-paperplane ml-2"></i></button>
								</div>
							</form>
						</fieldset>
					</div>

				</div>
			</div>
			<div class="col-xl-6">
				<div class="card card-body" style="padding:0";>
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
								<td class="text-center"><?=number_format($get_Today_trans_in)?> (<?=$depositCountToday?>)</td>
								<td class="text-center"><?=number_format($get_Today_trans_out)?> (<?=$withdrawToday?>)</td>
								<td class="text-center <? if($user_today_income < 0){ echo "pepe-red"; }elseif($user_today_income == 0){ }else{ echo "pepe-blue"; } ?>"><?=number_format($user_today_income)?></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card card-body" style="padding:0";>
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
								<td class="text-center"><?=number_format($totalDeposit)?> (<?=$depositCount?>)</td>
								<td class="text-center"><?=number_format($totalWithdraw)?> (<?=$withdrawAll?>)</td>
								<td class="text-center <? if($user_total_income < 0){ echo "pepe-red"; }elseif($user_total_income == 0){ }else{ echo "pepe-blue"; } ?>"><?=number_format($user_total_income)?></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card card-body" style="padding:0";>
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
								<td class="text-center"><?=number_format($get_UserBetInfo["todayBetcnt"])?></td>
								<td class="text-center"><?=number_format($get_UserBetInfo["todayBetmoney"])?></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card card-body" style="padding:0";>
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
								<td class="text-center"><?=number_format($get_UserBetInfo["totalBetcnt"])?></td>
								<td class="text-center"><?=number_format($get_UserBetInfo["totalBetmoney"])?></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card card-body" style="padding:0";>
					<div class="table-responsive">
						<table class="table table-bordered table-striped table-centered member-table">
							<thead>
							<tr>
								<th class="text-center">Coin</th>
								<th class="text-center">Address</th>
								<th class="text-center">Scan</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td class="text-center">ETH</td>
								<td class="text-center"><?=$ethwallet?></td>
								<td class="text-center"><a target="_blank" href="<?=$wallet1?>">Scan</a></td>
							</tr>
							<tr>
								<td class="text-center">NEM</td>
								<td class="text-center"><?=$nemwallet?></td>
								<td class="text-center"><a target="_blank" href="<?=$wallet2?>">Scan</a></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card ">
					<div class="card-body" style="padding-bottom: 27px;">
						<fieldset>
							<legend class="font-weight-semibold text-uppercase font-size-sm">
								회원 메모:
								<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#member-note">
									<i class="icon-circle-down2"></i>
								</a>
							</legend>
							<div class="collapse show" id="member-note">
								<form id="membernoteform" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="memo-jobmode" value="addmemo">
									<input type="hidden" name="membernum" class="memo-userid" value="<?=$sermbno?>">
									<div class="form-group">
										<!-- <label>회원 메모:</label> -->
										<textarea name="memo" rows="14" cols="5" class="memo-content form-control" placeholder="메모가 없습니다."><?=$Rs["iu_memo"]?></textarea>
									</div>
									<div class="text-right">
										<button type="submit" class="memo-settings-button btn btn-outline-primary d-none">수정 <i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xl-6">
				<div class="card ">
					<div class="card-header">
						<h4>입금내역/출금내역</h4>
					</div>
					<div class="card-body" style="overflow-x: scroll; height: 550px;">
						<div class="table-responsive">
							<table class="table text-nowrap bet-history" id="depositable_new_<?=$sermbno?>">
								<thead>
								<tr>
									<th class="text-center">총판</th>
									<th class="text-center">아이디</th>
									<th class="text-center">금액</th>
									<th class="text-center">포인트</th>
									<th class="text-center">보유금</th>
									<th class="text-center">입/출금</th>	
									<th class="text-center">내역</th> 
									<th class="text-center">처리일시</th>
								</tr>
								</thead>
								<tbody>
									<?php
										$sql = "Select
										*
									from
										info_transaction as a
									left join info_user as b on
										a.it_target = b.id
									where
										a.it_target = {$sermbno}
										and (a.it_status = 2)
										and (a.it_proceed = 'user'
											OR a.it_proceed = 'gwallet-user'
											OR a.it_proceed = 'shopcoin-user')
										and (a.it_type = 'withdraw'
											OR a.it_type = 'deposit')
										and (a.it_reason = 'GWALLET WITHDRAW' 
											OR a.it_reason = 'GWALLET DEPOSIT' 
											OR a.it_reason IS NULL
											OR a.it_reason = 'SHOP COIN DEPOSIT')
									order by
										a.it_reg_datetime desc";
										$result = $mysqli->query($sql);
										while($roww = $result->fetch_array()){
											if($roww['it_type'] == "deposit"){
												$type = "입금";
												$color = "blue-tetext";
												$sign = '<i class="icon-plus3"></i>&nbsp;';
											}
											else{
												$type = "출금";
												$color = "red-tetext";
												$sign = '<i class="icon-minus3"></i>&nbsp;';
											}
											// if($roww["it_proceed"] == 'gwallet-user'){
											// 	$type = $roww["coinType"];
											// }

											$partnerid = $Rs['iu_partner'];
											$pnamesql = "Select ia_name FROM info_agent WHERE ia_idx = '$partnerid'";
											$pnameresult    = $mysqli->query($pnamesql);
											$pname            = $pnameresult->fetch_array();
											$pname2 = $pname['ia_name'];
									?>
										<tr>
											<td align="center"><?=$pname2?></td>
											<td align="center"><?=$roww["username"]?></td>
											<td align="center"><span class="<?=$color?>"><?=$sign.number_format($roww["it_amount"])?>원</span></td>
											
											<td align="center"><?=number_format($roww["it_point"])?>P</td>
											<td align="center"><?=number_format($roww["it_after_balance"])?>원</td>
											<td align="center"><span class="<?=$color?>"><?=$type?></span></td>
											<td align="center"><span class="<?=$color?>"><?php 
												if($roww['it_reason']=="SHOP COIN DEPOSIT"){ 
													echo '샵코인'; 
												} else if($roww['it_reason']=="CASINO DEPOSIT"){ 
													echo '카지노이동';
												} else if($roww['it_reason'] == "GWALLET WITHDRAW"){ 
													echo "지월렛"; 
												} else {
													echo "은행";
												}
												?></span></td>
											<td align="center"><?=$roww["it_update_datetime"] == NULL ? '<span class="t-wait">처리대기</span>' : $roww["it_update_datetime"]?></td>
										</tr>
									<?}?>
								</tbody>
							</table>
						</div>   
					</div>
				</div>
			</div>
			<div class="col-xl-6">
				<div class="card ">
					<div class="card-header">
						<h4>회원 머니로그</h4>
					</div>
					<div class="card-body" style="overflow-x: scroll; height: 550px;">
						<div class="table-responsive">
							<table class="table text-nowrap" id="moneylog_new_<?=$sermbno?>">
								<thead>
								<tr>
									<th class="text-center">총판</th>
									<th class="text-center">아이디</th>
									<th class="text-center">금액</th>
									<th class="text-center">보너스</th>
									<th class="text-center">보유금</th>
									<th class="text-center">금액</th>
									<th class="text-center">내역</th>
									<th class="text-center">날짜</th>
								</tr>
								</thead>
								<tbody>
								<?
									$mbno= intval($Rs['id']);
									$moneylog = "select * from info_transaction a left join info_user as b on
									a.it_target = b.id where it_target={$sermbno} and it_type IN ('withdraw','deposit','point') and (it_status=2 or it_status=5) 
									and (it_reason IS NULL OR (it_reason IN ('CASINO WITHDRAW','CASINO DEPOSIT','GWALLET DEPOSIT','GWALLET WITHDRAW', 'SHOP COIN DEPOSIT', '포인트전환'))) order by it_update_datetime desc limit 100";
									$mlres = $mysqli->query($moneylog);
								?>
								<?while($roww=$mlres->fetch_array()){
										if($roww['it_type'] == "deposit"){
											$color = "blue-tetext";
											$sign = '<i class="icon-plus3"></i>&nbsp;';
											if($roww['it_reason'] == "" || $roww['it_reason'] == "GWALLET DEPOSIT" || $roww['it_reason'] == "SHOP COIN DEPOSIT"){
												$type = "입금";
											}
											else{
												$type = "게임환전";
											}
										}
										else if($roww['it_type'] == "withdraw"){
											$color = "red-tetext";
											$sign = '<i class="icon-minus3"></i>&nbsp;';
											if($roww['it_reason'] == "" || $roww['it_reason'] == "GWALLET WITHDRAW"){
												$type = "출금";
											}
											else{
												$type = "게임충전";
											}
										}
										else{
											$type = "포인트전환";
											$color = "blue-tetext";
											$sign = '<i class="icon-minus3"></i>&nbsp;';
										}
										// if($roww["it_proceed"] == 'gwallet-user'){
										// 	$type = $roww["coinType"];
										// }

										$partnerid = $Rs['iu_partner'];
										$pnamesql = "Select ia_name FROM info_agent WHERE ia_idx = '$partnerid'";
										$pnameresult    = $mysqli->query($pnamesql);
										$pname            = $pnameresult->fetch_array();
										$pname2 = $pname['ia_name'];
									?>
									<tr>

										<td align="center"><?=$pname2?></td>
										<td align="center"><?=$roww["username"]?></td>
										<td align="center"><span class="<?=$color?>">
											<?php
											if($roww['it_type'] == "withdraw" || $roww['it_type'] == "deposit"){
												echo $sign.number_format($roww["it_amount"]);
											}
											else{
												echo 0;
											}
											?>원</span></td>
										<td align="center">
										<?php
											if($roww['it_type'] == "withdraw" || $roww['it_type'] == "deposit"){
												echo number_format($roww['it_point']);
											}
											else{
												echo number_format($roww['it_amount']);
											}
											?>
										</td>
										<td align="center"> <?=number_format($roww["it_after_balance"])?> </td>
										<td align="center"><span class="<?=$color?>"><?=$type?></span></td>
										<td align="center"><span class="<?=$color?>"> 
											<?
												if($roww["it_reason"] == "cancel bet by user"){
													echo "베팅 취소";
												}else{
													if($roww["it_reason"] == "SHOP COIN DEPOSIT"){
														echo '샵코인';
													}
													else if($roww['it_reason'] == "CASINO DEPOSIT"){
														echo '카지노';
													}
													else if($roww['it_reason'] == "CASINO WITHDRAW"){
														echo '스포츠';
													}
													else if($roww['it_reason'] == "GWALLET WITHDRAW"){
														echo "지월렛";
													}
													else if($roww['it_reason'] == ""){
														echo "은행";
													}
													else if($roww['it_reason'] == "포인트전환"){
														echo "포인트전환";
													}
													else{
														echo "계좌출금";
													}
												}
											?></span>
										</td>
										<td align="center"> <?=$roww["it_update_datetime"]?> </td>
									</tr>
								<?}?>
								</tbody>
							</table>
						</div>   
					</div>
				</div>
			</div>
			<div class="col-xl-6">
				<div class="card ">
					<div class="card-header">
						<h4>베팅 로그</h4>
					</div>
					<div class="card-body" style="overflow-x: scroll; height: 550px;">
						<div class="table-responsive">
						<?php
							$bett_juls01 = "with newbetinfo as (
								select
									mbno,
									num,
									bet_time,
									'counterdate' as counterdate,
									bet_amount,
									bet_result,
									cash_before,
									cash_after,
									'dt' as datetime,
									'bonus' as bonus,
									'conversion' as conversion,
									processedDate,
									bet_code,
									bet_oddtotal,
									is_realtime,
									folderCount,
									folderOption,
									bet_rowcnt,
									'betinfo' as from_table
								from
									user_bet_infos
								where
									mbno = '{$sermbno}'
								UNION
								select
									it_target as mbno,
									it_idx as num,
									it_update_datetime as bet_time,
									(select it_reg_datetime from info_transaction it where it_target = '{$sermbno}' and it_type = 'point' order by  it_reg_datetime desc limit 1) as counterdate,
									it_amount as bet_amount,
									'transaction' as bet_result,
									(
									select
										CONCAT(it_amount, '_' , it_update_datetime)
									from
										info_transaction
									where
										it_target = '{$sermbno}'
										and it_reg_datetime > date_format(bet_time, '%Y-%m-%d %H:%i:%s')
											and it_status = 2
											and it_type = 'withdraw'
											and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user')
												and it_reason IS NULL
											order by
												it_reg_datetime asc
											limit 1) as cash_before,
									it_after_balance as cash_after,
									it_reg_date as datetime,
									it_point as bonus,
									(
									select
										SUM(it_after_balance)
									from
										info_transaction
									where
										it_target = '{$sermbno}'
										and it_reg_datetime >= date_format(bet_time, '%Y-%m-%d %H:%i:%s')
										and it_reg_datetime <= date_format(counterdate, '%Y-%m-%d %H:%i:%s')
										and it_type = 'point'
										order by
											it_reg_datetime desc
										limit 1) as conversion,
									'processdate' as processedDate,
									'betcode' as bet_code,
									'oddtotal' as bet_oddtotal,
									'realtime' as is_realtime,
									'folderCount' as folderCount,
									'folderOption' as folderOption,
									'bet_rowcnt' as bet_rowcnt,
									'infotransaction' as from_table
								from
									info_transaction
								where
									it_target = '{$sermbno}'
									and it_type = 'deposit'
									and it_status = 2
									and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user')
									and (it_reason IS NULL
										OR it_reason = 'GWALLET DEPOSIT'
										OR it_reason = 'SHOP COIN DEPOSIT')
								)
								select
									*
								from
									newbetinfo
								order by
									bet_time desc";
							$bett_result_juls01 = $mysqli -> query($bett_juls01);
							$p_count_juls01 = mysqli_num_rows($bett_result_juls01);
					?>
						<table class="table text-nowrap bet-history" id="betlogtable_new_<?=$sermbno?>">
							<thead>
								<tr>
									<th class="text-center">배팅시간</th>
									<th class="text-center">아이디</th>
									<th class="text-center">유형</th>
									<th class="text-center">시작보유금</th>
									<th class="text-center">베팅금액</th>
									<th class="text-center">베팅 후 보유금</th>
									<th class="text-center">당첨예상금액</th>
									<th class="text-center">승패</th>
									<th class="text-center">마감 후 보유금</th>
									<th class="text-center">처리시간</th>
								</tr>
							</thead>
							<tbody>
								<?php
									$blocktotal_juls01 = 0;
									$tmp_date_juls01 = "";
									$last_result_juls01 = "";
									$counter123_juls01 = 0;
									$counter1234_juls01 = 0;
									while($roww1_juls01 = $bett_result_juls01 -> fetch_array()){
										$betkey = $roww1_juls01["bet_code"];
										$sqlget 	= "select prematchtype from user_bet_list where bet_key='{$betkey}' limit 1";
										$resultget 	= $mysqli -> query($sqlget);
										$gs 		= $resultget->fetch_array();
										
										$prematchtype = $gs["prematchtype"];

										$bett23 = "select a.cash_after as settle_cash  from user_cash_historylist a where a.cash_move_type='입금' and ref_code = '$betkey' ";
										$bett_result23 = $mysqli -> query($bett23);
										$rs23 = $bett_result23->fetch_array();

										if($rs23["settle_cash"] == NULL || $rs23["settle_cash"] == ""){
											$cashAfterSettle = $roww1_juls01["cash_after"];
										}else{
											$cashAfterSettle = intval($rs23["settle_cash"]);
										}

										$bettype 	= "";
										$oddtotal 	= 0;
										if($roww1_juls01["is_realtime"] == 0){
											$bettype 	= "prematch";	
											$betcode 	=	$roww1_juls01["bet_code"];
											$oddsql 	= "select EXP(SUM(LOG(myBetVals))) as oddtotal from user_bet_list where bet_key='{$betcode}' and (bet_result <> 'cancel' AND bet_result <> 'cancel-user')";
											$oddresult 	= $mysqli->query($oddsql);
											$oddrs 		= $oddresult->fetch_array();
											$oddtotal 	= $oddrs["oddtotal"];

											$mainnum = $roww1_juls01['num'];

											$sqlSer_j= "SELECT * FROM user_bet_infos where num='{$mainnum}' and bet_code='{$betkey}'";
											$resultMain_j = $mysqli -> query($sqlSer_j);
											$RsMain_j = $resultMain_j -> fetch_array();
											
											//$sql="Select b.homeFinalScore, b.awayFinalScore, a.* from user_bet_list as a left join game_results as b on a.match_idx=b.game_no where bet_key='{$betCode}' order by num asc";
											$sql_j = "Select c.game_section, c.league_idx, b.homeFinalScore, b.awayFinalScore, a.*, c.league_korname, c.league_countrycode, c.matchDateTime as originalDate,
											(select team_name_kor_new from teams_list where team_id=c.home_idx and sports_id=c.game_section limit 1) as newKorHome, 
											(select team_name_kor_new from teams_list where team_id=c.away_idx and sports_id=c.game_section limit 1) as newKorAway  
											from user_bet_list as a
											left join game_results as b on a.match_idx=b.game_no 
											left join game_list c on a.match_idx=c.game_no
											where bet_key='{$betkey}' order by num asc";
											$result_j	= $mysqli -> query($sql_j);
											$Subrow_cnt = $result_j -> num_rows;
											if ($Subrow_cnt > 0 ) {
												$folderCount 	= $RsMain_j["folderCount"];
												$folderOdds	 	= $RsMain_j["folderOption"];
												$betCount 		= $RsMain_j["bet_rowcnt"];
												$cancelMatch 	= 0;
												$betOddNewTotal = 1;
												$betOddNewTotal = 1;
												$result_j 	= $mysqli -> query($sql_j);
												while( $Rs_j = $result_j -> fetch_array() ) {
													if($Rs_j["bet_result"] == "cancel" || $Rs_j["bet_result"] == "cancel-user"){
													}else{
														$betOddNewTotal *= $Rs_j["myBetVals"];
													}
													$counter123++;
												}

												if($folderCount > 0){
													$betCount = $betCount - $cancelMatch;
													if($betCount >= $folderCount){
														$betOddNewTotal = $betOddNewTotal * $folderOdds;
													}
												}

												$betOddNewTotal 	= numberPrecision($betOddNewTotal,2);
											}

											$betOddNewTotal = $oddtotal;
										}  
										if($roww1_juls01["is_realtime"] == 3){
											$bettype = "realtime";
											$oddtotal 	= $roww1_juls01["bet_oddtotal"];

											$betOddNewTotal = $oddtotal;
										}   
										if($roww1_juls01["is_realtime"] == 2){
											$bettype = "minigame";
											$oddtotal 	= $roww1_juls01["bet_oddtotal"];

											$betOddNewTotal = $oddtotal;
										}   

										$textcolor = "black";
										if($roww1_juls01["bet_result"] == "lost"){
											$textcolor = "blue";
										}else{
											if($roww1_juls01["bet_result"] == "win"){
												$textcolor = "red";
											}
										}
										
										$newoddtotal1 = $oddtotal;
										if($newoddtotal1 == 0){
											$newoddtotal2 = 1;
										}
										else{
											$newoddtotal2 = $betOddNewTotal;
										}
										$estimated = $newoddtotal2 * $roww1_juls01['bet_amount'];

										if($roww1_juls01["from_table"] == "betinfo"){
									
											echo '<tr tcd="'.$roww1_juls01["num"].'" id="trjulsparent_'.$roww1_juls01["num"].'">';
											echo '<td align="center" '.$ONC.'>'.$roww1_juls01["bet_time"].'</td>';
											echo '<td align="center" '.$ONC.'>'.$Rs["username"].'</td>';
											if($roww1_juls01["is_realtime"] == 0){
												echo '<td align="center" '.$ONC.'>스포츠</td>'; 
												$newcount = $counter123;
											}
											else if($roww1_juls01["is_realtime"] == 3){
												echo '<td align="center" '.$ONC.'>라이브</td>';
												$sqlreal = "Select * from game_bet_info_realtime as a where bet_code='{$betkey}'";
												$resultreal = $mysqli -> query($sqlreal);
												while( $Rsreal = $resultreal-> fetch_array() ) {
													$counter1234++;
												}
												$newcount = $counter1234;
											}
											else{
												echo '<td align="center">미니게임</td>';
												$newcount = 1;
											}
											echo '<td align="center">'.number_format($roww1_juls01['cash_before']).'</td>';
											echo '<td align="center" '.$ONC.'>'.number_format($roww1_juls01["bet_amount"]).'</td>';
											echo '<td align="center">'.number_format($roww1_juls01['cash_after']).'</td>';
											if($roww1_juls01["bet_result"] == 'win'){
												echo '<td align="center" '.$ONC.'>'.number_format($estimated).'</td>';
											}
											else{
												echo '<td align="center" '.$ONC.'>0</td>';
											}
											echo '<td align="center" '.$ONC.'>';
											if($roww1_juls01["bet_result"] == 'win'){
												echo '<text class="red-tetext"> 승리</text>';
												$blocktotal += $roww1_juls01["bet_amount"];
												$newcashAfterSettle = $cashAfterSettle;
											}elseif($roww1_juls01["bet_result"] == 'lost'){
												echo '<text class="blue-tetext"> 패배</text>';
												$blocktotal += $roww1_juls01["bet_amount"];
												$newcashAfterSettle = $cashAfterSettle;
											}elseif($roww1_juls01["bet_result"] == 'draw'){
												echo '<text class="green-tetext"> 취소</text>';
												$blocktotal += $roww1_juls01["bet_amount"];
												$newcashAfterSettle = $cashAfterSettle + $roww1_juls01['bet_amount'];
											}elseif($roww1_juls01["bet_result"] == 'cancel'){
												echo '<text class="green-tetext"> 적특 </text>';
												$newcashAfterSettle = $cashAfterSettle + $roww1_juls01['bet_amount'];
											}elseif($roww1_juls01["bet_result"] == 'cancel-user'){
												echo '<text class="red-tetext">유저취소 </text>';
												$newcashAfterSettle = $cashAfterSettle + $roww1_juls01['bet_amount'];
											}else{
												echo '<text>'.$roww1_juls01["bet_result"].'</text>';
												$newcashAfterSettle = $cashAfterSettle;
												$blocktotal += $roww1_juls01["bet_amount"];
											}
											echo '</td>';
											echo '<td align="center" '.$ONC.'>'.number_format($newcashAfterSettle).'</td>';
											echo '<td align= "center" '.$ONC.'>'.$roww1_juls01["processedDate"].'</td>';
											echo '</tr>';
		
											$last_result = $roww1_juls01["bet_result"];
											$counter123 = 0;
											$counter1234 = 0;
										}
								}
								?>
							</tbody>
						</table>
						</div>   
					</div>
				</div>
			</div>
			<div class="col-xl-6">
				<div class="card ">
					<div class="card-header">
						<h4>회원 포인트 로그</h4>
					</div>
					<div class="card-body" style="overflow-x: scroll; height: 550px;">
						<div class="table-responsive">
							<table class="table " id="pointlog_new_<?=$sermbno?>">
								<thead>
								<tr>
									<th class="text-center">아이디</th>
									<th class="text-center">입/출금</th>
									<th class="text-center">금액</th>
									<th class="text-center">보유금</th>
									<th class="text-center ">내역</th>
									<th class="text-center">날짜</th>
								</tr>
								</thead>
								<tbody>
								<?foreach($Plist as $item){?>
									<tr>
										<td align="center"> <?=$Rs["username"]?></td>
										<td align="center">
										<?
											if($item["ipl_info"] == "포인트 전환"){
												echo '<i class="icon-minus3"></i> <text class="red-tetext"> 차감 </text>';
											}else{
												if($item["pointType"] == 'manager-add'){
													echo '<i class="icon-plus3"></i> <text class="blue-tetext"> 관리자 지급 </text>';
												}elseif($item["pointType"] == 'manager-deduct'){
													echo '<i class="icon-minus3"></i> <text class="red-tetext"> 관리자 차감 </text>';
												}else{
													if($item["ipl_info"] == "rollback"){
														echo '<i class="icon-minus3"></i> <text class="red-tetext"> 관리자 차감 </text>';
													}else{
														echo '<i class="icon-plus3"></i>  <text class="blue-tetext"> 증감 </text>';
													}
												}
											}
										?>
										</td>
										<td> <?=number_format($item["ipl_amount"])?>P</td>
										<td><?=number_format($item["ipl_after"])?>P</td>
										<td align="center" style="font-size: 10px"><?=$item["ipl_info"]?></td>
										<td align="center" class="text-nowrap"><?=$item["ipl_datetime"]?></td>
									</tr>
								<?}?>
								</tbody>
							</table>
						</div>   
					</div>
				</div>
			</div>
			<div class="col-xl-6" style="display: none;">
				<div class="card ">
					<div class="card-body">
						<fieldset>
							<legend class="font-weight-semibold text-uppercase font-size-sm">
								<div class="legend-title">
									<span>해외스포츠</span>
									<div class="form-group form-check form-check-right form-check-switchery">
										<label class="form-check-label">
											<input type="checkbox" name="iu_custom_prematch_eu" class="iu_custom_prematch_eu form-check-input-switchery" data-fouc <?=$Rs["iu_custom_prematch_eu"] == 1 ? 'checked' : ''?> value="1">
										</label>
									</div>
									<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#prematcheu">
										<i class="icon-circle-down2"></i>
									</a>
								</div>
							</legend>
							<div class="collapse show" id="prematcheu">
								<form id="membernoteform" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="prematch-jobmode" value="prematcheusettings">
									<input type="hidden" name="membernum" class="prematch-userid"  value="<?=$sermbno?>">
									<div class="form-group">
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최소 배팅금액</button>
											</span>
												<input type="text" name="min" class="form-control text-right prematch-minbet" placeholder="최소 배팅금액" value="<?=$Rs["iu_min_bet"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 배팅금액</button>
											</span>
												<input type="text" name="max" class="form-control text-right prematch-maxbet" placeholder="최대 배팅금액" value="<?=$Rs["iu_max_bet"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 당첨금액</button>
											</span>
												<input type="text" name="max_win" class="form-control text-right prematch-maxwin" placeholder="최대 당첨금액" value="<?=$Rs["iu_max_win"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
									</div>
									<div class="text-right">
										<button type="submit" class="prematch-settings-button btn btn-outline-primary d-none">수정<i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<div class="col-xl-6" style="display: none;">
				<div class="card ">
					<div class="card-body">
						<fieldset>
							<legend class="font-weight-semibold text-uppercase font-size-sm">
								<div class="legend-title">
									<span>국내스포츠</span>
									<div class="form-group form-check form-check-right form-check-switchery">
										<label class="form-check-label">
											<input type="checkbox" name="iu_custom_prematch_kor" class="form-check-input-switchery" data-fouc <?=$Rs["iu_custom_prematch_kor"] == 1 ? 'checked' : ''?> value="1">
										</label>
									</div>
									<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#prematchkr">
										<i class="icon-circle-down2"></i>
									</a>
								</div>
							</legend>
							<div class="collapse show" id="prematchkr">
									<form id="membernoteform" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="prematchkor-jobmode" value="prematchkorsettings">
									<input type="hidden" name="membernum" class="prematchkor-userid" value="<?=$sermbno?>">
									<div class="form-group">
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최소 배팅금액</button>
											</span>
												<input type="text" name="min" class="prematchkor-minbet form-control text-right" placeholder="최소 배팅금액" value="<?=$Rs["iu_min_bet_prematch_kor"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 배팅금액</button>
											</span>
												<input type="text" name="max" class="prematchkor-maxbet form-control text-right" placeholder="최대 배팅금액" value="<?=$Rs["iu_max_bet_prematch_kor"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 당첨금액</button>
											</span>
												<input type="text" name="max_win" class="prematchkor-maxwin form-control text-right" placeholder="최대 당첨금액" value="<?=$Rs["iu_max_win_prematch_kor"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
									</div>
									<div class="text-right">
										<button type="submit" class="prematchkor-settings-button btn btn-outline-primary d-none">수정<i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<div class="col-xl-6" style="display: none;">
				<div class="card ">
					<div class="card-body">
						<fieldset>
							<legend class="font-weight-semibold text-uppercase font-size-sm">
								<div class="legend-title">
									<span>미니게임</span>
									<div class="form-group form-check form-check-right form-check-switchery">
										<label class="form-check-label">
											<input type="checkbox" name="iu_custom_minigame" class="iu_custom_minigame form-check-input-switchery" data-fouc <?=$Rs["iu_custom_minigame"] == 1 ? 'checked' : ''?> value="1">
										</label>
									</div>
									<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#minigame">
										<i class="icon-circle-down2"></i>
									</a>
								</div>
							</legend>
							<div class="collapse show" id="minigame">
								<form id="membernoteform" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="minigame-jobmode" value="minigamesettings">
									<input type="hidden" name="membernum" class="minigame-userid" value="<?=$sermbno?>">
									<div class="form-group">
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최소 배팅금액</button>
											</span>
												<input type="text" name="min" class="minigame-minbet form-control text-right" placeholder="최소 배팅금액" value="<?=$Rs["iu_min_bet_minigame"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 배팅금액</button>
											</span>
												<input type="text" name="max" class="minigame-maxbet form-control text-right" placeholder="최대 배팅금액" value="<?=$Rs["iu_max_bet_minigame"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 당첨금액</button>
											</span>
												<input type="text" name="max_win" class="minigame-maxwin form-control text-right" placeholder="최대 당첨금액" value="<?=$Rs["iu_max_win_minigame"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
									</div>
									<div class="text-right">
										<button type="submit" class="minigame-settings-button btn btn-outline-primary d-none">수정<i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<div class="col-xl-6" style="display: none;">
				<div class="card ">
					<div class="card-body">
						<fieldset>
							<legend class="font-weight-semibold text-uppercase font-size-sm">
								<div class="legend-title">
									<span>라이브</span>
									<div class="form-group form-check form-check-right form-check-switchery">
										<label class="form-check-label">
											<input type="checkbox" name="iu_custom_live" class="iu_custom_live form-check-input-switchery" data-fouc <?=$Rs["iu_custom_live"] == 1 ? 'checked' : ''?> value="1">
										</label>
									</div>
									<a href="#" class="float-right text-default" data-toggle="collapse" data-target="#live">
										<i class="icon-circle-down2"></i>
									</a>
								</div>
							</legend>
							<div class="collapse show" id="live">
								<form id="membernoteform" action="/admin/member_pass_change.php" method="post">
									<input type="hidden" name="jobmode" class="live-jobmode" value="livesettings">
									<input type="hidden" name="membernum" class="live-userid" value="<?=$sermbno?>">
									<div class="form-group">
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최소 배팅금액</button>
											</span>
												<input type="text" name="min" class="live-minbet form-control text-right" placeholder="최소 배팅금액" value="<?=$Rs["iu_min_bet_live"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 배팅금액</button>
											</span>
												<input type="text" name="max" class="live-maxbet form-control text-right" placeholder="최대 배팅금액" value="<?=$Rs["iu_max_bet_live"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
											<span class="input-group-prepend">
												<button class="btn btn-light zero-margin" type="button">최대 당첨금액</button>
											</span>
												<input type="text" name="max_win" class="live-maxwin form-control text-right" placeholder="최대 당첨금액" value="<?=$Rs["iu_max_win_live"]?>">
												<span class="input-group-append">
												<span class="input-group-text">원</span>
											</span>
											</div>
										</div>
									</div>
									<div class="text-right">
										<button type="submit" class="live-settings-button btn btn-outline-primary d-none">수정<i class="icon-paperplane ml-2"></i></button>
									</div>
								</form>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="monelog" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">회원 머니로그</h6>
						
						<div class="new-date">
							<div class="date-from">
								<input type="text" name="serchdatest" class="form-control" id="serchdatest8" value="<?=$dateserSt?>" onchange="dateFromTo8()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen8" value="<?=$dateserEn?>" onchange="dateFromTo8()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToMoneyLog()">검색</button>

									<input type="text" name="date" class="form-control moneylog-daterange" value="<?=date("2021-11-11 00:00:00")." - ".date("Y-m-d 23:59:59")?>" id="datevalinput_6" style="visibility: hidden;" readonly >
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table text-nowrap" id="moneylog_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center">아이디</th>
								<th class="text-center">총판코드</th>
								<th class="text-center">입/출금</th>
								<th class="text-center">금액</th>
								<th class="text-center">보너스</th>
								<th class="text-center">보유금</th>
								<th class="text-center">내역</th>
								<th class="text-center">날짜</th>
							</tr>
							</thead>
							<tbody>
							<?
								$mbno= intval($Rs['id']);
								$moneylog = "select * from info_transaction where it_target={$mbno} and (it_type='withdraw' OR it_type='deposit' OR it_type='point') and (it_status=2 or it_status=5) order by it_update_datetime desc limit 100";
								$mlres = $mysqli->query($moneylog);
							?>
							<?while($roww=$mlres->fetch_array()){?>
								<tr>
									<td align="center"> <?=$Rs["username"]?></td>
									<td align="center"> <?=$Rs["real_code"]?></td>
									<td align="center"><? if($roww["it_type"] == 'deposit'){?>
											<?
												if($roww["it_reason"] == "CASINO WITHDRAW"){
													echo '<i class="icon-plus3"></i> <text class="blue-tetext">'.$roww["casino_name"].'</text>';
												}else{
													if($roww["it_proceed"] == 'gwallet-user'){
														echo '<i class="icon-plus3"></i> <text class="blue-tetext">'.$roww["coinType"].' 입금</text>';
														
													}elseif($roww["it_proceed"] == 'manager'){
														if($roww["it_reason"] == "rollback"){
															echo '<i class="icon-minus3"></i> <text class="red-tetext">출금 승인취소</text>';
														}elseif($roww["it_reason"] == "cancel bet by user"){
															echo '<i class="icon-plus3"></i> <text class="blue-tetext">베팅 취소</text>';
														}else{
															echo '<i class="icon-plus3"></i> <text class="blue-tetext">관리자 지급</text>';
														}
													}else{
														echo '<i class="icon-plus3"></i> <text class="blue-tetext">은행입금</text>';
													}
												} 
											?>
										<?}elseif($roww["it_type"] == 'point'){?>
											<?
												echo '<i class="icon-plus3"></i> <text class="blue-tetext">'.$roww["it_reason"].'</text>'; 
											?>
										<?}else{?>
											<?
												if($roww["it_reason"] == "CASINO DEPOSIT"){
													echo '<i class="icon-plus3"></i> <text class="red-tetext">'.$roww["casino_name"].'</text>';
												}else{
													if($roww["it_proceed"] == 'gwallet-user'){
														echo '<i class="icon-minus3"></i> <text class="red-tetext">'.$roww["coinType"].' 출금</text>';
													}elseif($roww["it_proceed"] == 'manager'){
														if($roww["it_reason"] == "rollback"){
															echo '<i class="icon-minus3"></i> <text class="red-tetext">입금 승인취소</text>';
														}else{
															echo '<i class="icon-minus3"></i> <text class="red-tetext">관리자 차감</text>';
														}
													}else{
														echo '<i class="icon-minus3"></i> <text class="red-tetext">은행출금</text>';
													}
												} 
											?>
										<?}?> 
									</td>
									<td align="center">
										<?php
										if($roww['it_type'] == "withdraw" || $roww['it_type'] == "deposit"){
											echo number_format($roww['it_amount']);
										}
										else{
											echo 0;
										}
										?>
									</td>
									<td align="center">
									<?php
										if($roww['it_type'] == "withdraw" || $roww['it_type'] == "deposit"){
											echo number_format($roww['it_point']);
										}
										else{
											echo number_format($roww['it_amount']);
										}
										?>
									</td>
									<td align="center"> <?=number_format($roww["it_after_balance"])?> </td>
									<td align="center"> 
										<?
											if($roww["it_reason"] == "cancel bet by user"){
												echo "베팅 취소";
											}else{
												echo $roww["it_reason"];
											}
										?>
									</td>
									<td align="center"> <?=$roww["it_update_datetime"]?> </td>
								</tr>
							<?}?>
							</tbody>
						</table>
					</div>            
				</div>
			</div>
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">회원 포인트 로그</h6>
						<div class="new-date">
							<div class="date-from">
								<input type="text" name="serchdatest" class="form-control" id="serchdatest9" value="<?=$dateserSt?>" onchange="dateFromTo9()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen9" value="<?=$dateserEn?>" onchange="dateFromTo9()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToPointLog()">검색</button>

									<input style="visibility: hidden;" type="text" name="date" class="form-control pointlog-daterange" id="datevalinput_7" value="<?=date("2021-11-11 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
								</div>
							</div>
						</div>
					</div>

					<div class="table-responsive">
						<table class="table " id="pointlog_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center">아이디</th>
								<th class="text-center">입/출금</th>
								<th class="text-center">금액</th>
								<th class="text-center">보유금</th>
								<th class="text-center ">내역</th>
								<th class="text-center">날짜</th>
							</tr>
							</thead>
							<tbody>
							<?foreach($Plist as $item){?>
								<tr>
									<td align="center"> <?=$Rs["username"]?></td>
									<td align="center">
									<?
										if($item["ipl_info"] == "포인트 전환"){
											echo '<i class="icon-minus3"></i> <text class="red-tetext"> 차감 </text>';
										}else{
											if($item["pointType"] == 'manager-add'){
												echo '<i class="icon-plus3"></i> <text class="blue-tetext"> 관리자 지급 </text>';
											}elseif($item["pointType"] == 'manager-deduct'){
												echo '<i class="icon-minus3"></i> <text class="red-tetext"> 관리자 차감 </text>';
											}else{
												if($item["ipl_info"] == "rollback"){
													echo '<i class="icon-minus3"></i> <text class="red-tetext"> 관리자 차감 </text>';
												}else{
													echo '<i class="icon-plus3"></i>  <text class="blue-tetext"> 증감 </text>';
												}
											}
										}
									?>
									</td>
									<td> <?=number_format($item["ipl_amount"])?>P</td>
									<td><?=number_format($item["ipl_after"])?>P</td>
									<td align="center" style="font-size: 10px"><?=$item["ipl_info"]?></td>
									<td align="center" class="text-nowrap"><?=$item["ipl_datetime"]?></td>
								</tr>
							<?}?>
							</tbody>
						</table>
					</div>              
				</div>
			</div>
		</div>
	</div>

	<div id="betlog" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">베팅 로그</h6>
						<input type="hidden" id="filtertype" value="desc" readonly/>

						<div class="new-date">
							<div class="date-from">
								<input type="text" name="serchdatest" class="form-control" id="serchdatest10" value="<?=$dateserSt?>" onchange="dateFromTo10()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen10" value="<?=$dateserEn?>" onchange="dateFromTo10()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToBetLog()">검색</button>

									<input style="visibility: hidden;" type="text" name="date" class="form-control betlog-daterange" value="<?=date("2021-11-11 00:00:00")." - ".date("Y-m-d 23:59:59")?>"  id="datevalinput_10" readonly>
								</div>
							</div>
						</div>
					</div>
					<? 
						
						$userid = $Rs['id'];
						$bett = "with newbetinfo as (
							select
								mbno,
								num,
								bet_time,
                                'counterdate' as counterdate,
								bet_amount,
								bet_result,
								cash_before,
								cash_after,
								'dt' as datetime,
								'bonus' as bonus,
								'conversion' as conversion,
								processedDate,
								bet_code,
								bet_oddtotal,
								is_realtime,
								folderCount,
								folderOption,
								bet_rowcnt,
								'betinfo' as from_table
							from
								user_bet_infos
							where
								mbno = '{$sermbno}'
							UNION
							select
								it_target as mbno,
								it_idx as num,
								it_update_datetime as bet_time,
                                (select it_reg_datetime from info_transaction it where it_target = '{$sermbno}' and it_type = 'point' order by  it_reg_datetime desc limit 1) as counterdate,
								it_amount as bet_amount,
								'transaction' as bet_result,
								(
								select
									CONCAT(it_amount, '_' , it_update_datetime)
								from
									info_transaction
								where
									it_target = '{$sermbno}'
									and it_reg_datetime > date_format(bet_time, '%Y-%m-%d %H:%i:%s')
										and it_status = 2
										and it_type = 'withdraw'
										and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user')
											and it_reason IS NULL
										order by
											it_reg_datetime asc
										limit 1) as cash_before,
								it_after_balance as cash_after,
								it_reg_date as datetime,
								it_point as bonus,
								(
								select
									SUM(it_after_balance)
								from
									info_transaction
								where
									it_target = '{$sermbno}'
									and it_reg_datetime >= date_format(bet_time, '%Y-%m-%d %H:%i:%s')
                                    and it_reg_datetime <= date_format(counterdate, '%Y-%m-%d %H:%i:%s')
									and it_type = 'point'
									order by
										it_reg_datetime desc
									limit 1) as conversion,
								'processdate' as processedDate,
								'betcode' as bet_code,
								'oddtotal' as bet_oddtotal,
								'realtime' as is_realtime,
								'folderCount' as folderCount,
								'folderOption' as folderOption,
								'bet_rowcnt' as bet_rowcnt,
								'infotransaction' as from_table
							from
								info_transaction
							where
								it_target = '{$sermbno}'
								and it_type = 'deposit'
								and it_status = 2
								and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user')
								and (it_reason IS NULL
									OR it_reason = 'GWALLET DEPOSIT'
									OR it_reason = 'SHOP COIN DEPOSIT')
							)
							select
								*
							from
								newbetinfo
							order by
								bet_time desc";
						$bett_result = $mysqli -> query($bett);
                        $p_count = mysqli_num_rows($bett_result);
					?>

					<div class="table-responsive">
						<table class="table text-nowrap bet-history" id="betlogtable_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">배팅시간</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">아이디</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">유형</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">베팅금액</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">당첨예상금액</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">승패</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">배당</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">베팅 수t</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">베팅 후 보유금</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">마감 후 보유금</th>
								<th class="text-center" onclick="filtertable()" style="cursor: pointer;">처리시간</th>
							</tr>
							</thead>
							<tbody id="betlogtable_<?=$sermbno?>_body">
							<? 
							$blocktotal = 0;
							$tmp_date = "";
							$last_result = "";
							$counter123 = 0;
							$counter1234 = 0;
							while($roww1 = $bett_result -> fetch_array()){



								$betkey = $roww1["bet_code"];
								$sqlget 	= "select prematchtype from user_bet_list where bet_key='{$betkey}' limit 1";
								$resultget 	= $mysqli -> query($sqlget);
								$gs 		= $resultget->fetch_array();
								
								$prematchtype = $gs["prematchtype"];

								$bett23 = "select a.cash_after as settle_cash  from user_cash_historylist a where a.cash_move_type='입금' and ref_code = '$betkey' ";
								$bett_result23 = $mysqli -> query($bett23);
								$rs23 = $bett_result23->fetch_array();

								if($rs23["settle_cash"] == NULL || $rs23["settle_cash"] == ""){
									$cashAfterSettle = $roww1["cash_after"];
								}else{
									$cashAfterSettle = intval($rs23["settle_cash"]);
								}



								$bettype 	= "";
								$oddtotal 	= 0;
								if($roww1["is_realtime"] == 0){
									$bettype 	= "prematch";	
									$betcode 	=	$roww1["bet_code"];
									$oddsql 	= "select EXP(SUM(LOG(myBetVals))) as oddtotal from user_bet_list where bet_key='{$betcode}' and (bet_result <> 'cancel' AND bet_result <> 'cancel-user')";
									$oddresult 	= $mysqli->query($oddsql);
									$oddrs 		= $oddresult->fetch_array();
									$oddtotal 	= $oddrs["oddtotal"];

									$mainnum = $roww1['num'];

									$sqlSer_j= "SELECT * FROM user_bet_infos where num='{$mainnum}' and bet_code='{$betkey}'";
									$resultMain_j = $mysqli -> query($sqlSer_j);
									$RsMain_j = $resultMain_j -> fetch_array();
									
									//$sql="Select b.homeFinalScore, b.awayFinalScore, a.* from user_bet_list as a left join game_results as b on a.match_idx=b.game_no where bet_key='{$betCode}' order by num asc";
									$sql_j = "Select c.game_section, c.league_idx, b.homeFinalScore, b.awayFinalScore, a.*, c.league_korname, c.league_countrycode, c.matchDateTime as originalDate,
									(select team_name_kor_new from teams_list where team_id=c.home_idx and sports_id=c.game_section limit 1) as newKorHome, 
									(select team_name_kor_new from teams_list where team_id=c.away_idx and sports_id=c.game_section limit 1) as newKorAway  
									from user_bet_list as a
									left join game_results as b on a.match_idx=b.game_no 
									left join game_list c on a.match_idx=c.game_no
									where bet_key='{$betkey}' order by num asc";
									$result_j	= $mysqli -> query($sql_j);
									$Subrow_cnt = $result_j -> num_rows;
									if ($Subrow_cnt > 0 ) {
										$folderCount 	= $RsMain_j["folderCount"];
										$folderOdds	 	= $RsMain_j["folderOption"];
										$betCount 		= $RsMain_j["bet_rowcnt"];
										$cancelMatch 	= 0;
										$betOddNewTotal = 1;
										$betOddNewTotal = 1;
										$result_j 	= $mysqli -> query($sql_j);
										while( $Rs_j = $result_j -> fetch_array() ) {
											if($Rs_j["bet_result"] == "cancel" || $Rs_j["bet_result"] == "cancel-user"){
											}else{
												$betOddNewTotal *= $Rs_j["myBetVals"];
											}
											$counter123++;
										}

										if($folderCount > 0){
											$betCount = $betCount - $cancelMatch;
											if($betCount >= $folderCount){
												$betOddNewTotal = $betOddNewTotal * $folderOdds;
											}
										}

										$betOddNewTotal 	= numberPrecision($betOddNewTotal,2);
									}

									$betOddNewTotal = $oddtotal;
								}  
								if($roww1["is_realtime"] == 3){
									$bettype = "realtime";
									$oddtotal 	= $roww1["bet_oddtotal"];

									$betOddNewTotal = $oddtotal;
								}   
								if($roww1["is_realtime"] == 2){
									$bettype = "minigame";
									$oddtotal 	= $roww1["bet_oddtotal"];

									$betOddNewTotal = $oddtotal;
								}   

								$textcolor = "black";
								if($roww1["bet_result"] == "lost"){
									$textcolor = "blue";
								}else{
									if($roww1["bet_result"] == "win"){
										$textcolor = "red";
									}
								}

                                



								
								$newoddtotal1 = $oddtotal;
                                if($newoddtotal1 == 0){
                                    $newoddtotal2 = 1;
                                }
                                else{
                                    $newoddtotal2 = $betOddNewTotal;
                                }

                                $estimated = $newoddtotal2 * $roww1['bet_amount'];

								$ONC = " onclick=\"showBetinfo2_".$sermbno."('". $roww1["num"]. "','". $roww1["bet_code"]."','".$bettype."')\" style='cursor:pointer' ";

								//withdrawal date
								$tmp_date = $roww1["cash_before"];

								if($roww1["from_table"] == "betinfo"){
									
									echo '<tr tcd="'.$roww1["num"].'" id="trjulsparent_'.$roww1["num"].'">';
									echo '<td align="center" '.$ONC.'>'.$roww1["bet_time"].'</td>';
									echo '<td align="center" '.$ONC.'>'.$Rs["username"].'</td>';
									if($roww1["is_realtime"] == 0){
										echo '<td align="center" '.$ONC.'>스포츠</td>'; 
										$newcount = $counter123;
									}
									else if($roww1["is_realtime"] == 3){
										echo '<td align="center" '.$ONC.'>라이브</td>';
										$sqlreal = "Select * from game_bet_info_realtime as a where bet_code='{$betkey}'";
										$resultreal = $mysqli -> query($sqlreal);
										while( $Rsreal = $resultreal-> fetch_array() ) {
											$counter1234++;
										}
										$newcount = $counter1234;
									}
									else{
										echo '<td align="center">미니게임</td>';
										$newcount = 1;
									}
									echo '<td align="center" '.$ONC.'>'.number_format($roww1["bet_amount"]).'</td>';
									if($roww1["bet_result"] == 'win'){
										echo '<td align="center" '.$ONC.'>'.number_format($estimated).'</td>';
									}
									else{
										echo '<td align="center" '.$ONC.'>0</td>';
									}
									echo '<td align="center" '.$ONC.'>';
									if($roww1["bet_result"] == 'win'){
										echo '<text class="red-tetext"> 승리</text>';
										$blocktotal += $roww1["bet_amount"];
										$newcashAfterSettle = $cashAfterSettle;
									}elseif($roww1["bet_result"] == 'lost'){
										echo '<text class="blue-tetext"> 패배</text>';
										$blocktotal += $roww1["bet_amount"];
										$newcashAfterSettle = $cashAfterSettle;
									}elseif($roww1["bet_result"] == 'draw'){
										echo '<text class="green-tetext"> 취소</text>';
										$blocktotal += $roww1["bet_amount"];
										$newcashAfterSettle = $cashAfterSettle + $roww1['bet_amount'];
									}elseif($roww1["bet_result"] == 'cancel'){
										echo '<text class="green-tetext"> 적특 </text>';
										$newcashAfterSettle = $cashAfterSettle + $roww1['bet_amount'];
									}elseif($roww1["bet_result"] == 'cancel-user'){
										echo '<text class="red-tetext">유저취소 </text>';
										$newcashAfterSettle = $cashAfterSettle + $roww1['bet_amount'];
									}else{
										echo '<text>'.$roww1["bet_result"].'</text>';
										$newcashAfterSettle = $cashAfterSettle;
										$blocktotal += $roww1["bet_amount"];
									}
									echo '</td>';
									echo '<td align="center" '.$ONC.'>'.numberPrecision($betOddNewTotal,2).'</td>';
									echo '<td align="center" '.$ONC.'>'.$newcount.'</td>';
									echo '<td align="center" '.$ONC.'>'.number_format($roww1["cash_after"]).'</td>';
									echo '<td align="center" '.$ONC.'>'.number_format($newcashAfterSettle).'</td>';
									echo '<td align= "center" '.$ONC.'>'.$roww1["processedDate"].'</td>';
									echo '</tr>';
									echo '<tr class="juls-inactive" tcd="'.$roww1["num"].'" id="trjuls_'.$roww1["num"].'">';
									echo '<td colspan="11">';
									if($bettype == "prematch"){
										betDetail_prematch($roww1["num"],$roww1["bet_code"]);
									}else{
										if($bettype == "minigame"){
											betDetail_minigame($roww1["num"],$roww1["bet_code"]);
										}else{
											betDetail_realtime($roww1["num"],$roww1["bet_code"]);
										}
									}
									echo '</td>';
									echo '<td style="display: none;"></td>';
                                    echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '<td style="display: none;"></td>';
									echo '</tr>';

									$last_result = $roww1["bet_result"];
									$counter123 = 0;
									$counter1234 = 0;
								}
								else{
									if($tmp_date == ''){
										$str_date = 'N/A';
									}
									else{
										$str_date = explode("_", $tmp_date)[1];
									}

									if($last_result == 'win'){
										$wdrawamount = number_format($roww1["cash_before"]);
										echo '<tr class="juls-transaction">';
											echo '<td align="center">입금시간: '.$roww1["bet_time"].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;입금액: '.number_format($roww1["bet_amount"]).'</td>';
											echo '<td align="center">보너스: '.number_format($roww1["bonus"]).'</td>';
											echo '<td align="center">시작금액: '.number_format($roww1["conversion"] - $tmp_conversion).'</td>';
											echo '<td align="center">총베팅: '.number_format($blocktotal).'</td>';
											echo '<td align="center" colspan="4">환전시간: '.$str_date.'</td>';
											echo '<td align="center" colspan="3">환전액: '.$wdrawamount.'</td>';
											echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
                                            echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
										echo '</tr>';
									}
									else{
										$wdrawamount = 0;
										echo '<tr class="juls-transaction">';
											echo '<td align="center">입금시간: '.$roww1["bet_time"].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;입금액: '.number_format($roww1["bet_amount"]).'</td>';
											echo '<td align="center">보너스: '.number_format($roww1["bonus"]).'</td>';
											echo '<td align="center">시작금액: '.number_format($roww1["conversion"] - $tmp_conversion).'</td>';
											echo '<td align="center">총베팅: '.number_format($blocktotal).'</td>';
											echo '<td align="center" colspan="7"></td>';
											echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
                                            echo '<td style="display: none;"></td>';
											echo '<td style="display: none;"></td>';
										echo '</tr>';
									}

									$tmp_conversion = $roww1["conversion"];
									$blocktotal = 0;
								
								}
								
							}
							?>
							</tbody>
						</table>
					</div>              
				</div>
			</div>
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">접속기록</h6>
						

						<div class="new-date">
							<div class="date-from">
								<input type="text" name="serchdatest" class="form-control" id="serchdatest7" value="<?=$dateserSt?>" onchange="dateFromTo7()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen7" value="<?=$dateserEn?>" onchange="dateFromTo7()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToIpLog()">검색</button>

									<input style="visibility: hidden;" type="text" name="date" class="form-control iplog-daterange" id="datevalinput_5" value="<?=date("2021-11-11 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
								</div>
							</div>
						</div>
					</div>

					<div class="table-responsive">
						<table class="table text-nowrap" id="iplog_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center">번호</th>
								<th class="text-center">아이디</th>
								<th class="text-center">이름</th>
								<th class="text-center">IP ADDRESS</th>
								<th class="text-center">접속일</th>
								<th class="text-center">Device</th>
							</tr>
							</thead>
							<tbody>
							<?
								$mbno       = intval($Rs['id']);
								$login      = "select * from info_login_history as a inner join info_user as b on b.id=a.ilh_member where b.id='{$mbno}' order by ilh_idx desc";
								$mlres      = $mysqli->query($login);
								$woot = 1;
							?>
							<?while($roww = $mlres->fetch_array()){?>
								<tr>
									<td align="center"><?=$woot?></td>
									<td align="center"><?=$roww["username"]?></td>
									<td align="center"><?=$roww["iu_name"]?></td>
									<td align="center"><?=$roww["ip_address"]?></td>
									<td align="center"><?=$roww["ilh_datetime"]?></td>
									<td align="center" style="white-space: break-spaces;"><?=$roww["device"]?></td>
								</tr>
							<?$woot++;}?>
							</tbody>
						</table>
					</div>            
				</div>
			</div>
		</div>
	</div>

	<div id="mybetting" class="popup-main-content">
		<div class="betting-tab-wrapper">
			<button type="button" class="btn btn-secondary mybettingtab active" data-target="#prematchcontent">프리매치</button>&nbsp;&nbsp;
			<button type="button" class="btn btn-secondary mybettingtab" data-target="#livecontent">라이브</button>&nbsp;&nbsp;
			<button type="button" class="btn btn-secondary mybettingtab" data-target="#minigamecontent">미니게임</button>&nbsp;&nbsp;
		</div>
		<div class="betting-tab-content-wrapper">
			<div id="prematchcontent" class="mybettingtab-content active">
				<div class="row">
					<div class="col-xl-12">
						<div class="card">
							<div class="card-header header-elements-inline">
								<h6 class="card-title">배팅내역</h6>

								<div class="new-date">
									<div class="date-from">
										<input type="text" name="serchdatest" class="form-control" id="serchdatest4" value="<?=$dateserSt?>" onchange="dateFromTo4()">
										<i class="fa fa-calendar"></i>
									</div>
									<div class="date-to">
										<input type="text" name="serchdateen" class="form-control" id="serchdateen4" value="<?=$dateserEn?>" onchange="dateFromTo4()">
										<i class="fa fa-calendar"></i>
									</div>
									&nbsp;&nbsp;
									<div class="form-group">
										<div class="input-group">
											<button type="button" class="btn btn-primary serBtn" onclick="dateFromToPrematchLog()">검색</button>

											<input style="visibility: hidden;" type="text" name="date" id="serdate_st_<?=$sermbno?>" class="form-control mybetting-daterange" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
										</div>
									</div>
								</div>
								
							</div>
							<div class="table-responsive">
								<table class="table table-bordered table-striped table-centered text-nowrap bet-history" id="mybetting_<?=$sermbno?>">
									<thead>
									<tr>
											<th class="text-center">총판</th>
											<th class="text-center">코드</th>
											<th class="text-center">아이디</th>
											<th class="text-center">닉네임</th>
											<th class="text-center">이름</th>
											<th class="text-center">베팅일</th>
											<th class="text-center">배팅유형</th>
											<th class="text-center">배팅액</th>
											<th class="text-center">당첨예상금액</th>
											<th class="text-center">승/패</th>
											<th class="text-center">보유금액</th>
											<th class="text-center">보유포인트</th>
											<th class="text-center">배팅수</th>
											<th class="text-center">배당</th>						
										</tr>
									</thead>
									<tbody id="showListBody_<?=$sermbno?>">
										
									</tbody>
								</table>
							</div>     
							<div style="width:100%; text-align:center; font-size:15px;margin-top:10px; background-color:#F1F1F1;line-height:30px" onclick="showmorePrematch_<?=$sermbno?>()" id="showmoredivprematch_<?=$sermbno?>">
								더보기 <span id="prematchtotpg_<?=$sermbno?>">리스트 조회중</span>
							</div>         
							<div style="display:none" id="temphtgets"><table id="prematchtemphtgetsbable_<?=$sermbno?>"></table></div>
						</div>
					</div>
				</div>
			</div>

			<div id="livecontent" class="mybettingtab-content">
				<div class="row">
					<div class="col-xl-12">
						<div class="card">
							<div class="card-header header-elements-inline">
								<h6 class="card-title">배팅내역</h6>
								<div class="new-date">
									<div class="date-from">
										<input type="text" name="serchdatest" class="form-control" id="serchdatest5" value="<?=$dateserSt?>" onchange="dateFromTo5()">
										<i class="fa fa-calendar"></i>
									</div>
									<div class="date-to">
										<input type="text" name="serchdateen" class="form-control" id="serchdateen5" value="<?=$dateserEn?>" onchange="dateFromTo5()">
										<i class="fa fa-calendar"></i>
									</div>
									&nbsp;&nbsp;
									<div class="form-group">
										<div class="input-group">
											<button type="button" class="btn btn-primary serBtn" onclick="dateFromToLiveLog()">검색</button>

											<input style="visibility: hidden;" type="text" name="date" id="serdate_st_live_<?=$sermbno?>" class="form-control mybetting-daterange" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
										</div>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-bordered table-striped table-centered text-nowrap bet-history" id="mybetting_<?=$sermbno?>">
									<thead>
									<tr>
											<th class="text-center">총판</th>
											<th class="text-center">코드</th>
											<th class="text-center">아이디</th>
											<th class="text-center">닉네임</th>
											<th class="text-center">이름</th>
											<th class="text-center">베팅일</th>
											<th class="text-center">배팅액</th>
											<th class="text-center">당첨예상금액</th>
											<th class="text-center">승/패</th>
											<th class="text-center">보유금액</th>
											<th class="text-center">보유포인트</th>
											<th class="text-center">배팅수</th>
											<th class="text-center">배당</th>				
									</tr>
									</thead>
									<tbody id="showListBodylive_<?=$sermbno?>">
										
									</tbody>
								</table>
							</div>     
							<div style="width:100%; text-align:center; font-size:15px;margin-top:10px; background-color:#F1F1F1;line-height:30px" onclick="showmoreLive_<?=$sermbno?>()" id="showmoredivlive_<?=$sermbno?>">
								더보기 <span id="livetotpg_<?=$sermbno?>">리스트 조회중</span>
							</div>         
							<div style="display:none" id="temphtgets"><table id="livetemphtgetsbable_<?=$sermbno?>"></table></div>
						</div>
					</div>
				</div>
			</div>

			<div id="minigamecontent" class="mybettingtab-content">
				<div class="row">
					<div class="col-xl-12">
						<div class="card">
							<div class="card-header header-elements-inline">
								<h6 class="card-title">배팅내역</h6>

								<div class="new-date">
									<div class="date-from">
										<input type="text" name="serchdatest" class="form-control" id="serchdatest6" value="<?=$dateserSt?>" onchange="dateFromTo6()">
										<i class="fa fa-calendar"></i>
									</div>
									<div class="date-to">
										<input type="text" name="serchdateen" class="form-control" id="serchdateen6" value="<?=$dateserEn?>" onchange="dateFromTo6()">
										<i class="fa fa-calendar"></i>
									</div>
									&nbsp;&nbsp;
									<div class="form-group">
										<div class="input-group">
											<button type="button" class="btn btn-primary serBtn" onclick="dateFromToMiniLog()">검색</button>

											<input style="visibility: hidden;" type="text" name="date" id="serdate_st_minigame_<?=$sermbno?>" class="form-control mybetting-daterange" value="<?=date("2021-11-11 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
										</div>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-bordered table-striped table-centered text-nowrap bet-history" id="mybetting_<?=$sermbno?>">
									<thead>
									<tr>
											<th class="text-center">총판</th>
											<th class="text-center">코드</th>
											<th class="text-center">아이디</th>
											<th class="text-center">닉네임</th>
											<th class="text-center">이름</th>
											<th class="text-center">베팅일</th>
											<th class="text-center">배팅액</th>
											<th class="text-center">당첨예상금액</th>
											<th class="text-center">승/패</th>
											<th class="text-center">보유금액</th>
											<th class="text-center">보유포인트</th>
											<th class="text-center">배팅수</th>
											<th class="text-center">배당</th>		
									</tr>
									</thead>
									<tbody id="showListBodyminigame_<?=$sermbno?>">
										
									</tbody>
								</table>
							</div>     
							<div style="width:100%; text-align:center; font-size:15px;margin-top:10px; background-color:#F1F1F1;line-height:30px" onclick="showmoreMinigame_<?=$sermbno?>()" id="showmoredivminigame_<?=$sermbno?>">
								더보기 <span id="minigametotpg_<?=$sermbno?>">리스트 조회중</span>
							</div>         
							<div style="display:none" id="temphtgets"><table id="minigametemphtgetsbable_<?=$sermbno?>"></table></div>
						</div>
					</div>
				</div>
			</div>

		</div>
		
	</div>

	<div id="deposit" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">입금내역</h6>
						<div class="new-date">
							<div class="date-from">
								<input type="hidden" name="date" class="form-control deposit-daterange" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" id="datevalinput_1" readonly>

								<input type="text" name="serchdatest" class="form-control" id="serchdatest" value="<?=$dateserSt?>" onchange="dateFromTo()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen" value="<?=$dateserEn?>" onchange="dateFromTo()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToDepositLog()">검색</button>
									
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table text-nowrap bet-history" id="depositable_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center">구분</th>
								<th class="text-center">총판</th>
								<th class="text-center">레벨</th>
								<th class="text-center">아이디</th>
								<th class="text-center">이름</th>
								<th class="text-center">입/출</th>
								<th class="text-center">은행/주소</th>
								<th class="text-center">수량</th>
								<th class="text-center">금액</th>
								<th class="text-center">포인트</th>
								<th class="text-center">신청일시</th>
								<th class="text-center">처리일시</th>
								<th class="text-center">상태</th>
							</tr>
							</thead>
							<tbody>
								<?php
									$sql = "Select * from info_transaction as a left join info_user as b on a.it_target=b.id where a.it_target='{$mbno}' and (a.it_status=2 OR a.it_status=3) and it_type='deposit' and (a.it_proceed='user' OR a.it_proceed='gwallet-user' OR a.it_proceed = 'shopcoin-user') and (a.it_reason = 'GWALLET DEPOSIT' OR a.it_reason IS NULL or a.it_reason = 'SHOP COIN DEPOSIT') order by a.it_idx desc";
									$result = $mysqli->query($sql);
									while($roww = $result->fetch_array()){
										$type = "입금";
										if($roww["it_proceed"] == 'gwallet-user'){
											$type = $roww["coinType"];
										}
								?>
									<tr>
										<td align="center"><?=$type?></td>
										<td align="center">
											<?
												$userCode 	= $roww["real_code"];
												$partquery 	= "select * from info_code where icd_code='{$userCode}'";
												$resultp 	= $mysqli->query($partquery);
												$rsp 		= $resultp->fetch_array();
												$pakner		= $rsp["icd_code"];
												echo $pakner;
											?>
										</td>
										<td align="center"><?=$roww["iu_level"]?></td>
										<td align="center"><?=$roww["username"]?></td>
										<td align="center"><?=$roww["iu_name"]?></a></td>
										<td align="center">
											<?php
												$mbnocnt 	= $roww["it_target"];
												$datengayon = date("Y-m-d 00:00:00");
												$depoq		= "select it_idx from info_transaction where it_status='2' and (it_proceed='user' OR it_proceed='gwallet-user') and it_type='deposit' and it_target='{$mbno}' and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '{$datengayon}'";
												$resultq 	= $mysqli->query($depoq);
												$deposit 	= $resultq->num_rows;

												$queryw 	= "select it_idx from info_transaction where it_status='2' and (it_proceed='user' OR it_proceed='gwallet-user') and it_type='withdraw' and it_target='{$mbno}' and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '{$datengayon}'";
												$resultw 	= $mysqli->query($queryw);
												$withdraw 	= $resultw->num_rows;

												$textLength = strlen($roww["walletAddress"]);
												$maxChars 	= 15;
												
												$coinamount = "-";
												$counting 	= "<span class='blue-tetext'>".$deposit."</span> / <span class='red-tetext'>".$withdraw."</span>";
												$address = $roww["iu_bank"].' / '.$roww["iu_acc"];
												if($roww["it_proceed"] == 'gwallet-user'){
													$address = substr_replace($roww["walletAddress"], '...', $maxChars/2, $textLength-$maxChars);
													$coinamount 	= $roww["gwallet_data"];
													if($coinamount != null || $coinamount != ""){
														$coinamount 	= explode("/",$coinamount);
														$coinamount 	= $coinamount[2];
														$coinamount 	= explode(":",$coinamount);
														$coinamount 	= $coinamount[1];
													}
												}
												echo $counting;
											?>
										</td>
										<td align="center"><?=$address?></td>
										<td align="center"><?=$coinamount?></td>
										<td align="center"><?=number_format($roww["it_amount"])?>원</td>
										<td align="center"><?=number_format($roww["it_point"])?>P</td>
										<td align="center"><?=$roww["it_reg_datetime"]?></td>
										<td align="center"><?=$roww["it_update_datetime"] == NULL ? '<span class="t-wait">처리대기</span>' : $roww["it_update_datetime"]?></td>
										<td align="center">
											<?php
												if($roww["it_status"] == 2 || $roww["it_status"] == 3){
													if($roww["it_status"] == 2){
														echo "처리완료";
													}else{
														echo "취소";
													}
												}
											?>
										</td>
									</tr>
								<?}?>
							</tbody>
						</table>
					</div>              
				</div>
			</div>
		</div>
	</div>

	<div id="withdrawal" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">출금내역</h6>
						<div class="new-date">
							<div class="date-from">
								<input style="display: inline-block; width: 300px;" type="hidden" name="date" class="form-control withdraw-daterange" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" id="datevalinput_2" readonly>
								<input type="text" name="serchdatest" class="form-control" id="serchdatest1" value="<?=$dateserSt?>" onchange="dateFromTo1()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen1" value="<?=$dateserEn?>" onchange="dateFromTo1()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToWithdrawLog()">검색</button>
									
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table text-nowrap bet-history" id="withdrawtable_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center">구분</th>
								<th class="text-center">총판</th>
								<th class="text-center">레벨</th>
								<th class="text-center">아이디</th>
								<th class="text-center">이름</th>
								<th class="text-center">입/출</th>
								<th class="text-center">은행/주소</th>
								<th class="text-center">수량</th>
								<th class="text-center">금액</th>
								<th class="text-center">포인트</th>
								<th class="text-center">신청일시</th>
								<th class="text-center">처리일시</th>
								<th class="text-center">상태</th>
							</tr>
							</thead>
							<tbody>
								<?php
									$sql = "Select * from info_transaction as a left join info_user as b on a.it_target=b.id where a.it_target='{$mbno}' and (a.it_status=2 OR a.it_status=3) and it_type='withdraw' and (a.it_proceed='user' OR a.it_proceed='gwallet-user') and (a.it_reason = 'GWALLET WITHDRAW' OR a.it_reason IS NULL) order by a.it_idx desc";
									$result = $mysqli->query($sql);
									while($roww = $result->fetch_array()){
										$type = "출금";
										if($roww["it_proceed"] == 'gwallet-user'){
											$type = $roww["coinType"];
										}
								?>
									<tr>
										<td align="center"><?=$type?></td>
										<td align="center">
											<?
												$userCode 	= $roww["real_code"];
												$partquery 	= "select * from info_code where icd_code='{$userCode}'";
												$resultp 	= $mysqli->query($partquery);
												$rsp 		= $resultp->fetch_array();
												$pakner		= $rsp["icd_code"];
												echo $pakner;
											?>
										</td>
										<td align="center"><?=$roww["iu_level"]?></td>
										<td align="center"><?=$roww["username"]?></td>
										<td align="center"><?=$roww["iu_name"]?></a></td>
										<td align="center">
											<?php
												$mbnocnt 	= $roww["it_target"];
												$datengayon = date("Y-m-d 00:00:00");
												$depoq		= "select it_idx from info_transaction where it_status='2' and (it_proceed='user' OR it_proceed='gwallet-user') and it_type='deposit' and it_target='{$mbno}' and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '{$datengayon}'";
												$resultq 	= $mysqli->query($depoq);
												$deposit 	= $resultq->num_rows;

												$queryw 	= "select it_idx from info_transaction where it_status='2' and (it_proceed='user' OR it_proceed='gwallet-user') and it_type='withdraw' and it_target='{$mbno}' and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '{$datengayon}'";
												$resultw 	= $mysqli->query($queryw);
												$withdraw 	= $resultw->num_rows;

												$textLength = strlen($roww["walletAddress"]);
												$maxChars 	= 15;
												
												$coinamount = "-";
												$counting 	= "<span class='blue-tetext'>".$deposit."</span> / <span class='red-tetext'>".$withdraw."</span>";
												$address = $roww["iu_bank"].' / '.$roww["iu_acc"];
												if($roww["it_proceed"] == 'gwallet-user'){
													$address = substr_replace($roww["walletAddress"], '...', $maxChars/2, $textLength-$maxChars);
													$coinamount 	= $roww["gwallet_data"];
													if($coinamount != null || $coinamount != ""){
														$coinamount 	= explode("/",$coinamount);
														$coinamount 	= $coinamount[2];
														$coinamount 	= explode(":",$coinamount);
														$coinamount 	= $coinamount[1];
													}
												}
												echo $counting;
											?>
										</td>
										<td align="center"><?=$address?></td>
										<td align="center"><?=$coinamount?></td>
										<td align="center"><?=number_format($roww["it_amount"])?>원</td>
										<td align="center"><?=number_format($roww["it_point"])?>P</td>
										<td align="center"><?=$roww["it_reg_datetime"]?></td>
										<td align="center"><?=$roww["it_update_datetime"] == NULL ? '<span class="t-wait">처리대기</span>' : $roww["it_update_datetime"]?></td>
										<td align="center">
											<?php
												if($roww["it_status"] == 2 || $roww["it_status"] == 3){
													if($roww["it_status"] == 2){
														echo "처리완료";
													}else{
														echo "취소";
													}
												}
											?>
										</td>
									</tr>
								<?}?>
							</tbody>
						</table>
					</div>              
				</div>
			</div>
		</div>
	</div>

	<div id="customer" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<h6 class="card-title">고객센터</h6>
						<div class="new-date">
							<div class="date-from">
								<input type="text" name="serchdatest" class="form-control" id="serchdatest3" value="<?=$dateserSt?>" onchange="dateFromTo3()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen3" value="<?=$dateserEn?>" onchange="dateFromTo3()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToCsLog()">검색</button>

									<input style="visibility: hidden;" type="text" name="date" class="form-control cs-daterange" id="datevalinput_4" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table text-nowrap bet-history" id="cstable_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center"><input type="checkbox" id="cscheck_all" name="checkAll" value="0"></th>
								<th class="text-center">문의 유형</th>
								<th class="text-center">제목</th>
								<th class="text-center">작성자</th>
								<th class="text-center">작성일</th>
								<th class="text-center">답변여부</th>
								<th class="text-center">답변작성일</th>
								<th class="text-center">답변작성자</th>
								<th class="text-center">관리</th>
							</tr>
							</thead>
							<tbody>
								<?php
									$sql = "select a.* , b.iac_name, c.iu_name, c.username, c.iu_nickname, c.id, c.iu_level, c.iu_memtype from info_cs as a left join info_account as b on b.id=a.ics_action left join info_user as c on c.id=a.ics_writer where ics_writer='{$mbno}' and req_type=0 order by a.ics_idx desc";
									$result = $mysqli->query($sql);
									while($roww = $result->fetch_array()){
								?>
									<tr>
										<td align="center"><input class='account-blast checkbox' type='checkbox' id=<?=$roww["ics_idx"]?>' name='<?=$roww["ics_idx"]?>' value='<?=$roww["ics_idx"]?>'></td>
										<td align="center">일반문의</td>
										<td align="center"><?=$roww["ics_title"]?></td>
										<td align="center"><?=$roww["iu_nickname"]?></td>
										<td align="center"><?=$roww["ics_reg_datetime"]?></td>
										<td align="center">
										<?
											if( $roww["ics_status"]== 0) {
												echo "답변대기";
											}elseif($roww["ics_status"]== 1){
												echo "답변완료";
											}
										?>
										</td>
										<td align="center"><?=$roww["ics_update_datetime"]?></td>
										<td align="center"><?=$roww["iac_name"]?></td>
										<td align="center">
										<?
											if($roww["req_type"] == 9){
												if($roww["ics_status"] == 0 ){
													echo "<a href='#' data-target='".$roww["ics_idx"]."' class='blast-me btn btn-sm btn-success'>답변작성</a>";
												}else{
													echo "<span class='btn btn-secondary cs'>전송완료</span>";
												}
											}else{
												if($roww["ics_status"] == 0 ){
													echo "<a href='#' data-target='".$roww["ics_idx"]."' class='cs-popme btn btn-sm btn-success'>답변작성</a>";
												}else{
													echo "<a href='#' data-target='".$roww["ics_idx"]."' class='cs-popme btn btn-sm btn-success'>수정</a>";
												}
											}
											
											echo "<a href='#' data-target='".$roww["ics_idx"]."' style='margin-left: 3px;' class='cs-delete-me btn btn-sm btn-danger'>삭제</a>";
										?>
										</td>
									</tr>
								<?}?>
							</tbody>
						</table>
					</div>              
				</div>
			</div>
		</div>
	</div>

	<div id="inbox" class="popup-main-content">
		<div class="row">
			<div class="col-xl-12">
				<div class="card">
					<div class="card-header header-elements-inline">
						<div class="header-wrap">
							<h6 class="card-title">쪽지</h6>
						</div>
						<div class="new-date">
							<div class="date-from">
								<input type="hidden" name="date" class="form-control deposit-daterange" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" id="datevalinput" readonly>
								<input type="text" name="serchdatest" class="form-control" id="serchdatest2" value="<?=$dateserSt?>" onchange="dateFromTo2()">
								<i class="fa fa-calendar"></i>
							</div>
							<div class="date-to">
								<input type="text" name="serchdateen" class="form-control" id="serchdateen2" value="<?=$dateserEn?>" onchange="dateFromTo2()">
								<i class="fa fa-calendar"></i>
							</div>
							&nbsp;&nbsp;
							<div class="form-group">
								<div class="input-group">
									<button type="button" class="btn btn-primary serBtn" onclick="dateFromToInboxLog()">검색</button>&nbsp;&nbsp;&nbsp;

									<button class="btn btn-primary inbox-popup-message" data-target="<?=$mbno?>" style="margin-right: 15px; width: 86px; height: 36px;">쪽지발송</button>

									<input style="visibility: hidden;" type="text" name="date" class="form-control inbox-daterange" id="datevalinput_3" value="<?=date("Y-m-d 00:00:00")." - ".date("Y-m-d 23:59:59")?>" readonly>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table text-nowrap bet-history" id="inboxtable_<?=$sermbno?>">
							<thead>
							<tr>
								<th class="text-center"><input type="checkbox" id="inboxcheck_all" name="checkAll" value="0"></th>
								<th class="text-center">대상</th>
								<th class="text-center">쪽지제목</th>
								<th class="text-center">작성자</th>
								<th class="text-center">작성일</th>
								<th class="text-center">확인여부</th>
								<th class="text-center">관리</th>

							</tr>
							</thead>
							<tbody>
								<?php
									$sql = "Select * from info_message as a left join info_account as b on b.id=a.im_writer left join info_user as c on c.id=a.im_target where im_target='{$mbno}' order by im_idx desc";
									$result = $mysqli->query($sql);
									while($roww = $result->fetch_array()){
								?>
									<tr>
										<td align="center"><input type="checkbox" id="<?=$roww["im_idx"]?>" name="checkbox" class="checkbox" value="<?=$roww["im_idx"]?>"></td>
										<td align="center">
										<?
											if($roww["im_all"] == 1){
												echo "전체쪽지";
											}elseif($roww["target_level"] > 0){
												echo "레벨 ". $roww["target_level"] ."";
											}elseif($roww["im_all"]== 3){
												echo "일반회원쪽지";
											}else{
											echo $roww["username"] . " ". $roww["iu_nickname"];
											}
										?>
										</td>
										<td align="center"><?=$roww["im_title"]?></td>
										<td align="center"><?=$roww["iac_name"]?></td>
										<td align="center"><?=$roww["im_reg_datetime"]?></td>
										<td align="center">
										<?
											if($roww["im_read"] < 1 && $roww["im_read"] != 1 && $roww["im_read"] != 2 && $roww["im_read"] != 3){
												echo "미확인";
											}elseif($roww["im_read"] == 1){
												echo "전체쪽지";
											}elseif($roww["im_read"]== 2){
												echo "VIP회원쪽지";
											}elseif($roww["im_read"]== 3){
												echo "일반회원쪽지";
											}else{
												echo "확인";
											}
										?>
										</td>
										<td align="center">
											<a href="#" data-target="<?=$roww["im_idx"]?>" class="message-edit-me btn btn-sm btn-success">수정</a>
                                    		<a href="#" data-target="<?=$roww["im_idx"]?>" class="message-delete-me btn btn-sm btn-danger delete-click">삭제</a>
										</td>
									</tr>
								<?}?>
								
							</tbody>
						</table>
					</div>              
				</div>
			</div>
		</div>
	</div>

</div>



<div class="message-popup inside-user">
	<div class="message-popup-wrapper">
		<div class="message-popup-header-wrapper">
			<div class="popup-header-content">
				<h5>쪽지발송</h5>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</div>
		</div>
		<div class="message-popup-body-wrapper">
			<div class="popup-body-content">
				<div class="form-group">
					<label>Send To: </label>
					<div class="row">
						<div class="col-md-6">
							<select class="user-list form-control" name="user-list[]" multiple="multiple" readonly disabled>
								<?php
									$sql        = "select id, username, iu_name from info_user";
									$result     = $mysqli->query($sql);
									while($Rs = $result->fetch_array()){
										echo '<option value="'.$Rs["id"].'">'.$Rs["username"].' '.$Rs["iu_name"].'</option>';
									}
								?>
							</select>
						</div>
						<div class="col-md-6">
							<select class="level-list form-control" id="level-list" name="level-list">
								<option value="0">레벨선택</option>
								<option value="all">모두</option>
								<?
								for($x = 1; $x < 11 ; $x++){
									echo "<option value='{$x}'>레벨 {$x}</option>";
								}
								?>
							</select>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-12">
							<label>답변양식</label>
							<select class="form-control inbox-form-selection">
								<option value="">매크로선택</option>
							<?
							$sqlF 		= "Select * from  info_board where ibd_type='form' and ibd_idx > 10 order by  ibd_title asc ";
							$resultF 	= $mysqli -> query($sqlF);
							$formList = "";

							while( $RsF = $resultF->fetch_array() ) {
								$formList.= "<div id='form_inbox_". $RsF["ibd_idx"]."'>". $RsF["ibd_contents"]."</div>";?>
								<option value="<?=$RsF["ibd_idx"]?>"><?=$RsF["ibd_title"]?></option>
							<?}?>

							</select>
							
							<div style="display: none;"><?=$formList?></div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-12">
							<label>쪽지제목:</label>
							<input type="text" class="message-title form-control" placeholder="쪽지제목" name="title" value=""><br/>
							<label>내용:</label>
							<textarea  id="inbox_notice_content_<?=$sermbno?>" name="contents" style="width: 100%; height: 300px" ></textarea>
							<input type="hidden" class="edit_target" value="0">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="message-popup-footer-wrapper">
			<div class="popup-footer-content">
					<button type="submit" class="inbox-send-message btn btn-outline-primary">쪽지등록 <i class="icon-paperplane ml-2"></i></button>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="message-popup-cs">
	<div class="message-popup-wrapper">
		<div class="message-popup-header-wrapper">
			<div class="popup-header-content">
				<h5>쪽지발송</h5>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</div>
		</div>
		<div class="message-popup-body-wrapper">
			<div class="popup-body-content">
				<div class="row">
					<div class="col-6">
						<div class="form-group">
							<label>작성자: </label>
							<div class="row">
								<div class="col-12">
									<input type="text" class="cs-user-list form-control" value="">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>문의제목: </label>
							<div class="row">
								<div class="col-12">
									<input type="text" class="cs-message-title form-control" value="">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>문의내용</label>
							<textarea class="form-control cs-message-content" rows="5"></textarea>
						</div>
						<div class="form-group">
							<label>Attachment: </label>
							<div class="attachment-place"></div>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<div class="row">
								<div class="col-12">
									<label>답변양식</label>
									<select class="form-control cs-form-selection">
										<option value="">매크로선택</option>
									<?
									$sqlF 		= "Select * from  info_board where ibd_type='form' and ibd_idx > 10 order by  ibd_title asc ";
									$resultF 	= $mysqli -> query($sqlF);
									$formList = "";

									while( $RsF = $resultF->fetch_array() ) {
										$formList.= "<div id='form_cs_". $RsF["ibd_idx"]."'>". $RsF["ibd_contents"]."</div>";?>
										<option value="<?=$RsF["ibd_idx"]?>"><?=$RsF["ibd_title"]?></option>
									<?}?>
									</select>
									<div style="display: none;"><?=$formList?></div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-12">
									<label>답변 작성:</label>
									<textarea  id="cs_notice_content_<?=$sermbno?>" name="contents" style="width: 100%; height: 300px" ></textarea>
									<input type="hidden" class="cs_edit_target" value="0">
									<input type="hidden" class="cs_edit_user" value="0">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="message-popup-footer-wrapper">
			<div class="popup-footer-content">
					<button type="submit" class="cs-send-message btn btn-outline-primary">쪽지등록 <i class="icon-paperplane ml-2"></i></button>
				</div>
			</div>
		</div>
	</div>
</div>

<script>

	var counter = 1;
	var prematchpage_<?=$sermbno?> 		= 0;
	var prematchshowNum_<?=$sermbno?> 	= 0;
	var prematchmmxpg_<?=$sermbno?> 	= -1;

	var livepage_<?=$sermbno?> 		= 0;
	var liveshowNum_<?=$sermbno?> 	= 0;
	var livemmxpg_<?=$sermbno?> 	= -1;

	var minigamepage_<?=$sermbno?> 		= 0;
	var minigameshowNum_<?=$sermbno?> 	= 0;
	var minigamemmxpg_<?=$sermbno?> 	= -1;

	getPrematch_<?=$sermbno?>(<?=$sermbno?>);
	getLive_<?=$sermbno?>(<?=$sermbno?>);
	getMinigame_<?=$sermbno?>(<?=$sermbno?>);



	jQuery('#userpopup_<?=$sermbno?> #betlogtable_<?=$sermbno?>').DataTable({
		"ordering" : false,
		"pageLength": 30,
		"info": false,
		"lengthChange": false,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});



	jQuery("#userpopup_<?=$sermbno?> #serdate_st_<?=$sermbno?>").on("change",function(){
		jQuery("#userpopup_<?=$sermbno?> #showListBody_<?=$sermbno?>").html("");
		prematchpage_<?=$sermbno?> 	= 0;
		prematchshowNum_<?=$sermbno?> = 0;
		getPrematch_<?=$sermbno?>(<?=$sermbno?>);
	});

	jQuery("#userpopup_<?=$sermbno?> #serdate_st_live_<?=$sermbno?>").on("change",function(){
		jQuery("#userpopup_<?=$sermbno?> #showListBodylive_<?=$sermbno?>").html("");
		livepage_<?=$sermbno?> 	= 0;
		liveshowNum_<?=$sermbno?> = 0;
		getLive_<?=$sermbno?>(<?=$sermbno?>);
	});

	jQuery("#userpopup_<?=$sermbno?> #serdate_st_minigame_<?=$sermbno?>").on("change",function(){
		jQuery("#userpopup_<?=$sermbno?> #showListBodyminigame_<?=$sermbno?>").html("");
		minigamepage_<?=$sermbno?> 	= 0;
		minigameshowNum_<?=$sermbno?> = 0;
		getMinigame_<?=$sermbno?>(<?=$sermbno?>);
	});

	jQuery('#userpopup_<?=$sermbno?> #serdate_st_<?=$sermbno?>, #userpopup_<?=$sermbno?> #serdate_st_live_<?=$sermbno?>, #userpopup_<?=$sermbno?> #serdate_st_minigame_<?=$sermbno?>').daterangepicker({
		applyClass: 'bg-slate-600',
		cancelClass: 'btn-light',
		locale: language[_language].calendar.locale
	});

	function showmorePrematch_<?=$sermbno?>(){
		document.getElementById("showmoredivprematch_<?=$sermbno?>").style.display="block";
		if( prematchmmxpg_<?=$sermbno?> > prematchshowNum_<?=$sermbno?> ){			
			getPrematch_<?=$sermbno?>(<?=$sermbno?>);
		}else{
			alert("목록의 끝입니다.");
		}
	}

	function getPrematch_<?=$sermbno?>(search_id){
		var adr = "bet_list.php";
		var dst = document.getElementById("serdate_st_<?=$sermbno?>").value;
		dst 	= dst.split(" - ");
		var den = dst[1];
		dst 	= dst[0];
		var tbodylist 	= document.getElementById("showListBody_<?=$sermbno?>");
		var obj 		= document.getElementById("prematchtemphtgetsbable_<?=$sermbno?>");

		var sendData = {"jobtype":"getListpopup" , "page": parseInt( prematchpage_<?=$sermbno?> + 1), "dst":dst, "den":den,"search_id":search_id, "scdpd":'prematch'};
		$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
			obj.innerHTML = data;
			var tcntvals_<?=$sermbno?> = parseInt(document.getElementById("tcntvals_prematch_<?=$sermbno?>").innerHTML);
			if( isNaN(tcntvals_<?=$sermbno?>)) tcntvals_<?=$sermbno?> = -1;
			if( tcntvals_<?=$sermbno?> > -1 ) {prematchmmxpg_<?=$sermbno?> = tcntvals_<?=$sermbno?> ; document.getElementById("prematchtotpg_<?=$sermbno?>").innerHTML = "총 : " + tcntvals_<?=$sermbno?> + " 항목";}
			
			var inputs = obj.getElementsByTagName("TR");		
			for (var i=0; i < inputs.length ; i++ ){
				var div = document.createElement('TR');
				var eaid = inputs[i].getAttribute("tcd");
				if(inputs[i].className == "ONON"){
					div.setAttribute("id", "ealinetr_" + eaid );
					div.setAttribute("style", "height:30px");
					prematchshowNum_<?=$sermbno?>++;
				}else{
					div.setAttribute("class", "eadetailTr");
					div.setAttribute("id", "exdetail_" + eaid );
					div.setAttribute("style", "display:none");
				}
				div.innerHTML = inputs[i].innerHTML;
				tbodylist.appendChild(div);
			}
			document.getElementById("prematchtotpg_<?=$sermbno?>").innerHTML = "총 : " + prematchmmxpg_<?=$sermbno?> + " 항목 / " + prematchshowNum_<?=$sermbno?> ;			
			prematchpage_<?=$sermbno?>++;
		}});
	}

	function showmoreLive_<?=$sermbno?>(){
		document.getElementById("showmoredivlive_<?=$sermbno?>").style.display="block";
		if( livemmxpg_<?=$sermbno?> > liveshowNum_<?=$sermbno?> ){			
			getLive_<?=$sermbno?>(<?=$sermbno?>);
		}else{
			alert("목록의 끝입니다.");
		}
	}

	function getLive_<?=$sermbno?>(search_id){
		var adr = "bet_list.php";
		var dst = document.getElementById("serdate_st_live_<?=$sermbno?>").value;
		dst 	= dst.split(" - ");
		var den = dst[1];
		dst 	= dst[0];
		var tbodylist 	= document.getElementById("showListBodylive_<?=$sermbno?>");
		var obj 		= document.getElementById("livetemphtgetsbable_<?=$sermbno?>");

		var sendData = {"jobtype":"getListpopup" , "page": parseInt( livepage_<?=$sermbno?> + 1), "dst":dst, "den":den,"search_id":search_id, "scdpd":'realtime'};
		$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
			obj.innerHTML = data;
			var tcntvals_<?=$sermbno?> = parseInt(document.getElementById("tcntvals_realtime_<?=$sermbno?>").innerHTML);
			if( isNaN(tcntvals_<?=$sermbno?>)) tcntvals_<?=$sermbno?> = -1;
			if( tcntvals_<?=$sermbno?> > -1 ) {livemmxpg_<?=$sermbno?> = tcntvals_<?=$sermbno?> ; document.getElementById("livetotpg_<?=$sermbno?>").innerHTML = "총 : " + tcntvals_<?=$sermbno?> + " 항목";}
			
			var inputs = obj.getElementsByTagName("TR");		
			for (var i=0; i < inputs.length ; i++ ){
				var div = document.createElement('TR');
				var eaid = inputs[i].getAttribute("tcd");
				if(inputs[i].className == "ONON"){
					div.setAttribute("id", "ealinetr_" + eaid );
					div.setAttribute("style", "height:30px");
					liveshowNum_<?=$sermbno?>++;
				}else{
					div.setAttribute("class", "eadetailTr");
					div.setAttribute("id", "exdetail_" + eaid );
					div.setAttribute("style", "display:none");
				}
				div.innerHTML = inputs[i].innerHTML;
				tbodylist.appendChild(div);
				
			}
			document.getElementById("livetotpg_<?=$sermbno?>").innerHTML = "총 : " + livemmxpg_<?=$sermbno?> + " 항목 / " + liveshowNum_<?=$sermbno?> ;			
			livepage_<?=$sermbno?>++;
		}});
	}

	function showmoreMinigame_<?=$sermbno?>(){
		document.getElementById("showmoredivminigame_<?=$sermbno?>").style.display="block";
		if( minigamemmxpg_<?=$sermbno?> > minigameshowNum_<?=$sermbno?> ){			
			getMinigame_<?=$sermbno?>(<?=$sermbno?>);
		}else{
			alert("목록의 끝입니다.");
		}
	}

	function getMinigame_<?=$sermbno?>(search_id){
		var adr = "bet_list.php";
		var dst = document.getElementById("serdate_st_minigame_<?=$sermbno?>").value;
		dst 	= dst.split(" - ");
		var den = dst[1];
		dst 	= dst[0];
		var tbodylist 	= document.getElementById("showListBodyminigame_<?=$sermbno?>");
		var obj 		= document.getElementById("minigametemphtgetsbable_<?=$sermbno?>");

		var sendData = {"jobtype":"getListpopup" , "page": parseInt( minigamepage_<?=$sermbno?> + 1), "dst":dst, "den":den,"search_id":search_id, "scdpd":'minigame'};
		$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
			obj.innerHTML = data;
			var tcntvals_<?=$sermbno?> = parseInt(document.getElementById("tcntvals_minigame_<?=$sermbno?>").innerHTML);
			if( isNaN(tcntvals_<?=$sermbno?>)) tcntvals_<?=$sermbno?> = -1;
			if( tcntvals_<?=$sermbno?> > -1 ) {minigamemmxpg_<?=$sermbno?> = tcntvals_<?=$sermbno?> ; document.getElementById("minigametotpg_<?=$sermbno?>").innerHTML = "총 : " + tcntvals_<?=$sermbno?> + " 항목";}
			
			var inputs = obj.getElementsByTagName("TR");		
			for (var i=0; i < inputs.length ; i++ ){
				var div = document.createElement('TR');
				var eaid = inputs[i].getAttribute("tcd");
				if(inputs[i].className == "ONON"){
					div.setAttribute("id", "ealinetr_" + eaid );
					div.setAttribute("style", "height:30px");
					minigameshowNum_<?=$sermbno?>++;
				}else{
					div.setAttribute("class", "eadetailTr");
					div.setAttribute("id", "exdetail_" + eaid );
					div.setAttribute("style", "display:none");
				}
				div.innerHTML = inputs[i].innerHTML;
				tbodylist.appendChild(div);
				
			}
			document.getElementById("minigametotpg_<?=$sermbno?>").innerHTML = "총 : " + minigamemmxpg_<?=$sermbno?> + " 항목 / " + minigameshowNum_<?=$sermbno?> ;			
			minigamepage_<?=$sermbno?>++;
		}});
	}

	function showBetinfo_<?=$sermbno?>(no, betcode, gametype){
		var obj = document.getElementById("exdetail_"+no);
		var row = document.getElementById("ealinetr_"+no)
		
		if(obj.style.display == "table-row"){
			obj.style.display="none";
			row.className = "";
		}else{
			obj.style.display="table-row";
			row.className = "info-active";
			obj.innerHTML = "<td colspan='10'>정보 로딩중</td>";
			var adr = "bet_list.php";
			var sendData = {"jobtype":"getgameinfo" , "rsno":no,"betcode":betcode, "scdpd":gametype};
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				obj.innerHTML = "<td colspan='14'><div class='match-wrap new-table'>" + data + "</div></td>";
			}});
		}
	}

	var elems_<?=$sermbno?> = Array.prototype.slice.call(document.querySelectorAll('#userpopup_<?=$sermbno?> .form-check-input-switchery'));
	elems_<?=$sermbno?>.forEach(function(html) {
		var switchery = new Switchery(html);
	});

	var moneylogtable_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #moneylog_<?=$sermbno?>').DataTable({
		"order": [[ 7, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var pointlogtable_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #pointlog_<?=$sermbno?>').DataTable({
		"order": [[ 5, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var iplogtable_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #iplog_<?=$sermbno?>').DataTable({
		"order": [[ 4, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var depositable_<?=$sermbno?> = jQuery("#userpopup_<?=$sermbno?> #depositable_<?=$sermbno?>").DataTable({
		"order": [[ 10, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var depositable_new_<?=$sermbno?> = jQuery("#userpopup_<?=$sermbno?> #depositable_new_<?=$sermbno?>").DataTable({
		"searching": false,
		"order": [[ 7, "desc" ]],
		"pageLength": 10,
	});

	var moneylogtable_new_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #moneylog_new_<?=$sermbno?>').DataTable({
		"searching": false,
		"order": [[ 7, "desc" ]],
		"pageLength": 10,
	});

	var pointlogtable_new_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #pointlog_new_<?=$sermbno?>').DataTable({
		"searching": false,
		"order": [[ 5, "desc" ]],
		"pageLength": 10
	});

	var betlogtable_new_<?=$sermbno?> = jQuery('#userpopup_<?=$sermbno?> #betlogtable_new_<?=$sermbno?>').DataTable({
		"searching": false,
		"order": [[ 0, "desc" ]],
		"pageLength": 10
	});

	var withdrawtable_<?=$sermbno?> = jQuery("#userpopup_<?=$sermbno?> #withdrawtable_<?=$sermbno?>").DataTable({
		"order": [[ 10, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var cstable_<?=$sermbno?> = jQuery("#userpopup_<?=$sermbno?> #cstable_<?=$sermbno?>").DataTable({
		"order": [[ 4, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	var inboxtable_<?=$sermbno?> = jQuery("#userpopup_<?=$sermbno?> #inboxtable_<?=$sermbno?>").DataTable({
		"order": [[ 4, "desc" ]],
		"pageLength": 25,
		"oLanguage": {
            "sSearch": "찾기: "
        }
	});

	

	jQuery('#userpopup_<?=$sermbno?> .moneylog-daterange, #userpopup_<?=$sermbno?> .pointlog-daterange, #userpopup_<?=$sermbno?> .betlog-daterange, #userpopup_<?=$sermbno?> .iplog-daterange, #userpopup_<?=$sermbno?> .deposit-daterange, #userpopup_<?=$sermbno?> .withdraw-daterange, #userpopup_<?=$sermbno?> .cs-daterange, #userpopup_<?=$sermbno?> .inbox-daterange').daterangepicker({
		applyClass: 'bg-slate-600',
		cancelClass: 'btn-light',
		locale: language[_language].calendar.locale
	});

	$("#userpopup_<?=$sermbno?> .moneylog-daterangefrom").datepicker({ 
		dateFormat: 'yy-mm-dd'
	});
	$("#userpopup_<?=$sermbno?> .moneylog-daterangeto").datepicker({ 
		dateFormat: 'yy-mm-dd'
	});

	$.datepicker.regional['cs'] = {
		closeText: "닫기",
		prevText: "이전달",
		nextText: "다음달",
		currentText: "오늘",
		monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월","7월", "8월", "9월", "10월", "11월", "12월" ],
		monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월",
		"7월", "8월", "9월", "10월", "11월", "12월" ],
		dayNames: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
		dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
		weekHeader: "주",
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "년"
	};

	$.datepicker.setDefaults($.datepicker.regional['cs']);


	
	function showBetinfo2_<?=$sermbno?>(no, betcode, gametype, count){
		var rowparent = document.getElementById("trjulsparent_"+no);
		var row = document.getElementById("trjuls_"+no);
		if(rowparent.classList.contains('info-active')){
			rowparent.classList.remove("info-active");
			row.classList.remove("juls-active"); 
			row.classList.add("juls-inactive"); 
			rowparent.setAttribute("style","");
		}
		else{
			rowparent.classList.add("info-active");
			row.classList.remove("juls-inactive"); 
			row.classList.add("juls-active"); 
			rowparent.setAttribute("style","background-color: #8e989c;color: #fff !important;border: 1px solid #707070;border-bottom: none;");
		}	

	}

	function showBetinfo22_<?=$sermbno?>(no, betcode, gametype, count){
		var rowparent = document.getElementById("trjulsparent_"+no);
		var row = document.getElementById("trjuls_"+no);
		var td = document.getElementById("tdjuls_"+no);
		if(rowparent.classList.contains('info-active')){
			rowparent.classList.remove("info-active");
			row.classList.remove("juls-active"); 
			row.classList.add("juls-inactive"); 
			rowparent.setAttribute("style","");
		}
		else{
			rowparent.classList.add("info-active");
			row.classList.remove("juls-inactive"); 
			row.classList.add("juls-active"); 
			rowparent.setAttribute("style","background-color: #8e989c;color: #fff !important;border: 1px solid #707070;border-bottom: none;");

			var adr = "bet_list.php";
			var sendData = {"jobtype":"getgameinfo" , "rsno":no,"betcode":betcode, "scdpd":gametype};
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				td.innerHTML =  data ;
			}});
		}	

	}



	jQuery(document).ready(function(){
		
		//iplog
		jQuery('#iplog_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#iplog_<?=$sermbno?>_length').css("display", "block");
		jQuery('#iplog_<?=$sermbno?>_length').css("float", "right");
		jQuery('#iplog_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#iplog_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#iplog_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#iplog_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#iplog_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//moneylog
		jQuery('#moneylog_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#moneylog_<?=$sermbno?>_length').css("display", "block");
		jQuery('#moneylog_<?=$sermbno?>_length').css("float", "right");
		jQuery('#moneylog_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#moneylog_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#moneylog_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#moneylog_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#moneylog_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//pointlog
		jQuery('#pointlog_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#pointlog_<?=$sermbno?>_length').css("display", "block");
		jQuery('#pointlog_<?=$sermbno?>_length').css("float", "right");
		jQuery('#pointlog_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#pointlog_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#pointlog_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#pointlog_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#pointlog_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//depositable
		jQuery('#depositable_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#depositable_<?=$sermbno?>_length').css("display", "block");
		jQuery('#depositable_<?=$sermbno?>_length').css("float", "right");
		jQuery('#depositable_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#depositable_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#depositable_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#depositable_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#depositable_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//withdrawtable
		jQuery('#withdrawtable_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#withdrawtable_<?=$sermbno?>_length').css("display", "block");
		jQuery('#withdrawtable_<?=$sermbno?>_length').css("float", "right");
		jQuery('#withdrawtable_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#withdrawtable_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#withdrawtable_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#withdrawtable_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#withdrawtable_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//cstable
		jQuery('#cstable_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#cstable_<?=$sermbno?>_length').css("display", "block");
		jQuery('#cstable_<?=$sermbno?>_length').css("float", "right");
		jQuery('#cstable_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#cstable_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#cstable_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#cstable_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#cstable_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//inboxtable
		jQuery('#inboxtable_<?=$sermbno?>_length').css("position", "relative");
		jQuery('#inboxtable_<?=$sermbno?>_length').css("display", "block");
		jQuery('#inboxtable_<?=$sermbno?>_length').css("float", "right");
		jQuery('#inboxtable_<?=$sermbno?>_length').css("margin", "0 0 1.25rem 1.25rem");
		jQuery('#inboxtable_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#inboxtable_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#inboxtable_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#inboxtable_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");

		//betlogtable
		jQuery('#betlogtable_<?=$sermbno?>_filter').css("position", "relative");
		jQuery('#betlogtable_<?=$sermbno?>_filter').css("display", "block");
		jQuery('#betlogtable_<?=$sermbno?>_filter').css("float", "left");
		jQuery('#betlogtable_<?=$sermbno?>_filter').css("margin", "0 0 1.25rem 1.25rem");


		
		//mybetting
		jQuery("html body").on("click","#userpopup_<?=$sermbno?> .betting-tab-wrapper .mybettingtab",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			jQuery(this).parent().find(".mybettingtab").removeClass("active");
			jQuery(this).addClass("active");
			var target = jQuery(this).attr("data-target");
			jQuery("#userpopup_<?=$sermbno?> .betting-tab-content-wrapper").find(".mybettingtab-content").removeClass("active");
			jQuery("#userpopup_<?=$sermbno?> "+target).addClass("active");
		});

		//user details

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.memo-settings-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if(confirm("Add Memo?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.memo-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.memo-userid").val();
				var memo 		= jQuery("#userpopup_<?=$sermbno?> textarea.memo-content").val();
				var data = {
					jobtype: jobtype,
					userid: userid,
					memo: memo
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.live-settings-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();

			if(confirm("Change live settings?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.live-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.live-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.live-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.live-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.live-maxwin").val();
				var iu_custom_live = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_live").is(":checked")){
					iu_custom_live = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_live: iu_custom_live
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.minigame-settings-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();

			if(confirm("Change minigame settings?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.minigame-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.minigame-maxwin").val();
				var iu_custom_minigame = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_minigame").is(":checked")){
					iu_custom_minigame = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_minigame: iu_custom_minigame
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.prematchkor-settings-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();

			if(confirm("Change prematch KR settings?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-maxwin").val();
				var iu_custom_prematch_kor = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_prematch_kor").is(":checked")){
					iu_custom_prematch_kor = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_prematch_kor: iu_custom_prematch_kor
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.prematch-settings-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();

			if(confirm("Change prematch EU settings?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.prematch-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.prematch-maxwin").val();
				var iu_custom_prematch_eu = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_prematch_eu").is(":checked")){
					iu_custom_prematch_eu = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_prematch_eu: iu_custom_prematch_eu
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.userinfo-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if(confirm("Change password?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.user-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.user-userid").val();
				var password 	= jQuery("#userpopup_<?=$sermbno?> input.user-new-password").val();
				var wpassword 	= jQuery("#userpopup_<?=$sermbno?> input.user-new-wpassword").val();
				var code 		= jQuery("#userpopup_<?=$sermbno?> input.user-new-code").val();

				if(password == "" && wpassword == "" && code == ""){
					alert("시스템에러로 처리하지 못했습니다");
				}else{
					var data = {
						jobtype: jobtype,
						userid: userid,
						password: password,
						wpassword: wpassword,
						code: code
					};
					var adr = "_ajax_game_adds_showhideset.php";
					$.ajax({type:"POST", url:adr , data:data , success:function(data){
						console.log(data);
						var data = JSON.parse(data);
						if(data.message == "success"){
							alert("처리되었습니다");
						}else{
							alert("시스템에러로 처리하지 못했습니다");
						}
					}});
				}
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.userlevel-button",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if(confirm("Update user information?")){
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.userlevel-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-userid").val();
				var userlevel 	= jQuery("#userpopup_<?=$sermbno?> select.userlevel-level").val();
				var memtype 	= jQuery("#userpopup_<?=$sermbno?> select.userlevel-memtype").val();
				var status 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-status").val();
				var ccode 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-country").val();
				var phone 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-phone").val();
				var name 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-name").val();
				var bank 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-bank").val();
				var account 	= jQuery("#userpopup_<?=$sermbno?> input.userlevel-account").val();
				var block 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-block").val();
				var recommender 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-recommend").val();

				var minfolder_eu 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_eu").val();
				var minfolder_kr 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_kr").val();
				var minfolder_live 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_live").val();

				var block_prematcheu 	= 0;
				var block_prematchkor 	= 0;
				var block_live 			= 0;
				var block_minigame 		= 0;
				var block_casino 		= 0;
				var block_slot 			= 0;

				if(jQuery("#userpopup_<?=$sermbno?> input.block_prematcheu").is(":checked")){
					block_prematcheu = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_prematchkor").is(":checked")){
					block_prematchkor = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_live").is(":checked")){
					block_live = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_minigame").is(":checked")){
					block_minigame = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_casino").is(":checked")){
					block_casino = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_slot").is(":checked")){
					block_slot = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					userlevel: userlevel,
					memtype: memtype,
					status: status,
					phone: phone,
					ccode: ccode,
					name: name,
					bank: bank,
					account: account,
					block: block,
					recommender: recommender,
					minfolder_eu: minfolder_eu,
					minfolder_kr: minfolder_kr,
					minfolder_live: minfolder_live,
					block_prematcheu: block_prematcheu,
					block_prematchkor: block_prematchkor,
					block_live: block_live,
					block_minigame: block_minigame,
					block_casino: block_casino,
					block_slot: block_slot
				};

				console.log(jobtype)
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("처리되었습니다");
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});
			}
		});


		var moneylogfilter_<?=$sermbno?> 		= null;
		var pointlogfilter_<?=$sermbno?> 		= null;
		var iplogfilter_<?=$sermbno?> 			= null;
		var depositablefilter_<?=$sermbno?> 	= null;
		var withdrawtablefilter_<?=$sermbno?> 	= null;
		var cstablefilter_<?=$sermbno?> 		= null; 	
		var inboxtablefilter_<?=$sermbno?> 		= null; 	


		jQuery("#userpopup_<?=$sermbno?> .moneylog-daterange").on("change",function(){
			moneylogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'moneylog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .moneylog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[7] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(moneylogfilter_<?=$sermbno?>);
			moneylogtable_<?=$sermbno?>.draw();
		});

		jQuery("#userpopup_<?=$sermbno?> .pointlog-daterange").on("change",function(){
			pointlogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'pointlog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .pointlog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[5] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(pointlogfilter_<?=$sermbno?>);
			pointlogtable_<?=$sermbno?>.draw();
		});

		jQuery("#userpopup_<?=$sermbno?> .iplog-daterange").on("change",function(){
			iplogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'iplog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .iplog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(iplogfilter_<?=$sermbno?>);
			iplogtable_<?=$sermbno?>.draw();
		});

		// jQuery("#userpopup_<?=$sermbno?> .betlog-daterange").on("change",function(){
		// 	betlogdate = jQuery("#userpopup_<?=$sermbno?> .deposit-daterange").val();
			
			
		// 	console.log(betlogdate)
		// });

		depositablefilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
			if (settings.nTable.id !== 'depositable_<?=$sermbno?>'){
				return true;
			}
			var ipdate = jQuery("#userpopup_<?=$sermbno?> .deposit-daterange").val();
			ipdate = ipdate.split(" - ");
			var min = new Date(ipdate[0]);
			var max = new Date(ipdate[1]);
			var date = new Date( data[10] );
			if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
				return true;
			}
			return false;
		}
		jQuery.fn.dataTable.ext.search.push(depositablefilter_<?=$sermbno?>);
		depositable_<?=$sermbno?>.draw();

		jQuery("#userpopup_<?=$sermbno?> .deposit-daterange").on("change",function(){
			
			depositable_<?=$sermbno?>.draw();
		});

		withdrawtablefilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
			if (settings.nTable.id !== 'withdrawtable_<?=$sermbno?>'){
				return true;
			}
			var ipdate = jQuery("#userpopup_<?=$sermbno?> .withdraw-daterange").val();
			ipdate = ipdate.split(" - ");
			var min = new Date(ipdate[0]);
			var max = new Date(ipdate[1]);
			var date = new Date( data[10] );
			if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
				return true;
			}
			return false;
		}
		jQuery.fn.dataTable.ext.search.push(withdrawtablefilter_<?=$sermbno?>);
		withdrawtable_<?=$sermbno?>.draw();

		jQuery("#userpopup_<?=$sermbno?> .withdraw-daterange").on("change",function(){
			withdrawtable_<?=$sermbno?>.draw();
		});

		jQuery("#userpopup_<?=$sermbno?> .cs-daterange").on("change",function(){
			cstablefilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'cstable_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .cs-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(cstablefilter_<?=$sermbno?>);
			cstable_<?=$sermbno?>.draw();
		});

		jQuery("#userpopup_<?=$sermbno?> .inbox-daterange").on("change",function(){
			inboxtablefilter_<?=$sermbno?> = function(settings, data, dataIndex) {
				if (settings.nTable.id !== 'inboxtable_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .inbox-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(inboxtablefilter_<?=$sermbno?>);
			inboxtable_<?=$sermbno?>.draw();
		});

		jQuery("#userpopup_<?=$sermbno?> span.reload-balance").click(function(e){
			e.stopImmediatePropagation();
			jQuery('#userpopup_<?=$sermbno?> input.user-cash-now').val('.....');
			jQuery('#userpopup_<?=$sermbno?> input.user-point-now').val('.....');
			var adr = "_api_process_tings_01.php";
			var sermbno = parseInt(<?=$sermbno?>);
			var sendData = {"jobtype":"fetchBalance", "sermbno":sermbno};
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				var data = JSON.parse(data);

				jQuery("#userpopup_<?=$sermbno?> input.user-cash-now").val(addCommas_<?=$sermbno?>(data.UserCashNow)+"원");
				jQuery("#userpopup_<?=$sermbno?> input.user-point-now").val(addCommas_<?=$sermbno?>(data.UserPointNow)+"P");
			}});
		});

		jQuery("#userpopup_<?=$sermbno?> span.reload-casino").click(function(e){
			e.stopImmediatePropagation();
			reloadCasino_<?=$sermbno?>();
			reloadSlot_<?=$sermbno?>();
		});

		jQuery("#userpopup_<?=$sermbno?> span.reload-slot").click(function(e){
			e.stopImmediatePropagation();
			reloadCasino_<?=$sermbno?>();
			reloadSlot_<?=$sermbno?>();
		});

		jQuery("#userpopup_<?=$sermbno?> .casino-connect-real").click(function(e){
			e.stopImmediatePropagation();
			var target      = jQuery(this).attr("data-id");
			var adr         = "_ajax_game_adds_showhideset.php";
			var sendData    = { jobtype: "casinoConnect", id: target };
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				console.log(data);
				var data = JSON.parse(data);
				if(data.message == 'success'){
					alert("카지노 계정생성 완료");
				}else{
					alert("카지노 계정생성 실패");
				}
			}});
		});


		jQuery("#userpopup_<?=$sermbno?> .slot-connect-real").click(function(e){
			e.stopImmediatePropagation();
			var target      = jQuery(this).attr("data-id");
			var adr         = "_ajax_game_adds_showhideset.php";
			var sendData    = { jobtype: "slotConnect", id: target };
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				var data = JSON.parse(data);
				if(data.message == 'success'){
					alert("카지노 계정생성 완료");
				}else{
					alert("카지노 계정생성 실패");
				}
			}});
		});


		//message script

		var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
       	tinymce.init({
        selector: '#inbox_notice_content_<?=$sermbno?>',
        plugins: 'print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
        menubar: 'file edit view insert format tools table tc help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen preview print | image link anchor codesample | ltr rtl | showcomments addcomment',
        image_advtab: true,
        height: 350,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
        content_style: '.mymention{ color: gray; }',
        contextmenu: 'link image imagetools table configurepermanentpen',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            }
        });

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> .inbox-popup-message",function(e){
			e.stopImmediatePropagation();
            var target = jQuery(this).attr("data-target");
			tinymce.get("inbox_notice_content_<?=$sermbno?>").setContent(""); 
			jQuery("#inbox_notice_content_<?=$sermbno?>").html("");
			jQuery('#userpopup_<?=$sermbno?> select.user-list').val(target).trigger('change');
			jQuery('#userpopup_<?=$sermbno?> select[name^="level-list"] option:selected').attr("selected",null);
			jQuery("#userpopup_<?=$sermbno?> input.message-title").val("");
			jQuery("#userpopup_<?=$sermbno?> input.edit_target").val("");
			jQuery("#userpopup_<?=$sermbno?> .message-popup.inside-user").show();
        });

		jQuery('#userpopup_<?=$sermbno?> .user-list').select2();

		jQuery("html body").on("change","#userpopup_<?=$sermbno?> select.inbox-form-selection",function(e){
			e.stopImmediatePropagation();
			var e 		= jQuery(this).val();
			var form 	= jQuery("#form_inbox_" + e).html();
			tinymce.get("inbox_notice_content_<?=$sermbno?>").setContent(form); 
			jQuery("#inbox_notice_content_<?=$sermbno?>").html(form);
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> #inboxtable_<?=$sermbno?> a.message-delete-me",function(e){
			e.stopImmediatePropagation();
			if(confirm("Delete this message?")){
				var row = inboxtable_<?=$sermbno?>.row( jQuery(this).parents('tr') );
				var target  = jQuery(this).attr("data-target");
				var adr     = "_ajax_game_adds_showhideset.php";
				var datas   = {
					jobtype: "new-delete-message",
					target: target
				};
				var myparent = jQuery(this).parent().parent();
				jQuery.ajax({type:"POST", url:adr , data:datas , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						row.remove().draw();
						alert("Message Deleted");
					}
				}});
			}
		});

		jQuery("html body").on("click", "#userpopup_<?=$sermbno?> #inboxtable_<?=$sermbno?> a.message-edit-me",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			var target  = jQuery(this).attr("data-target");
            var adr     = "_ajax_game_adds_showhideset.php";
            var datas   = {
                jobtype: "new-edit-message",
                target: target
            };
            jQuery.ajax({type:"POST", url:adr , data:datas , success:function(data){
                var data = JSON.parse(data);

				tinymce.get("inbox_notice_content_<?=$sermbno?>").setContent(data.data.content); 
                jQuery("#inbox_notice_content_<?=$sermbno?>").html(data.data.content);
                jQuery('#userpopup_<?=$sermbno?> select.user-list').val(data.data.userlist).trigger('change');
                jQuery('#userpopup_<?=$sermbno?> select[name^="level-list"] option:selected').attr("selected",null);
                jQuery('#userpopup_<?=$sermbno?> select[name^="level-list"] option[value="'+data.data.targetlevel+'"]').attr("selected","selected");
                jQuery("#userpopup_<?=$sermbno?> input.message-title").val(data.data.title);
                jQuery("#userpopup_<?=$sermbno?> input.edit_target").val(data.data.target);
                jQuery("#userpopup_<?=$sermbno?> .message-popup.inside-user").show();
            }});
		});

		jQuery("#userpopup_<?=$sermbno?> .message-popup.inside-user .popup-header-content svg").click(function(e){
			e.stopImmediatePropagation();
            jQuery("#userpopup_<?=$sermbno?> .message-popup.inside-user").hide();
        });

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> .inbox-send-message",function(e){
			e.stopImmediatePropagation();
            var targetLevel     = jQuery("#userpopup_<?=$sermbno?> .level-list").val();
            var messageTitle    = jQuery("#userpopup_<?=$sermbno?> .message-title").val();
            var messageContent  = jQuery("#userpopup_<?=$sermbno?> #inbox_notice_content_<?=$sermbno?>").val();
            var userList        = jQuery("#userpopup_<?=$sermbno?> .user-list").val();
            var edit_target     = jQuery("#userpopup_<?=$sermbno?> .edit_target").val();
            var datas = {
                targetLevel: targetLevel,
                messageTitle: messageTitle,
                messageContent: messageContent,
                userList: userList,
                edit_target: edit_target,
                jobtype: "new-send-message"
            };

            var adr = "_ajax_game_adds_showhideset.php";
            $.ajax({type:"POST", url:adr , data:datas , success:function(data){
                var data = JSON.parse(data);
                if(data.message == "success"){
                    alert("Message Sent");
					jQuery("#userpopup_<?=$sermbno?> .message-popup.inside-user").hide();
                }else{
                    alert("ERROR! CALL IVAN!!");
                }
            }});
        });

		//cs script

		var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		tinymce.init({
		selector: '#cs_notice_content_<?=$sermbno?>',
		plugins: 'print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
		menubar: 'file edit view insert format tools table tc help',
		toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen preview print | image link anchor codesample | ltr rtl | showcomments addcomment',
		image_advtab: true,
		height: 400,
		image_caption: true,
		quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quicktable',
		noneditable_noneditable_class: 'mceNonEditable',
		spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
		content_style: '.mymention{ color: gray; }',
		contextmenu: 'link image imagetools table configurepermanentpen',
		skin: useDarkMode ? 'oxide-dark' : 'oxide',
		content_css: useDarkMode ? 'dark' : 'default',
			setup: function (editor) {
				editor.on('change', function () {
					tinymce.triggerSave();
				});
			}
		});


		jQuery("#userpopup_<?=$sermbno?> .message-popup-cs .popup-header-content svg").click(function(e){
			e.stopImmediatePropagation();
			jQuery(".message-popup-cs").hide();
		});

		jQuery("html body").on("change","#userpopup_<?=$sermbno?> select.cs-form-selection",function(e){
			e.stopImmediatePropagation();
			var e 		= jQuery(this).val();
			var form 	= jQuery("#form_cs_" + e).html();
			tinymce.get("cs_notice_content_<?=$sermbno?>").setContent(form); 
			jQuery("#cs_notice_content_<?=$sermbno?>").html(form);
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> a.cs-popme",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			var target 		= jQuery(this).attr("data-target");
			var sendData	= {jobtype: "new-edit-cs", target: target};
			var adr 		= "_ajax_game_adds_showhideset.php";
			$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
				var data = JSON.parse(data);
				if(data.message == 'success'){
					jQuery("#userpopup_<?=$sermbno?> input.cs-user-list").val(data.userlist);
					jQuery("#userpopup_<?=$sermbno?> input.cs-message-title").val(data.title);
					jQuery("#userpopup_<?=$sermbno?> textarea.cs-message-content").val(data.content);
					jQuery("#userpopup_<?=$sermbno?> input.cs_edit_target").val(data.target);
					jQuery("#userpopup_<?=$sermbno?> input.cs_edit_user").val(data.user);
					jQuery("#userpopup_<?=$sermbno?> #cs_notice_content_<?=$sermbno?>").html(data.reply);
					tinymce.get("cs_notice_content_<?=$sermbno?>").setContent(data.reply); 
					var attachment = data.attachment.toString().split("/");
					if(attachment.length > 1){
						jQuery("#userpopup_<?=$sermbno?> div.attachment-place").html("");
						for(var x in attachment){
							if(attachment[x] != ""){
								var link = jQuery("<a href='https://vicsports02.com/admin/admin_main.php?pcode=attachment&scdpd=&search_id=&betcode="+attachment[x]+"' target='_blank'>"+attachment[x]+"</a><br/>");
								jQuery("#userpopup_<?=$sermbno?> div.attachment-place").append(link);
							}
						}
					}else{
						jQuery("#userpopup_<?=$sermbno?> div.attachment-place").html("");
					}
					
					jQuery("#userpopup_<?=$sermbno?> .message-popup-cs").show();
				}else{
					alert("ERROR! CALL IVAN!!");
				}
			}});
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> .cs-send-message",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			var messageContent  = jQuery("#userpopup_<?=$sermbno?> #cs_notice_content_<?=$sermbno?>").val();
			var edit_target     = jQuery("#userpopup_<?=$sermbno?> .cs_edit_target").val();
			var edit_user     	= jQuery("#userpopup_<?=$sermbno?> .cs_edit_user").val();
			var datas = {
				messageContent: messageContent,
				user: edit_user,
				edit_target: edit_target,
				jobtype: "new-send-cs"
			};

			var adr = "_ajax_game_adds_showhideset.php";
			$.ajax({type:"POST", url:adr , data:datas , success:function(data){
				console.log(data);
				var data = JSON.parse(data);
				if(data.message == "success"){
					alert("Message Sent");
					jQuery("#userpopup_<?=$sermbno?> .message-popup-cs").hide();
				}else{
					alert("ERROR! CALL IVAN!!");
				}
			}});
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> a.cs-delete-me",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();

			if(confirm("Delete this inquiry?")){
				var row = cstable_<?=$sermbno?>.row( jQuery(this).parents('tr') );
				
				var target  = jQuery(this).attr("data-target");
				var adr     = "_ajax_game_adds_showhideset.php";
				var datas   = {
					jobtype: "new-delete-cs",
					target: target
				};
				var myparent = jQuery(this).parent().parent();
				jQuery.ajax({type:"POST", url:adr , data:datas , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
						alert("Message Deleted");
						row.remove().draw();
					}
				}});
			}
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> input.user-cash-now",function(){
			var id 		= jQuery(this).attr("data-target");
			var balance = jQuery(this).attr("data-balance");
			var username = jQuery(this).attr("data-username");
			var name = jQuery(this).attr("data-name");
			var point 	= jQuery("#userpopup_<?=$sermbno?> input.user-point-now").attr("data-point");
			popupbalance(id,balance,point,username,name);
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> input.user-point-now",function(){
			var id 			= jQuery(this).attr("data-target");
			var point 		= jQuery(this).attr("data-point");
			var username 	= jQuery(this).attr("data-username");
			var name 		= jQuery(this).attr("data-name");
			var balance 	= jQuery("#userpopup_<?=$sermbno?> input.user-cash-now").attr("data-balance");
			popupoints(id,balance,point,username,name);
		});

		jQuery("html body").on("click",".message-popup-close svg",function(e){
			var target = jQuery(this).attr("data-target");
			tinymce.remove('#inbox_notice_content_'+target+'');
			tinymce.remove('#cs_notice_content_'+target+'');

			moneylogtable_<?=$sermbno?>.rows().invalidate().draw();
			pointlogtable_<?=$sermbno?>.rows().invalidate().draw();
			iplogtable_<?=$sermbno?>.rows().invalidate().draw();
			depositable_<?=$sermbno?>.rows().invalidate().draw();
			withdrawtable_<?=$sermbno?>.rows().invalidate().draw();
			cstable_<?=$sermbno?>.rows().invalidate().draw();
			inboxtable_<?=$sermbno?>.rows().invalidate().draw();

			moneylogtable_<?=$sermbno?>.destroy();
			pointlogtable_<?=$sermbno?>.destroy();
			iplogtable_<?=$sermbno?>.destroy();
			depositable_<?=$sermbno?>.destroy();
			withdrawtable_<?=$sermbno?>.destroy();
			cstable_<?=$sermbno?>.destroy();
			inboxtable_<?=$sermbno?>.destroy();

			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(moneylogfilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(pointlogfilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(iplogfilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(depositablefilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(withdrawtablefilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(cstablefilter_<?=$sermbno?>, 1));
			jQuery.fn.dataTable.ext.search.splice(jQuery.fn.dataTable.ext.search.indexOf(inboxtablefilter_<?=$sermbno?>, 1));
			jQuery(this).parent().parent().parent().remove();
		});

		jQuery("html body").on("click","#userpopup_<?=$sermbno?> button.userinfo-button-global",function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if(confirm("Update full information?")){
				//userlevel button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.userlevel-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-userid").val();
				var userlevel 	= jQuery("#userpopup_<?=$sermbno?> select.userlevel-level").val();
				var memtype 	= jQuery("#userpopup_<?=$sermbno?> select.userlevel-memtype").val();
				var status 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-status").val();
				var ccode 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-country").val();
				var phone 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-phone").val();
				var name 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-name").val();
				var bank 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-bank").val();
				var account 	= jQuery("#userpopup_<?=$sermbno?> input.userlevel-account").val();
				var block 		= jQuery("#userpopup_<?=$sermbno?> select.userlevel-block").val();
				var recommender 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-recommend").val();

				var minfolder_eu 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_eu").val();
				var minfolder_kr 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_kr").val();
				var minfolder_live 		= jQuery("#userpopup_<?=$sermbno?> input.userlevel-minfolder_live").val();

				var block_prematcheu 	= 0;
				var block_prematchkor 	= 0;
				var block_live 			= 0;
				var block_minigame 		= 0;
				var block_casino 		= 0;
				var block_slot 			= 0;

				if(jQuery("#userpopup_<?=$sermbno?> input.block_prematcheu").is(":checked")){
					block_prematcheu = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_prematchkor").is(":checked")){
					block_prematchkor = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_live").is(":checked")){
					block_live = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_minigame").is(":checked")){
					block_minigame = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_casino").is(":checked")){
					block_casino = 1;
				}
				if(jQuery("#userpopup_<?=$sermbno?> input.block_slot").is(":checked")){
					block_slot = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					userlevel: userlevel,
					memtype: memtype,
					status: status,
					phone: phone,
					ccode: ccode,
					name: name,
					bank: bank,
					account: account,
					block: block,
					recommender: recommender,
					minfolder_eu: minfolder_eu,
					minfolder_kr: minfolder_kr,
					minfolder_live: minfolder_live,
					block_prematcheu: block_prematcheu,
					block_prematchkor: block_prematchkor,
					block_live: block_live,
					block_minigame: block_minigame,
					block_casino: block_casino,
					block_slot: block_slot
				};

				console.log(jobtype)
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});


				//userinfo button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.user-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.user-userid").val();
				var password 	= jQuery("#userpopup_<?=$sermbno?> input.user-new-password").val();
				var wpassword 	= jQuery("#userpopup_<?=$sermbno?> input.user-new-wpassword").val();
				var code 		= jQuery("#userpopup_<?=$sermbno?> input.user-new-code").val();

				if(password == "" && wpassword == "" && code == ""){
				}else{
					var data = {
						jobtype: jobtype,
						userid: userid,
						password: password,
						wpassword: wpassword,
						code: code
					};
					var adr = "_ajax_game_adds_showhideset.php";
					$.ajax({type:"POST", url:adr , data:data , success:function(data){
						console.log(data);
						var data = JSON.parse(data);
						if(data.message == "success"){
						}else{
							alert("시스템에러로 처리하지 못했습니다");
						}
					}});
				}

				//memo settings button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.memo-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.memo-userid").val();
				var memo 		= jQuery("#userpopup_<?=$sermbno?> textarea.memo-content").val();
				var data = {
					jobtype: jobtype,
					userid: userid,
					memo: memo
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});

				//live settings button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.live-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.live-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.live-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.live-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.live-maxwin").val();
				var iu_custom_live = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_live").is(":checked")){
					iu_custom_live = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_live: iu_custom_live
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});

				//minigame settings button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.minigame-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.minigame-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.minigame-maxwin").val();
				var iu_custom_minigame = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_minigame").is(":checked")){
					iu_custom_minigame = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_minigame: iu_custom_minigame
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});

				//prematch kr settings button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.prematchkor-maxwin").val();
				var iu_custom_prematch_kor = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_prematch_kor").is(":checked")){
					iu_custom_prematch_kor = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_prematch_kor: iu_custom_prematch_kor
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});

				//prematch eu settings button
				var jobtype 	= jQuery("#userpopup_<?=$sermbno?> input.prematch-jobmode").val();
				var userid 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-userid").val();
				var min 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-minbet").val();
				var max 		= jQuery("#userpopup_<?=$sermbno?> input.prematch-maxbet").val();
				var max_win 	= jQuery("#userpopup_<?=$sermbno?> input.prematch-maxwin").val();
				var iu_custom_prematch_eu = 0;
				if(jQuery("#userpopup_<?=$sermbno?> input.iu_custom_prematch_eu").is(":checked")){
					iu_custom_prematch_eu = 1;
				}

				var data = {
					jobtype: jobtype,
					userid: userid,
					min: min,
					max: max,
					max_win: max_win,
					iu_custom_prematch_eu: iu_custom_prematch_eu
				};
				var adr = "_ajax_game_adds_showhideset.php";
				$.ajax({type:"POST", url:adr , data:data , success:function(data){
					var data = JSON.parse(data);
					if(data.message == "success"){
					}else{
						alert("시스템에러로 처리하지 못했습니다");
					}
				}});

				alert("처리되었습니다");
			}
		});
	});

	function reloadCasino_<?=$sermbno?>(){
		jQuery('#userpopup_<?=$sermbno?> input.user-evo-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-micro-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-dream-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-vivo-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-asia-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-gameplay-bal').val('.....');
		var adr = "_api_process_tings_01.php";
		var sermbno = parseInt(<?=$sermbno?>);
		var sendData = {"jobtype":"fetchCasino", "sermbno":sermbno};
		$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
			var data = JSON.parse(data);
			jQuery('#userpopup_<?=$sermbno?> input.user-evo-bal').val(addCommas_<?=$sermbno?>(data.evo_balance)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-micro-bal').val(addCommas_<?=$sermbno?>(data.micro_balance)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-dream-bal').val(addCommas_<?=$sermbno?>(data.dream_balance)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-vivo-bal').val(addCommas_<?=$sermbno?>(data.vivo_balance)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-asia-bal').val(addCommas_<?=$sermbno?>(data.asia_balance)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-gameplay-bal').val(addCommas_<?=$sermbno?>(data.gameplay_balance)+"원");
		}});
	}

	function reloadSlot_<?=$sermbno?>(){
		jQuery('#userpopup_<?=$sermbno?> input.user-pragmatic-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-qtslot-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-fgslot-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-mdslot-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-cq9slot-bal').val('.....');
		jQuery('#userpopup_<?=$sermbno?> input.user-microslot-bal').val('.....');
		var adr = "_api_process_tings_01.php";
		var sermbno = parseInt(<?=$sermbno?>);
		var sendData = {"jobtype":"fetchSlot", "sermbno":sermbno};
		$.ajax({type:"POST", url:adr , data:sendData , success:function(data){
			var data = JSON.parse(data);
			jQuery('#userpopup_<?=$sermbno?> input.user-pragmatic-bal').val(addCommas_<?=$sermbno?>(data.iu_pragmatic)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-qtslot-bal').val(addCommas_<?=$sermbno?>(data.iu_qtslot)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-fgslot-bal').val(addCommas_<?=$sermbno?>(data.iu_fgslot)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-mdslot-bal').val(addCommas_<?=$sermbno?>(data.iu_mdslot)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-cq9slot-bal').val(addCommas_<?=$sermbno?>(data.iu_cq9slot)+"원");
			jQuery('#userpopup_<?=$sermbno?> input.user-microslot-bal').val(addCommas_<?=$sermbno?>(data.iu_microslot)+"원");
		}});
	}

	function addCommas_<?=$sermbno?>(nStr){
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
	function filtertable(){
		var table = $('#userpopup_<?=$sermbno?> #betlogtable_<?=$sermbno?>').DataTable();
		$.ajax({
			type: 'post',
			url: 'user-popup_process2.php',
			data: {id:<?=$sermbno?>, type: 'desc'},
			success: function (data) {
				var rdata = JSON.parse(data);
				rdata.forEach((element, index) => {
					console.log(element)
				});
			}
		});
	}

		function dateFromTo(){
			var starting = jQuery("#serchdatest").val();
			var ending = jQuery("#serchdateen").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_1").val(dt_date);
		}
		function dateFromTo1(){
			var starting = jQuery("#serchdatest1").val();
			var ending = jQuery("#serchdateen1").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_2").val(dt_date);
		}
		function dateFromTo2(){
			var starting = jQuery("#serchdatest2").val();
			var ending = jQuery("#serchdateen2").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_3").val(dt_date);
		}
		function dateFromTo3(){
			var starting = jQuery("#serchdatest3").val();
			var ending = jQuery("#serchdateen3").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_4").val(dt_date);
		}
		function dateFromTo4(){
			var starting = jQuery("#serchdatest4").val();
			var ending = jQuery("#serchdateen4").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#serdate_st_<?=$sermbno?>").val(dt_date);
		}
		function dateFromTo5(){
			var starting = jQuery("#serchdatest5").val();
			var ending = jQuery("#serchdateen5").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#serdate_st_live_<?=$sermbno?>").val(dt_date);
		}
		function dateFromTo6(){
			var starting = jQuery("#serchdatest6").val();
			var ending = jQuery("#serchdateen6").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#serdate_st_minigame_<?=$sermbno?>").val(dt_date);
		}
		function dateFromTo7(){
			var starting = jQuery("#serchdatest7").val();
			var ending = jQuery("#serchdateen7").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_5").val(dt_date);
		}
		function dateFromTo8(){
			var starting = jQuery("#serchdatest8").val();
			var ending = jQuery("#serchdateen8").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_6").val(dt_date);
		}
		function dateFromTo9(){
			var starting = jQuery("#serchdatest9").val();
			var ending = jQuery("#serchdateen9").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_7").val(dt_date);
		}
		function dateFromTo10(){
			var starting = jQuery("#serchdatest10").val();
			var ending = jQuery("#serchdateen10").val();
			var dt_date = starting+" 00:00:00 - "+ending+" 23:59:59";
			jQuery("#datevalinput_10").val(dt_date);
		}
        $("#serchdatest").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest1").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen1").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest2").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen2").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest3").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen3").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest4").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen4").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest5").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen5").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest6").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen6").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest7").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen7").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest8").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen8").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest9").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen9").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdatest10").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});
		$("#serchdateen10").datepicker({ 
			dateFormat: 'yy-mm-dd'
		});

		$.datepicker.regional['cs'] = {
			closeText: "닫기",
			prevText: "이전달",
			nextText: "다음달",
			currentText: "오늘",
			monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월","7월", "8월", "9월", "10월", "11월", "12월" ],
			monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월",
			"7월", "8월", "9월", "10월", "11월", "12월" ],
			dayNames: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
			dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
			dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
			weekHeader: "주",
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: "년"
		};

		$.datepicker.setDefaults($.datepicker.regional['cs']);

		function dateFromToDepositLog(){
			depositable_<?=$sermbno?>.draw();
		}
		function dateFromToWithdrawLog(){
			withdrawtable_<?=$sermbno?>.draw();
		}
		function dateFromToInboxLog(){
			withdrawtable_<?=$sermbno?>.draw();
			inboxtablefilter_<?=$sermbno?> = function(settings, data, dataIndex) {
				if (settings.nTable.id !== 'inboxtable_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .inbox-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(inboxtablefilter_<?=$sermbno?>);
			inboxtable_<?=$sermbno?>.draw();
		}
		function dateFromToCsLog(){
			cstablefilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'cstable_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .cs-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(cstablefilter_<?=$sermbno?>);
			cstable_<?=$sermbno?>.draw();
		}

		function dateFromToPrematchLog(){
			jQuery("#userpopup_<?=$sermbno?> #showListBody_<?=$sermbno?>").html("");
			prematchpage_<?=$sermbno?> 	= 0;
			prematchshowNum_<?=$sermbno?> = 0;
			getPrematch_<?=$sermbno?>(<?=$sermbno?>);
		}
		function dateFromToLiveLog(){
			jQuery("#userpopup_<?=$sermbno?> #showListBodylive_<?=$sermbno?>").html("");
			livepage_<?=$sermbno?> 	= 0;
			liveshowNum_<?=$sermbno?> = 0;
			getLive_<?=$sermbno?>(<?=$sermbno?>);
		}
		function dateFromToMiniLog(){
			jQuery("#userpopup_<?=$sermbno?> #showListBodyminigame_<?=$sermbno?>").html("");
			minigamepage_<?=$sermbno?> 	= 0;
			minigameshowNum_<?=$sermbno?> = 0;
			getMinigame_<?=$sermbno?>(<?=$sermbno?>);
		}
		function dateFromToIpLog(){
			iplogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'iplog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .iplog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[4] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(iplogfilter_<?=$sermbno?>);
			iplogtable_<?=$sermbno?>.draw();
		}
		function dateFromToMoneyLog(){
			
		moneylogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'moneylog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .moneylog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[7] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(moneylogfilter_<?=$sermbno?>);
			moneylogtable_<?=$sermbno?>.draw();
		}

		function dateFromToPointLog(){
			
			
		pointlogfilter_<?=$sermbno?> = function(settings, data, dataIndex ) {
				if (settings.nTable.id !== 'pointlog_<?=$sermbno?>'){
					return true;
				}
				var ipdate = jQuery("#userpopup_<?=$sermbno?> .pointlog-daterange").val();
				ipdate = ipdate.split(" - ");
				var min = new Date(ipdate[0]);
				var max = new Date(ipdate[1]);
				var date = new Date( data[5] );
				if((min === null && max === null) || (min === null && date <= max) || (min <= date && max === null) || (min <= date && date <= max)){
					return true;
				}
				return false;
			}
			jQuery.fn.dataTable.ext.search.push(pointlogfilter_<?=$sermbno?>);
			pointlogtable_<?=$sermbno?>.draw();
			}





</script>

