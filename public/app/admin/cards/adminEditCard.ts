/// <reference path="../../../../typings/tsd.d.ts" />

module app.admin {
    'use strict';
    
    class AdminEditCardController implements IAdminEditCardController {
        fbRef: Firebase;
        card: AngularFireObject;
        rarities: string[] = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        
        static $inject: string[] = ['$modalInstance', '$firebaseObject', 'FIREBASE_URL', 'cardId'];
        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private $firebaseObject: AngularFireObjectService, private FIREBASE_URL: string, private cardId: string) {
            this.fbRef = new Firebase(FIREBASE_URL + '/cards/' + cardId);
            this.card = $firebaseObject(this.fbRef);
        }
        
        submit(): void {
            this.card.$save().then(() => {
                this.$modalInstance.close();
            });
        }
        
        cancel(): void {
            this.$modalInstance.dismiss();
        }
    }
    
    angular.module('app.controllers').controller('AdminEditCardController', AdminEditCardController);
}