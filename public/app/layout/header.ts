/// <reference path="../../../typings/tsd.d.ts" />

module app.header {
    'use strict';
    
    class HeaderController implements IHeaderController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseAuth', '$firebaseObject', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL);
            this.fbAuth = $firebaseAuth(this.fbRef);
            this.fbUser = this.fbAuth.$getAuth();
            
            if (this.fbUser && this.fbUser.uid) {
                this.$firebaseObject(this.fbRef.child('users').child(this.fbUser.uid)).$loaded().then((user: IUser) => {
                    this.currentUser = {
                        username: user.username,
                        uid: this.fbUser.uid
                    };
                });
            }
            
            this.$firebaseAuth(this.fbRef).$onAuth((authData: FirebaseAuthData) => {
                if (authData) {
                    this.$firebaseObject(this.fbRef.child('users').child(authData.uid)).$loaded().then((user: IUser) => {
                        this.currentUser = {
                            username: user.username,
                            uid: authData.uid
                        };
                    });
                } else {
                    this.currentUser = undefined;
                }
            })
        }
        
        logout(): void {
            this.fbAuth.$unauth();
            this.currentUser = undefined;
        }
    }
    
    angular.module('app.controllers').controller('HeaderController', HeaderController);
}