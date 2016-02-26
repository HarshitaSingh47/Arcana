/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminPacksController implements IAdminPacksController {
        fbRef: Firebase;
        packType: string = 'All';
        packs: AngularFireArray;
        
        static $inject: string[] = ['$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];
        constructor(private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL + 'packs');
            this.loadPacks();
        }
        
        loadPacks(): void {
            var query = (this.packType === 'All') ? this.fbRef : this.fbRef.orderByChild('packType').equalTo(this.packType);
            this.packs = this.$firebaseArray(query);
        }
        
        showPacks(packType: string): void {
            this.packType = packType;
            this.loadPacks();
        }
        
        deletePack(packId: string): void {
            this.$firebaseObject(this.fbRef.child(packId)).$remove();
        }
    }
    
    angular.module('app.controllers').controller('AdminPacksController', AdminPacksController);
}