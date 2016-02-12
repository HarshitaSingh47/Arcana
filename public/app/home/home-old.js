(function () {
    'use strict';

    function home($firebaseObject, $firebaseAuth, FIREBASE_URL) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL),
            fbAuth = $firebaseAuth(fbRef);

        vm.currentUser = fbAuth.$getAuth();

        function activate() {
            if (vm.currentUser && vm.currentUser.uid) {
                $firebaseObject(fbRef.child('users').child(vm.currentUser.uid)).$loaded().then(function (user) {
                    vm.currentUser.username = user.username;
                });
            }
        }

        fbAuth.$onAuth(function (authData) {
            vm.currentUser = authData;
            if (authData) {
                $firebaseObject(fbRef.child('users').child(vm.currentUser.uid)).$loaded().then(function (user) {
                    vm.currentUser.username = user.username;
                });
            }
        });

        activate();
    }
    home.$inject = ['$firebaseObject', '$firebaseAuth', 'FIREBASE_URL'];

    angular.module('arcana').controller('home', home);
}());