'use strict';

angular.module('portraitfrancaisApp')
    .directive('middleViewer', function () {
        return {
            templateUrl: 'app/middleViewer/middleViewer.html',
            restrict: 'EA',
        };
    });