/**
 * Created by Ody on 4/10/2015.
 */

(function(){
    'use strict';

    var controller = function($stateParams){
        var vm = this;
        console.log($stateParams.id);
    };

    controller.$inject = ['$stateParams'];
    angular.module('eliteApp').controller('teamDetailCtrl',controller);
})();