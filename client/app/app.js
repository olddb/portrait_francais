'use strict';

angular.module('portraitfrancaisApp', [
	'colorpicker.module',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'textAngular',
	'ezplus',
	'mailchimp'
])
//▶  config
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

	$urlRouterProvider
	.otherwise('/');

	$locationProvider.html5Mode(true);
	$httpProvider.interceptors.push('authInterceptor');
})
//」
//▶  authInterceptor factory
.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
	return {
		// Add authorization token to headers
		request: function (config) {
			config.headers = config.headers || {};
			if ($cookieStore.get('token')) {
				config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
			}
			return config;
		},

		// Intercept 401s and redirect you to login
		responseError: function (response) {
			if (response.status === 401) {
				$location.path('/login');
				// remove any stale tokens
				$cookieStore.remove('token');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
		}
	};
}) //」
//▶  on run
.run(function ($rootScope, $location, Auth) {
	// Redirect to login if route requires auth and you're not logged in
	$rootScope.$on('$stateChangeStart', function (event, next) {
		Auth.isLoggedInAsync(function (loggedIn) {
			if (next.authenticate && !loggedIn) {
				event.preventDefault();
				$location.path('/login');
			}
		});
	});
}) //」
.directive("addfade", function($animate) {
		return {
			restrict: "A",
			scope: { on: '=portraitIsOn' },
			link: function(scope, element, attrs) {
				scope.$watch(scope.portraitIsOn, function(on) {
				console.log(scope);
				console.log(attrs);
				console.log(scope.on);
				console.log(on);
				console.log("tish is an element");
				$animate.addClass(element, 'fadeIn')
				})

			}
		};
	}
);