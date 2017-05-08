'use strict';

angular.module('portraitfrancaisApp')
   .directive('ngElevateZoom', function() {
	return {
			restrict: 'A',
			link: function(scope, element, attrs) {
			//Will watch for changes on the attribute
			attrs.$observe('zoomImage',function(){
				linkElevateZoom();
			})
			function linkElevateZoom(){
				//Check if its not empty
				if (!attrs.zoomImage) return;
				element.attr('data-zoom-image',attrs.zoomImage);
				$(element).elevateZoom({
					// scrollZoom : true,
					loadingIcon : 'http://loading.io/loader/?use=eyJzaXplIjo5NSwic3BlZWQiOjEsImNiayI6IiNmZmZmZmYiLCJjMSI6IiMwMGIyZmYiLCJjMiI6IjEyIiwiYzMiOiI3IiwiYzQiOiIyMCIsImM1IjoiNSIsImM2IjoiMzAiLCJ0eXBlIjoiZGVmYXVsdCJ9',
					zoomType	: "lens",
					lensShape : "round",
					lensSize  : 250,
					lensFadeIn: 500,
					borderColour : "white",
					borderSize : 2,
					zoomLens: false
				});
			}
			linkElevateZoom();
		}
	};
  });