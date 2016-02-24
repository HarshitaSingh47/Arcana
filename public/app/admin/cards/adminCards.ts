/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminCardsController implements IAdminCardsController {
        fbRef: Firebase;
        cardType: string = 'Battery';
        cards: any;
        
        static $inject: string[] = ['$modal', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];
        constructor(private $modal: angular.ui.bootstrap.IModalService, private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string) { 
            this.fbRef = new Firebase(FIREBASE_URL + 'cards');
            this.loadCards();
        }
        
        loadCards(): void {
            var query = this.fbRef.orderByChild('cardType').equalTo(this.cardType);
            this.cards = this.$firebaseArray(query);
        }
        
        showCards(cardType: string): void {
            this.cardType = cardType;
            this.loadCards();
        }
        
        addCard(): void {
            this.$modal.open({
                templateUrl: '/app/admin/cards/adminAddCard.html',
                controller: 'AdminAddCardController',
                controllerAs: 'vm',
                resolve: {
                    cardType: () => {
                        return this.cardType;
                    }
                }
            });
        }
        
        editCard(cardId: string): void {
            this.$modal.open({
                templateUrl: '/app/admin/cards/adminEditCard.html',
                controller: 'AdminEditCardController',
                controllerAs: 'vm',
                resolve: {
                    cardId: () => {
                        return cardId;
                    }
                }
            });
        }
        
        deleteCard(cardId: string): void {
            this.$firebaseObject(this.fbRef.child(cardId)).$remove();
        }
    }
    
    angular.module('app.controllers').controller('AdminCardsController', AdminCardsController);
}