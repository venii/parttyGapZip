angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (
                        $scope,$state,$stateParams,
                        SendMatchesToWS,MatchService,UtilsService) {
  		/*

              //console.log(evt_id,evt);

              /*GraphService.getEventAttendingFB(evt_id).then(function(r2){
                console.log('r2',r2);

                for(var i2 in r2.attending.data){
                  var att = r2.attending.data[i2];
                  
                  console.log(r2.eventFb,att);
                  
                  GraphService.addAttendingToEvent(r2.eventFb,att); 
                }
              });**/
              
              //console.log(GraphService.getEvent(1308632732499261));
              //console.log(GraphService.removeEvent(1308632732499261));

        /*//calcular e set tamanho da tela , esconde topMenu
        MatchService.resizeHeight();    
        MatchService.hideTopMenu();
          
        $scope.eventinfoJSON = $state.params.dataEvent;
       
        //função para voltar para eventos
    	$scope.backtoevents = function(){
    		$state.go("app.events");
    	};

        //função de info (ainda nao implementada)
    	$scope.info = function(){
    		
    	};

    	//função para carregar os matches do servidor do partty
    	$scope.matches = function(){
            UtilsService.openDialogMsg('Procurando matches...');

            //retornar matches do servidor partty (processados por graph ou pelo sistema de cache)    
            SendMatchesToWS.loadMatches($scope,$scope.eventinfoJSON.id,function(resp){
                UtilsService.closeDialogMsg();
                    
                if(resp.error){
                    //se não tem matches envia para eventos novamente
                    alert("Não há matches");
                    $state.go('app.events');
                }

            });
    	};

        */
  });