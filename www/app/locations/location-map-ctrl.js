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
                title: model.location.name + " <br/> (Tap for directions)",
                options: {
                    visible: true,
                }
            };
            model.map.center.latitude = model.location.latitude;
            model.map.center.longitude = model.location.longitude;


            model.windowOptions = {
                visible: false
            };

            model.onClick = function () {
                model.windowOptions.visible = !model.windowOptions.visible;
            };

            model.closeClick = function () {
                model.windowOptions.visible = false;
            };

        });
    };

    controller.$inject = ['$stateParams', '_eliteApi'];

    angular.module('eliteApp').controller('LocationMapCtrl', controller);
})();