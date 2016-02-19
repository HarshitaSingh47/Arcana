/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminEditCardController implements IAdminEditCardController {
        card: ICard;
        cardType: string;
        title: string;
        rarities: string[] = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        
        static $inject: string[] = ['$modalInstance', 'CardService', 'cardInfo'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private cardService: ICardService, private cardInfo: any) {
            this.card = cardInfo.card;
            this.cardType = cardInfo.cardType;
            this.title = `Update Card - ${this.card.cardName}`;
        }
        
        submit(): void {
            this.cardService.updateCard(this.card).then((result) => {
                this.$modalInstance.close();
            }).catch((errResult) => {
                console.log(errResult);
            });
        }
        
        cancel(): void {
            this.$modalInstance.dismiss();
        }
    }
    
    angular.module('app.controllers').controller('AdminEditCardController', AdminEditCardController);
}