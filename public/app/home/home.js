(function () {
    'use strict';

    function home($firebaseObject, $firebaseAuth, FIREBASE_URL, currentAuth) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL);

        vm.currentUser = undefined;

        function activate() {
            if (currentAuth && currentAuth.uid) {
                $firebaseObject(fbRef.child('users').child(currentAuth.uid)).$loaded().then(function (user) {
                    vm.currentUser = {
                        uid: user.uid,
                        username: user.username
                    };
                });
            }
        }

        $firebaseAuth(fbRef).$onAuth(function (authData) {
            if (!authData) {
                vm.currentUser = undefined;
            }
        });

        activate();
    }
    home.$inject = ['$firebaseObject', '$firebaseAuth', 'FIREBASE_URL', 'currentAuth'];

    angular.module('arcana').controller('home', home);
}());