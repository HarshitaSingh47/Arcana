/// <reference path="../../../typings/tsd.d.ts" />

module app.header {
    'use strict';
    
    class HeaderController implements IHeaderController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: AngularFireObject;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseObject', '$firebaseAuth', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseObject: AngularFireObjectService, private $firebaseAuth: AngularFireAuthService, private userService: IUserService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL);
            this.fbAuth = $firebaseAuth(this.fbRef);
            
            this.fbAuth.$onAuth((authData) => {
                if (authData) {
                    this.currentUser = this.$firebaseObject(this.fbRef.child('userProfiles').child(authData.uid));
                } else {
                    this.currentUser = undefined;
                }
            });
        }
        
        logout(): void {
            this.fbAuth.$unauth();
            this.currentUser = undefined;
        }
    }
    
    angular.module('app.controllers').controller('HeaderController', HeaderController);
}