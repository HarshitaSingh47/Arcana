/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminAddCardController implements IAdminAddCardController {
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
        
        static $inject: string[] = ['$modalInstance', 'CardService', 'cardType'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private cardService: ICardService, private cardType: string) {
            this.card.cardType = this.cardType;
        }
        
        submit(): void {
            this.cardService.createCard(this.card).then((result) => {
                this.$modalInstance.close();
            }).catch((errResult) => {
                this.errorMessage = errResult.data.error;
            });
        }
        
        cancel(): void {
            this.$modalInstance.dismiss();
        }
    }
    
    angular.module('app.controllers').controller('AdminAddCardController', AdminAddCardController);
}