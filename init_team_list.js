
var team_list = new Array()


var team_name_list = Array("Central Pulse,New Zealand",
							"Northern Mystics,New Zealand",
							"Waikato Bay of Plenty Magic,New Zealand",
							"Southern Steel,New Zealand",
							"Canterbury Tactix,New Zealand",
							"New South Wales Swifts,Australia",
							"Adelaide Thunderbirds,Australia",
							"Melbourne Vixens,Australia",
							"West Coast Fever,Australia",
							"Queensland Firebirds,Australia")



function team_info(name, coun, win, lost, venue, home, away, rate, final_score, goal_percentage, ranking, final_series){
	this.name = name
	this.coun = coun
	this.venue = venue
	this.win = win
	this.lost = lost
	this.home = home
	this.away = away
	this.win_rate = rate
	this.regular_final_score = final_score
	this.goal_percentage = goal_percentage
	this.ranking = ranking
	this.final_series = final_series
}

function home(result, win_per, lost_per){
	this.result = result
	this.win_percentage = win_per
	this.lost_percentage = lost_per
}

function away(result, win_per, lost_per){
	this.result = result
	this.win_percentage = win_per
	this.lost_percentage = lost_per
}

function vs_result(name, host_score, rival_score, diff, lost_or_win, round, round_rank, round_score, round_percent){
	this.rival_name = name
	this.this_score = host_score
	this.rival_score = rival_score
	this.diff = diff
	this.lost_or_win = lost_or_win
	this.round = round
	this.round_score = round_score
	this.round_percent = round_percent
}

function final_series(semi_final, preliminary, final_game){
	this.semi_final = semi_final
	this.preliminary = preliminary
	this.final_game = final_game
}

function final_games(home_or_away, name, home_score, rival_score, diff, lost_or_win, round){
	this.home_or_away = home_or_away
	this.rival_name = name
	this.this_score = home_score
	this.rival_score = rival_score
	this.diff = diff
	this.lost_or_win = lost_or_win
	this.round = round
}

function init_team_list() {
	var i = 0
	for(i = 0; i < team_name_list.length; i++)
	{	
		var name = team_name_list[i].slice(0, team_name_list[i].indexOf(","))
		var coun = team_name_list[i].slice(team_name_list[i].indexOf(",") + 1, team_name_list[i].length)
		team_list[i] = new team_info(name,coun, 
											0, 0, "")
	}
}

function init_venues(data){
		var i = j = 0
		for(i = 0; i < team_list.length; i++){
			for(j = 0; j < data.length; j++){
				if(team_list[i].name == data[j].HomeTeam)
				{
					team_list[i].venue = data[j].Venue
				}
			}
		}
	}

function init_home(data, team_info){
	var i = 0
	var flag = 0
	for(; i < data.length; i++){
		if(team_info.name == data[i].HomeTeam){
			if(team_info.home == undefined)
			{
				var home_info = new home()
				init_result(data[i], home_info, flag)
				team_info.home = home_info
			}
			else
			{
				init_result(data[i], team_info.home, flag)
			}
		}
	}
}

function count_per(team_info){
	_count_per_home(team_info.home)	
	_count_per_away(team_info.away)
	_count_win_rate(team_info, team_info.home.win_percentage, team_info.away.win_percentage)
}

function _count_win_rate(team_info, home, away){
	var h = parseFloat(home)
	var a = parseFloat(away)
	team_info.win_rate = ((h + a) / 2).toFixed(2)
}

function _count_per_home(home){
	var i = 0
	var win = 0
	for(;i < home.result.length; i++){
		if(home.result[i].lost_or_win == "win")
		{
			win++
		}
	}
	home.win_percentage = (win / home.result.length).toFixed(2)
	home.lost_percentage = (1 - home.win_percentage).toFixed(2)
}


