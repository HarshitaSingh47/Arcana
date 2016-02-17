/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminCardsController implements IAdminCardsController {
        fbRef: Firebase;
        cardType: string = 'Battery';
        cards: AngularFireArray;
        
        static $inject: string[] = ['$modal', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];
        constructor(private $modal: angular.ui.bootstrap.IModalService, private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string) {
            this.fbRef = new Firebase(FIREBASE_URL + '/cards');
            this.loadCards();
        }
        
        loadCards(): void {
            this.$firebaseArray(this.fbRef.child(this.cardType.toLowerCase())).$loaded((data) => {
                this.cards = data;
            });
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
            this.$firebaseObject(this.fbRef.child(this.cardType.toLowerCase()).child(cardId)).$loaded((data) => {
                this.$modal.open({
                    templateUrl: '/app/admin/cards/adminEditCard.html',
                    controller: 'AdminEditCardController',
                    controllerAs: 'vm',
                    resolve: {
                        cardInfo: () => {
                            return {
                                card: data,
                                cardType: this.cardType
                            };
                        }
                    }
                });
            });
        }
        
        deleteCard(cardId: string): void {
            this.$firebaseObject(this.fbRef.child(this.cardType).child(cardId)).$remove();
        }
    }
    
    angular.module('app.controllers').controller('AdminCardsController', AdminCardsController);
}