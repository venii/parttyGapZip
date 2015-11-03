angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (
                        $state,$stateParams,
                        SendMatchesToWS,MatchService) {
  		
        MatchService.resizeHeigth();    
        MatchService.hideTopMenu();
        $scope.eventinfoJSON = $stateParams.dataEvent;
        
    	$scope.backtoevents = function(){
    		$state.go("app.events");
    	};

    	$scope.info = function(){
    		
    	};
    	
    	$scope.matches = function(){
            SendMatchesToWS.loadMatches($scope);
    	};
  });