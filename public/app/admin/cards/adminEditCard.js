(function () {
    'use strict';

    function adminEditCard($modalInstance, cardInfo) {
        var vm = this;

        vm.card = cardInfo.card;
        vm.cardType = cardInfo.cardType;
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
    adminEditCard.$inject = ['$modalInstance', 'cardInfo'];

    angular.module('arcana').controller('adminEditCard', adminEditCard);
}());