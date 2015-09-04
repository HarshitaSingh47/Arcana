(function () {
    'use strict';

    function decks() {
        var vm = this;
        vm.message = 'test';
    }
    decks.$inject = [];

    angular.module('arcana').controller('decks', decks);
}());