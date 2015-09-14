(function () {
    'use strict';

    function adminAddDeck($location, $firebaseArray, FIREBASE_URL) {
        var vm = this,
            cardsFbRef = new Firebase(FIREBASE_URL + '/cards'),
            decksFbRef = new Firebase(FIREBASE_URL + '/decks'),
            cardPropsToSave = ['$id', 'cardName', 'cardType', 'label', 'genValue', 'instanceCost', 'maintenanceCost', 'burnValue', 'health', 'power', 'rarity', 'description', 'flavorText', 'creatureType'];

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
                card;
            if (selectedCard) {
                card = _.pick(selectedCard, cardPropsToSave);
                vm.deckCards.push(card);
            }
        };

        vm.removeCard = function (cardId) {
            var existingCard = _.findWhere(vm.deckCards, { $id: cardId });
            if (existingCard) {
                vm.deckCards = _.reject(vm.deckCards, function (card) {
                    return card.$id === cardId;
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
                    card.cardType = 'Battery';
                    vm.batteryCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('creature')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ' | H: ' + card.health + ' | P: ' + card.power + ')';
                    card.cardType = 'Creature';
                    vm.creatureCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('sorcery')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    card.cardType = 'Sorcery';
                    vm.sorceryCards.push(card);
                });
            });

            $firebaseArray(cardsFbRef.child('modifier')).$loaded(function (data) {
                angular.forEach(data, function (card) {
                    card.label = card.cardName + ' (I: ' + card.instanceCost + ' | M: ' + card.maintenanceCost + ')';
                    card.cardType = 'Modifier';
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