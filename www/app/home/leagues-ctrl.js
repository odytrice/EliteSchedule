/**
 * Created by Ody on 4/12/2015.
 */
(function(){
    'use strict';
    var controller = function($state,_eliteApi){
        var model = this;
        _eliteApi.getLeagues().then(function(leagues){
            model.leagues = leagues;
        });

        model.selectLeague = function(leagueID){
            $state.go("app.teams");
        }
    };

    controller.$inject = ['$state','_eliteApi'];

    angular.module('eliteApp').controller('LeaguesCtrl',controller);
})();