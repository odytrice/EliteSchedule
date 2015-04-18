/**
 * Created by Ody on 4/18/2015.
 */
(function () {
    'use strict';
    var factory = function (CacheFactory) {

        //Create Cache if not exists
        var cache = CacheFactory.get('myTeamsCache');
        if (!cache) cache = CacheFactory("myTeamsCache", {
            storageMode: "localStorage"
        });

        function followTeam(team) {
            cache.put(team.id, team);
        }

        function unfollowTeam(teamId) {
            cache.remove(teamId.toString());
        }

        function getFollowedTeams() {
            var teams = [],
                keys = cache.keys();
            //Go Through all the Keys available in the cache
            for (var i = 0; i < keys.length; i++) {
                var team = cache.get(keys[i]);
                teams.push(team);
            }
            return teams;
        }

        function isFollowingTeam(teamId) {
            return !!cache.get(teamId);
        }

        return {
            followTeam: followTeam,
            unfollowTeam: unfollowTeam,
            getFollowedTeams: getFollowedTeams,
            isFollowingTeam: isFollowingTeam
        }
    };

    factory.$inject = ['CacheFactory'];

    angular.module('eliteApp').factory('_myTeamsService', factory);
})();