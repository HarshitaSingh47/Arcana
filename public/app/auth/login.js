(function () {
    'use strict';

    function login($location, authService) {
        var vm = this;

        vm.emailAddress = '';
        vm.password = '';
        vm.errorMessage = '';

        vm.login = function () {
            var urlParams = $location.search(),
                redirect = urlParams.redirect || '/',
                model = {
                    email: vm.emailAddress,
                    password: vm.password
                };

            authService.login(model).then(function (authData) {
                if (authData) {
                    $location.search('redirect', null);
                    $location.path(redirect);
                }
            }).catch(function (error) {
                vm.errorMessage = 'Username or password invalid';
            });
        };
    }
    login.$inject = ['$location', 'authService'];

    angular.module('arcana').controller('login', login);
}());