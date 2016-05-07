angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$stateParams,$state,
					EventService,LoginService,UtilsService) {
  
    //fluxo login -> main -> registration -> [events] -> matches
    //                                     
 

  //pega token do fb para usar graph  
  var token = LoginService.getToken();
  //pega primeiro evento
  EventService.getFirstEvent(token,function(resp){
      //se o token é invalido envia para o controllador de loggedout para deslogar e voltar ao login
      if(!EventService.validateTokenFetchEvents(resp)){
        $state.go('app.loggedout');
      }
      //caso contrio carrega os eventos e as referencias para pegar os proximos blocos
	    $scope.items = resp.data.data;
      $scope.nextpag = resp.data.next;
      $scope.prevpag = resp.data.previous;
  
  });


  //envia para o matches dos eventos selecionados
  $scope.clickGridEvents = function(item,index){
    //envia para o match do evento seleionado
  	if(item.name != undefined){
  		$state.go('app.matches',{ dataEvent : item});
 	  }
  };

  //funçao de carregar mais eventos por scroll
  $scope.checkScroll = function () {
   		//verifica se a lista tem mais referenciar para serem puxadas pelo rest do graphFB
   		if($scope.nextpag != null && EventService.isEndList()){
   		
        UtilsService.openDialogMsg('Carregando mais Eventos...');
          	
        if($scope.loadingscrollevents == undefined){
          var postData = {              
            "sessfb" : token,
            "next": $scope.nextpag
          };


          $scope.loadingscrollevents = true;
          //pega eventos da proxima pagina e carrega na lista de eventos
			    EventService.getEvents(postData,function(resp) {
  				  UtilsService.closeDialogMsg();
            
            //valida novamente o token do FB para poder usar o graph
  			    if(EventService.validateTokenFetchEvents(resp)){
                //adiciona eventos a lista atual
  			   			for ( dado in resp.data.data) {
  					      $scope.items.push(resp.data.data[dado]);
  					    }	

  			   			$scope.nextpag = resp.data.next;
  			   			$scope.prevpag = resp.data.previous;
  			   			$scope.loadingscrollevents = false;	
  			   			$scope.loadingscrollevents = undefined;
  			   	}
  			 
  			 });
			}
   	}
  };

}).controller('ControllerListEventsCtrl', function($scope) {
  //controlador da lista de eventos
 	$scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = true
});