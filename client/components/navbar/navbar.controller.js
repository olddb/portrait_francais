'use strict';

angular.module('portraitfrancaisApp')
    .controller('NavbarCtrl', function ($timeout, $scope, $location, Auth, $stateParams) {
	$scope.auth = Auth;
	$scope.panelOn = false;
        
        $scope.isLoggedIn = $scope.auth.isLoggedIn;
        $scope.isAdmin = $scope.auth.isAdmin;
        $scope.getCurrentUser = $scope.auth.getCurrentUser;
		$scope.urlPortrait = $stateParams.portrait ? $stateParams.portrait.replace(/_/g, " ") : "";//used by top left corner portrait name

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
	});
