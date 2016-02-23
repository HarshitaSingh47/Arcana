/// <reference path="../../../typings/tsd.d.ts" />

module app.home {
    'use strict';
    
    class HomeController implements IHomeController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        static $inject: string[] = [];
        constructor() { }
    }
    
    angular.module('app.controllers').controller('HomeController', HomeController);
}