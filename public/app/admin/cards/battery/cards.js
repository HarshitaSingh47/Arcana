(function () {
    'use strict';

    function batteryCards($modal, $firebaseArray, $firebaseObject, FIREBASE_URL) {
        var batteryCardsCtrl = this,
            fbRef = new Firebase(FIREBASE_URL + '/cards/battery');

        $firebaseArray(fbRef).$loaded(function (data) {
            batteryCardsCtrl.cards = data;
        });

        batteryCardsCtrl.editCard = function (cardId) {
            $firebaseObject(fbRef.child(cardId)).$loaded(function (data) {
                $modal.open({
                    templateUrl: '/app/admin/cards/adminEditCard.html',
                    controller: 'adminEditCard',
                    controllerAs: 'vm',
                    resolve: {
                        card: function () {
                            return data;
                        },
                        cardType: function () {
                            return 'Battery';
                        }
                    }
                });
            });
        };

        batteryCardsCtrl.copyCard = function (cardId) {
            $fireabaseObject(fbRef.child(cardId)).$loaded(function (data) {
                $modal.open({
                    templateUrl: '/app/admin/cards/adminCopyCard.html',
                    controller: 'adminCopyCard',
                    controllerAs: 'vm',
                    resolve: {
                        card: function () {
                            return data;
                        },
                        cardType: function () {
                            return 'Battery';
                        }
                    }
                });
            });
        };

        batteryCardsCtrl.deleteCard = function (cardId) {
            $firebaseObject(fbRef.child(cardId)).$remove();
        };
    }
    batteryCards.$inject = ['$modal', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];

    angular.module('arcana').controller('batteryCards', batteryCards);
}());