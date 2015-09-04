(function () {
    'use strict';

    function adminAddDeck($firebaseObject) {
        var vm = this;
        vm.message = 'test';
    }
    adminAddDeck.$inject = ['$firebaseObject'];

    angular.module('arcana').controller('adminAddDeck', adminAddDeck);
}());