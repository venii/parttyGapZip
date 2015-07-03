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

    	
    	
    	$scope.info = function(){
    		
    	}

    	
    	
    	$scope.matches = function(){
    		$ionicLoading.show({
		          template: 'Procurando matches...'
		      });
    		
            setTimeout(function(){

    			var postData = {
                "sessfb" : $localStorage.token,
			    "sess_fb": $localStorage.token,
			    "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
			    
			    "idevent" : $rootScope.eventData.id

			    };

    			$http.get($localStorage.findmatchespartty,{params: postData}).then(function(resp) {
						console.log(resp);
						$ionicLoading.hide();
				  });

    			
    		},100);
    		
    	}


    	

    
    	
  });