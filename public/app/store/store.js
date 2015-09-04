(function () {
    'use strict';

    function store() {
        var vm = this;
        vm.message = '';
    }
    store.$inject = [];

    angular.module('arcana').controller('store', store);
}());