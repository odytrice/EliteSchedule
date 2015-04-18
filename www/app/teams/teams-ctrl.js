/**
 * Created by Ody on 4/12/2015.
 */
(function(){
    'use strict';

    var controller = function($scope,_eliteApi){
        var model = this;
        model.loadList = function(forceRefresh){
            _eliteApi.getLeagueData(forceRefresh).then(function(data){
                model.teams = data.teams;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete')
            });
        };

        model.loadList(false);
    };

    controller.$inject = ['$scope','_eliteApi'];

    angular.module('eliteApp').controller('TeamsCtrl',controller);
})();