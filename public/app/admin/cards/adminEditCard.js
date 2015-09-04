(function () {
    'use strict';

    function adminEditCard($modalInstance, card, cardType) {
        var vm = this;

        vm.card = card;
        vm.cardType = cardType;
        vm.title = 'Update Card - ' + vm.card.cardName;
        vm.creatureTypes = ['Organic', 'Mystical'];
        vm.rarities = ['Normal', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

        vm.submit = function () {
            vm.card.$save().then(function () {
                $modalInstance.close();
            });
        };

        vm.cancel = function () {
            $modalInstance.close();
        };
    }
    adminEditCard.$inject = ['$modalInstance', 'card', 'cardType'];

    angular.module('arcana').controller('adminEditCard', adminEditCard);
}());