function _count_per_away(away){
	var i = 0
	var win = 0
	for(;i < away.result.length; i++){
		if(away.result[i].lost_or_win == "win")
		{
			win++
		}
	}
	away.win_percentage = (win / away.result.length).toFixed(2)
	away.lost_percentage = (1 - away.win_percentage).toFixed(2)
}


function init_away(data, team_info){
	var i = 0
	var flag = 1
	for(; i < data.length; i++){
		if(team_info.name == data[i].AwayTeam){
			if(team_info.away == undefined)
			{
				var away_info = new away()
				init_result(data[i], away_info, flag)
				team_info.away = away_info
			}
			else
			{
				init_result(data[i], team_info.away, flag)
			}
		}

	}
}

function init_result(data, ho_aw, flag){
	//home
	if(flag == 0)
	{
		var host_score = parseInt(data.Score.slice(0, 2))
		var rival_score = parseInt(data.Score.slice(3, 5))
		var name = data.AwayTeam
		var lost_or_win = ""

		if(host_score > rival_score){
			var diff = host_score - rival_score
			lost_or_win = "win"
		}
		else{
			var diff = rival_score - host_score
			lost_or_win = "lost"
		}

		if(ho_aw.result == undefined){
			var my_result = new Array()
			my_result[0] = new vs_result(name, host_score, rival_score, diff, lost_or_win, data.Round)
			ho_aw.result = my_result
		}
		else
		{
			ho_aw.result[ho_aw.result.length] = new vs_result(name, host_score, rival_score, diff, lost_or_win, data.Round)
		}


	}
	else //away
	{
		var away_score = parseInt(data.Score.slice(3, 5))
		var rival_score = parseInt(data.Score.slice(0, 2))
		var name = data.HomeTeam
		var lost_or_win = ""
	
		if(away_score > rival_score){
			var diff = away_score - rival_score
			var lost_or_win = "win"
		}
		else{
			var diff = rival_score - away_score
			lost_or_win = "lost"
		}

		if(ho_aw.result == undefined){
			var my_result = new Array()
			my_result[0] = new vs_result(name, away_score, rival_score, diff, lost_or_win, data.Round)
			ho_aw.result = my_result
		}
		else
		{
			ho_aw.result[ho_aw.result.length] = new vs_result(name, away_score, rival_score, diff, lost_or_win, data.Round)
		}
	}

}


function cal_win(team_info){
	var game_num = 0
	game_num = team_info.home.result.length + team_info.away.result.length
	var home_win = _cal_home(team_info.home)
	var away_win = _cal_away(team_info.away)
	team_info.win = home_win + away_win
	team_info.lost = 13 - team_info.win
}

function _cal_home(home){
	var win = 0
	var i = 0
	for(;i < home.result.length; i++){
		if(home.result[i].lost_or_win == "win")
		{
			if(home.result[i].round < 15){
				win++
			}
		}
	}
	return win
}

function _cal_away(away){
	var win = 0
	var i = 0
	for(;i < away.result.length; i++){
		if(away.result[i].lost_or_win == "win")
		{
			if(away.result[i].round < 15){
				win++
			}
		}
	}
	return win
}

function init_final_score(team_info){
	var home_score = _home_score(team_info.home)
	var away_score = _away_score(team_info.away)
	team_info.regular_final_score = home_score + away_score
}


function _home_score(home){
	var score = 0
	var i = 0
	for(; i < home.result.length; i++){
		if(home.result[i].round < 15)
		{
			if(home.result[i].lost_or_win == "win"){
				score += 2
			}
		}
		else
		{
			break
		}
	}
	return score
}

function _away_score(away){
	var score = 0
	var i = 0
	for(; i < away.result.length; i++){
		if(away.result[i].round < 15)
		{
			if(away.result[i].lost_or_win == "win"){
				score += 2
			}
		}
		else
		{
			break
		}
	}
	return score
}

