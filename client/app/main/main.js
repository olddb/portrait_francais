'use strict';

angular.module('portraitfrancaisApp')
.provider("mobileCheck", function( $stateProvider, $urlRouterProvider) {
        this.isNotMobile = function () {
            // return true;
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS == true) {
            return true;
        }
        else if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         || window.innerWidth <= 800 && window.innerHeight <= 600){
                if (navigator.userAgent.match(/iPhone/i)
                 || navigator.userAgent.match(/iPad/i)
                 || navigator.userAgent.match(/iPod/i)){
                    $("body").css ("cursor", "pointer");
                }
            return true;
        }
        else {
            return false;
        }
    }
    this.isMobile = !this.isNotMobile;
    this.$get = function() {
        var rtn = this.isNotMobile;
        return (rtn);
    }
});
angular.module('portraitfrancaisApp')
.config(function ($stateProvider, $urlRouterProvider, mobileCheckProvider) {
	var isNotMobile = mobileCheckProvider.isNotMobile;

    $stateProvider
      .state('main', {
        url: '/',
		templateUrl: (isNotMobile)? 'app/main/main.html':'app/main/mobile.html',
        controller: 'MainCtrl'
      })
      .state('portrait', {
		url: '/portraits/:portrait',
		templateUrl: (isNotMobile)? 'app/main/main.html':'app/main/mobile.html',
        controller: 'MainCtrl'
      })
	  //Editor
      .state('editor', {
        url: '/editor',
        // templateUrl: 'app/editor/editor.html',
		templateUrl: (isNotMobile) ? 'app/editor/editor.html':'',
        controller: 'EditorCtrl'
      })
      .state('indexEditor', {
		url: '/editor/:portrait',
        // templateUrl: 'app/editor/editor.html',
		templateUrl: (isNotMobile) ? 'app/editor/editor.html':'',
        controller: 'EditorCtrl'
      })
	  //Admin
      .state('admin', {
        url: '/admin',
        // templateUrl: 'app/admin/admin.html',
		templateUrl: (isNotMobile)? 'app/admin/admin.html':'',
        controller: 'AdminCtrl'
      })
	  //Account
      .state('login', {
        url: '/login',
        // templateUrl: 'app/account/login/login.html',
		templateUrl: (isNotMobile)? 'app/account/login/login.html':'',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        // templateUrl: 'app/account/signup/signup.html',
		templateUrl: (isNotMobile)? 'app/account/signup/signup.html':'',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        // templateUrl: 'app/account/settings/settings.html',
		templateUrl: (isNotMobile)? 'app/account/settings/settings.html':'',
        controller: 'SettingsCtrl',
        authenticate: true
      });
});
angular.module('portraitfrancaisApp')
.run(function ($location, mobileCheck) {

	if (mobileCheck.isMobile) {

		var path 	= $location.path();
		var match 	= /\/$|\/portraits.*/g

		if (!path.match(match)){
			$location.path("/");
		}
	}
});
angular.module('portraitfrancaisApp').controller('PortraitsController', ['$scope', '$stateParams', '$location', 'Portraits',
	function($scope, $stateParams, $location, Portraits) {
	} ]);
