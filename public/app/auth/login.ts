/// <reference path="../../../typings/tsd.d.ts" />

module app.login {
    'use strict';
    
    class LoginController implements ILoginController {
        emailAddress: string;
        password: string;
        errorMessage: string = '';
        
        static $inject: string[] = ['$location', 'AuthService'];
        constructor(private $location: ng.ILocationService, private authService: IAuthService) { }
        
        login(): void {
            var urlParams: any = this.$location.search();
            var redirect: string = urlParams.redirect || '/';
            var model: ILoginModel = {
                email: this.emailAddress,
                password: this.password
            };
            
            this.authService.login(model).then((authData) => {
                if (authData) {
                    this.$location.search('redirect', null);
                    this.$location.path(redirect);
                }
            }).catch((error) => {
                this.errorMessage = 'Username or password invalid';
            });
        }
    }
    
    angular.module('app.controllers').controller('LoginController', LoginController);
}