/// <reference path="../../../typings/tsd.d.ts" />

module app.cardService {
    'use strict';
    
    class CardService implements ICardService {
        apiUrl: string = '/api/cards/';
        
        constructor(private $http: ng.IHttpService) { }
        
        getCards(): ng.IPromise<any> {
            return this.$http.get(this.apiUrl).then((results) => {
                return results.data;
            });
        }
        
        getCardsByType(cardType: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'cardType/' + cardType).then((results) => {
                return results.data;
            });
        }
        
        getCardById(cardId: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'id/' + cardId).then((results) => {
                return results.data[0];
            });
        }
        
        createCard(card: any): ng.IPromise<any> {
            return this.$http.post(this.apiUrl, card);
        }
        
        updateCard(card: any): ng.IPromise<any> {
            return this.$http.put(this.apiUrl, card);
        }
        
        deleteCard(cardId: string): ng.IPromise<any> {
            return this.$http.post(this.apiUrl + '/deleteCard', { cardId: cardId });
        }
    }
    
    factory.$inject = ['$http'];
    function factory($http: ng.IHttpService): ICardService {
        return new CardService($http);
    }
    
    angular.module('app.services').factory('CardService', factory);
}