/// <reference path="../../../typings/tsd.d.ts" />

module app.header {
    'use strict';
    
    class HeaderController implements IHeaderController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseAuth', '$firebaseObject', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService, private userService: IUserService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL);
            this.fbAuth = $firebaseAuth(this.fbRef);
            this.fbUser = this.fbAuth.$getAuth();
            
            if (this.fbUser && this.fbUser.uid) {
                this.userService.getUserByFirebaseId(this.fbUser.uid).then((result) => {
                    if (result) {
                        this.currentUser = {
                            username: result.username,
                            firebaseId:result.firebaseId,
                            uid: result._id
                        }
                    } else {
                        this.currentUser = undefined;
                    }
                });
            }
            
            this.$firebaseAuth(this.fbRef).$onAuth((authData: FirebaseAuthData) => {
                if (authData) {
                    this.userService.getUserByFirebaseId(authData.uid).then((result) => {
                        if (result) {
                            this.currentUser = {
                                username: result.username,
                                firebaseId:result.firebaseId,
                                uid: result._id
                            }
                        } else {
                            this.currentUser = undefined;
                        }
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