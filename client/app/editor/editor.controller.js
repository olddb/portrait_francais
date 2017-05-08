//'use strict';
angular.module('portraitfrancaisApp')
.filter('spaceLess', function () {
  return function (input) {
      return input.replace(/ /g, '_');
  };
});

angular.module('portraitfrancaisApp')
.controller('EditorCtrl', function ($scope, $http, portraitsFactory, $stateParams, Portraits, $location, $timeout, Auth) {
	$scope.auth = Auth;

	$scope.connected 	= $scope.auth.getCurrentUser().name;
	$scope.user 		= $scope.auth.getCurrentUser();
	if (!$scope.connected) {
		$location.path('/login')
	}
	else { 	console.log("You're logged in as: " + $scope.connected); }
	$scope.currDot = {};
	$scope.countDot = 0;
	$scope.showTextEditor = false;
//▶  portraits factory
	portraitsFactory().$promise.then(function(portraits) {
		$scope.portraits 	= handleAPropos(portraits);
		//used by top left corner portrait name
		var portraitInUrl 	= $stateParams.portrait ? $stateParams.portrait.replace(/_/g, " ") : "";
		$scope.portrait 	= portraitInUrl ? findPortraitToEdit(portraitInUrl) : null;

		$scope.portraits = $scope.portraits.map(function (ptr) {

			if (typeof(ptr.dots) == 'string') {
				ptr.dots 		= JSON.parse(ptr.dots);
			}
			if (typeof(ptr.thumbnail) == 'string') {
				ptr.thumbnail 	= JSON.parse(ptr.thumbnail);
			}
			if (typeof(ptr.image) == 'string') {
				ptr.image 		= JSON.parse(ptr.image);
			}
			return (ptr);
		});

		if ($scope.portrait && $scope.portrait.dots) {
			$scope.displaydots();
			// console.log($scope.portrait.dots);
			$scope.countDot = $scope.portrait.dots.length;
		}
		else if (portraitInUrl) {
			$scope.portrait = {};
			$scope.portrait.dots = [];
		}
	});
//」
	// Functions
	//▶   DISPLAY DOTS
	$scope.displaydots = function () {
		if ($scope.portrait.dots.length) {
			$scope.portrait.dots.forEach( function (dot) {
				var str = '';
				var hex = dot.hex;
				if (dot.style === 'default'){
					str = "<svg class=\"dotOnImg" + dot.ordre +"\" height=\"15\" width=\"15\""
					+ "style=\"left:calc("
					+ dot.coordX
					+ "% - 5px);top:calc("
					+ dot.coordY
					+ "% - 5px);";
					str += "\"><circle cx=\"5\" cy=\"5\" r=\"5\" fill=\"" + hex + "\"/></svg>";
				}

				// glyphicon glyphicon-record
				if (dot.style === 'custom'){
					// <span class="glyphicon glyphicon-ok" aria-hidden="true" ng-click="hideDotEditor()"></span>
					str = "<span class=\"glyphicon glyphicon-record dotOnImg" + dot.ordre +"\" height=\"15\" width=\"15\""
					+ "style=\"left:calc("
					+ dot.coordX
					+ "% - 5px);top:calc("
					+ dot.coordY
					+ "% - 5px);color:" + hex + "\">";
				}
				$('.fitImg').append(str);
			});
		}
	}
	//」
	//▶  //upload
	$scope.upload = function(tag) {
		var tag = tag;
		fileTag = tag + "File";
		var file = document.getElementById(fileTag).files[0]
		if (!file){return;}

		if (tag == 'image'){
			$scope.imageToEdit = {};
			$scope.imageToEdit.name = file.name;
		} else {
			$scope.thumbnail = {};
			$scope.thumbnail.name = file.name;
		}
		//▶  upload errors
		var imgsize = file.size/1024; 
		if (imgsize > 5000) {
			alert("Max size: 5Mb. Please consider uploading a lighter image. Thank you.");
			return;
		} else if (!hasExtension(fileTag, ['.png'])) {
			alert("Merci de mettre un png s'il vous plait");
			return;
		} else {
			//」
			//▶  wait cursor 
			$('body').css('cursor','wait');
			$('upload').css('cursor','wait');
			//」
			var r = new FileReader();


			//▶  onloadend
			r.onloadend = function(e){
				console.log("on load end");
				$('body').css('cursor','default');
				$('upload').css('cursor','default');

				//this is our image data
				var image = e.target.result;

				//▶  setTimeout
					setTimeout(function () {
					$scope.$apply(function(){
						if (tag == 'image'){
							$scope.imageToEdit.data   	= image;
						} else {
							$scope.thumbnail.data 		= image;
						}

					});
				}, 10);
				//」

				}
			//」
			r.readAsDataURL(file);
		}
	}
	//」
	//▶  update
	$scope.update = function(portrait) {
		console.log("update");
		portrait 	= portrait;
		Portraits 	= Portraits;

		if (portrait.publish == undefined) 
			portrait.publish = false
		if ($scope.imageToEdit) {
			portrait.image 			= {};
			portrait.image.data 	= $scope.imageToEdit.data
			portrait.image.name  	= $scope.imageToEdit.name
			//portrait.image 			= JSON.stringify(portrait.image);
		}
		if ($scope.thumbnail){
			portrait.thumbnail			= {};
			portrait.thumbnail.data 	= $scope.thumbnail.data
			portrait.thumbnail.name		= $scope.thumbnail.name
			//portrait.thumbnail 			= JSON.stringify(portrait.thumbnail);
		}

		portrait.dots = JSON.stringify(portrait.dots);
		//update
		if (portrait._id){
				console.log(portrait);
			portrait.$update({portrait: portrait._id}, function(portraitUpdated) {
				$location.path('/editor');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
				console.log("portrait.publish");
				console.log(portrait.publish);
		}
		else {
			// console.log('portrait.dots');
			// console.log(portrait.dots);
			//send you binary data via $http or $resource or do anything else with it

			portrait = new Portraits ({
				//▶  //implemented
				name 			: portrait.name,
				publish 		: portrait.publish,
				image 			: portrait.image,
				thumbnail 		: portrait.thumbnail,
				color 			: portrait.color,
				profession 		: portrait.profession,
				dots 			: portrait.dots,

				//not implemented
				intro 			: portrait.intro,
				format 			: portrait.format,
				alaune 			: portrait.alaune,
				fulltxt 		: portrait.fulltxt
				//」
			});
				console.log("portrait.publish");
				console.log(portrait.publish);

			// Redirect after save
			portrait.$save(function(response) {
 
				// Clear form fields
				$scope.image 		= {};
				$scope.name 		= '';
				$scope.dots 		= {};
				$scope.alaune 		= '';
				$scope.profession 	= '';
				$scope.thumbnail 	= {};
				$scope.portrait 	= {};

				$location.path('/editor');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log($scope.error);
			})
			$scope.portraits.push(portrait);
		}
	}
	//」
	//▶  remove
	$scope.remove = function(portrait) {
		if (confirm('Voulez vous supprimer definitivement le portrait ?')) {
			//lookup of portraitName in $scope.portraits
			portrait.$remove({portrait: portrait._id}, function(portraitRemoved) {
				var id = $scope.portraits.map(function(e) { return e._id; }).indexOf(portraitRemoved._id);
				$scope.portraits.splice(id,1);
				$location.path('editor');
			});
		}
	}
	//」
	//▶  goToEditPortrait
	//  button redirection to Portrait Creation/Edition view
	$scope.goToEditPortrait = function (portrait) {
		portrait = portrait ? portrait : 'new';
		portrait = portrait.replace(/ /g, "_")
		$location.path('/editor/' + portrait);
	}
	//」
	//▶  logout
	$scope.logout = function () {
		Auth.logout();
	}
		//」
	//▶  // find portrait to edit
	function findPortraitToEdit (name) {
		if (name == 'new') 
			return {}
		var result = $scope.portraits.filter(function( portrait ) {
			return portrait.name == name;
		});
		console.log(result[0]);
		return (result[0]);
	}
	//」
	//▶  handle apropos
	function handleAPropos (portrait) {
		var cleanPortrait = [];
		var cleanIndex = 0;

		for (var j = 0; j < portrait.length; j++) {
			if (portrait[j].apropos) {
				var aproposIndex = j;
			}
		}
		for (j = 0; j < portrait.length; j++) {
			if (j === aproposIndex) { j++; }
			if (portrait[j]) {
				cleanPortrait[cleanIndex] = portrait[j];
				if (typeof(cleanPortrait[cleanIndex].dots) == 'string') {
					cleanPortrait[cleanIndex].dots = JSON.parse(portrait[j].dots);
				}
				cleanIndex++;
			}
		}
		$scope.apropos = portrait[aproposIndex];
		return (cleanPortrait);
	};
	//」
	//▶  Click events
	$scope.aproposIsDown = false;	
	$("#modifierAPropos").click(function(){
		if ($scope.aproposIsDown == true) {
			$("#aProposEditor").slideUp();
			$scope.aproposIsDown = false;	
		}
		else {
			$("#aProposEditor").slideDown();
			$scope.aproposIsDown = true;	
		}
	});

	$("#closeAPropos").click(function(){
		$("#aProposEditor").slideUp();
		$scope.aproposIsDown = false;	
	});

	$(window).load(function() {
		var img = $('.fitImg').find('img');
		var w = img.width();
		var y = img.height();
		$('.fitImg').css({
			width: w,
			height: y
		});
	});


	$('.fitImg').click(function(e) {
		var posX = $(this).offset().left, posY = $(this).offset().top;
		var totalX = $('.fitImg').width();
		var totalY = $('.fitImg').height();

		$scope.currDot.coordX = ((e.pageX - posX) / totalX) * 100;
		$scope.currDot.coordY = ((e.pageY - posY) / totalY) * 100;
		$scope.previewDot();
		$timeout(function() {
			if (confirm("Voulez-vous creer un point a cet endroit ?")) {
				// $scope.newDots.forEach( function (dot) { dot.preview = false; });
				$scope.showTextEditor = true;
				$scope.$apply();
				removePreview();
			}
			removePreview();
		}, 500);
	});
	//」
	//▶  removePreview
	function removePreview () {
		$('.preview').remove();
		// $scope.newDots.splice($scope.newDots.indexOf('preview'), 1);
		if ($scope.portrait.dots.length) {
			$scope.portrait.dots = $scope.portrait.dots.filter( function (dot) {
				if (dot) {
					if (dot.preview === false) {
						return (dot);
					}
				};
			});
		}
	};
	//」
	//▶  PreviewDot
	$scope.previewDot = function () {
		$scope.portrait.dots.push({
			coordY : $scope.currDot.coordY,
			coordX : $scope.currDot.coordX,
			data : $scope.currDot.data,
			preview : true
		});
		$scope.portrait.dots.forEach( function (dot) {
			var str = '';
			str = "<svg class=\"dotOnImg preview\" height=\"15\" width=\"15\""
			+ "style=\"left:calc("
			+ $scope.currDot.coordX
			+ "% - 5px);top:calc("
			+ $scope.currDot.coordY
			+ "% - 5px);";
			str += "\"><circle cx=\"5\" cy=\"5\" r=\"5\" fill=\"white\"/></svg>";
			$('.fitImg').append(str);
		});
	}
	//」
	//▶  //AddDot
	$scope.addDot = function () {
		$scope.countDot++;
		console.log('before add ' + $scope.countDot);
		$scope.portrait.dots.push({
			coordY : $scope.currDot.coordY,
			coordX : $scope.currDot.coordX,
			data : $scope.currDot.data,
			ordre: $scope.countDot,
			style: 'default',
			hex: 'white',
			preview: false
		});
		console.log('after add ' + $scope.countDot);
		$scope.displaydots();
		$scope.currDot.data = '';
		$scope.showTextEditor = !$scope.showTextEditor;
	};
	//」
	//▶  Various
	$scope.removeText = function () {
		$scope.currDot.data = '';
	};

	$scope.showIntroTextEditor = false;
	$scope.editIntro = function () {
		if ($scope.showIntroTextEditor == false) {
			$scope.showIntroTextEditor = true;
			$scope.showTextEditor = false;
		}
		else { $scope.showIntroTextEditor = false; }
	};

	$scope.addIntro = function () {
		$scope.showIntroTextEditor = false;
		$scope.showTextEditor = false;
	};
	$scope.removeIntroText = function () {
		$scope.portrait.intro = '';
	};
	$scope.dotEditorShow = false;
	$scope.editDots = function() {
		$scope.dotEditorShow = !$scope.dotEditorShow;
	};
	$scope.showDotDataEditor = false;
	$scope.editDotData = function () {
		$scope.showDotDataEditor = true;
	};
	function reOrderDots() {
		var i = 0;
		$scope.portrait.dots.forEach(function (d) {
			d.ordre = i;
			$scope.countDot = i;
		});
	};
	$scope.removeThisDot = function (thisDot) {
		if (confirm('Voulez vous vraiment supprimer le point ?')) {
			$scope.portrait.dots = $scope.portrait.dots.filter(function (el) {
				return parseInt(el.ordre) != thisDot;
			});
			reOrderDots();
		}
	}
	$scope.showDotTextEditor = false;
	$scope.editThisDot = function (thisDot) {
		$scope.portrait.dots.forEach( function(d){
			if (parseInt(d.ordre) === thisDot) {$scope.editedDot = d;}
		});
		$scope.showDotTextEditor = true;
	};
	$scope.hideDotEditor = function() {
		$scope.showDotTextEditor = false;
	}
	$scope.fillDotStyle = function (ordre) {
		if(typeof(ordre) !== 'object') {
			ordre -= 1;
			var hex = $('#dotEditor').find('#' + ordre).find('.hexaColor').val();
			var styleVal = $('#dotEditor').find('#' + ordre).find('.style').val();
			ordre += 1;
			$scope.portrait.dots.forEach( function (dot) {
				if (parseInt(dot.ordre) === parseInt(ordre)){
					console.dir(dot);
					dot.style = styleVal.length > 0 ? styleVal : dot.style;
					dot.hex = hex.length > 0 ? hex : dot.hex;
				}
			});
		}
	}
	$scope.styleDotPlus = false;
    $("body").delegate(".styleDot", "click", function (e) {
    	if ($(this).hasClass("btn-success")) {
	    	$(".styleDot").removeClass('btn-success');
	    	$(".styleDot").addClass('btn-danger');    	

	    	$(this).removeClass('btn-danger');
	    	$(this).addClass('btn-success');

	    	if ($scope.styleDotPlus == false) {
	    		$(this).parent().parent().find('.styleDotPlus').slideDown();
	    		$scope.styleDotPlus = true;


		    	$(".styleDot").removeClass('btn-success');
		    	$(".styleDot").addClass('btn-danger');    	

		    	$(this).removeClass('btn-danger');
		    	$(this).addClass('btn-success');

	    	}
	    	else {
	    		var styleDotPlus = $(this).parent().parent().find('.styleDotPlus');
	    		var ordre = styleDotPlus.parent().find('.ordre').html().trim();
	    		styleDotPlus.slideUp();
	    		$scope.fillDotStyle(styleDotPlus, ordre);
	    		$scope.styleDotPlus = false;

		    	$(".styleDot").removeClass('btn-danger');
		    	$(".styleDot").addClass('btn-success');

	    	}
	    }
	});
});


function hasExtension(inputID, exts) {
	var fileName = document.getElementById(inputID).value;
	return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}