function team_score(name, score_list, x, y){
	this.name = name
	this.score_list = score_list
}

function score(rival, home_or_away, score, round, lost_or_win = undefined, x = undefined, y = undefined)
{
	this.rival = rival
	this.home_or_away = home_or_away
	this.score = score
	this.round = round
	this.lost_or_win = lost_or_win
	this.x = x
	this.y = y
}

function init_score(team_info){
	var team_sc = new team_score()
	var score_list = new Array()

	team_sc.name = team_info.name.replace(/ /g, '')

	score_list[0] = new score("0", "home", 0, 0, "win")

	for(var i = 0; i < team_info.away.result.length; i++){
		var round = team_info.away.result[i].round
		var lost_or_win = team_info.away.result[i].lost_or_win
		var rival = team_info.away.result[i].rival_name.replace(/ /g, '')
		var home_or_away = "away"
		var sc = team_info.away.result[i].this_score
		score_list[round] = new score(rival, home_or_away, sc, round, lost_or_win)
	}
	for(var i = 0; i < team_info.home.result.length; i++){
		round = team_info.home.result[i].round
		var lost_or_win = team_info.home.result[i].lost_or_win
		rival = team_info.home.result[i].rival_name.replace(/ /g, '')
		home_or_away = "home"
		sc = team_info.home.result[i].this_score
		score_list[round] = new score(rival, home_or_away, sc, round, lost_or_win)
	}

	team_sc.score_list = score_list
	return team_sc
}

function init_dataset(team_list, dataset){
	for(var i = 0; i < team_list.length; i++){
		dataset[i] = init_score(team_list[i])
	}
}

