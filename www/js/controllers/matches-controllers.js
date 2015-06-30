angular.module('matches.controllers', ['starter'])

.controller('MatchesCtrl', function ($ionicViewService,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate) {
  		$ionicViewService.nextViewOptions({
          disableBack: true
        });
  		angular.element(document.querySelector('#menuAPP')).addClass('hidden');
  		//$scope.disablemenu = true;
  		//alert("@");

  		console.log($ionicSideMenuDelegate);
  });