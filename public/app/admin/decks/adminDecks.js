(function () {
    'use strict';

    function adminDecks($firebaseArray, $firebaseObject) {
        var vm = this;
        vm.message = 'test';
    }
    adminDecks.$inject = ['$firebaseArray', '$firebaseObject'];

    angular.module('arcana').controller('adminDecks', adminDecks);
}());