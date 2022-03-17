const fs = require('fs');
const request = require('request');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const jsonString1 = fs.readFileSync("../temp_datas_c5dtd233sxtsd_edksqxx3455/settlement_match.json");
var obj;
const path = '../temp_datas_c5dtd233sxtsd_edksqxx3455/settlement_flashcore.json';
var url = [];
const db = require("mysql2-promise")();
db.configure({
    host: "103.7.236.4",
    user: "vicsports",
    password: "password2",
    database: "vicsportlive",
});
var counter = 0;

//scores & match id
let part1_score_away = 0;
let part2_score_away = 0;
let part3_score_away = 0;
let part4_score_away = 0;
let part5_score_away = 0;
let part6_score_away = 0;
let part7_score_away = 0;
let part8_score_away = 0;
let part9_score_away = 0;
let part1_score_home = 0;
let part2_score_home = 0;
let part3_score_home = 0;
let part4_score_home = 0;
let part5_score_home = 0;
let part6_score_home = 0;
let part7_score_home = 0;
let part8_score_home = 0;
let part9_score_home = 0;
const matches_id = [];
const arr = [];
const new_arr = [];

//newvars
let new_away_name = [];
let new_home_name = [];
let new_away_scores = [];
let new_home_scores = [];

async function startGenerate(){
    obj = JSON.parse(jsonString1);
    const blogs = _.map(obj, (b) => {
        var data = {
            "url": b.livescore,
            "homekorname": b.home_korname,
            "homenewkorname": b.home_new_korname,
            "homename": b.home_name,
            "awaykorname": b.away_korname,
            "awaynewkorname": b.away_new_korname,
            "awayname": b.away_name,
            "gameno": b.game_no,
        };
        
        url.push(data);
    });
    await startGenerate2();
}

async function startGenerate2(){
    for(var i = 0; i < url.length; i++){
        await getMatch(url[i]['url'],url[i]['homekorname'],url[i]['homenewkorname'],url[i]['homename'],url[i]['awaykorname'],url[i]['awaynewkorname'],url[i]['awayname'],url[i]['gameno']);
    }
}

async function getMatch(type, homekrname, homenewkrname, homename, awaykrname, awaynewkrname, awayname, gameno){
    if(type == "bastketball_score.php"){
        var matchclass = 3;
        await generatedScore('https://www.flashscore.co.kr/basketball/',homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass);
    }
    if(type == "volleyball_score.php"){
        var matchclass = 12;
        await generatedScore('https://www.flashscore.co.kr/volleyball/',homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass);
    }
    if(type == "soccer_score.php"){
        var matchclass = 1;
        await generatedScore('https://www.flashscore.co.kr/',homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass);
    }
    if(type == "hockey_score.php"){
        var matchclass = 4;
        await generatedScore('https://www.flashscore.co.kr/hockey/',homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass);
    }
}

