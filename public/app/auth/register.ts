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
        
        static $inject: string[] = ['$firebaseAuth', '$firebaseObject', '$location', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService, private $location: ng.ILocationService, private userService: IUserService, private FIREBASE_URL: string) { 
            this.fbRef = new Firebase(this.FIREBASE_URL);
            this.fbAuth = this.$firebaseAuth(this.fbRef);
        }
        
        register(): void {
            var model: IRegisterModel = {
                email: this.emailAddress,
                password: this.password,
                username: this.username
            };
            
            // Create user in Firebase
            this.fbAuth.$createUser(model).then((userData) => {
                // Create user in MongoDB
                this.userService.createUser({firebaseId: userData.uid, username: model.username, emailAddress: model.email }).then(() => {
                    return this.fbAuth.$authWithPassword({ email: model.email, password: model.password });
                }).then(() => {
                    this.$location.path('/');
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    
    angular.module('app.controllers').controller('RegisterController', RegisterController);
}