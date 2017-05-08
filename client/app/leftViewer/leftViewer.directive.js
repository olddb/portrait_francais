'use strict';

angular.module('portraitfrancaisApp')
    .directive('leftViewer', function () {
        return {
            templateUrl: 'app/leftViewer/leftViewer.html',
            restrict: 'EA',
        };
    });