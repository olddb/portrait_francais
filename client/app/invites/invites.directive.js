'use strict';

angular.module('portraitfrancaisApp')
  .directive('invites', function () {
    return {
      templateUrl: 'app/invites/invites.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });