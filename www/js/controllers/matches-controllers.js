angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (
                        $scope,$state,$stateParams,
                        SendMatchesToWS,MatchService,UtilsService) {
  		
        //calcular e set tamanho da tela , esconde topMenu
        MatchService.resizeHeight();    
        MatchService.hideTopMenu();
        
        $scope.eventinfoJSON = $stateParams.dataEvent;
        
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
            SendMatchesToWS.loadMatches($scope,function(resp){
                UtilsService.closeDialogMsg();
                    
                if(resp.error){
                    //se não tem matches envia para eventos novamente
                    alert("Não há matches");
                    $state.go('app.events');
                }

            });
    	};

        
  });