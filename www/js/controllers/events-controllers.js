angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$stateParams,$state,LoginService,UtilsService,GraphService,Evento) {
  
  //fluxo login -> main -> registration -> [events] -> matches
  $scope.items = new Array();
  GraphService.getEventsFB().then(function(r){
      for(var i in r.data){
          var evt = r.data[i];
          
          GraphService.addEvent(evt);
          evt.type = "item";
          $scope.items.push(evt);

          Evento.save(evt,function(r){
            console.log(r);

          });

      }
  });

  $scope.entraEvento = function(id_fb){
    $state.go('matches',{id_event : id_fb});
  }
}).controller('ControllerListEventsCtrl', function($scope) {
  //controlador da lista de eventos
 	$scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = true
});