function init_basic_info(data){
	var i = 0
	for(i = 0; i < team_list.length; i++)
	{
		init_home(data, team_list[i])
		init_away(data, team_list[i])
		count_per(team_list[i])
		cal_win(team_list[i])
		init_venues(data)
		init_final_score(team_list[i])
		init_goal_percentage(team_list[i])
	}
	init_regular_ranking(team_list)
	init_round_score(team_list)
	for(i = 0; i < team_list.length; i++){
		init_final_series(team_list[i])
	}
}



function init_goal_percentage(team_info){
	var total_goal_num = 0
	var total_conceded_num = 0
	total_goal_num = _home_total_gnum(team_info.home) + _away_total_gnum(team_info.away)
	total_conceded_num = _home_total_cnum(team_info.home) + _away_total_cnum(team_info.away)
	team_info.goal_percentage = ((total_goal_num / total_conceded_num) * 100).toFixed(2)
}


function _home_total_gnum(home){
	var i = 0
	var num = 0
	for(;i < home.result.length; i++){
		if(home.result[i].round < 15)
		{
			num += home.result[i].this_score
		}
	}
	return num
}

function _away_total_gnum(away){
	var i = 0
	var num = 0
	for(;i < away.result.length; i++){
		if(away.result[i].round < 15)
		{
			num += away.result[i].this_score
		}
	}
	//document.write(num)
	return num
}

function _home_total_cnum(home){
	var i = 0
	var num = 0
	for(;i < home.result.length; i++){
		if(home.result[i].round < 15)
		{
			num += home.result[i].rival_score
		}
	}
	return num

}


function _away_total_cnum(away){
	var i = 0
	var num = 0
	for(;i < away.result.length; i++){
		if(away.result[i].round < 15)
		{
			num += away.result[i].rival_score
		}
	}
	return num
}


function init_regular_ranking(team_list){
	var i = 0
	function simple_team_list(team, rank){
		this.team_lt = team_lt
	}

	function team(name, score, rank){
		this.name = name
		this.score = score
		this.rank = rank
	}
	var s_team_list = new simple_team_list()
	var team_lt = new Array()
	for(; i < team_list.length; i++){
		team_lt[i] = new team(team_list[i].name, team_list[i].regular_final_score)
	}
	_sort(team_lt)
	s_team_list.team_lt = team_lt
	further_sort(team_list, s_team_list)
	__rank_init(s_team_list)
	_init_rank(team_list, s_team_list)
}


function init_round_score(team_list){
	var i = 0
	
	for(i = 0; i < team_list.length; i++){
		_init_round_score(team_list[i])
	}
}

function _init_round_score(team_info){
	var j = h = k = 0
	var score = 0
	for(; j < 15; j++){
		if(team_info.away.result[k] != undefined){
			if(team_info.away.result[k].round == j){
				if(team_info.away.result[k].lost_or_win == "win"){
					score += 2
				}
				team_info.away.result[k].round_score = score
				team_info.away.result[k].round_percent = (team_info.away.result[k].this_score / team_info.away.result[k].rival_score * 100).toFixed(2)
				k += 1
			}
		}
		if(team_info.home.result[h] != undefined){
			if(team_info.home.result[h].round  == j){
				if(team_info.home.result[h].lost_or_win == "win"){
					score += 2
					team_info.home.result[h].round_score = score
				}
				team_info.home.result[h].round_score = score
				team_info.home.result[h].round_percent = (team_info.home.result[h].this_score / team_info.home.result[h].rival_score * 100).toFixed(2)
				h += 1
			}
		}
	}
}
function _init_rank(team_list, s_team_list){
	var i = j = 0
	for(; i < team_list.length; i++){
		for(j = 0; j < s_team_list.team_lt.length; j++){
			if(team_list[i].name == s_team_list.team_lt[j].name)
			{
				team_list[i].ranking = s_team_list.team_lt[j].rank
			}
		}
	}
}

function __rank_init(s_team_list){
	var i = 0
	for(; i < s_team_list.team_lt.length; i++){
		s_team_list.team_lt[i].rank = i + 1
	}

}

