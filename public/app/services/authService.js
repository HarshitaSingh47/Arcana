(function () {
    'use strict';

    function authService($firebaseAuth, $firebaseObject, $firebaseArray) {
        var fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com/'),
            fbAuth = $firebaseAuth(fbRef);

        function login(model) {
            return fbAuth.$authWithPassword(model);
        }

        function logout() {
            fbAuth.$unauth();
        }

        /*
        function getUserByUsername(username) {

        }
        */

        function getUser(uid) {
            return $firebaseObject(fbRef.child('users').child(uid)).$loaded();
        }

        function createUser(userInfo) {
            return ASQ(userInfo).then(function (next, userInfo) {
                fbAuth.$createUser(userInfo).then(function (userData) {
                    userInfo.uid = userData.uid;
                    next(userInfo);
                }).catch(function (error) {
                    next.fail(error);
                });
            }).then(function (next, userInfo) {
                $firebaseArray(fbRef.child('users')).$add({
                    username: userInfo.username,
                    email: userInfo.email
                }).then(function () {
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
            getUser: getUser,
            createUser: createUser
        };
    }
    authService.$inject = ['$firebaseAuth', '$firebaseObject', '$firebaseArray'];

    angular.module('arcana').factory('authService', authService);
}());