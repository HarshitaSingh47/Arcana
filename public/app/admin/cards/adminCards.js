(function () {
    'use strict';

    function adminCards($modal, $firebaseArray, FIREBASE_URL) {
        var vm = this,
            fbRef = new Firebase(FIREBASE_URL + '/cards');

        $firebaseArray(fbRef).$loaded(function (data) {
            vm.cards = data;
        });

        vm.addCard = function () {
            $modal.open({
                templateUrl: '/app/admin/cards/adminAddCard.html',
                controller: 'adminAddCard',
                controllerAs: 'vm'
            });
        };
    }
    adminCards.$inject = ['$modal', '$firebaseArray', 'FIREBASE_URL'];

    angular.module('arcana').controller('adminCards', adminCards);
}());