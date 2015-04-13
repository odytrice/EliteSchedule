/**
 * Created by Ody on 4/13/2015.
 */
(function () {
    'use strict';

    var controller = function ($stateParams, _eliteApi) {
        var model = this;

        var gameId = Number($stateParams.id);
        var data = _eliteApi.getLeagueData().then(function(data){
            model.game = _.find(data.games, {"id": gameId});
        });
    };

    controller.$inject = ['$stateParams', '_eliteApi'];

    angular.module('eliteApp').controller('GameCtrl', controller);
})();