'use strict';

angular.module('portraitfrancaisApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
	$scope.auth = Auth;
	$scope.connected = $scope.auth.getCurrentUser().name;
	$scope.user.name = $scope.auth.getCurrentUser().name;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.auth.login({
          name: $scope.user.name,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/editor');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
		  console.log($scope.errors.other);
        });
        setTimeout(function () {
          $scope.$apply(function(){
            $location.path('/editor');
          });
        }, 100);
        
      }
    };

  });
