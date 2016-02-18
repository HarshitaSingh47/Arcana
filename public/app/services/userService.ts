/// <reference path="../../../typings/tsd.d.ts" />

module app.userService {
    'use strict';
    
    class UserService implements IUserService {
        apiUrl: string = '/api/users/';
        
        constructor(private $http: ng.IHttpService) { }
        
        getUsers(): ng.IPromise<any> {
            return this.$http.get(this.apiUrl);
        }
        
        getUserById(userId: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'id/' + userId);
        }
        
        getUserByUsername(username: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'username/' + username);
        }
        
        getUserByEmail(emailAddress: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'email/' + emailAddress);
        }
        
        createUser(user: any): ng.IPromise<any> {
            return this.$http.post(this.apiUrl, user);
        }
    }
    
    factory.$inject = ['$http'];
    function factory($http: ng.IHttpService): IUserService {
        return new UserService($http);
    }
    
    angular.module('app.services').factory('UserService', factory);
}