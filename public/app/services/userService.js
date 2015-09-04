(function () {
    'use strict';

    function userService($q) {
        var usersRef = new Firebase('https://glaring-heat-7532.firebaseio.com/').child('users');

        function createUserProfile(userInfo) {
            usersRef.child(userInfo.uid).set({
                username: userInfo.username,
                email: userInfo.email
            });
        }

        function getUserProfile(uid) {
            var deferred = $q.defer();

            usersRef.child(uid).on('value', function (userRef) {
                var user = userRef.val();
                deferred.resolve(user);
            });

            return deferred.promise;
        }

        return {
            createUserProfile: createUserProfile,
            getUserProfile: getUserProfile
        };
    }
    userService.$inject = ['$q'];

    angular.module('arcana').factory('userService', userService);
}());