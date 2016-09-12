angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$state,GraphService,Evento) {
  
  //fluxo login -> main -> registration -> [events] -> matches
  $scope.items = new Array();
  $scope.showEvents = true;
  
  GraphService.getEventsFB().then(function(r){
      for(var i in r.data){
          var evt = r.data[i];
          //GraphService.getEventPic(evt.id);
          
          GraphService.addEvent(evt);
          evt.type = "item";
          
          $scope.items.push(evt);

          Evento.save(evt,function(r){
            //console.log(r);
          });

      }
      $scope.showEvents = false;
  });

  $scope.entraEvento = function(evt){
    $state.go('matches',{id_event : evt.id});

  }
  
});