/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminPacksController implements IAdminPacksController {
        fbRef: Firebase;
        decks: AngularFireArray;
        
        static $inject: string[] = ['$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];
        constructor(private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL + 'decks');
            this.decks = this.$firebaseArray(this.fbRef);
        }
        
        loadPacks(): void {
            
        }
        
        addPack(): void {
            
        }
        
        editPack(): void {
            
        }
    }
    
    angular.module('app.controllers').controller('AdminPacksController', AdminPacksController);
}