(function () {
    'use strict';

    function authService($firebaseAuth, $firebaseObject) {
        var fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com/'),
            fbAuth = $firebaseAuth(fbRef);

        function login(model) {
            return fbAuth.$authWithPassword(model);
        }

        function logout() {
            fbAuth.$unauth();
        }

        function register(userInfo) {
            return ASQ(userInfo).then(function (next, userInfo) {
                fbAuth.$createUser(userInfo).then(function (userData) {
                    userInfo.uid = userData.uid;
                    next(userInfo);
                }).catch(function (error) {
                    next.fail(error);
                });
            }).then(function (next, userInfo) {
                var userRef = $firebaseObject(fbRef.child('users').child(userInfo.uid));
                userRef.username = userInfo.username;
                userRef.email = userInfo.email;
                userRef.$save().then(function () {
                    next(userInfo);
                });
            }).then(function (next, userInfo) {
                fbAuth.$authWithPassword(userInfo);
                next();
            });
        }

        return {
            login: login,
            logout: logout,
            register: register
        };
    }
    authService.$inject = ['$firebaseAuth', '$firebaseObject'];

    angular.module('arcana').factory('authService', authService);
}());