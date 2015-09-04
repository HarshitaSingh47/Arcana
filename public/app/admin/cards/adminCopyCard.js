(function () {
    'use strict';

    function adminCopyCard($location, $firebaseObject, $firebaseArray, FIREBASE_URL, cardId) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL + '/cards');

        $firebaseObject(fbRef.child(cardId)).$loaded(function (data) {
            vm.card = data;
        });

        vm.cardTypes = ['Creature', 'Battery', 'Modifier', 'Sorcery'];
        vm.rarities = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

        vm.submit = function () {
            /*jslint nomen:true*/
            var card = _.pick(vm.card, ['cardName', 'instanceCost', 'maintenanceCost', 'genValue', 'burnValue', 'health', 'power', 'description', 'flavorText']);
            /*jslint nomen:false*/
            $firebaseArray(fbRef).$add(card).then(function () {
                $location.path('/admin/cards');
            });
        };

        vm.cancel = function () {
            $location.path('/admin/cards');
        };
    }
    adminCopyCard.$inject = ['$location', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 'cardId'];

    angular.module('arcana').controller('adminCopyCard', adminCopyCard);
}());