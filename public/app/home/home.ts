/// <reference path="../../../typings/tsd.d.ts" />

module app.home {
    'use strict';
    
    class HomeController implements IHomeController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseObject', '$firebaseAuth', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseObject: AngularFireObjectService, private $firebaseAuth: AngularFireAuthService, private userService: IUserService, private FIREBASE_URL: string) {
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
            
            this.fbAuth.$onAuth((authData) => {
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
            });
        }
    }
    
    angular.module('app.controllers').controller('HomeController', HomeController);
}