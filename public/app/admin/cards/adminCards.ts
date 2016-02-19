/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminCardsController implements IAdminCardsController {
        cardType: string = 'Battery';
        
        static $inject: string[] = ['$modal', 'CardService', 'cards'];
        constructor(private $modal: angular.ui.bootstrap.IModalService, private cardService: ICardService, private cards: ICard[]) { }
        
        loadCards(): void {
            this.cardService.getCardsByType(this.cardType).then((results) => {
                this.cards = results;
            });
        }
        
        showCards(cardType: string): void {
            this.cardType = cardType;
            this.loadCards();
        }
        
        addCard(): void {
            var modalInstance = this.$modal.open({
                templateUrl: '/app/admin/cards/adminAddCard.html',
                controller: 'AdminAddCardController',
                controllerAs: 'vm',
                resolve: {
                    cardType: () => {
                        return this.cardType;
                    }
                }
            });
            
            modalInstance.result.then((result) => {
                this.loadCards();
            });
        }
        
        editCard(cardId: string): void {
            this.cardService.getCardById(cardId).then((result) => {
                this.showEditCard(result);
            });
        }
        
        showEditCard(card: any): void {
            var modalInstance = this.$modal.open({
                templateUrl: '/app/admin/cards/adminEditCard.html',
                controller: 'AdminEditCardController',
                controllerAs: 'vm',
                resolve: {
                    cardInfo: () => {
                        return {
                            card: card,
                            cardType: this.cardType
                        };
                    }
                }
            });
            
            modalInstance.result.then(() => {
                this.loadCards();
            });
        }
        
        deleteCard(cardId: string): void {
            this.cardService.deleteCard(cardId).then(() => {
                this.loadCards();
            });
        }
    }
    
    angular.module('app.controllers').controller('AdminCardsController', AdminCardsController);
}