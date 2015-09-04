(function () {
    'use strict';

    function cards() {
        var vm = this;
        vm.message = 'test';
    }
    cards.$inject = [];

    angular.module('arcana').controller('cards', cards);
}());