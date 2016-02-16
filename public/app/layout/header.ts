/// <reference path="../../../typings/tsd.d.ts" />

module app.header {
    'use strict';
    
    class HeaderController implements IHeaderController {
        fbRef: Firebase;
        currentUser: IAppUser;
        
        static $inject: string[] = ['$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', 'AuthService'];
        constructor(private $firebaseAuth: AngularFireAuthService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string, private authService: IAuthService) {
            this.fbRef = new Firebase(FIREBASE_URL);
            
            this.$firebaseAuth(this.fbRef).$onAuth((authData: FirebaseAuthData) => {
                if (authData) {
                    this.$firebaseObject(this.fbRef.child('users').child(authData.uid)).$loaded().then((user: AngularFireObject) => {
                        this.currentUser.username = user.$value.username;
                    });
                }
            })
        }
        
        logout(): void {
            this.authService.logout();
            this.currentUser = undefined;
        }
    }
    
    angular.module('app.controllers').controller('HeaderController', HeaderController);
}