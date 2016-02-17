/// <reference path="../../../typings/tsd.d.ts" />

module app.cardService {
    'use strict';
    
    class CardService implements ICardService {
        apiUrl: string = '/api/cards/cardType/';
        
        constructor(private $http: ng.IHttpService) { }
        
        getCards(): ng.IPromise<any> {
            return this.$http.get(this.apiUrl);
        }
        
        getCardsByType(cardType: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + cardType.toLowerCase());
        }
    }
    
    factory.$inject = ['$http'];
    function factory($http: ng.IHttpService): ICardService {
        return new CardService($http);
    }
    
    angular.module('app.services').factory('CardService', factory);
}