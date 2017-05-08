'use strict';

angular.module('portraitfrancaisApp')
    .directive('newsletter', function () {
        return {
            templateUrl: 'app/newsletter/newsletter.html',
            restrict: 'EA',
        };
    });