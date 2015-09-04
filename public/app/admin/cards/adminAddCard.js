(function () {
    'use strict';

    function adminAddCard($modalInstance, $firebaseArray, FIREBASE_URL) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL + '/cards');

        vm.card = {
            cardName: '',
            cardType: 'Battery',
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

        vm.cardTypes = ['Creature', 'Battery', 'Modifier', 'Sorcery'];
        vm.creatureTypes = ['Organic', 'Mystical'];
        vm.rarities = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

        vm.submit = function () {
            /*jslint nomen:true*/
            var cardRef = fbRef.child(vm.card.cardType.toLowerCase()),
                card = _.pick(vm.card, ['cardName', 'rarity', 'instanceCost', 'maintenanceCost', 'genValue', 'burnValue', 'health', 'power', 'description', 'flavorText']);
            /*jslint nomen:false*/
            $firebaseArray(cardRef).$add(card).then(function () {
                $modalInstance.close();
            });
        };

        vm.cancel = function () {
            $modalInstance.close();
        };
    }
    adminAddCard.$inject = ['$modalInstance', '$firebaseArray', 'FIREBASE_URL'];

    angular.module('arcana').controller('adminAddCard', adminAddCard);
}());