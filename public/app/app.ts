/// <reference path="../../typings/tsd.d.ts" />

((): void => {
    'use strict';
    
    function configureRoutes($routeProvider: ng.route.IRouteProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        });
        
        $routeProvider.when('/login', {
            templateUrl: '/app/auth/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        $routeProvider.when('/register', {
            templateUrl: '/app/auth/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        });
        
        $routeProvider.when('/admin/cards', {
            templateUrl: '/app/admin/cards/adminCards.html',
            controller: 'AdminCardsController',
            controllerAs: 'vm',
            resolve: {
                cards: ['CardService', (cardService) => {
                    return cardService.getCardsByType('Battery').then(function (results) {
                        return results.data;
                    });
                }]
            }
        });
    }
    configureRoutes.$inject = ['$routeProvider'];
    
    function onAppRun($rootScope: ng.IRootScopeService, $location: ng.ILocationService) {
        $rootScope.$on('$routeChangeError', (event, next, previous, error) => {
            if (error === 'AUTH_REQUIRED') {
                var redirectPath = next.$$route.originalPath;
                $location.path('/login').search('redirect', redirectPath);
            }
        });
    }
    onAppRun.$inject = ['$rootScope', '$location'];
    
    angular.module('arcana', [
        'ngRoute',
        'firebase',
        'app.controllers',
        'app.services',
        'app.directives',
        'ui.bootstrap'
    ])
    .constant('FIREBASE_URL', 'https://glaring-heat-7532.firebaseio.com/')
    .constant('CARD_TYPES', ['$id', 'cardName', 'cardType', 'label', 'genValue', 'instanceCost', 'maintenanceCost', 'burnValue', 'health', 'power', 'rarity', 'description', 'flavorText', 'creatureType'])
    .config(configureRoutes)
    .run(onAppRun);
})();