/**
 * Created by Ody on 4/18/2015.
 */
(function () {
    'use strict';
    var controller = function ($state, _myTeamsService, _eliteApi) {
        var model = this;
        model.myTeams = _myTeamsService.getFollowedTeams();
        model.goToTeam = function (team) {
            _eliteApi.setLeagueId(team.leagueId);
            $state.go("app.team-detail", {id: team.id});
        }
    };

    controller.$inject = ['$state', '_myTeamsService', '_eliteApi'];

    angular.module('eliteApp').controller('MyTeamsCtrl', controller);
})();