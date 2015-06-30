angular.module('matches.controllers', ['starter'])

.controller('MatchesCtrl', function ($ionicViewService,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate) {
  		$ionicViewService.nextViewOptions({
          disableBack: true
        });
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");

        console.log($rootScope.eventData);
        $scope.eventinfoJSON = $rootScope.eventData;


        
    	$scope.backtoevents = function(){
    		$state.go("app.events");
    	};
  		/*$ionicViewService.nextViewOptions({
          disableBack: true
        });
  		angular.element(document.querySelector('#menuAPP')).addClass('hidden');
  		angular.element(document.querySelector('#menuAPP')).addClass('hidden');
  		

  		$scope.$on("$load", function() {
  			//angular.element(document.querySelector('#menuAPP')).removeClass('hidden');
	        alert("@");
	    });
  		console.log($ionicSideMenuDelegate);*/
  });