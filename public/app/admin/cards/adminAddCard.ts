/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminAddCardController implements IAdminAddCardController {
        fbRef: Firebase;
        card: ICard = {
            cardName: '',
            cardType: '',
            rarity: 'Normal',
            instanceCost: 0,
            maintenanceCost: 0,
            genValue: 0,
            burnValue: 0,
            health: 0,
            power: 0,
            description: '',
            flavorText: ''
        };
        cardTypes: string[] = ['Creature', 'Battery', 'Modifier', 'Sorcery'];
        rarities: string[] = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        errorMessage: string = '';
        
        static $inject: string[] = ['$modalInstance', '$firebaseArray', 'FIREBASE_URL', 'cardType'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private $firebaseArray: AngularFireArrayService, private FIREBASE_URL: string, private cardType: string) {
            this.fbRef = new Firebase(FIREBASE_URL + 'cards');
            this.card.cardType = this.cardType;
        }
        
        submit(): void {
            this.$firebaseArray(this.fbRef).$add(this.card).then(() => {
                this.$modalInstance.close();
            }).catch((errResult) => {
                this.errorMessage = errResult;
            });
        }
        
        cancel(): void {
            this.$modalInstance.dismiss();
        }
    }
    
    angular.module('app.controllers').controller('AdminAddCardController', AdminAddCardController);
}