async function generatedScore(url,homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass){

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const [page] = await browser.pages();

    //open page
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    //get element
    const [el] = await page.$x('//*[@id="live-table"]');
    const txt = await el.getProperty('innerHTML');

    //get matchid_length
    const matchid = await page.$$('.event__match');
    const matchidJS = await Promise.all(
        matchid.map(handle => handle.getProperty('outerHTML'))
    );
    let matchid_length = await Promise.all(
        matchidJS.map(handle => handle.jsonValue())
    );

    
    if(matchid_length.length == 0){
        generatedScore(url,homekrname,homenewkrname,homename,awaykrname,awaynewkrname,awayname,gameno,matchclass)
    }
    else{
        for(let r = 0; r < 2; r++){
            //selectors
            if(r == 0){ var selector1 = ".event__participant--away"; var selector2 = ".event__score--away";  }
            else{ var selector1 = ".event__participant--home"; var selector2 = ".event__score--home"; }

            //name
            const teamHandles = await page.$$(selector1);
            const teamJsHandles = await Promise.all(
                teamHandles.map(handle => handle.getProperty('textContent'))
            );
            const teamname = await Promise.all(
                teamJsHandles.map(handle => handle.jsonValue())
            );
            //score
            const teamscoreHandles = await page.$$(selector2);
            const teamscoreJsHandles = await Promise.all(
                teamscoreHandles.map(handle => handle.getProperty('textContent'))
            );
            const teamscore = await Promise.all(
                teamscoreJsHandles.map(handle => handle.jsonValue())
            );

            if(r == 0){ new_away_name = teamname; new_away_scores = teamscore; }
            else{ new_home_name = teamname; new_home_scores = teamscore;}
            
        }


        for(var i = 0; i < matchid_length.length; i++){
            var aname = new_away_name[i];
            var hname = new_home_name[i];
            var away_score = new_away_scores[i];
            var home_score = new_home_scores[i];
            var rating = 0.75;
            var fulltime_away = away_score;
            var fulltime_home = home_score;
            var gtype = url.split("_")[0];
            if(matchclass == 1){
                rating = 0.32;
            }
            if(homenewkrname == null || awaynewkrname == null){
                var matching1 = similarity(homekrname,hname);
                var matching2 = similarity(awaykrname,aname);
                var matching11 = similarity(homekrname,hname);
                var matching22 = similarity(awaykrname,aname);
            }
            else{
                var matching1 = similarity(homekrname,hname);
                var matching2 = similarity(awaykrname,aname);
                var matching11 = similarity(homenewkrname,hname);
                var matching22 = similarity(awaynewkrname,aname);
            }
            if((matching1 >= rating && matching2 >= rating) || matching11 >= rating && matching22 >= rating){
                for(let r = 0; r < 2; r++){
                    for(let x = 1; x <= 9; x++){
                        //select splitter
                        if(r == 0){ var splitter = '<div class="event__part event__part--away event__part--'+x+'">'; }
                        else{ var splitter = '<div class="event__part event__part--home event__part--'+x+'">'; }

                        //scores part by part
                        var scoring = matchid_length[i].split(splitter);
                        if(scoring[1] == undefined){
                            if(x == 1){ if(r == 0){ part1_score_away = -1; } else{ part1_score_home = -1; } }
                            else if(x == 2){ if(r == 0){ part2_score_away = -1; } else{ part2_score_home = -1; }}
                            else if(x == 3){ if(r == 0){ part3_score_away = -1; } else{ part3_score_home = -1; }}
                            else if(x == 4){ if(r == 0){ part4_score_away = -1; } else{ part4_score_home = -1; }}
                            else if(x == 5){ if(r == 0){ part5_score_away = -1; } else{ part5_score_home = -1; }}
                            else if(x == 6){ if(r == 0){ part6_score_away = -1; } else{ part6_score_home = -1; }}
                            else if(x == 7){ if(r == 0){ part7_score_away = -1; } else{ part7_score_home = -1; }}
                            else if(x == 8){ if(r == 0){ part8_score_away = -1; } else{ part8_score_home = -1; }}
                            else{ if(r == 0){ part9_score_away = -1; } else{ part9_score_home = -1; }}
                        }
                        else{
                            var scoring_value = scoring[1].split('</div>');
                            if(x == 1){ 
                                if(r == 0){ part1_score_away = convertValue(scoring_value[0], matchclass); }
                                else{ part1_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 2){ 
                                if(r == 0){ part2_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part2_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 3){ 
                                if(r == 0){ part3_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part3_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 4){ 
                                if(r == 0){ part4_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part4_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 5){ 
                                if(r == 0){ part5_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part5_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 6){ 
                                if(r == 0){ part6_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part6_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 7){ 
                                if(r == 0){ part7_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part7_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else if(x == 8){ 
                                if(r == 0){ part8_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part8_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                            else{ 
                                if(r == 0){ part9_score_away = convertValue(scoring_value[0], matchclass); } 
                                else{ part9_score_home = convertValue(scoring_value[0], matchclass); }
                            }
                        }
                    }
                }
                var data = {
                    "matchtype" : gtype,
                    "game_no" : gameno,
                    "home_name" : hname,
                    "away_name" : aname,
                    "homefulltime" : fulltime_home,
                    "awayfulltime" : fulltime_away,
                    "homefinalscore" : home_score,
                    "awayfinalscore" : away_score,
                    "home1PeriodScore": part1_score_home,
                    "away1PeriodScore": part1_score_away,
                    "home2PeriodScore": part2_score_home,
                    "away2PeriodScore": part2_score_away,
                    "home3PeriodScore": part3_score_home,
                    "away3PeriodScore": part3_score_away,
                    "home4PeriodScore": part4_score_home,
                    "away4PeriodScore": part4_score_away,
                    "home5PeriodScore": part5_score_home,
                    "away5PeriodScore": part5_score_away,
                    "home6PeriodScore": part6_score_home,
                    "away6PeriodScore": part6_score_away,
                    "home7PeriodScore": part7_score_home,
                    "away7PeriodScore": part7_score_away,
                    "home8PeriodScore": part8_score_home,
                    "away8PeriodScore": part8_score_away,
                    "home9PeriodScore": part9_score_home,
                    "away9PeriodScore": part9_score_away
                };
                var sql = "SELECT * FROM game_results_flashcore WHERE game_no='"+gameno+"'";
                db.query(sql, function(err, rows, fields) {
                    if (err) throw err;
                    counter++;
                });

                if(counter > 0){
                    counter = 0;
                    console.log("successfully updated in db");
                }
                else{
                    var InSql = "INSERT INTO game_results_flashcore (game_no, game_idx, game_type, sporttype, rst_done, game_status, homeFullTimeScore, homeFinalScore, awayFullTimeScore, awayFinalScore, homeCurrentScore, homeOverTimeScore, home1PeriodScore, home2PeriodScore, home3PeriodScore, home4PeriodScore, home5PeriodScore, home6PeriodScore, home7PeriodScore, home8PeriodScore, home9PeriodScore, awayCurrentScore, awayOverTimeScore, away1PeriodScore, away2PeriodScore, away3PeriodScore, away4PeriodScore, away5PeriodScore, away6PeriodScore, away7PeriodScore, away8PeriodScore, away9PeriodScore, settle, settle_1, settle_2, settle_3, settle_4, settle_5, settle_6, settle_7, settle_8, settle_9, settle_overtime) VALUES('"+gameno+"', '"+gameno+"', 'prematch', '"+gtype+"', 0, 0, '"+fulltime_home+"', '"+home_score+"', '"+fulltime_away+"', "+away_score+", -1, -1, '"+part1_score_home+"', '"+part2_score_home+"', '"+part3_score_home+"', '"+part4_score_home+"', '"+part5_score_home+"', '"+part6_score_home+"', '"+part7_score_home+"', '"+part8_score_home+"', '"+part9_score_home+"', -1, -1, '"+part1_score_away+"', '"+part2_score_away+"', '"+part3_score_away+"', '"+part4_score_away+"', '"+part5_score_away+"', '"+part6_score_away+"', '"+part7_score_away+"', '"+part8_score_away+"', '"+part9_score_away+"', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                    await db.query(InSql);
                    console.log("successfully inserted in db");
                }
            }
        }

    }
    matchid_length = 0;
    await browser.close();
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase().toString();
    s2 = s2.toLowerCase().toString();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function convertValue(param, matchclass){
    if(matchclass == 1){
        var str1 = param.replace("(", "");
        var str2 = str1.replace(")", "");
        return str2;
    }
    else{
        return param;
    }
}

startGenerate();