/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminAddCardController implements IAdminAddCardController {
        fbRef: Firebase;
        card: ICard;
        cardTypes: string[] = ['Creature', 'Battery', 'Modifier', 'Sorcery'];
        creatureTypes: string[] = ['Organic', 'Mystical'];
        rarities: string[] = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        
        static $inject: string[] = ['$modalInstance', '$firebaseArray', 'FIREBASE_URL', 'cardType'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private $firebaseArray: AngularFireArrayService, private FIREBASE_URL: string, private cardType: string) {
            this.fbRef = new Firebase(FIREBASE_URL + '/cards');
            this.card.cardName = '';
            this.card.cardType = this.cardType;
            this.card.creatureType = 'Organic';
            this.card.rarity = 'Normal';
            this.card.instanceCost = 0;
            this.card.maintenanceCost = 0;
            this.card.genValue = 0;
            this.card.burnValue = 0;
            this.card.health = 0;
            this.card.power = 0;
            this.card.description = '';
            this.card.flavorText = '';
        }
        
        submit(): void {
            var cardRef = this.fbRef.child(this.card.cardType.toLowerCase());
            var card = _.pick(this.card, ['cardName', 'rarity', 'instanceCost', 'maintenanceCost', 'genValue', 'burnValue', 'health', 'power', 'description', 'flavorText']);
            
            if (this.card.cardType === 'Creature') {
                card.creatureType = this.card.creatureType;
            }
            
            this.$firebaseArray(cardRef).$add(card).then(() => {
                this.$modalInstance.close();
            });
        }
        
        cancel(): void {
            this.$modalInstance.close();
        }
    }
    
    angular.module('app.controllers').controller('AdminAddCardController', AdminAddCardController);
}