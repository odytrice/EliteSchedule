/**
 * Created by Ody on 4/12/2015.
 */
(function () {
    'use strict';
    var controller = function (_eliteApi) {
        var model = this;

        _eliteApi.getLeagueData().then(function(data){
            model.standings = data.standings;
        });
    };

    controller.$inject = ['_eliteApi'];
    angular.module('eliteApp').controller('StandingsCtrl',controller);
})();