/// <reference path="../../../typings/tsd.d.ts" />

module app.directives {
    'use strict';
    
    class HighlightActiveDirective implements ng.IDirective {
        restrict: string = 'A';
        
        constructor(private $location: ng.ILocationService) { }
        
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            var links = element.find('a');
            var path = () => {
                return this.$location.path();
            };
            var highlight = (links: any, path: string) => {
                path = '#' + path;
                return angular.forEach(links, (link) => {
                    var $link = angular.element(link),
                        $li = $link.parent('li'),
                        href = $link.attr('href');
                        
                    if ($li.hasClass('active')) {
                        $li.removeClass('active');
                    }
                    
                    if (path === href) {
                        return $li.addClass('active');
                    }
                });
            };
            
            highlight(links, this.$location.path());
            return scope.$watch(path, (newVal, oldVal) => {
                if (newVal === oldVal) {
                    return;
                }
                
                return highlight(links, this.$location.path());
            });
        }
        
        static factory(): ng.IDirectiveFactory {
            const directive = ($location: ng.ILocationService) => new HighlightActiveDirective($location);
            directive.$inject = ['$location'];
            return directive;
        }
    }
    
    class CustomPageDirective implements ng.IDirective {
        restrict: string = 'A';
        
        constructor(private $location: ng.ILocationService) { }
        
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
            var path = () => {
                return this.$location.path();
            };
            var addBg = (path: string) => {
                element.removeClass('body-wide body-err body-lock body-auth');
                switch(path) {
                    case '/login':
                    case '/register':
                        return element.addClass('body-wide body-auth');
                    default:
                        break;
                }
            };
            
            addBg(this.$location.path());
            return scope.$watch(path, (newVal, oldVal) => {
                if (newVal === oldVal) {
                    return;
                }
                
                return addBg(this.$location.path());
            });
        }
        
        static factory(): ng.IDirectiveFactory {
            const directive = ($location: ng.ILocationService) => new CustomPageDirective($location);
            directive.$inject = ['$location'];
            return directive;
        }
    }
    
    angular.module('app.directives')
        .directive('highlightActive', HighlightActiveDirective.factory())
        .directive('customPage', CustomPageDirective.factory());
}