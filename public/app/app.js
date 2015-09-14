(function () {
    'use strict';

    function configureRoutes($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/home/home.html',
            controller: 'home',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$waitForAuth();
                }]
            }
        });

        $routeProvider.when('/login', {
            templateUrl: '/app/auth/login.html',
            controller: 'login',
            controllerAs: 'vm'
        });

        $routeProvider.when('/register', {
            templateUrl: '/app/auth/register.html',
            controller: 'register',
            controllerAs: 'vm'
        });

        $routeProvider.when('/profile', {
            templateUrl: '/app/auth/profile.html',
            controller: 'profile',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/cards', {
            templateUrl: '/app/cards/cards.html',
            controller: 'cards',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/decks', {
            templateUrl: '/app/decks/decks.html',
            controller: 'decks',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/deckbuilder', {
            templateUrl: '/app/deckbuilder/deckbuilder.html',
            controller: 'deckbuilder',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/store', {
            templateUrl: '/app/store/store.html',
            controller: 'store',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/lobby', {
            templateUrl: '/app/lobby/lobby.html',
            controller: 'lobby',
            controllerAs: 'vm',
            resolve: {
                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth.$requireAuth();
                }]
            }
        });

        $routeProvider.when('/admin/rooms', {
            templateUrl: '/app/admin/rooms/adminRooms.html',
            controller: 'adminRooms',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/rooms/add', {
            templateUrl: '/app/admin/rooms/adminAddRoom.html',
            controller: 'adminAddRoom',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/cards', {
            templateUrl: '/app/admin/cards/adminCards.html',
            controller: 'adminCards',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/cards/add', {
            templateUrl: '/app/admin/cards/adminAddCard.html',
            controller: 'adminAddCard',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/cards/edit/:cardId', {
            templateUrl: '/app/admin/cards/adminEditCard.html',
            controller: 'adminEditCard',
            controllerAs: 'vm',
            resolve: {
                cardId: ['$route', function ($route) {
                    return $route.current.params.cardId;
                }]
            }
        });

        $routeProvider.when('/admin/cards/copy/:cardId', {
            templateUrl: '/app/admin/cards/adminCopyCard.html',
            controller: 'adminCopyCard',
            controllerAs: 'vm',
            resolve: {
                cardId: ['$route', function ($route) {
                    return $route.current.params.cardId;
                }]
            }
        });

        $routeProvider.when('/admin/decks', {
            templateUrl: '/app/admin/decks/adminDecks.html',
            controller: 'adminDecks',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/decks/add', {
            templateUrl: '/app/admin/decks/adminAddDeck.html',
            controller: 'adminAddDeck',
            controllerAs: 'vm'
        });

        $routeProvider.when('/admin/decks/edit/:deckId', {
            templateUrl: '/app/admin/decks/adminEditDeck.html',
            controller: 'adminEditDeck',
            controllerAs: 'vm',
            resolve: {
                deckId: ['$route', function ($route) {
                    return $route.current.params.deckId;
                }]
            }
        });
    }
    configureRoutes.$inject = ['$routeProvider'];

    function onAppRun($rootScope, $location) {
        /*jslint unparam: true*/
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                var redirPath = next.$$route.originalPath;
                $location.path('/login').search('redirect', redirPath);
            }
        });
        /*jslint unparam: false*/
    }
    onAppRun.$inject = ['$rootScope', '$location'];

    angular.module('arcana', ['ngRoute', 'ngAnimate', 'firebase', 'ui.bootstrap'])
        .constant('FIREBASE_URL', 'https://glaring-heat-7532.firebaseio.com/')
        .constant('CARD_TYPES', ['$id', 'cardName', 'cardType', 'label', 'genValue', 'instanceCost', 'maintenanceCost', 'burnValue', 'health', 'power', 'rarity', 'description', 'flavorText', 'creatureType'])
        .config(configureRoutes)
        .run(onAppRun);
}());