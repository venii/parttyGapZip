angular.module('matches.controllers', ['starter'])

.controller('MatchesCtrl', function ($ionicViewService,$templateRequest, $sce, $compile,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate) {
  		$ionicViewService.nextViewOptions({
          disableBack: true
        });
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");

    
        heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
        angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");


            

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
						//console.log(resp);
                        $rootScope.matchesData = resp.data;
						var element = angular.element(document.querySelector('#includeCards'));
                        


                        var templateUrl = $sce.getTrustedResourceUrl('templates/matches/matches_cards.html');
                        
                        console.log(templateUrl);

                        $templateRequest(templateUrl).then(function(template) {
                            // template is the HTML template as a string
                           // console.log(template);
                            // Let's put it into an HTML element and parse any directives and expressions
                            // in the code. (Note: This is just an example, modifying the DOM from within
                            // a controller is considered bad style.)
                            $compile(element.html(template).contents())($scope);
                        }, function(err) {
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            //alert("Não há matches.")
                            $state.go("app.events");
                            console.log(err);
                            // An error has occurred
                        });










                        $ionicLoading.hide();


				});

    			
    		},100);
    		
    	}


    	

    
    	
  });