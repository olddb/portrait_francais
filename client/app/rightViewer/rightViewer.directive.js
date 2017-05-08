'use strict';

angular.module('portraitfrancaisApp')
  .directive('rightViewer', function () {
    return {
      templateUrl: 'app/rightViewer/rightViewer.html',
      restrict: 'EA',
      link: function () {
      	// scope, element, attrs
      }
    };
  });