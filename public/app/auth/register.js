(function () {
    'use strict';

    function register($location, authService) {
        var vm = this;

        vm.emailAddress = '';
        vm.username = '';
        vm.password = '';
        vm.errorMessage = '';

        vm.register = function () {
            var model = {
                email: vm.emailAddress,
                password: vm.password,
                username: vm.username
            };

            // Returns an ASQ object so we can catch any failures
            authService.register(model).then(function () {
                $location.path('/');
            }).or(function (error) {
                if (error.code === 'EMAIL_TAKEN') {
                    vm.errorMessage = 'That email is already in use. Please choose another.';
                } else if (error.code === 'USERNAME_TAKEN') {
                    vm.errorMessage = 'That username is already in use. Please choose another.';
                }
            });
        };
    }
    register.$inject = ['$location', 'authService'];

    angular.module('arcana').controller('register', register);
}());