/// <reference path="../../../typings/tsd.d.ts" />

module app.register {
    'use strict';
    
    class RegisterController implements IRegisterController {
        emailAddress: string;
        username: string;
        password: string;
        errorMessage: string = '';
        
        static $inject: string[] = ['$location', 'AuthService'];
        constructor(private $location: ng.ILocationService, private authService: IAuthService) { }
        
        register(): void {
            var model: IRegisterModel = {
                email: this.emailAddress,
                password: this.password,
                username: this.username
            };
            
            this.authService.register(model).then(() => {
               this.$location.path('/'); 
            });
        }
    }
    
    angular.module('app.controllers').controller('RegisterController', RegisterController);
}