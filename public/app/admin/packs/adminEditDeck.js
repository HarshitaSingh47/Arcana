(function () {
    'use strict';

    function adminEditDeck($firebaseObject, deckId) {
        var vm = this;
        vm.deckId = deckId;
    }
    adminEditDeck.$inject = ['$firebaseObject', 'deckId'];

    angular.module('arcana').controller('adminEditDeck', adminEditDeck);
}());