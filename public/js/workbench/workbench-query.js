(function initWorkbenchQuery(workbench) {
    'use strict';

    var defaultOptions = {
            async: true,
            cache: false,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        get = function (url) {
            var options = {},
                settings = $.extend({}, defaultOptions, options);

            return new Q($.ajax(url, settings));
        },
        post = function (url, data) {
            var options = {
                data: data,
                type: 'POST'
            },
            settings = $.extend({}, defaultOptions, options);

            return new Q($.ajax(url, settings));
        };

    workbench.query = {
        get: get,
        post: post
    };
}(workbench || {}));