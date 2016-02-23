/// <reference path="../../../typings/tsd.d.ts" />

module app.header {
    'use strict';
    
    class HeaderController implements IHeaderController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = ['$firebaseAuth', 'UserService', 'FIREBASE_URL'];
        constructor(private $firebaseAuth: AngularFireAuthService, private userService: IUserService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL);
            this.fbAuth = $firebaseAuth(this.fbRef);
            
            this.fbAuth.$onAuth((authData) => {
                if (authData) {
                    this.userService.getUserProfileById(authData.uid).then((result) => {
                        if (result) {
                            this.currentUser = {
                                username: result.username,
                                uid: authData.uid
                            };
                        } else {
                            this.currentUser = undefined;
                        }
                    });
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