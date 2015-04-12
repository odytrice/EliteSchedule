/**
 * Created by Ody on 4/12/2015.
 */

(function () {
    'use strict';

    var factory = function ($http, $q) {


        function getLeagues() {
            return getData('/api/leagues.json');
        }

        function getLeagueData() {
            return getData('/api/leaguedata.json');
        }

        function getData(url){
            var defer = $q.defer();

            $http.get(url)
                .success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    defer.reject("An Error Occured: " + status);
                });

            return defer.promise;
        }

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData
        }
    };

    factory.$inject = ['$http', '$q'];

    angular.module('eliteApp').factory('_eliteApi', factory);
})();