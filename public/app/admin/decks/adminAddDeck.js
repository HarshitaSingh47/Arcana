(function () {
    'use strict';

    function adminAddDeck($location, $firebaseArray, FIREBASE_URL) {
        var vm = this,
            cardsFbRef = new Firebase(FIREBASE_URL + '/cards'),
            decksFbRef = new Firebase(FIREBASE_URL + '/decks');

        vm.batteryCards = [];
        vm.selectedBatteryCards = [];
        vm.creatureCards = [];
        vm.selectedCreatureCards = [];
        vm.sorceryCards = [];
        vm.selectedSorceryCards = [];
        vm.modifierCards = [];
        vm.selectedModifierCards = [];

        vm.deckCards = [];

        function getCardByCardType(cardType) {
            var cardId;
            switch (cardType) {
                case 'Battery':
                    cardId = vm.selectedBatteryCards[0];
                    return _.findWhere(vm.batteryCards, { $id: cardId });
                case 'Creature':
                    cardId = vm.selectedCreatureCards[0];
                    return _.findWhere(vm.creatureCards, { $id: cardId });
                case 'Sorcery':
                    cardId = vm.selectedSorceryCards[0];
                    return _.findWhere(vm.sorceryCards, { $id: cardId });
                case 'Modifier':
                    cardId = vm.selectedModifierCards[0];
                    return _.findWhere(vm.modifierCards, { $id: cardId });
                default:
                    return undefined;
            }
        }

        vm.addCard = function (cardType) {
            var selectedCard = getCardByCardType(cardType),
                existingCard;
            if (selectedCard) {
                existingCard = _.findWhere(vm.deckCards, { cardId: selectedCard.$id });
                if (!existingCard) {
                    vm.deckCards.push({
                        cardId: selectedCard.$id,
                        cardType: cardType,
                        count: 1,
                        label: selectedCard.label
                    });
                } else {
                    existingCard.count++;
                }
            }
        };

        vm.removeCard = function (cardId) {
            var existingCard = _.findWhere(vm.deckCards, { cardId: cardId });
            if (existingCard.count > 1) {
                existingCard.count--;
            } else {
                vm.deckCards = _.reject(vm.deckCards, function (card) {
                    return card.cardId === cardId;
                });
            }
        };

        vm.submit = function () {
            var deck = {
                deckName: vm.deckName,
                cardCount: vm.deckCards.length,
                cards: vm.deckCards,
                batteryCardsCount: _.where(vm.deckCards, { cardType: 'Battery' }).length,
                creatureCardsCount: _.where(vm.deckCards, { cardType: 'Creature' }).length,
                sorceryCardCount: _.where(vm.deckCards, { cardType: 'Sorcery' }).length,
                modifierCardCount: _.where(vm.deckCards, { cardType: 'Modifier' }).length
            };

            $firebaseArray(decksFbRef).$add(deck).then(function () {
                $location.path('/admin/decks');
            });
        };

        vm.cancel = function () {
            $location.path('/admin/decks');
        };

        function loadCards() {
            $firebaseArray(cardsFbRef.child('battery')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (G: ' + card.genValue + ')';
                    vm.batteryCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('creature')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ' | H: ' + card.health + ' | P: ' + card.power + ')';
                    vm.creatureCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('sorcery')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    vm.sorceryCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('modifier')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    vm.modifierCards.push(card);
                });
            });
        }

        function activate() {
            loadCards();
        }

        activate();
    }
    adminAddDeck.$inject = ['$location', '$firebaseArray', 'FIREBASE_URL'];

    angular.module('arcana').controller('adminAddDeck', adminAddDeck);
}());