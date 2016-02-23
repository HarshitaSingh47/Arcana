/// <reference path="../../../typings/tsd.d.ts" />

module app.userService {
    'use strict';
    
    class UserService implements IUserService {
        userApiUrl: string = '/api/users/';
        userProfileApiUrl: string = '/api/userProfiles/';
        
        constructor(private $http: ng.IHttpService) { }
        
        getUserProfileById(userId: string): ng.IPromise<any> {
            return this.$http.get(this.userProfileApiUrl + userId).then((result) => {
                return result.data;
            });
        }
        
        createUser(user: any): ng.IPromise<any> {
            return this.$http.post(this.userApiUrl, user).then((result) => {
                return result.data;
            });
        }
        
        createUserProfile(userProfile: any): ng.IPromise<any> {
            return this.$http.post(this.userProfileApiUrl, userProfile).then((result) => {
                return result.data;
            });
        }
    }
    
    factory.$inject = ['$http'];
    function factory($http: ng.IHttpService): IUserService {
        return new UserService($http);
    }
    
    angular.module('app.services').factory('UserService', factory);
}