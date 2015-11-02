angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (SendMatchesToWS,$stateParams,
                        $ionicViewService,$templateRequest, 
                        $sce, $compile,$rootScope,$scope,
                        $localStorage,$http,$ionicScrollDelegate,
                        $ionicLoading,$state,$stateParams,
                        $ionicSideMenuDelegate,SendMatchesToWS) {
  		

        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");

    
        heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
        angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");


                    

        
        $scope.eventinfoJSON = $stateParams.dataEvent;

        
    	$scope.backtoevents = function(){

    		$state.go("app.events");
    	};

    	
    	
    	$scope.info = function(){
    		
    	}

    	
    	
    	$scope.matches = function(){

            SendMatchesToWS.loadMatches($scope);
            
    	}
        

    	

    
    	
  });