(function () {
    'use strict';

    function header($firebaseAuth, $firebaseObject, FIREBASE_URL, authService) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL);

        vm.currentUser = undefined;

        $firebaseAuth(fbRef).$onAuth(function (authData) {
            if (authData) {
                $firebaseObject(fbRef.child('users').child(authData.uid)).$loaded().then(function (user) {
                    vm.currentUser = { username: user.username };
                });
            }
        });

        vm.logout = function () {
            authService.logout();
            vm.currentUser = undefined;
        };
    }
    header.$inject = ['$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', 'authService'];

    angular.module('arcana').controller('header', header);
}());