function further_sort(team_list, s_team_list){

	var i = 0
	var temp
	for(; i < s_team_list.team_lt.length - 1; i++){
		if(s_team_list.team_lt[i].score == s_team_list.team_lt[i + 1].score)
		{
			var s_percent_1 = _look_up_per(team_list, s_team_list.team_lt[i].name)
			var s_percent_2 = _look_up_per(team_list, s_team_list.team_lt[i + 1].name)
			if(s_percent_1 < s_percent_2)
			{
				temp = s_team_list.team_lt[i + 1]
				s_team_list.team_lt[i + 1] = s_team_list.team_lt[i]
				s_team_list.team_lt[i] = temp
			}
		}
	}

}

function _look_up_per(team_list, name){
	var i = 0
	for(; i < team_list.length; i++){
		if(name == team_list[i].name){
			return team_list[i].goal_percentage
		}
	}
}



function _sort(team_lt){
	var i = j = 0
	var temp
	for(; i < team_lt.length; i++){
		for(j = team_lt.length - 1; j > i; j--){
			if(team_lt[j].score > team_lt[j - 1].score)
			{
				temp = team_lt[j - 1]
				team_lt[j - 1] = team_lt[j]
				team_lt[j] = temp
			}
		}
	}
}

function init_final_series(team_info){
		
	if(team_info.ranking > 4){
		return
	}
	else
	{
		_semi(team_info)
		if(team_info.final_series.semi_final.lost_or_win == "win" || team_info.ranking > 2)
		{
			_pre_final(team_info)
		}
		if((team_info.final_series.semi_final.lost_or_win == "win" && team_info.ranking < 3) || (team_info.final_series.preliminary != undefined && team_info.final_series.preliminary.lost_or_win == "win"))
		{
			_final(team_info)
		}
	}
}

function _final(team_info){
	var final_game = new final_games()
	for(i = 0; i < team_info.home.result.length; i++){
		if(team_info.home.result[i].round == 17){
			final_game.home_or_away = "home"
			_copy_info(final_game, team_info.home.result[i])
		}
	}
	for(i = 0; i < team_info.away.result.length; i++){
		if(team_info.away.result[i].round == 17){
			final_game.home_or_away = "away"
			_copy_info(final_game, team_info.away.result[i])
		}
	}
	team_info.final_series.final_game = final_game

}

function _pre_final(team_info){
	var final_game = new final_games()
	for(i = 0; i < team_info.home.result.length; i++){
		if(team_info.home.result[i].round == 16){
			final_game.home_or_away = "home"
			_copy_info(final_game, team_info.home.result[i])
		}
	}
	for(i = 0; i < team_info.away.result.length; i++){
		if(team_info.away.result[i].round == 16){
			final_game.home_or_away = "away"
			_copy_info(final_game, team_info.away.result[i])
		}
	}
	team_info.final_series.preliminary = final_game
}

function _semi(team_info){
	var final_s = new final_series()
	final_s.semi_final = __init_semi(team_info, final_s)
	team_info.final_series = final_s
}

function __init_semi(team_info, final_s){
	var final_game = new final_games()
	var i = 0
	for(i = 0; i < team_info.home.result.length; i++){
		if(team_info.home.result[i].round == 15){
			final_game.home_or_away = "home"
			_copy_info(final_game, team_info.home.result[i])
			return final_game
		}
	}
	for(i = 0; i < team_info.away.result.length; i++){
		if(team_info.away.result[i].round == 15){
			final_game.home_or_away = "away"
			_copy_info(final_game, team_info.away.result[i])
			return final_game
		}
	}
}

function _copy_info(final_game, result){
	final_game.rival_name = result.rival_name
	final_game.this_score = result.this_score
	final_game.rival_score = result.rival_score
	final_game.diff = result.diff
	final_game.lost_or_win = result.lost_or_win
	final_game.round = result.round
}

