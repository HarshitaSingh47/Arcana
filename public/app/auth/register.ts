/// <reference path="../../../typings/tsd.d.ts" />

module app.register {
    'use strict';
    
    class RegisterController implements IRegisterController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        emailAddress: string;
        username: string;
        password: string;
        errorMessage: string = '';
        
        static $inject: string[] = ['$firebaseAuth', '$firebaseObject', '$location', 'AuthService', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService, private $location: ng.ILocationService, private authService: IAuthService, private FIREBASE_URL: string) { 
            this.fbRef = new Firebase(this.FIREBASE_URL);
            this.fbAuth = this.$firebaseAuth(this.fbRef);
        }
        
        register(): void {
            var model: IRegisterModel = {
                email: this.emailAddress,
                password: this.password,
                username: this.username
            };
            
            this.fbAuth.$createUser(model).then((userData) => {
                return this.fbRef.child('users').child(userData.uid).set({ email: model.email, username: model.username });
            }).then(() => {
                return this.fbAuth.$authWithPassword({ email: model.email, password: model.password });
            }).then(() => {
                this.$location.path('/');
            });
        }
    }
    
    angular.module('app.controllers').controller('RegisterController', RegisterController);
}