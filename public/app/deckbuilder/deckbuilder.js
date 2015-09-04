(function () {
    'use strict';

    function deckbuilder() {
        var vm = this;
        vm.message = '';
    }
    deckbuilder.$inject = [];

    angular.module('arcana').controller('deckbuilder', deckbuilder);
}());