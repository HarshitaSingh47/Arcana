/// <reference path="../../../typings/tsd.d.ts" />

module app.home {
    'use strict';
    
    class HomeController implements IHomeController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseObject', '$firebaseAuth'];
        constructor(private $firebaseObject: AngularFireObjectService, private $firebaseAuth: AngularFireAuthService) {
            this.fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com/');
            this.fbAuth = $firebaseAuth(this.fbRef);
            this.fbUser = this.fbAuth.$getAuth();
            
            if (this.fbUser && this.fbUser.uid) {
                this.$firebaseObject(this.fbRef.child('users').child(this.fbUser.uid)).$loaded().then((user) => {
                    this.currentUser.uid = this.fbUser.uid;
                    this.currentUser.username = user.$value.username;
                });
            }
            
            this.fbAuth.$onAuth((authData) => {
                this.currentUser.uid = authData.uid;
                
                if (authData) {
                    this.$firebaseObject(this.fbRef.child('users').child(authData.uid)).$loaded().then((user) => {
                        this.currentUser.username = user.$value.username;
                    });
                }
            });
        }
    }
    
    angular.module('app.controllers').controller('HomeController', HomeController);
}