/**
 * Created by Ody on 4/10/2015.
 */

(function () {
    'use strict';

    var controller = function ($stateParams, $ionicPopup, _eliteApi, _myTeamsService) {
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

            model.team = team;

            model.following = _myTeamsService.isFollowingTeam(team.id);

            model.games = _.chain(data.games)
                .filter(isTeamInGame)
                .map(function (item) {
                    var isTeam1 = (item.team1Id === model.teamID);
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

            model.teamStanding = _.chain(data.standings)
                .map(function (s) {
                    return s.divisionStandings;
                })
                .flatten()
                .find({"teamId": model.teamID})
                .value();

            model.toggleFollow = function () {
                if(model.following){
                    //var confirmPopup = $ionicPopup.confirm({
                    //    title: "Unfollow?",
                    //    template: 'Are you sure you want to unfollow?'
                    //});
                    //
                    //confirmPopup.then(function(res){
                    //    if(res){
                    //        _myTeamsService.unfollowTeam(model.team.id);
                    //    }else{
                    //        model.following = false;
                    //    }
                    //});
                    _myTeamsService.followTeam(model.team);
                }
                else{
                    _myTeamsService.unfollowTeam(model.team.id);
                }
            };

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

    controller.$inject = ['$stateParams','$ionicPopup', '_eliteApi','_myTeamsService'];
    angular.module('eliteApp').controller('TeamDetailCtrl', controller);
})();