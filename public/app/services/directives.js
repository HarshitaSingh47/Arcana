(function () {
    'use strict';

    function highlightActive() {
        /*jslint unparam: true*/
        function controller($scope, $element, $attrs, $location) {
            var links = $element.find('a'),
                path = function () {
                    return $location.path();
                },
                highlight = function (links, path) {
                    path = '#' + path;
                    return angular.forEach(links, function (link) {
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

            highlight(links, $location.path());
            return $scope.$watch(path, function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }

                return highlight(links, $location.path());
            });
        }
        /*jslint unparam: false*/
        controller.$inject = ['$scope', '$element', '$attrs', '$location'];

        return {
            restrict: 'A',
            controller: controller
        };
    }

    function customPage() {
        function controller($scope, $element, $location) {
            var path = function () {
                    return $location.path();
                },
                addBg = function (path) {
                    $element.removeClass('body-wide body-err body-lock body-auth');
                    switch (path) {
                        case '/login':
                        case '/register':
                            return $element.addClass('body-wide body-auth');
                        default:
                            break;
                    }
                };

            addBg($location.path());
            return $scope.$watch(path, function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }

                return addBg($location.path());
            });
        }
        controller.$inject = ['$scope', '$element', '$location'];

        return {
            restrict: 'A',
            controller: controller
        };
    }

    angular.module('arcana')
        .directive('highlightActive', highlightActive)
        .directive('customPage', customPage);
}());