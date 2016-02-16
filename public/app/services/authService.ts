/// <reference path="../../../typings/tsd.d.ts" />

module app.authService {
    'use strict';
    
    class AuthService implements IAuthService {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService) {
            this.fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com/');
            this.fbAuth = $firebaseAuth(this.fbRef);
        }
        
        login(model): ng.IPromise<any> {
            return this.fbAuth.$authWithPassword(model);
        }
        
        logout(): void {
            this.fbAuth.$unauth();
        }
        
        register(userInfo) {
            return this.fbAuth.$createUser(userInfo);
        }
        
        waitForAuth(): ng.IPromise<any> {
            return this.fbAuth.$waitForAuth();
        }
        
        requireAuth(): ng.IPromise<any> {
            return this.fbAuth.$requireAuth();
        }
        
        getAuth(): FirebaseAuthData {
            return this.fbAuth.$getAuth();
        }
    }
    
    factory.$inject = ['$firebaseAuth', '$firebaseObject'];
    function factory($firebaseAuth: AngularFireAuthService, $firebaseObject: AngularFireObjectService): IAuthService {
        return new AuthService($firebaseAuth, $firebaseObject);
    }
    
    angular.module('app.services').factory('AuthService', factory);
}