/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminCardsController implements IAdminCardsController {
        cardType: string = 'battery';
        cards: ICard[];
        
        static $inject: string[] = ['CardService'];
        constructor(private cardService: ICardService) {
            this.loadCards();
        }
        
        loadCards(): void {
            this.cardService.getCardsByType(this.cardType).then((results) => {
                this.cards = results.data;
            });
        }
        
        showCards(cardType: string): void {
            this.cardType = cardType;
            this.loadCards();
        }
        
        addCard(): void {
            /*
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
            */
        }
        
        editCard(cardId: string): void {
            /*
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
            */
        }
        
        deleteCard(cardId: string): void {
            //this.$firebaseObject(this.fbRef.child(this.cardType).child(cardId)).$remove();
        }
    }
    
    angular.module('app.controllers').controller('AdminCardsController', AdminCardsController);
}