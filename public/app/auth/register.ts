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
        
        static $inject: string[] = ['$firebaseAuth', '$location', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $location: ng.ILocationService, private userService: IUserService, private FIREBASE_URL: string) { 
            this.fbRef = new Firebase(this.FIREBASE_URL);
            this.fbAuth = this.$firebaseAuth(this.fbRef);
        }
        
        register(): void {
            // Create user in Firebase
            this.userService.createUser({email: this.emailAddress, password: this.password}).then((userData) => {
                // Create user profile
                var userProfile: any = {
                    uid: userData.uid,
                    username: this.username,
                    emailAddress: this.emailAddress,
                    credits: 10000
                };
                
                return this.userService.createUserProfile(userProfile);
            }).then(() => {
                // Log user in
                return this.fbAuth.$authWithPassword({ email: this.emailAddress, password: this.password });
            }).then(() => {
                // redirect to home page
                this.$location.path('/');
            }).catch((errResult) => {
                //this.errorMessage = errResult.data.error;
                console.log(errResult);
            });
        }
    }
    
    angular.module('app.controllers').controller('RegisterController', RegisterController);
}