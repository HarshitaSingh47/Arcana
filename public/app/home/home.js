(function () {
    'use strict';

    function home($rootScope, authService) {
        var vm = this;
        vm.currentUser = null;

        $rootScope.$on('USER_AUTHENTICATED', function (ev, user) {
            vm.currentUser = user;
        });

        $rootScope.$on('USER_UNAUTHENTICATED', function () {
            vm.currentUser = null;
        });
    }
    home.$inject = ['$rootScope', 'authService'];

    angular.module('arcana').controller('home', home);
}());