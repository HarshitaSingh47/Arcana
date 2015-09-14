(function () {
    'use strict';

    function adminDecks($firebaseArray, $firebaseObject, FIREBASE_URL) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL + '/decks');

        $firebaseArray(fbRef).$loaded(function (data) {
            vm.decks = data;
        });

        vm.deleteDeck = function (deckId) {
            $firebaseObject(fbRef.child(deckId)).$remove();
        };
    }
    adminDecks.$inject = ['$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];

    angular.module('arcana').controller('adminDecks', adminDecks);
}());