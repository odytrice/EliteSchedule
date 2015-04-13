/**
 * Created by Ody on 4/10/2015.
 */

(function () {
    'use strict';

    var controller = function ($stateParams, _eliteApi) {
        var model = this;
        model.teamID = Number($stateParams.id);

        _eliteApi.getLeagueData().then(function (data) {
            var team = _.chain(data.teams)
                .map(function (t) {
                    return t.divisionTeams;
                })
                .flatten()
                .find({'id': model.teamID})
                .value();

            model.teamName = team.name;

            model.games = _.chain(data.games)
                .filter(isTeamInGame)
                .map(function (item) {
                    var isTeam1 = (item.team1Id === model.teamID ? true : false)
                    var opponentName = isTeam1 ? item.team2 : item.team1;
                    var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
                    return {
                        gameId: item.id,
                        opponent: opponentName,
                        time: item.time,
                        location: item.location,
                        locationUrl: item.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? 'vs.' : 'at')
                    }
                })
                .value();

            console.log(model.games);

            function isTeamInGame(item) {
                return item.team1Id === model.teamId || item.team2Id === model.teamID;
            }

            function getScoreDisplay(isTeam1, team1Score, team2Score) {
                if (team1Score && team2Score) {
                    var teamScore = (isTeam1 ? team1Score : team2Score);
                    var opponentScore = (isTeam1 ? team2Score : team1Score);
                    var winIndicator = teamScore > opponentScore ? 'W: ' : 'L:';
                    return winIndicator + teamScore + '-' + opponentScore;
                }
                else {
                    return "";
                }
            }
        });

    };

    controller.$inject = ['$stateParams', '_eliteApi'];
    angular.module('eliteApp').controller('TeamDetailCtrl', controller);
})();