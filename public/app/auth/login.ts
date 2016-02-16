/// <reference path="../../../typings/tsd.d.ts" />

module app.login {
    'use strict';
    
    class LoginController implements ILoginController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        emailAddress: string;
        password: string;
        errorMessage: string = '';
        
        static $inject: string[] = ['$location', '$firebaseAuth', 'FIREBASE_URL'];
        constructor(private $location: ng.ILocationService, private $firebaseAuth: AngularFireAuthService, private FIREBASE_URL: string) { 
            this.fbRef = new Firebase(this.FIREBASE_URL);
            this.fbAuth = this.$firebaseAuth(this.fbRef);
        }
        
        login(): void {
            var urlParams: any = this.$location.search();
            var redirect: string = urlParams.redirect || '/';
            var model: ILoginModel = {
                email: this.emailAddress,
                password: this.password
            };
            
            this.fbAuth.$authWithPassword(model).then((authData) => {
                if (authData) {
                    this.$location.search('redirect', null);
                    this.$location.path(redirect);
                }
            }).catch(() => {
                this.errorMessage = 'Username or password invalid';
            });
        }
    }
    
    angular.module('app.controllers').controller('LoginController', LoginController);
}