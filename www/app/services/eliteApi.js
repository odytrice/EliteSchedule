/**
 * Created by Ody on 4/12/2015.
 */

(function () {
    'use strict';

    var factory = function ($http, $q, $ionicLoading, CacheFactory) {

        var currentLeagueId;

        //Create Cache if not exists
        var cache = CacheFactory.get('eliteApiCache');
        if(!cache) cache = CacheFactory("eliteApiCache",{
            maxAge: 10000,
            deleteOnExpire:"aggressive",
            storageMode: "localStorage"
        });

        cache.setOptions({
            onExpire: function(key,value){
                fetchData(key).then(function(){
                    console.log("Cache was Automatically Updated");
                },function(){
                    console.log("Error getting data. Putting expired items");
                    cache.put(key,value,new Date());
                });
            }
        });

        //Get Leagues
        function getLeagues() {
            return getData('/api/leagues.json');
        }

        function getLeagueData() {
            return getData('/api/leaguedata.json');
        }

        function getData(url) {
            var defer = $q.defer(),
                data =  cache.get(url);

            if (data) {
                console.log("Found data inside cache", data);
                defer.resolve(data);
            } else {
                $ionicLoading.show({template: 'Loading...'});
                fetchData(url).then(function(){
                    $ionicLoading.hide();
                },function(){
                    $ionicLoading.hide();
                });
            }
            return defer.promise;
        }

        function fetchData(url) {
            var defer = $q.defer();
            $http.get(url)
                .success(function (data, status, headers, config) {
                    console.log("Received data via HTTP");
                    cache.put(url, data);
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    defer.reject("An Error Occured: " + status);
                });
            return defer.promise;
        };



        function setLeagueId(leagueId){
            currentLeagueId = leagueId
        }

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData,
            setLeagueId: setLeagueId
        }
    };

    factory.$inject = ['$http', '$q', '$ionicLoading', 'CacheFactory'];

    angular.module('eliteApp').factory('_eliteApi', factory);
})();