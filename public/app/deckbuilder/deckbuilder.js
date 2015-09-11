(function () {
    'use strict';

    function deckbuilder($location, $firebaseObject, $firebaseAuth, FIREBASE_URL, currentAuth) {
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
            } else {
                $location.path('/login').search('redirect', 'deckbuilder');
            }
        }

        $firebaseAuth(fbRef).$onAuth(function (auth) {
            if (!auth) {
                $location.path('/login').search('redirect', 'deckbuilder');
            }
        });

        activate();
    }
    deckbuilder.$inject = ['$location', '$firebaseObject', '$firebaseAuth', 'FIREBASE_URL', 'currentAuth'];

    angular.module('arcana').controller('deckbuilder', deckbuilder);
}());