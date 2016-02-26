/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminAddPackController {
        cardsFbRef: Firebase;
        packsFbRef: Firebase;
        cardPropsToSave: string[] = ['$id', 'cardName', 'cardType', 'label', 'genValue', 'instanceCost', 'maintenanceCost', 'burnValue', 'health', 'power', 'rarity', 'description', 'flavorText']
        batteryCards: ICard[] = [];
        selectedBatteryCards: any;
        creatureCards: ICard[] = [];
        selectedCreatureCards: any;
        sorceryCards: ICard[] = [];
        selectedSorceryCards: any;
        modifierCards: ICard[] = [];
        selectedModifierCards: any;
        pack = {
            packName: '',
            packType: 'Booster',
            cardCount: 0,
            cards: [],
            cost: 0
        };
        
        static $inject: string[] = ['$location', '$firebaseArray', 'FIREBASE_URL'];
        constructor(private $location: ng.ILocationService, private $firebaseArray: AngularFireArrayService, private FIREBASE_URL: string) {
            this.cardsFbRef = new Firebase(FIREBASE_URL + 'cards');
            this.packsFbRef = new Firebase(FIREBASE_URL + 'packs');
            this.loadCards();
        }
        
        getCardByCardType(cardType: string): ICard {
            var cardId;
            switch(cardType) {
                case 'Battery':
                    cardId = this.selectedBatteryCards[0];
                    return _.findWhere(this.batteryCards, { $id: cardId });
                case 'Creature':
                    cardId = this.selectedCreatureCards[0];
                    return _.findWhere(this.creatureCards, { $id: cardId });
                case 'Sorcery':
                    cardId = this.selectedSorceryCards[0];
                    return _.findWhere(this.sorceryCards, { $id: cardId });
                case 'Modifier':
                    cardId = this.selectedModifierCards[0];
                    return _.findWhere(this.modifierCards, { $id: cardId });
                default:
                    return undefined;
            }
        }
        
        addAllCards(cardType: string): void {
            var cards;
            switch (cardType) {
                case 'Battery':
                    cards = this.batteryCards;
                    break;
                case 'Creature':
                    cards = this.creatureCards;
                    break;
                case 'Sorcery':
                    cards = this.sorceryCards;
                    break;
                case 'Modifier':
                    cards = this.modifierCards;
                    break;
            }
            
            angular.forEach(cards, (card) => {
                card = _.pick(card, this.cardPropsToSave);
                this.pack.cards.push(card);
            });
        }
        
        addCard(cardType: string): void {
            var selectedCard: ICard = this.getCardByCardType(cardType),
                card: ICard;
                
            if (selectedCard) {
                card = _.pick(selectedCard, this.cardPropsToSave);
                this.pack.cards.push(card);
            }
        }
        
        removeCard(cardId: string): void {
            var existingCard = _.findWhere(this.pack.cards, { $id: cardId });
            if (existingCard) {
                this.pack.cards = _.reject(this.pack.cards, (card) => {
                    return card.$id === cardId;
                });
            }
        }
        
        loadCards(): void {
            this.$firebaseArray(this.cardsFbRef.orderByChild('cardType').equalTo('Battery')).$loaded((cards) => {
                angular.forEach(cards, (card: ICard) => {
                    card.label = card.cardName + ' (G: ' + card.genValue + ')';
                    this.batteryCards.push(card);
                })
            });
            
            this.$firebaseArray(this.cardsFbRef.orderByChild('cardType').equalTo('Creature')).$loaded((cards) => {
                angular.forEach(cards, (card: ICard) => {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ' | H: ' + card.health + ' | P: ' + card.power + ')';
                    this.creatureCards.push(card);
                });
            });
            
            this.$firebaseArray(this.cardsFbRef.orderByChild('cardType').equalTo('Sorcery')).$loaded((cards) => {
                angular.forEach(cards, (card: ICard) => {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    this.sorceryCards.push(card);
                });
            });
            
            this.$firebaseArray(this.cardsFbRef.orderByChild('cardType').equalTo('Modifier')).$loaded((cards) => {
                angular.forEach(cards, (card: ICard) => {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    this.modifierCards.push(card);
                });
            });
        }
        
        submit(): void {
            this.pack.cardCount = this.pack.cards.length;
            this.$firebaseArray(this.packsFbRef).$add(this.pack).then(() => {
                this.$location.path('/admin/packs');
            });
        }
        
        cancel(): void {
            this.$location.path('/admin/packs');
        }
    }
    
    angular.module('app.controllers').controller('AdminAddPackController', AdminAddPackController);
}