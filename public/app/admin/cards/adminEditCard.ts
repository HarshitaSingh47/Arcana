/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminEditCardController implements IAdminEditCardController {
        card: ICard;
        cardType: string;
        title: string;
        creatureTypes: string[] = ['Organic', 'Mystical'];
        rarities: string[] = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        
        static $inject: string[] = ['$modalInstance', 'cardInfo'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private cardInfo: any) {
            this.card = cardInfo.card;
            this.cardType = cardInfo.cardType;
            this.title = `Update Card - ${this.card.cardName}`;
        }
        
        submit(): void {
            /*
            this.card.$save().then(() => {
                this.$modalInstance.close();
            });
            */
        }
        
        cancel(): void {
            this.$modalInstance.close();
        }
    }
    
    angular.module('app.controllers').controller('AdminEditCardController', AdminEditCardController);
}