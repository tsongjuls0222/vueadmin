<?
	session_start();
	header('Content-Type: text/html; charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	include_once("../do_con_config.php");
	include_once("admin_share.php");
	


	$jobtype = trim($_REQUEST["jobtype"]);
	$jobtypere = trim($_REQUEST["jobtypere"]);
	$parentno = intval($_REQUEST["parentno"]);
	$accountno = intval($_REQUEST["accountno"]);
	//var adr = "_ajax_game_adds_showhideset.php";
	//var sendData = {"jobtype":"subgamesetaddhidesetto", "gameno":gno , "datas": ""};
	//var sendDatas = {"jobtype":"realtimesetttingsval", "lock_sel": [], "hide_sel":[],"multy_sel":[] , "lock_nosel": [], "hide_nosel":[],"multy_nosel":[]};
	//var sendData= {"jobtype":"set_realtime_endtime_notuse" , "data":not_show.toString()};
	$datas = trim($_REQUEST["datas"]);
	$data = json_decode($datas, true);
	$realFnSet 			= "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_gamesetting.txt";
	$realFnSetPrematch 	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematch_gamesetting.txt";
	function getDtata($obj){
		return array();
	}

	if($jobtype == "set_prematch_market_notuse"){

		$activeSports = array(); 
		$sportskey = $_REQUEST["sportskey"];
		$sportskey = explode(",",$sportskey);
		foreach($sportskey as $sport){
			$sport = explode("_",$sport);
			$activeSports[$sport[0]]["sportsKorName"] 	= $sport[1];
			$activeSports[$sport[0]]["sportsName"] 		= $sport[2];
			$activeSports[$sport[0]]["game_section"] 	= $sport[3];
		}


		$activeMarket = array(); 
		$marketkey = $_REQUEST["marketkey"];
		$marketkey = explode(",",$marketkey);
		foreach($marketkey as $market){
			$market = explode("_",$market);
			$activeMarket[$market[0]]["korname"] 		= $market[1];
			$activeMarket[$market[0]]["name"] 			= $market[2];
			$activeMarket[$market[0]]["game_section"] 	= $market[3];
		}

		$marketData = $_REQUEST["market"];
		$marketData = explode(",",$marketData);
		$x = 0;
		foreach($marketData as $marketDetails){
			$marketDetails = explode("_",$marketDetails);
			if($x == 0){
				$sportsID = $marketDetails[0];
			}else{
				if($sportsID != $marketDetails[0]){
					$x = 0;
					$sportsID = $marketDetails[0];
				}
			}
			
			$activeMarket[$marketDetails[0]]["market"][$x]["market_id"] 	= $marketDetails[5];
			$activeMarket[$marketDetails[0]]["market"][$x]["name"] 			= $marketDetails[3];
			$activeMarket[$marketDetails[0]]["market"][$x]["korname"] 		= $marketDetails[4];
			$activeMarket[$marketDetails[0]]["market"][$x]["main_code"] 	= $marketDetails[1];
			$activeMarket[$marketDetails[0]]["market"][$x]["sub_code"] 		= $marketDetails[2];

			$x++;
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/activeSports.json";
		saveDataToFile($realFnSet, json_encode($activeSports));

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematch_market_notuse.json";
		saveDataToFile($realFnSet, json_encode($activeMarket));
		//echo json_encode($activeMarket);

		$delete = "delete from activeMarket";
		$result = $mysqli->query($delete);

		$delete = "delete from game_type_tits";
		$result = $mysqli->query($delete);

		try{
			foreach($activeMarket as $sportid => $details){
				if(isset($details["market"])){
					foreach($details["market"] as $marketkey => $marketDetails){
						$marketKey = $details["game_section"]."_".$marketDetails["main_code"]."_".$marketDetails["sub_code"];
						$insert = "insert into activeMarket (game_section,mainType,subType,marketKey) values (".$details["game_section"].",'".$marketDetails["main_code"]."','".$marketDetails["sub_code"]."','".$marketKey."')";
						$result = $mysqli->query($insert);

						$insertGameTits = "insert into game_type_tits (game_code, game_cod_kor, game_sec, game_sec_kor, game_expp, main_code, sub_code) values (".$details["game_section"].",'".$details["korname"]."',6,'_extra_odds','".$marketDetails["korname"]."','".$marketDetails["main_code"]."','".$marketDetails["sub_code"]."')";
						$resultTits 	= $mysqli->query($insertGameTits);
					}
				}
			}
		}catch(Exception $e){
			echo $e;
		}

		
		exit;
	}

	// if($jobtype == "set_prematch_endtime_notuse"){
	// 	$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematch_endtime_notuse.txt";
	// 	$data = trim($_REQUEST["data"]);	
	// 	$data = explode(",", $data);
	// 	saveDataToFile($realFnSet, serialize($data));
	// 	echo json_encode($data); 
	// 	exit;
	// }

	if($jobtype == "set_prematch_endtime_notuse"){
		//$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematch_endtime_notuse.txt";
		$data = trim($_REQUEST["data"]);	
		$data = explode(",", $data);
		// saveDataToFile($realFnSet, serialize($data));
		echo json_encode($data); 
		
		

		for($i = 0; $i< $data; $i++){
			$query = "
			UPDATE leagu_list
			set league_sort = '".$i."'
			where leagu_id = '".$data[$i]."'
			";
		}

		exit;



	}




	
	if($jobtype == "set_realtime_market_notuse"){
		/*
		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_market_notuse.txt";
		$data = trim($_REQUEST["data"]);	
		$data = explode(",", $data);
		saveDataToFile($realFnSet, serialize($data));
		echo json_encode($data); 
		exit;
		*/

		$activeSports = array(); 
		$sportskey = $_REQUEST["sportskey"];
		$sportskey = explode(",",$sportskey);
		foreach($sportskey as $sport){
			$sport = explode("_",$sport);
			$activeSports[$sport[0]]["sportsKorName"] 	= $sport[1];
			$activeSports[$sport[0]]["sportsName"] 		= $sport[2];
			$activeSports[$sport[0]]["game_section"] 	= $sport[3];
		}


		$activeMarket = array(); 
		$marketkey = $_REQUEST["marketkey"];
		$marketkey = explode(",",$marketkey);
		foreach($marketkey as $market){
			$market = explode("_",$market);
			$activeMarket[$market[0]]["korname"] 		= $market[1];
			$activeMarket[$market[0]]["name"] 			= $market[2];
			$activeMarket[$market[0]]["game_section"] 	= $market[3];
		}

		$marketData = $_REQUEST["market"];
		$marketData = explode(",",$marketData);
		$x = 0;
		foreach($marketData as $marketDetails){
			$marketDetails = explode("_",$marketDetails);
			if($x == 0){
				$sportsID = $marketDetails[0];
			}else{
				if($sportsID != $marketDetails[0]){
					$x = 0;
					$sportsID = $marketDetails[0];
				}
			}
			
			$activeMarket[$marketDetails[0]]["market"][$x]["market_id"] 	= $marketDetails[5];
			$activeMarket[$marketDetails[0]]["market"][$x]["name"] 			= $marketDetails[3];
			$activeMarket[$marketDetails[0]]["market"][$x]["korname"] 		= $marketDetails[4];
			$activeMarket[$marketDetails[0]]["market"][$x]["main_code"] 	= $marketDetails[1];
			$activeMarket[$marketDetails[0]]["market"][$x]["sub_code"] 		= $marketDetails[2];

			$x++;
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/liveActiveSports.json";
		saveDataToFile($realFnSet, json_encode($activeSports));

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/liveActiveMarket.json";
		saveDataToFile($realFnSet, json_encode($activeMarket));
		//echo json_encode($activeMarket);
		
		exit;
	}

	if($jobtype == "get_realtime_market_notuse"){
		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_market_notuse.txt";
		$data = readFileFrom($realFnSet, true);
		echo json_encode($data); 
		exit;
	}

	if($jobtype == "set_realtime_endtime_notuse"){
		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_endtime_notuse.txt";
		$data = trim($_REQUEST["data"]);	
		$data = explode(",", $data);
		saveDataToFile($realFnSet, serialize($data));
		echo json_encode($data); 
		exit;
	}

	if($jobtype == "get_realtime_endtime_notuse"){
		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_endtime_notuse.txt";
		$data = readFileFrom($realFnSet, true);
		echo json_encode($data); 
		exit;
	}


	if($jobtype == "realtimesetttingsgetread"){
		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/realtime_gamesetting.txt";
		$data = readFileFrom($realFnSet, true);
		echo json_encode($data); 
		exit;
	}
	if($jobtype == "realtimesetttingsval"){
		$lock_sel = trim($_REQUEST["lock_sel"]);					$lock_sel = explode(",", $lock_sel);
		$hide_sel = trim($_REQUEST["hide_sel"]);					$hide_sel = explode(",", $hide_sel);
		$multy_sel = trim($_REQUEST["multy_sel"]);				$multy_sel = explode(",", $multy_sel);
		$lock_nosel = trim($_REQUEST["lock_nosel"]);			$lock_nosel = explode(",", $lock_nosel);
		$hide_nosel = trim($_REQUEST["hide_nosel"]);			$hide_nosel = explode(",", $hide_nosel);
		$multy_nosel = trim($_REQUEST["multy_nosel"]);		$multy_nosel = explode(",", $multy_nosel);
		
		makeList( 1, $lock_sel, $lock_nosel);
		makeList( 2, $hide_sel, $hide_nosel);
		makeList( 3, $multy_nosel, $multy_sel);
		$sql="SELECT * FROM vicsportlive.game_realtime_limitset where date_format(reg_date,'%Y-%m-%d') >= ( NOW() - INTERVAL 1 day) ";
		$result = $mysqli -> query($sql);
		$row_cnt = $result -> num_rows;
		$noGlist = array("game_lock"=>array(),"gmae_hide"=>array(),"no_multy"=>array());
		while( $Rs = $result -> fetch_array() ) {
			$eaty = $Rs["settype"];
			$eano = $Rs["gameno"];
			if( $eaty == "game_lock") array_push($noGlist["game_lock"] , $eano);
			if( $eaty == "gmae_hide") array_push($noGlist["gmae_hide"] , $eano);
			if( $eaty == "no_multy") array_push($noGlist["no_multy"] , $eano);
		}
		saveDataToFile($realFnSet, serialize($noGlist));
		echo json_encode($noGlist); 

		$trackernewlist = $_REQUEST["trackerid"];

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/livetracker.json";
		saveDataToFile($realFnSet, json_encode($trackernewlist));

		foreach($trackernewlist as $key => $value){
			if($value["tracker_id"] != "" || $value["tracker_id"] != null){
				$trackerid 	= $value["tracker_id"];
				$game_id 	= $key;
				$update 	= "INSERT INTO tracker_list (game_id, tracker_id) VALUES({$game_id},{$trackerid}) ON DUPLICATE KEY UPDATE tracker_id={$trackerid}";
				$RT 		= $mysqli->query($update);
			}
		}

		
		$trackerlist 	= array();
		$prematchtrack 	= "select * from tracker_list where tracker_id IS NOT NULL and tracker_id <> 0";
		$result 		= $mysqli->query($prematchtrack);
		$row_cnt 		= $result->num_rows;
		if($row_cnt > 0){
			while($Rs = $result->fetch_array()){
				$trackerlist[$Rs["game_no"]]["game_id"] 	= $Rs["game_id"];
				$trackerlist[$Rs["game_no"]]["tracker_id"] 	= $Rs["trackerid"];
			}
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematchtracker.json";
		saveDataToFile($realFnSet, json_encode($trackerlist));

	
		exit;
	}
	function makeList($act, $sel, $nosel){
		global $mysqli;		
		for($x = 0; $x < count($sel); $x++){
			$ea = $sel[$x];
			if($act == 1 ) $hdd = "game_lock";
			if($act == 2 ) $hdd = "gmae_hide";
			if($act == 3 ) $hdd = "no_multy";
			$sqlCh = "Select num from game_realtime_limitset where settype='{$hdd}' and gameno='{$ea}'";
			$result = $mysqli -> query($sqlCh);
			$row_cnt = $result -> num_rows;
			if ($row_cnt < 1 ) { 
				$sqlIn = "Insert into game_realtime_limitset set settype='{$hdd}', gameno='{$ea}', reg_date=now()";
				$RT = $mysqli -> query($sqlIn);
			}
		}
		
		for($x = 0; $x < count($nosel); $x++){
			$ea = $nosel[$x];
			if($act == 1 ) $hdd = "game_lock";
			if($act == 2 ) $hdd = "gmae_hide";
			if($act == 3 ) $hdd = "no_multy";
			$sqlCh = "Delete from game_realtime_limitset where settype='{$hdd}' and gameno='{$ea}'";
			$DRT = $mysqli -> query($sqlCh);
		}
	}

	if($jobtype == "Maingamesetaddhidesetto"){
		$trackerlist = $_REQUEST["tracker"];
		print_r($trackerlist);

		for($x = 0 ; $x < count($data);$x++){
			$eaLIne 		= $data[$x];
			$eakey			= $eaLIne["eakey"];
            $isother		= intval($eaLIne["isother"]);
            $oddset_home	= $eaLIne["oddset_home"];
            $oddset_draw	= $eaLIne["oddset_draw"];
            $oddset_away	= $eaLIne["oddset_away"];

            $gamelock	= $eaLIne["gamelock"];
			$gamehide	= $eaLIne["gamehide"];            
			$hidesub	= $eaLIne["hidesub"];
			$trackerid	= $eaLIne["trackerid"];
            $multisel=intval($eaLIne["multisel"]);
			
			if( $gamelock != "BLOCK" && $gamelock != "OK") $gamelock = "OK";
			if( $gamehide != "show" && $gamehide != "hide") $gamehide = "show";
			if( $hidesub != "show" && $hidesub != "hide") $hidesub = "show";
			if( $multisel > 1 || $multisel < 0 ) $multisel = 1;
			if( $oddset_home == "-" || floatval($oddset_home <= 0)) $oddset_home = "-1";
			if( $oddset_draw == "-" || floatval($oddset_draw <= 0)) $oddset_draw = "-1";
			if( $oddset_away == "-" || floatval($oddset_away <= 0)) $oddset_away = "-1";
		
			// is_lock, ok_show, sub_hide, ok_multysel, fix_homeodds, fix_drawodds, fix_awayodds
			
			$sqlEa = "Update game_list set ";
			$sqlEa.=" fix_homeodds='".floatval($oddset_home)."', ";
			$sqlEa.=" fix_drawodds='".floatval($oddset_draw)."', ";
			$sqlEa.=" fix_awayodds='".floatval($oddset_away)."', ";
			$sqlEa.=" is_lock='".$gamelock."', ";
			$sqlEa.=" ok_show='".$gamehide."', ";
			$sqlEa.=" sub_hide='".$hidesub."', ";
			$sqlEa.=" ok_multysel='".$multisel."' ";
			$sqlEa.=" where game_no='{$eakey}'";
			$RT = $mysqli -> query($sqlEa);
			echo $sqlEa.  " | ". $RT . PHP_EOL;

			$update 	= "INSERT INTO tracker_list (game_id, tracker_id) VALUES({$eakey},{$trackerid}) ON DUPLICATE KEY UPDATE tracker_id={$trackerid}";
			$RT 		= $mysqli->query($update);

			$homeScore = $eaLIne["homeScore"];
			$awayScore = $eaLIne["awayScore"];
			$sportType = $eaLIne["sportType"];

			if($homeScore != "-" && $awayScore != "-"){
				if(intval($homeScore) >= 0 || intval($awayScore) >= 0){
					$checkResult = "select count(game_no) from game_results where game_no='{$eakey}'";
					$result = $mysqli->query($checkResult);
					$Rs		= $result->fetch_array();
					$totCnt = $Rs[0];
	
					if($totCnt > 0){
						$query = "update game_results set reg_date='".date("Y-m-d H:i:s")."', homeFullTimeScore=".$homeScore.", homeFinalScore=".$homeScore.", awayFullTimeScore=".$awayScore.", awayFinalScore=".$awayScore." where game_no='{$eakey}'";
					}else{
						$query = "insert into game_results (game_no,game_idx,game_type,sporttype,rst_done,game_status,reg_date,homeFullTimeScore,homeFinalScore,awayFullTimeScore,awayFinalScore) values ('{$eakey}','{$eakey}','prematch','{$sportType}','1','3','".date("Y-m-d H:i:s")."',".$homeScore.",".$homeScore.",".$awayScore.",".$awayScore.")";
					}
					$RT = $mysqli->query($query);
					echo $query.  " | ". $RT . PHP_EOL;
				}
			}

			$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
			$DCList = file_get_contents($DCList);
			$DCList	= json_decode($DCList);

			if($oddset_home > 0 || $oddset_draw > 0 || $oddset_away > 0){
				$find = false;
				foreach($DCList->list as $key => $value){
					if($value == $eakey){
						$find = true;
						break;
					}
				}
				if($find === false){
					array_push($DCList->list,$eakey);
					$sql 	= "insert into disconnected_game_list set game_list_id='{$eakey}'";
					$RT 	= $mysqli->query($sql);
				}
				$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
				saveDataToFile($realFnSet, json_encode($DCList));
			}
			
			/*
			else{
				foreach($DCList->list as $key => $value){
					if($value == $eakey){
						array_splice($DCList->list,$key,1);
					}
				}
				$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
				saveDataToFile($realFnSet, json_encode($DCList));
			}*/
			
		}

		$trackerlist 	= array();
		$prematchtrack 	= "select * from game_list where trackerid IS NOT NULL and trackerid <> 0";
		$result 		= $mysqli->query($prematchtrack);
		$row_cnt 		= $result->num_rows;
		if($row_cnt > 0){
			while($Rs = $result->fetch_array()){
				$trackerlist[$Rs["game_no"]]["game_id"] 	= $Rs["game_no"];
				$trackerlist[$Rs["game_no"]]["tracker_id"] 	= $Rs["trackerid"];
			}
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/prematchtracker.json";
		saveDataToFile($realFnSet, json_encode($trackerlist));

		exit;
	}
	
	if($jobtype == "subgamesetaddhidesetto"){
		$gameno = intval($_REQUEST["gameno"]);
		
		$disconnect = false;

		for($x = 0 ; $x < count($data);$x++){
			$eaLIne 		= $data[$x];
			$eakey 			= $eaLIne["eakey"];
            $isother 		= intval($eaLIne["isother"]);
            $oddset_home 	= $eaLIne["oddset_home"];
            $oddset_draw	= $eaLIne["oddset_draw"];
            $oddset_away	= $eaLIne["oddset_away"];
            $marketkey 		= intval($eaLIne["marketKey"]);

            $sublock 	= $eaLIne["sublock"];
            $subshow 	= $eaLIne["subshow"];
            $submulti 	= intval($eaLIne["submulti"]);

			if( $sublock != "BLOCK" && $sublock != "OK") $sublock = "OK";
			if( $subshow != "show" && $subshow != "hide") $subshow = "show";
			if( $submulti > 1 || $submulti < 0 ) $submulti = 1;
			//fix_homeodds, fix_drawodds, fix_awayodds, is_lock, ok_show, ok_multysel
			if( $isother == 1 ){
				if( $oddset_home == "-") $oddset_home = "-1";
				$oddset_draw = "-1";
				$oddset_away = "-1";
			}else{
				if(($marketkey == 2 || $marketkey == 1)){
					if( $oddset_home == "" || $oddset_home == null) $oddset_home = "-1";
					if( $oddset_draw == "" || $oddset_draw == null) $oddset_draw = "0.00";
					if( $oddset_away == "" || $oddset_away == null) $oddset_away = "-1";
				}else{
					if( $oddset_home == "" || $oddset_home == null) $oddset_home = "-1";
					if( $oddset_draw == "" || $oddset_draw == null) $oddset_draw = "-1";
					if( $oddset_away == "" || $oddset_away == null) $oddset_away = "-1";
				}
			}
			
			$sqlEa = "Update game_listsub set ";
			$sqlEa.=" fix_homeodds='".floatval($oddset_home)."', ";
			if(($marketkey == 2 || $marketkey == 1) && floatval($oddset_draw) != 0){
				$sqlEa.=" fix_option='".floatval($oddset_draw)."', ";
			}else{
				$sqlEa.=" fix_drawodds='".floatval($oddset_draw)."', ";
			}
			
			$sqlEa.=" fix_awayodds='".floatval($oddset_away)."', ";
			$sqlEa.=" is_lock='".$sublock."', ";
			$sqlEa.=" ok_show='".$subshow."', ";
			$sqlEa.=" ok_multysel='".$submulti."' ";
			$sqlEa.=" where ref_idx='{$gameno}' and idx_code='{$eakey}'";
			$RT = $mysqli -> query($sqlEa);

			if($disconnect === false){
				if($oddset_home > 0 || ($oddset_draw > 0 || $oddset_draw < 0) || $oddset_away > 0){
					$disconnect = true;
				}
			}
		}

		$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		$DCList = file_get_contents($DCList);
		$DCList	= json_decode($DCList);

		if($disconnect === true){
			$find = false;
			foreach($DCList->list as $key => $value){
				if($value == $gameno){
					$find = true;
					break;
				}
			}
			if($find === false){
				array_push($DCList->list,$gameno);
				$sql 	= "insert into disconnected_game_list set game_list_id='{$gameno}'";
				$RT 	= $mysqli->query($sql);
			}
			$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
			saveDataToFile($realFnSet, json_encode($DCList));
		}
		exit;
	}

	if($jobtype == "MaingamesetaddhidesettoExcel"){
		for($x = 0 ; $x < count($data);$x++){
			$eaLIne			= $data[$x];
			$eakey			= $eaLIne["eakey"];
            $isother		= intval($eaLIne["isother"]);
            $oddset_home	= $eaLIne["oddset_home"];
            $oddset_draw	= $eaLIne["oddset_draw"];
            $oddset_away	= $eaLIne["oddset_away"];
			$newDate		= $eaLIne["newDate"];
			$gameSection 	= $eaLIne["sports"];
			$league 		= $eaLIne["league"];
			$home 			= $eaLIne["home"];
			$away 			= $eaLIne["away"];


			$sportsName 	= $gameKind[$gameSection]["engname"];
			$sportsKorName 	= $gameKind[$gameSection]["korname"];

			$leagues = VDB::getTableResults("league_list", "*", "",  "league_idx=".$league."" , "");
			foreach($leagues as $key => $value){
				$league_name 		= $value["league_name"];
				$league_korname 	= $value["league_korname"];
				$league_area 		= $value["league_area"];
				$league_korArea 	= $value["league_korarea"];
				$league_countrycode = $value["league_countrycode"];
			}

            $gamelock 	= $eaLIne["gamelock"];
			$gamehide	=$eaLIne["gamehide"];            
			$hidesub	= $eaLIne["hidesub"];
            $multisel	= intval($eaLIne["multisel"]);
			
			if( $gamelock != "BLOCK" && $gamelock != "OK") $gamelock = "OK";
			if( $gamehide != "show" && $gamehide != "hide") $gamehide = "show";
			if( $hidesub != "show" && $hidesub != "hide") $hidesub = "show";
			if( $multisel > 1 || $multisel < 0 ) $multisel = 1;
			if( $oddset_home == "-" || floatval($oddset_home <= 0)) $oddset_home = "-1";
			if( $oddset_draw == "-" || floatval($oddset_draw <= 0)) $oddset_draw = "-1";
			if( $oddset_away == "-" || floatval($oddset_away <= 0)) $oddset_away = "-1";
		
			// is_lock, ok_show, sub_hide, ok_multysel, fix_homeodds, fix_drawodds, fix_awayodds
			
			$sqlEa = "Update game_list_temp set ";
			$sqlEa.=" fix_homeodds='".$oddset_home."', ";
			$sqlEa.=" fix_drawodds='".$oddset_draw."', ";
			$sqlEa.=" fix_awayodds='".$oddset_away."', ";
			$sqlEa.=" is_lock='".$gamelock."', ";
			$sqlEa.=" ok_show='".$gamehide."', ";
			$sqlEa.=" game_section='".$gameSection."', ";
			$sqlEa.=" sub_hide='".$hidesub."', ";
			$sqlEa.=" sportsName='".$sportsName."', ";
			$sqlEa.=" sportsKorName='".$sportsKorName."', ";
			$sqlEa.=" league_idx='".$league."', ";
			$sqlEa.=" league_name='".$league_name."', ";
			$sqlEa.=" league_korname='".$league_korname."', ";
			$sqlEa.=" league_area='".$league_area."', ";
			$sqlEa.=" league_korArea='".$league_korArea."', ";
			$sqlEa.=" league_countrycode='".$league_countrycode."', ";
			$sqlEa.=" home_name='".$home."', ";
			$sqlEa.=" away_name='".$away."', ";
			$sqlEa.=" ok_multysel='".$multisel."', ";
			$sqlEa.=" matchDateTime='".$newDate."' ";
			$sqlEa.=" where game_no='{$eakey}'";
			$RT = $mysqli -> query($sqlEa);
			echo $sqlEa.  " | ". $RT . PHP_EOL;

		}
		exit;
	}

	if($jobtype == "subgamesetaddhidesettoExcel"){
		$gameno = intval($_REQUEST["gameno"]);
		
		//print_r($data);
		for($x = 0 ; $x < count($data);$x++){
			$eaLIne = $data[$x];
			$eakey=$eaLIne["eakey"];
            $isother=intval($eaLIne["isother"]);
            $oddset_home=$eaLIne["oddset_home"];
            $oddset_draw=$eaLIne["oddset_draw"];
            $oddset_away=$eaLIne["oddset_away"];

            $sublock=$eaLIne["sublock"];
            $subshow=$eaLIne["subshow"];
            $submulti=intval($eaLIne["submulti"]);
			if( $sublock != "BLOCK" && $sublock != "OK") $sublock = "OK";
			if( $subshow != "show" && $subshow != "hide") $subshow = "show";
			if( $submulti > 1 || $submulti < 0 ) $submulti = 1;
			//fix_homeodds, fix_drawodds, fix_awayodds, is_lock, ok_show, ok_multysel
			if( $isother == 1 ){
				if( $oddset_home == "-") $oddset_home = "-1";
				$oddset_draw = "-1";
				$oddset_away = "-1";
			}else{
				if( $oddset_home == "-") $oddset_home = "-1";
				if( $oddset_draw == "-") $oddset_draw = "-1";
				if( $oddset_away == "-") $oddset_away = "-1";
			}
			
			$sqlEa = "Update game_list_sub_temp set ";
			$sqlEa.=" fix_homeodds='".floatval($oddset_home)."', ";
			$sqlEa.=" fix_drawodds='".floatval($oddset_draw)."', ";
			$sqlEa.=" fix_awayodds='".floatval($oddset_away)."', ";
			$sqlEa.=" is_lock='".$sublock."', ";
			$sqlEa.=" ok_show='".$subshow."', ";
			$sqlEa.=" ok_multysel='".$submulti."' ";
			$sqlEa.=" where ref_idx='{$gameno}' and idx_code='{$eakey}'";
			$RT = $mysqli -> query($sqlEa);
			echo $sqlEa.  " | ". $RT . PHP_EOL;

		}
		exit;
	}

	if($jobtype == "mergeExcel"){
		$returnResult	= array();
		$errorList		= array();
		$batchkey 		= $_REQUEST["batchkey"];
		
		if($batchkey){
			$sql		= "select * from game_list_temp where batchKey='".$batchkey."' order by game_no desc";
			$result 	= $mysqli -> query($sql);
			$row_cnt 	= $result -> num_rows;
			if ($row_cnt >= 1 ) {
				while( $rs = $result->fetch_array() ) {
					$insert = "insert into game_list (game_no,listup_date,gametype,game_section,matchDateTime,inPlayMatchIdx,status,sportsName,sportsKorname,league_idx,league_name,league_korname,league_area,league_korarea,league_countrycode,home_idx,home_name,home_korname,home_countrycode,away_idx,away_name,away_korname,away_countrycode,updatetime,homeOdds,drawOdds,option,awayOdds,mainType,subType,is_lock,ok_show,sub_hide,ok_multysel,fix_homeodds,fix_drawodds,fix_awayodds,subgamecnt,batchkey) values (".$rs["game_no"].",'".$rs["listup_date"]."','".$rs["gametype"]."',".$rs["game_section"].",'".$rs["matchDateTime"]."',".$rs["game_no"].",".$rs["status"].",'".$rs["sportsName"]."','".$rs["sportsKorname"]."',".$rs["league_idx"].",'".$rs["league_name"]."','".$rs["league_korname"]."','".$rs["league_area"]."','".$rs["league_korarea"]."','".$rs["league_countrycode"]."',".$rs["home_idx"].",'".$rs["home_name"]."','".$rs["home_korname"]."','".$rs["home_countrycode"]."',".$rs["away_idx"].",'".$rs["away_name"]."','".$rs["away_korname"]."','".$rs["away_countrycode"]."','".$rs["listup_date"]."',".$rs["homeOdds"].",".$rs["drawOdds"].",".$rs["option"].",".$rs["awayOdds"].",'".$rs["mainType"]."','".$rs["subType"]."','".$rs["is_lock"]."','".$rs["ok_show"]."','".$rs["sub_hide"]."','".$rs["ok_multysel"]."',".$rs["fix_homeodds"].",".$rs["fix_drawodds"].",".$rs["fix_awayodds"].",".$rs["subgamecnt"].",'".$batchkey."')";
					if (!$mysqli -> query($insert)) {
						$errorList[] = $mysqli -> error;
						$errorList[] = $insert;
					}else{
						$subGames = $rs["subgamecnt"];
						if($subGames >= 1){
							$parentID = $rs["game_no"];
							$subsql 	= "select * from game_list_sub_temp where ref_idx=".$parentID;
							$resultsub 	= $mysqli -> query($subsql);
							$row_cntsub = $resultsub -> num_rows;
							if($row_cntsub >= 1){
								while($rssub = $resultsub->fetch_array()){
									$insertsub = "insert into game_listsub (ref_idx,ref_gametype,game_type,odds_tit,homeOdds,drawOdds,option,awayOdds,mainType,subType,idx_code,is_sub,sub_title,sub_odd,sub_mark,fix_homeodds,fix_drawodds,fix_awayodds,is_lock,ok_show,ok_multysel) values (".$rssub["ref_idx"].",'".$rssub["ref_gametype"]."','".$rssub["game_type"]."',".$rssub["odds_tit"].",".$rssub["homeOdds"].",".$rssub["drawOdds"].",".$rssub["option"].",".$rssub["awayOdds"].",'".$rssub["mainType"]."','".$rssub["subType"]."','".$rssub["idx_code"]."','".$rssub["is_sub"]."','".$rssub["sub_title"]."','".$rssub["sub_odd"]."','".$rssub["sub_mark"]."',".$rssub["fix_homeodds"].",".$rssub["fix_drawodds"].",".$rssub["fix_awayodds"].",'".$rssub["is_lock"]."','".$rssub["ok_show"]."',".$rssub["ok_multysel"].")";
									if (!$mysqli -> query($insertsub)) {
										$errorList[] = $mysqli -> error;
										$errorlist[] = $insertsub;
									}
								}
							}
						}
					}
				}
			}
		}
		

		if(empty($errorList)){
			$returnResult["success"] = true;
		}else{
			$returnResult["success"] = false;
			$returnResult["error"] = $errorList;
		}

		echo json_encode($returnResult);
		
		exit;
	}

	if($jobtype == "saveScore"){
		
		$columns 		= array();
		$values	 		= array();
		$updateArray 	= array();
		$action 		= "";
		$gameid 		= "";
		$updateArray["rst_done"] = 0;
		foreach($_POST["scores"] as $key => $value){
			if($value["name"] == "action"){
				$action = $value["value"];
			}else{
				$updateArray[$value["name"]] 	= ($value["value"] == "") ? "-1" : $value["value"] ;
				$updateArray["reg_date"] 		= date("Y-m-d H:i:s");
				$columns[]	= $value["name"];
				$values[] 	= $value["value"];
			}

			if($value["name"] == "game_no"){
				$gameid = $value["value"];
			}
		}


		if($action == "insert"){
			$updateScore = VDB::InsertTo("game_results",$updateArray);
			$returnResult["error"] 		= false;
			$returnResult["success"] 	= true;
		}else{
			$updateScore = VDB::UpdateTo("game_results",$updateArray,"game_no=".$gameid);
			$returnResult["error"] 		= false;
			$returnResult["success"] 	= true;
		}

		echo json_encode($returnResult);

		exit;
	}

	if($jobtype == "manualAddPrematch"){
		if(isset($_POST["data"])){
			$data = json_decode($_POST["data"]);

			$return_error = array();
			foreach($data as $column){

				$gameidQuery 	= "SELECT game_no FROM game_list order by game_no asc limit 1";
				$result 		= $mysqli -> query($gameidQuery);
				$result 		= $result->fetch_array();
				$game_no		= intval($result["game_no"]) - 1;

				$sportDetails 	= explode("_",$column->sportsid);
				$leagueDetails	= explode("_",$column->league);
				$countryDetails	= explode("_",$column->country);
				$marketDetails 	= explode("_",$column->marketid);
				$is_lock		= (isset($column->is_lock)) ? $column->is_lock : "OK" ;
				$ok_show		= (isset($column->ok_show)) ? $column->ok_show : "show" ;
				$sub_hide		= (isset($column->sub_hide)) ? $column->sub_hide : "show" ;
				$ok_multysel	= (isset($column->ok_multysel)) ? $column->ok_multysel : "0" ;
				$option 		= 0;

				$insertQuery = "insert into game_list set 
					game_no				= ".$game_no.",
					listup_date 		= '".date("Y-m-d H:i:s")."',
					gameType			= '".$column->gameType."',
					game_section		= ".$sportDetails[0].",
					matchDateTime		= '".date("Y-m-d H:i:s", strtotime($column->gameDate))."',
					inPlayMatchIdx		= ".$game_no.",
					status				= ".$column->status.",
					sportsName			= '".$sportDetails[1]."',
					sportsKorName		= '".$sportDetails[2]."',
					league_idx			= ".$leagueDetails[0].",
					league_name			= '".$leagueDetails[1]."',
					league_korname		= '".$leagueDetails[2]."',
					league_area			= '".$leagueDetails[3]."',
					league_korArea		= '".$leagueDetails[4]."',
					league_countrycode	= '".$countryDetails[1]."',
					home_name			= '".$column->homeTeam."',
					home_korname		= '".$column->homeTeam."',
					away_name			= '".$column->awayTeam."',
					away_korname		= '".$column->awayTeam."',
					updatetime			= '".date("Y-m-d H:i:s")."',
					homeOdds			= ".$column->homeOdds.",
					drawOdds			= ".$column->drawOdds.",
					option				= ".$option.",
					awayOdds			= ".$column->awayOdds.",
					mainType			= '".$marketDetails[0]."',
					subType				= '".$marketDetails[1]."',
					is_lock				= '".$is_lock."',
					ok_show				= '".$ok_show."',
					sub_hide			= '".$sub_hide."',
					ok_multysel			= '".$ok_multysel."',
					subgamecnt			= ".$column->subgamecnt.",
					batchKey			= ".date('YmdHis')."
				";

				//echo $insertQuery;

				if (!$mysqli -> query($insertQuery)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $insertQuery;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
				}

				if(intval($column->subgamecnt) > 0){
					$marketdata = $column->market;
					$idx_list 	= array();
					$idx_ext	= 1;
					foreach($marketdata as $key => $value){
	
						$marketid = explode("_",$value->marketid);
	
						$homeOdds 	= $value->homeOdds;
						$drawOdds 	= $value->drawOdds;
						$awayOdds 	= $value->awayOdds;
						$is_sub 	= 0;
						$sub_title	= "N";
						$sub_odd	= 0;
						$option 	= 0;
						$homeDesc	= "";
						$drawDesc	= "";
						$awayDesc	= "";
	
						if(intval($marketid[0]) == 1 || intval($marketid[0]) == 2 || intval($marketid[0]) == 5){
							$option = $value->drawOdds;
						}
	
						$idxcode = $game_no."_6_".$option."_".$marketid[0]."_".$marketid[1];
	
						if(intval($marketid[0]) == 3){
							$homeOdds 	= 0;
							$drawOdds 	= 0;
							$awayOdds 	= 0;
							$is_sub 	= 1;
							$sub_title	= $value->drawOdds;
							$sub_odd	= $value->homeOdds;
							$idxcode	.= "_".$sub_title;
						}
								
						if (count($idx_list) != 0) {
							if(in_array($idxcode,$idx_list)){
								$idxcode .= "_".$idx_ext;
								array_push($idx_list,$idxcode);
								$idx_ext++;
							}else{
								array_push($idx_list,$idxcode);
							}
						}else{
							array_push($idx_list,$idxcode);
						}
	
						$insertsub = "insert into game_listsub set
							ref_idx 		= ".$game_no.",
							ref_gametype 	= 'preMatch',
							game_type 		= '_extra_odds',
							odds_tit 		= 6,
							homeOdds		= ".$homeOdds.",
							drawOdds		= ".$drawOdds.",
							awayOdds		= ".$awayOdds.",
							option			= ".$option.",
							mainType		= '".$marketid[0]."',
							subType			= '".$marketid[1]."',
							homeOddsDescription 	= '".$homeDesc."',
							drawOddsDescription 	= '".$drawDesc."',
							awayOddsDescription 	= '".$awayDesc."',
							isMain			= 0,
							idx_code		= '".$idxcode."',
							is_sub			= ".$is_sub.",
							sub_title		= '".$sub_title."',
							sub_odd			= '".$sub_odd."',
							sub_mark		= '".$sub_title."',
							is_lock			= 'OK',
							ok_show			= '".$value->ok_show."',
							ok_multysel		= ".$value->ok_multysel."
						";
						
						//echo $insertsub;
	
						if (!$mysqli -> query($insertsub)) {
							$return_error["success"] 	= 0;
							$return_error["error"] 		= 1;
							$return_error["details"][] 	= $mysqli->error;
							$return_error["query"][] 	= $insertsub;
						}else{
							$return_error["success"] 	= 1;
							$return_error["error"] 		= 0;
						}
					}				
				}
			}

			echo json_encode($return_error);
		}
		exit;
	}

//JANE ADMIN FUNCTIONS 
	if($jobtype == "sendmessage"){
		$id = intval($_POST["data"]);
		$title = $_POST["title"];
		$contents = $_POST["content"];
		$hkey = date("YmdHis")."_". rand(11111,99999);
		$userIP = getUerIP();
		$return_error = array();

			$sqlBase = "im_all='0',target_level='0', im_target='{$id}', im_title='{$title}', im_contents='{$contents}' , im_writer='1'  ";
		
			$insertQuery = "Insert into info_message set {$sqlBase} , im_key='{$hkey}',  im_reg_datetime=now(), im_reg_ip='{$userIP}', im_read=0 ";

			if (!$mysqli -> query($insertQuery)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $insertQuery;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
			}

		echo json_encode($return_error);
	exit;
	}

	if($jobtype == "addpoint"){
		$data = intval($_POST["data"]);
		$id = $_POST["id"];

		$return_error = array();
		
			$insertQuery = "UPDATE info_user set 
					iu_point 	= '".$data."' where id=".$id;

			if (!$mysqli -> query($insertQuery)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $insertQuery;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
			}

		echo json_encode($return_error);
	exit;
	}

	if($jobtype == "addbalance"){
		$data = intval($_POST["data"]);
		$id = $_POST["id"];
		$userIP = getUerIP();

		$expiry = $_POST["expiry"];
		$balanceBefore = intval($_POST["balanceBefore"]);
		$balanceAfter = intval($_POST["balanceAfter"]);
		$reason = $_POST["reason"];
		$admin = $_POST["admin"];
		$amount = intval($_POST["amount"]);
		$point = intval($_POST["point"]);
		$date = date("Y-m-d H:i:s");
		$date1 = date("Y-m-d");


		$return_error = array();
		
			$insertQuery = "
			UPDATE info_user set iu_balance= '".$data."' where id='".$id."'; 
			insert into info_transaction set it_spc='member', it_type='deposit', it_proceed='".$admin."', it_reason='".$reason."', it_target='".$id."', it_amount='".$amount."', it_point='0', it_status='2', it_reg_ip='".$userIP."',it_update_ip='".$userIP."',it_reg_date='".$date1."',it_reg_datetime='".$date."',it_update_datetime='".$date."',it_before_balance='".$balanceBefore."',it_after_balance='".$balanceAfter."',it_before_point='".$point."',it_after_point='".$point."',it_action='1',it_manager_no='0',it_has_error='0',notification='1', it_expiry='".$expiry."';
			insert into user_cash_historylist set mbno='".$id."', cash_move_reason='".$reason."', cash_move_amouint='".$amount."', cash_before='".$balanceBefore."', cash_after='".$balanceAfter."', cash_move_type='입금', move_date='".$date."', isrealtime='0';
			";

			if (!$mysqli -> multi_query($insertQuery)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $insertQuery;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
			}

			echo json_encode($return_error);
	exit;
	}

	if($jobtype == "deductpoint"){
		$data = intval($_POST["data"]);
		$id = $_POST["id"];
		


		$return_error = array();
		
			$insertQuery = "UPDATE info_user set 
					iu_point 	= '".$data."' where id=".$id;

			if (!$mysqli -> query($insertQuery)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $insertQuery;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
			}

		echo json_encode($return_error);
	exit;
	}

	if($jobtype == "deductbalance"){
		$data = intval($_POST["data"]);
		$id = $_POST["id"];
		$userIP = getUerIP();

		$expiry = $_POST["expiry"];
		$balanceBefore = intval($_POST["balanceBefore"]);
		$balanceAfter = intval($_POST["balanceAfter"]);
		$reason = $_POST["reason"];
		$admin = $_POST["admin"];
		$amount = intval($_POST["amount"]);
		$point = intval($_POST["point"]);
		$date = date("Y-m-d H:i:s");
		$date1 = date("Y-m-d");

		$return_error = array();
		
			$insertQuery = "
			UPDATE info_user set iu_balance = '".$data."' where id='".$id."';
			insert into info_transaction set it_spc='member', it_type='withdraw', it_proceed='".$admin."', it_reason='".$reason."', it_target='".$id."', it_amount='".$amount."', it_point='0', it_status='2', it_reg_ip='".$userIP."',it_update_ip='".$userIP."',it_reg_date='".$date1."',it_reg_datetime='".$date."',it_update_datetime='".$date."',it_before_balance='".$balanceBefore."',it_after_balance='".$balanceAfter."',it_before_point='".$point."',it_after_point='".$point."',it_action='1',it_manager_no='0',it_has_error='0',notification='1', it_expiry='".$expiry."';
			insert into user_cash_historylist set mbno='".$id."', cash_move_reason='".$reason."', cash_move_amouint='".$amount."', cash_before='".$balanceBefore."', cash_after='".$balanceAfter."', cash_move_type='출금', move_date='".$date."', isrealtime='0';
			";

			if (!$mysqli -> multi_query($insertQuery)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $insertQuery;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
			}

		echo json_encode($return_error);
	exit;
	}

	if($jobtype == "manualAddMinigame"){
		if(isset($_POST["data"])){
			$data = json_decode($_POST["data"]);

			$return_error = array();
			foreach($data as $column){

				$insertQuery = "insert into minigame_odds_list set 
					game_id 			= '".$column->minigameid."',
					market_id 			= '".$column->marketid."',
					market_col_id		= '".$column->col_id."',
					first_title 		= '".$column->homeTeam."',
					first_odd 			= '".$column->homeOdds."',
					second_title 		= '".$column->awayTeam."',
					second_odd 			= '".$column->awayOdds."',

					data_center 		= '".$column->drawOdds."',


					extra_market 		= '".$column->extraMarket."'
				";

			

				if (!$mysqli -> query($insertQuery)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $insertQuery;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
				}

				
			}

			echo json_encode($return_error);
		}
		exit;
	}


	if($jobtype == "manualUpdateMinigame"){
		if(isset($_POST["data"])){
			
			$data = json_decode($_POST["data"]);

			$return_error = array();
			foreach($data as $column){

				if ($column->marketid == "7" or $column->marketid == "11"){
					$insertQuery = "UPDATE minigame_odds_list set 
						market_id 			= '".$column->marketid."',
						first_title 		= '".$column->homeTeam."',
						first_odd 			= '".$column->homeOdds."',
						second_title 		= '".$column->awayTeam."',
						second_odd 			= '".$column->awayOdds."',
						data_center 		= '".$column->drawOdds."'

					where id=".$column->gameid;



				}else{
			
					$insertQuery = "UPDATE minigame_odds_list set 
						market_id 			= '".$column->marketid."',
						first_title 		= '".$column->homeTeam."',
						first_odd 			= '".$column->homeOdds."',
						second_title 		= '".$column->awayTeam."',
						second_odd 			= '".$column->awayOdds."',
						data_center 		= '".$column->drawOdds."',
						extra_market 		= '".$column->extraMarket."'

					where id=".$column->gameid;

					

				}


				if (!$mysqli -> query($insertQuery)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $insertQuery;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
				}

			}
			

			echo json_encode($return_error);
		}
		exit;
	}


	if($jobtype == "deleteminigame"){
		//location.reload();
		$id 			= intval($_POST["game_id"]);
		$return_error 	= array();
		$update 		= "DELETE FROM minigame_odds_list where id='{$id}'";
						
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}
						
		echo json_encode($return_error);
		exit;
	}

	if($jobtype == "turnoffsound"){
		//location.reload();
	
		$update 		= "update info_transaction set notification=1 where notification=0";
						
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}
						
		echo json_encode($return_error);
		exit;
	}

	if($jobtype == "turnoffmessagesound"){
		//location.reload();
	
		$update 		= "update info_cs set notification=1 where notification=0";
						
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}
						
		echo json_encode($return_error);
		exit;
	}


	if($jobtype == "turnoffsoundsetting"){
		//location.reload();
		$id 			= $_POST["sound"];
		$return_error 	= array();

		if($id == 'on'){
			$update 		= "update info_transaction set sound='on' where sound='off'";
		}else{
			$update 		= "update info_transaction set sound='off' where sound='on'";
		}		

		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}
						
		echo json_encode($return_error);
		exit;
	}



	if($jobtype == "deleteManualUpload"){
		//location.reload();
		$id 			= intval($_POST["game_id"]);
		$return_error 	= array();
		$update 		= "update game_list set status=5, batchKey='hidden' where game_no='{$id}'";
		
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}

		$update 		= "insert into cancelled_game_list set game_list_id='{$id}'";
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["query"][] 	= $update;
		}
						
		echo json_encode($return_error);
		exit;
	}

	if($jobtype == "cancelPrematchGame"){
		$id 			= $_POST["game_id"]; 
		$return_error 	= array();
		$update 		= "insert into cancelled_game_list set game_list_id='{$id}'";
						
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["query"][] 	= $update;
		}

		$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		$DCList = file_get_contents($DCList);
		$DCList	= json_decode($DCList);

		array_push($DCList->list,$id);

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		saveDataToFile($realFnSet, json_encode($DCList));

		$sql 	= "insert into disconnected_game_list set game_list_id='{$id}'";
		$RT 	= $mysqli->query($sql);

		$sql 	= "update game_list set status=5 where game_no='{$id}'";
		$RT 	= $mysqli->query($sql);
						
		echo json_encode($return_error);
		exit;
	}

	if($jobtype == "enablePrematchGame"){
		$id 			= $_POST["game_id"];
		$return_error 	= array();
		$update 		= "delete from cancelled_game_list where game_list_id='{$id}'";
						
		if (!$mysqli -> query($update)) {
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $update;
		}else{
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["query"][] 	= $update;
		}

		$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		$DCList = file_get_contents($DCList);
		$DCList	= json_decode($DCList);

		foreach($DCList->list as $key => $value){
			if($value == $id){
				array_splice($DCList->list,$key,1);
				$sql = "delete from disconnected_game_list where game_list_id='{$id}'";
				$RT = $mysqli->query($sql);
			}
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		saveDataToFile($realFnSet, json_encode($DCList));

		$sql 	= "update game_list set status=0 where game_no='{$id}'";
		$RT 	= $mysqli->query($sql);
						
		echo json_encode($return_error);
		exit;
	}

	if($jobtype == "disconnect_game"){
		$id 			= $_POST["game_id"];
		$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		$DCList = file_get_contents($DCList);
		$DCList	= json_decode($DCList);

		array_push($DCList->list,$id);

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		saveDataToFile($realFnSet, json_encode($DCList));

		$sql 	= "insert into disconnected_game_list set game_list_id='{$id}'";
		$RT 	= $mysqli->query($sql);


		exit;
	}

	if($jobtype == "connect_game"){
		$id 	= $_POST["game_id"];

	
		$query 	= "update game_list set fix_homeodds=-1, fix_drawodds=-1, fix_awayodds=-1 where game_no='{$id}'";
		$RT 	= $mysqli->query($query);

		$query 	= "update game_listsub set fix_homeodds=-1, fix_drawodds=-1, fix_awayodds=-1, fix_option=0.00 where ref_idx='{$id}'";
		$RT 	= $mysqli->query($query);

		$DCList	= "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		$DCList = file_get_contents($DCList);
		$DCList	= json_decode($DCList);

		foreach($DCList->list as $key => $value){
			if($value == $id){
				array_splice($DCList->list,$key,1);
				$sql = "delete from disconnected_game_list where game_list_id='{$id}'";
				$RT = $mysqli->query($sql);
			}
		}

		$realFnSet = "../temp_datas_c5dtd233sxtsd_edksqxx3455/DCList.json";
		saveDataToFile($realFnSet, json_encode($DCList));

		exit;
	}

	if($jobtype == "sortleague"){

		echo "eyiiiii";

		$countrySave 	= $_POST["countrySave"];
		$leagueSave 	= $_POST["leagueSave"];

		if($countrySave){
			foreach($countrySave as $key => $value){
				$sort 		= $value["sort"];
				$check 		= $value["check"];
				$sportsid 	= $value["game_section"];
				$code 		= $value["code"];
				$title 		= $value["title"];
				$image		= $value["image"];
				
				if($check == "checked"){
					$check = "open";
				}else{
					$check = "close";
				}
				
				$updateCountry = "update country_sort set country_title='{$title}', sort_num='{$sort}', status='{$check}' where game_section='{$sportsid}' and country_code='{$code}'";
			
				if (!$mysqli -> query($updateCountry)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $updateCountry;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
					$return_error["query"][] 	= $updateCountry;
				}
				//echo json_encode($return_error);
			}		
		}

		if($leagueSave){
			foreach($leagueSave as $key => $value){
				$sort 		= $value["sort"];
				$check 		= $value["check"];
				$sportsid 	= $value["game_section"];
				$leagueid 	= $value["leagueid"];
				$title 		= $value["title"];

				if($check == "checked"){
					$check = "open";
				}else{
					$check = "close";
				}
				$updateLeague = "update leagu_list set leagu_name='{$title}', league_sort='{$sort}', status='{$check}' where game_code='{$sportsid}' and leagu_id='{$leagueid}'";
			
				if (!$mysqli -> query($updateLeague)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $updateLeague;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
					$return_error["query"][] 	= $updateLeague;
				}
								
				//echo json_encode($return_error);
			}		
		}
		exit;
	}

	if($jobtype == "sortleaguelive"){

		echo "eyiiiii";

		$countrySave 	= $_POST["countrySave"];
		$leagueSave 	= $_POST["leagueSave"];

		if($countrySave){
			foreach($countrySave as $key => $value){
				$sort 		= $value["sort"];
				$check 		= $value["check"];
				$sportsid 	= $value["game_section"];
				$code 		= $value["code"];
				$title 		= $value["title"];
				$image		= $value["image"];
				
				if($check == "checked"){
					$check = "open";
				}else{
					$check = "close";
				}
				
				$updateCountry = "update country_sort set country_titles='{$title}', sort_nums='{$sort}', statuss='{$check}' where game_section='{$sportsid}' and country_code='{$code}'";
			
				if (!$mysqli -> query($updateCountry)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $updateCountry;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
					$return_error["query"][] 	= $updateCountry;
				}
				//echo json_encode($return_error);
			}		
		}

		if($leagueSave){
			foreach($leagueSave as $key => $value){
				$sort 		= $value["sort"];
				$check 		= $value["check"];
				$sportsid 	= $value["game_section"];
				$leagueid 	= $value["leagueid"];
				$title 		= $value["title"];

				if($check == "checked"){
					$check = "open";
				}else{
					$check = "close";
				}
				$updateLeague = "update leagu_list set leagu_names='{$title}', league_sorts='{$sort}', statuss='{$check}' where game_code='{$sportsid}' and leagu_id='{$leagueid}'";
			
				if (!$mysqli -> query($updateLeague)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $updateLeague;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
					$return_error["query"][] 	= $updateLeague;
				}
								
				//echo json_encode($return_error);
			}		
		}
		exit;
	}

	if($jobtype == "getSportsLeague"){
		if(isset($_POST["sportsid"])){

			$dateHourS = $_POST["datehour"];
			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				group by league_idx order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where a.game_section={$sportsid} group by league_idx order by b.leagu_name asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getSportsLeagueEnded"){
		if(isset($_POST["sportsid"])){

			$dateHourS = $_POST["datehour"];
			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				left join game_results as d on d.game_no=a.game_no 
				where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				left join game_results as d on d.game_no=a.game_no 
				where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and a.game_section='{$sportsid}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getSportsCountry"){
		if(isset($_POST["sportsid"])){

			$dateHourS = $_POST["datehour"];
			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select c.* from game_list as a
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				group by reg_countycode order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select c.* from game_list as a
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where a.game_section={$sportsid} group by reg_countycode order by b.leagu_name asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>국가</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["country_code"]."'>".$RsLeagu["country_title"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getSportsCountryEnded"){
		if(isset($_POST["sportsid"])){

			$dateHourS = $_POST["datehour"];
			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select c.* from game_list as a
				inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				left join game_results as d on d.game_no=a.game_no 
				where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by reg_countycode order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select c.* from game_list as a
				inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				left join game_results as d on d.game_no=a.game_no 
				where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and a.game_section='{$sportsid}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by reg_countycode order by b.leagu_name asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>국가</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["country_code"]."'>".$RsLeagu["country_title"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getSportsLeagueSettled"){
		if(isset($_POST["sportsid"])){

			$dateHourS 		= $_POST["datehour"];
			$sportsid  		= $_POST["sportsid"];


			if($sportsid == "all"){
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
				inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where a.game_section={$sportsid} and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
			}
			

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getSportsCountrySettled"){
		if(isset($_POST["sportsid"])){

			$dateHourS = $_POST["datehour"];
			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select c.* from game_list as a
				inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by reg_countycode order by b.leagu_name asc";
			}else{
				$leagueSQL		= "select c.* from game_list as a
				inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
				inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
				inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
				where a.game_section={$sportsid} and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by reg_countycode order by b.leagu_name asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>국가</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["country_code"]."'>".$RsLeagu["country_title"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
		
		}

		exit;
	}

	if($jobtype == "getLeaguebyCountrySettled"){
		if(isset($_POST["countrycode"])){

			$dateHourS 		= $_POST["datehour"];
			$sportsid  		= $_POST["sportsid"];
			$countrycode  	= $_POST["countrycode"];

			if($countrycode == "all"){
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where a.game_section='{$sportsid}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}
			}else{
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where b.reg_countycode='{$countrycode}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct game_no from game_results where settle=1 union select distinct game_no from game_results where game_status=3 and settle=0 and game_no not in (select distinct match_idx as game_no from user_bet_list)) as bet on bet.game_no=a.game_no 
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where b.reg_countycode='{$countrycode}' and a.game_section='{$sportsid}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}
			}


			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getLeaguebyCountryEnded"){
		if(isset($_POST["countrycode"])){

			$dateHourS 		= $_POST["datehour"];
			$sportsid  		= $_POST["sportsid"];
			$countrycode  	= $_POST["countrycode"];

			if($countrycode == "all"){
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					left join game_results as d on d.game_no=a.game_no  
					where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct match_idx as game_no from user_bet_list where bet_status <= 2 union select distinct game_no from game_results where game_status not in (0,1,3) and settle = 0) as bet on bet.game_no=a.game_no
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					left join game_results as d on d.game_no=a.game_no 
					where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and a.game_section='{$sportsid}' and date_format(a.matchDateTime,'%Y-%m-%d %H:%i:%s') < NOW() group by league_idx order by b.leagu_name asc";
				}
			}else{
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct match_idx as game_no from user_bet_list where bet_status <> 3) as bet on bet.game_no=a.game_no
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					left join game_results as d on d.game_no=a.game_no 
					where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and b.reg_countycode='{$countrycode}' group by league_idx order by b.leagu_name asc";

				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select distinct match_idx as game_no from user_bet_list where bet_status <> 3) as bet on bet.game_no=a.game_no
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					left join game_results as d on d.game_no=a.game_no 
					where d.game_status IS NULL OR d.game_status = 3 and d.settle = 0 and a.game_section='{$sportsid}' and b.reg_countycode='{$countrycode}' group by league_idx order by b.leagu_name asc";
				}
			}


			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getLeaguebyCountry"){
		if(isset($_POST["countrycode"])){

			$dateHourS 		= $_POST["datehour"];
			$sportsid  		= $_POST["sportsid"];
			$countrycode  	= $_POST["countrycode"];

			if($countrycode == "all"){
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					group by league_idx order by b.leagu_name asc";
				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where a.game_section='{$sportsid}' group by league_idx order by b.leagu_name asc";
				}
			}else{
				if($sportsid == "all"){
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where b.reg_countycode='{$countrycode}' group by league_idx order by b.leagu_name asc";
				}else{
					$leagueSQL		= "select a.game_section,league_idx,b.leagu_name as leagueName,league_area,league_countrycode from game_list as a
					inner join (select * from leagu_list where status='open') as b on b.game_code=a.game_section and a.league_idx=b.leagu_id
					inner join (select * from country_sort where status='open') as c on b.game_code=c.game_section and b.reg_countycode=c.country_code
					where b.reg_countycode='{$countrycode}' and a.game_section='{$sportsid}' group by league_idx order by b.leagu_name asc";
				}
			}


			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option data-sports='".$RsLeagu["game_section"]."' value='".$RsLeagu["league_idx"]."'>".$RsLeagu["leagueName"]." - ".$RsLeagu["league_area"]."</option>";
				}
			}else{
				echo "<option value=''>NO UPCOMING MATCHES</option>";
			}
			
		}

		exit;
	}

	if($jobtype == "getCountrybySports"){
		if(isset($_POST["sportsid"])){

			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select * from country_sort group by country_title order by country_title asc";
			}else{
				$leagueSQL		= "select * from country_sort as a inner join teams_list b on a.country_code=b.country_code where a.game_section='{$sportsid}' group by country_title order by country_title asc";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>국가</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option value='".$RsLeagu["country_code"]."'> ".$RsLeagu["country_title"]." </option>";
				}
			}else{
				echo "<option value=''>NO AVAILABLE COUNTRY</option>";
			}
			
		}
		exit;
	}

	if($jobtype == "getLeaguebySports"){
		if(isset($_POST["sportsid"])){

			$sportsid  = $_POST["sportsid"];

			if($sportsid == "all"){
				$leagueSQL		= "select * from leagu_list group by leagu_id, game_code order by leagu_name asc;";
			}else{
				$leagueSQL		= "select * from leagu_list where game_code={$sportsid} group by leagu_id, game_code order by leagu_name asc;";
			}

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value='all'>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option value='".$RsLeagu["leagu_id"]."'> ".$RsLeagu["leagu_name"]." - ".$RsLeagu["reg_countyname"]." </option>";
				}
			}else{
				echo "<option value=''>NO AVAILABLE LEAGUE</option>";
			}
			
		}
		exit;
	}

	if($jobtype == "getLeaguebyCountryLeagueList"){
		if(isset($_POST["sportsid"])){

			$sportsid  	= $_POST["sportsid"];
			$countryid  = $_POST["countryid"];
			

			if($countryid == "all"){
				if($sportsid == "all"){
					$leagueSQL		= "select * from leagu_list group by leagu_id, game_code order by leagu_name asc;";
				}else{
					$leagueSQL		= "select * from leagu_list where game_code={$sportsid} group by leagu_id, game_code order by leagu_name asc;";
				}
			}else{
				if($sportsid == "all"){
					$leagueSQL		= "select * from leagu_list where reg_countycode='{$countryid}' group by leagu_id, game_code order by leagu_name asc;";
				}else{
					$leagueSQL		= "select * from leagu_list where game_code={$sportsid} and reg_countycode='{$countryid}' group by leagu_id, game_code order by leagu_name asc;";
				}
			}
			

			$resultLeage 	= $mysqli->query($leagueSQL);
			$row_cnt 		= $resultLeage->num_rows;
			if($row_cnt >= 1){
				echo "<option value=''>리그</option>";
				while( $RsLeagu = $resultLeage -> fetch_array() ) {
					echo "<option value='".$RsLeagu["leagu_id"]."'> ".$RsLeagu["leagu_name"]." - ".$RsLeagu["reg_countyname"]." </option>";
				}
			}else{
				echo "<option value=''>NO AVAILABLE LEAGUE</option>";
			}
			
		}
		exit;
	}


	if($jobtype == "update_team_single"){

		echo "eyiiiii";

		$team_data 	= $_POST["data"];

		$team_id 		= $team_data["team_id"];
		$country_id 	= $team_data["country_id"];
		$sports_id 		= $team_data["sports_id"];
		$team_name 		= $team_data["team_name"];
		$team_name_kor 	= $team_data["team_name_kor"];

		$updateTeam = "update teams_list set team_name_new='{$team_name}', team_name_kor_new='{$team_name_kor}', edited=1 where country_code='{$country_id}' and team_id='{$team_id}' and sports_id='{$sports_id}'";
			
		if (!$mysqli -> query($updateTeam)) {
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $updateTeam;
		}else{
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["query"][] 	= $updateTeam;
		}

		$leaguenames = array();
		$generateTeamName = "select * from teams_list where edited=1";
		$result = $mysqli->query($generateTeamName);
		while($Rs = $result->fetch_array()){
			$leaguenames[$Rs["team_id"]]["team_name"] 		= $Rs["team_name_new"];
			$leaguenames[$Rs["team_id"]]["team_name_kor"] 	= $Rs["team_name_kor_new"];
		}

		$Datas = json_encode($leaguenames);
		saveDataToFile("/var/www/html/vicsports01/public/temp_datas_c5dtd233sxtsd_edksqxx3455/team_names.json", $Datas);
		saveDataToFile("/var/www/html/vicsports02/temp_datas_c5dtd233sxtsd_edksqxx3455/team_names.json", $Datas);

		echo json_encode($return_error);
		
		exit;
	}

	if($jobtype == "remove_single_image"){

		echo "eyiiiii";

		$team_data 	= $_POST["data"];

		$team_id 		= $team_data["team_id"];
		$country_id 	= $team_data["country_id"];
		$sports_id 		= $team_data["sports_id"];

		$updateTeam = "update teams_list set img_file=NULL where country_code='{$country_id}' and team_id='{$team_id}' and sports_id='{$sports_id}'";
			
		if (!$mysqli -> query($updateTeam)) {
			$return_error["success"] 	= 0;
			$return_error["error"] 		= 1;
			$return_error["details"][] 	= $mysqli->error;
			$return_error["query"][] 	= $updateTeam;
		}else{
			$return_error["success"] 	= 1;
			$return_error["error"] 		= 0;
			$return_error["query"][] 	= $updateTeam;
		}


		echo json_encode($return_error);
		
		exit;
	}

	

	if($jobtype == "settleSingle"){
		$gameid = $_POST["gameid"];
		if($gameid > 0){
			$updateTeam = "update game_results set settle=1 where game_no='{$gameid}'";
			if (!$mysqli -> query($updateTeam)) {
				$return_error["success"] 	= 0;
				$return_error["error"] 		= 1;
				$return_error["details"][] 	= $mysqli->error;
				$return_error["query"][] 	= $updateTeam;
			}else{
				$return_error["success"] 	= 1;
				$return_error["error"] 		= 0;
				$return_error["query"][] 	= $updateTeam;
			}
			echo json_encode($return_error);
		}
		
		exit;
	}

	if($jobtype == "settleAll"){

		$gamelist = $_POST["gamelist"];
		if(sizeof($gamelist) > 0){
			foreach($gamelist as $key => $value){
				$updateTeam = "update game_results set settle=1 where game_no='{$value}'";
				if (!$mysqli -> query($updateTeam)) {
					$return_error["success"] 	= 0;
					$return_error["error"] 		= 1;
					$return_error["details"][] 	= $mysqli->error;
					$return_error["query"][] 	= $updateTeam;
					break;
				}else{
					$return_error["success"] 	= 1;
					$return_error["error"] 		= 0;
					$return_error["query"][] 	= $updateTeam;
				}
			}
			echo json_encode($return_error);
		}
		
		exit;
	}

	if($jobtype == "betdetails"){
		$gameid = $_POST["target"];
		$team 	= $_POST["team"];

		$query 			= "SELECT a.market,c_mainType,c_subType, sel_sectionstr, match_idx, count(a.mb_no) as quantity, (
			select sum(quantity) as newsum from (SELECT count(a.mb_no) as quantity FROM vicsportlive.user_bet_list as a inner join info_user as b on a.mb_no=b.id where a.match_idx={$gameid} and mybet={$team} group by a.market) as totalcount
			) as total FROM vicsportlive.user_bet_list as a inner join info_user as b on a.mb_no=b.id where a.match_idx={$gameid} and mybet={$team} group by a.market";
		$resultquery 	= $mysqli->query($query);
			$row_cnt 		= $resultquery->num_rows;
			if($row_cnt >= 1){
				while( $result = $resultquery -> fetch_array() ) {
					$quantity 	= $result["quantity"];
					$total 		= $result["total"];
					$percent 	= ($quantity / $total ) * 100; 

					if($percent == 100){
						$style = "width:calc(".$percent."% - 10px);";
					}else{
						$style = "width:".$percent."%;";
					}
					$market = $result["market"];
					echo "<div class='bet-wrapper'>";
					echo "<div class='market-name' data-team='{$team}' data-matchid='".$result["match_idx"]."' data-maintype='".$result["c_mainType"]."' data-subtype='".$result["c_subType"]."' data-section='".$result["sel_sectionstr"]."' data-marketname='{$market}'>".$result["market"]." (".$quantity.")</div>";
					echo "<div class='username-name' data-team='{$team}' data-matchid='".$result["match_idx"]."' data-maintype='".$result["c_mainType"]."' data-subtype='".$result["c_subType"]."' data-section='".$result["sel_sectionstr"]."' data-marketname='{$market}'><span class='market-percent'>".number_format($percent,2)."%</span><div class='market-bar' style='".$style."'></div></div>";
					echo "</div>";
				}
			}else{
				echo "NO DETAILS AVAILABLE";
			}

		exit;
	}

	if($jobtype == "marketmember"){
		$matchid 	= $_POST["matchid"];
		$section 	= $_POST["section"];
		$mainType 	= $_POST["mainType"];
		$subType 	= $_POST["subType"];
		$team 		= $_POST["team"];
		$marketname 		= $_POST["marketname"];

		$query 			= "select b.username, b.iu_nickname from user_bet_list as a inner join info_user as b on a.mb_no=b.id where a.match_idx={$matchid} and a.market='{$marketname}' and mybet='{$team}'";
		$resultquery 	= $mysqli->query($query);
			$row_cnt 		= $resultquery->num_rows;
			if($row_cnt >= 1){
				while( $result = $resultquery -> fetch_array() ) {
					echo "<div class='bet-wrapper'>";
					echo "<div class='username-name'><span class='market-percent'><a target='_blank' href='admin_main.php?pcode=bet_list&scdpd=prematch&search_id=".$result["username"]."&trigger=today'>".$result["username"]." / ".$result["iu_nickname"]."</a></div>";
					echo "</div>";
				}
			}else{
				echo "NO DETAILS AVAILABLE";
			}

		exit;
	}

	if($jobtype == "addPopup"){
		$content 	= $_POST["content"];
		$left 		= $_POST["left"];
		$top 		= $_POST["top"];
		$width 		= $_POST["width"];
		$height 	= $_POST["height"];
		$target 	= $_POST["target"];
		$status 	= $_POST["status"];
		$target 	= $_POST["target"];

		$content 	= mysqli_real_escape_string($mysqli, $content);
		$left 		= mysqli_real_escape_string($mysqli, $left);
		$top 		= mysqli_real_escape_string($mysqli, $top);
		$width 		= mysqli_real_escape_string($mysqli, $width);
		$height 	= mysqli_real_escape_string($mysqli, $height);
		$status 	= mysqli_real_escape_string($mysqli, $status);

		$return = array();
		$return["message"] = "error";

		$insert = "update popup set 
			content 	='{$content}',
			leftpx 		='{$left}',
			toppx 		='{$top}',
			widthpx 	='{$width}',
			heightpx 	='{$height}',
			status 		='{$status}',
			created 	= now() where id={$target}";
		if (!$mysqli -> query($insert)) {
			$return["message"] = "error";
		}else{
			$return["message"] = "success";
		}

		echo json_encode($return);
		

		exit;
	}

	if($jobtype == "popsettings"){
		$auto 		= $_POST["auto"];
		$return = array();
		$return["message"] = "error";

		if($auto == 0){
			$reverse = 1;
		}else{
			$reverse = 0;
		}

		$insert = "update popup set settingsauto='{$auto}' where settingsauto={$reverse}";
		if (!$mysqli -> query($insert)) {
			$return["message"] = "error";
		}else{
			$return["message"] = "success";
		}

		echo json_encode($return);
		

		exit;
	}




?>
	