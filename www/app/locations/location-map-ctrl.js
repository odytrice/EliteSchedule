/**
 * Created by Ody on 4/19/2015.
 */
(function () {
    'use strict';
    var controller = function ($stateParams, _eliteApi) {
        var model = this;
        model.locationId = Number($stateParams.id);
        model.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530
            },
            zoom: 12
        };
        model.marker = {};
        _eliteApi.getLeagueData().then(function (data) {
            model.location = _.find(data.locations, {id: model.locationId});
            model.marker = {
                latitude: model.location.latitude,
                longitude: model.location.longitude,
                showWindow: true,
                title: {
                    text: model.location.name,
                    hint: "(Tap for directions)"
                },
                options: {
                    visible: true
                },
                events:{
                    'click':function(){
                        //$scope.$apply(function(){
                            window.location.href = "geo:" + model.marker.latitude + "," + model.marker.longitude;
                        //});
                    }
                }
            };
            model.map.center.latitude = model.location.latitude;
            model.map.center.longitude = model.location.longitude;
        });
    };

    controller.$inject = ['$stateParams', '_eliteApi'];

    angular.module('eliteApp').controller('LocationMapCtrl', controller);
})();