angular.module('portraitfrancaisApp').factory('Portraits', ['$resource',
	function($resource) {
		return $resource('api/portrait/:portrait', { portrait: '@portrait'
		}, { update: { method: 'PUT' } });
	}
]);
angular.module('portraitfrancaisApp').factory('portraitsSingleton', function($http, Portraits) {
	var promise = null;
	 return function() {
		if (promise) {
			return promise;
		} else {
			return promise = Portraits.query()
		}
	 }
});
angular.module('portraitfrancaisApp').factory('portraitsFactory', function($http, Portraits) {
	 return function() {
			return Portraits.query()
	 };
});	
 angular.module('ezplus', [])
        .directive('ezPlus', ezPlus);

    function ezPlus() {
        var service = {
            restrict: 'A',
            scope: {
                ezpModel: '=',
                ezpOptions: '=',
                onComplete: '=ezpOnComplete',
                onDestroy: '=ezpOnDestroy',
                onImageClick: '=ezpOnImageClick',
                onImageSwap: '=ezpOnImageSwap',
                onImageSwapComplete: '=ezpOnImageSwapComplete',
                onShow: '=ezpOnShow',
                onZoomedImageLoaded: '=ezpOnZoomedImageLoaded'
            },
            link: link
        };
       link.$inject = ['$scope', '$element', '$attributes'];
        function link($scope, $element, $attributes) {
            var bootstrapped = false;
            var options = {
                onComplete: function () {
                    if ($scope.onComplete && $scope.onComplete()) {
                        $scope.onComplete()();
                    }
                },
                onDestroy: function () {
                    if ($scope.onDestroy && $scope.onDestroy()) {
                        $scope.onDestroy()();
                    }
                },
                onImageClick: function () {
                    if ($scope.onImageClick && $scope.onImageClick()) {
                        $scope.onImageClick()();
                    }
                },

                onImageSwap: function () {
                    if ($scope.onImageSwap && $scope.onImageSwap()) {
                        $scope.onImageSwap()();
                    }
                },
                onImageSwapComplete: function () {
                    if ($scope.onImageSwapComplete && $scope.onImageSwapComplete()) {
                        $scope.onImageSwapComplete()();
                    }
                },
                onShow: function () {
                    if ($scope.onShow && $scope.onShow()) {
                        $scope.onShow()();
                    }
                },
                onZoomedImageLoaded: function () {
                    if ($scope.onZoomedImageLoaded && $scope.onZoomedImageLoaded()) {
                        $scope.onZoomedImageLoaded()();
                    }
                }
            };
            if ($scope.ezpOptions) {
                angular.extend(options, $scope.ezpOptions);
            }
            if (options.appendto) {
                options.zoomContainerAppendTo = options.appendto;
            }

            var loader;
            if (options.loader) {
                loader = options.loader;
            }

            $scope.$on('ezp-hidesAll', function (e, msg) {
                hideZoom();
            });
            $scope.$on('ezp-showAll', function (e, msg) {
                showZoom();
            });
            $scope.$on('ezp-disableZoom', function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('disable');
                }
            });
            $scope.$on('ezp-enableZoom', function (e, msg) {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('enable');
                }
            });
            $scope.$watch('ezpOptions', function (newValue, oldValue) {
                if (!bootstrapped) {
                    bootstrapped = true;
                } else {
                    var plugin = angular.element($element).data('ezPlus');
                    plugin.destroy();
                    angular.extend(options, $scope.ezpOptions);
                    if (plugin) {
                        angular.element($element).ezPlus(options);
                    }
                }
            }, true);
            $scope.$watch('ezpModel', function (newValue, oldValue) {
                var image = newValue;
                var thumbUrl = (image && image.thumb) || '';
                var smallUrl = (image && image.small) || '';
                var largeUrl = (image && image.large) || '';

                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    if (image) {
                        hideZoom();
                        if (loader) {
                            plugin.swaptheimage(loader, loader);
                        }

                        var initialUrl = getInitialUrl(smallUrl);
                        plugin.swaptheimage(initialUrl, largeUrl);
                        showZoom();
                    } else {
                        plugin.closeAll();
                    }
                } else {
                    if (image) {

                        var initialUrl = getInitialUrl();
                        if (initialUrl) {
                            $element.attr('src', initialUrl);
                        }

                        $element.attr('data-zoom-image', largeUrl);

                        angular.element($element).ezPlus(options);
                    }
                }

                function getInitialUrl(defaultUrl) {
                    var initialUrl = defaultUrl;
                    if (options.initial === 'thumb') {
                        initialUrl = thumbUrl;
                    } else if (options.initial === 'small') {
                        initialUrl = smallUrl;
                    } else if (options.initial === 'large') {
                        initialUrl = largeUrl;
                    }
                    return initialUrl;
                }
            });

            $scope.$on('$destroy', function () {
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.destroy();
                }
            });

            function hideZoom() {
                var action = 'hide';
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.showHideZoomContainer(action);
                }
            }
            function showZoom() {
                var action = 'show';
                var plugin = angular.element($element).data('ezPlus');
                if (plugin) {
                    plugin.showHideZoomContainer(action);
                }
            }
        }
    }
angular.module('portraitfrancaisApp').directive('mobilePanel', function() {
	var restrict 	= 'E';
	var templateUrl = '../../components/mobile-panel/panel.html';
	function controller($scope) {
        $scope.panelToggle = function (changeView) {

			if ($scope.panelOn) {
				$('.panel').addClass('off');
				$scope.panelOn = false;
			}
			else
			{
				$('.panel').removeClass('off');
				$scope.panelOn = true;
				console.log($scope.panelOn);
			}

			if (changeView) {

				$('.invitesLink').removeClass('redline');
				$('.contactLink').removeClass('redline');
				$('.galerieLink').removeClass('redline');
				$('.proposLink').removeClass('redline');

				$('.invitesView').addClass('off');
				$('.contactView').addClass('off');
				$('.galerieView').addClass('off');
				$('.proposView').addClass('off');

				switch(changeView) {
					case "invites":
						$('.invitesLink').addClass('redline');
						$('.invitesView').removeClass('off');
						break;
					case "contact":
						$('.contactLink').addClass('redline');
						$('.contactView').removeClass('off');
						break;
					case "galerie":
						$('.galerieLink').addClass('redline');
						$('.galerieView').removeClass('off');
						break;
					case "propos":
						$('.proposLink').addClass('redline');
						$('.proposView').removeClass('off');
						break;
				}

			}

		};
	}
	return {
		restrict: restrict,
		templateUrl: templateUrl,
		controller: controller
	}
});
angular.module('portraitfrancaisApp').directive('mobileVersion', function() {
	var restrict 	= 'E';
	var templateUrl = '../../app/main/mobile.html';
	function controller($scope) {
	}
	return {
		restrict: restrict,
		templateUrl: templateUrl,
		controller: controller
	}
});