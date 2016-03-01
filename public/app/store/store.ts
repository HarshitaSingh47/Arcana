/// <reference path="../../../typings/tsd.d.ts" />

module app.store {
    'use strict';
    
    class StoreController implements IStoreController {
        fbRef: Firebase;
        currentUser: AngularFireObject;
        fbUser: FirebaseAuthData;
        boosterPacks: AngularFireArray;
        prebuiltDecks: AngularFireArray;
        purchases: AngularFireArray;
        purchasedItemIds: string[] = [];
        
        static $inject: string[] = ['$firebaseObject', '$firebaseArray', '$firebaseAuth', 'FIREBASE_URL'];
        constructor(private $firebaseObject: AngularFireObjectService, private $firebaseArray: AngularFireArrayService, private $firebaseAuth: AngularFireAuthService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL);
            this.fbUser = this.$firebaseAuth(this.fbRef).$getAuth();
            var userProfileRef = this.fbRef.child('userProfiles').child(this.fbUser.uid);
            this.currentUser = this.$firebaseObject(userProfileRef);
            this.boosterPacks = this.$firebaseArray(this.fbRef.child('packs').orderByChild('packType').equalTo('Booster'));
            this.prebuiltDecks = this.$firebaseArray(this.fbRef.child('packs').orderByChild('packType').equalTo('Prebuilt Deck'));
            this.purchases = $firebaseArray(userProfileRef.child('purchases'));
            this.purchases.$loaded((items) => {
                angular.forEach(items, (item: any) => {
                    this.purchasedItemIds.push(item.itemId);
                });
            });
        }
        
        purchaseItem(item: any): void {
            var purchase = {
                itemId: item.$id,
                cost: item.cost,
                timestamp: new Date()
            };
            
            this.purchases.$add(purchase).then(() => {
                this.purchasedItemIds.push(item.$id);
            });
        }
        
        previewItem(itemId: string): void {
            
        }
        
        hasPurchased(itemId: string): boolean {
            return _.contains(this.purchasedItemIds, itemId);
        }
    }
    
    angular.module('app.controllers').controller('StoreController', StoreController);
}