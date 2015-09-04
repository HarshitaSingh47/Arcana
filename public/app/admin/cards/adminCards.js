(function () {
    'use strict';

    function adminCards($modal, $firebaseArray, $firebaseObject, FIREBASE_URL) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL + '/cards');

        vm.cardType = 'Battery';

        vm.loadCards = function () {
            $firebaseArray(fbRef.child(vm.cardType.toLowerCase())).$loaded(function (data) {
                vm.cards = data;
            });
        };

        vm.showCards = function (cardType) {
            vm.cardType = cardType;
            vm.loadCards();
        };

        vm.addCard = function () {
            $modal.open({
                templateUrl: '/app/admin/cards/adminAddCard.html',
                controller: 'adminAddCard',
                controllerAs: 'vm',
                resolve: {
                    cardType: function () {
                        return vm.cardType;
                    }
                }
            });
        };

        vm.editCard = function (cardId) {
            $firebaseObject(fbRef.child(vm.cardType.toLowerCase()).child(cardId)).$loaded(function (data) {
                $modal.open({
                    templateUrl: '/app/admin/cards/adminEditCard',
                    controller: 'adminEditCard',
                    controllerAs: 'vm',
                    resolve: {
                        cardInfo: function () {
                            return {
                                card: data,
                                cardType: vm.cardType
                            };
                        }
                    }
                });
            });
        };

        vm.deleteCard = function (cardId) {
            $firebaseObject(fbRef.child(vm.cardType).child(cardId)).$remove();
        };

        function activate() {
            vm.loadCards();
        }

        activate();
    }
    adminCards.$inject = ['$modal', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL'];

    angular.module('arcana').controller('adminCards', adminCards);
}());