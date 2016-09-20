angular.module('events.controllers', ['starter'])
.controller('EventsCtrl', function ($q,$scope,$state,GraphService,Evento) {
  
  $scope.itemsPartty = new Array();
  $scope.items = new Array();
  
  $scope.showEvents = true;
  
  var eventoP = Evento.get().$promise;
  var meusEvtFbP = GraphService.getEventsFB();
  
  $q.all([eventoP,meusEvtFbP]).then(function(r){
      for(var i in r[1].data){
          var evt = r[1].data[i];

          GraphService.addEvent(evt);          
          $scope.items.push(evt);
          Evento.save(evt);

      }

      for(var i in r[0].Eventos){
          var evt2 = r[0].Eventos[i];
          $scope.itemsPartty.push(evt2);
      }

      $scope.showEvents = false;

  });  

  $scope.entraEvento = function(evt){
    $state.go('matches',{id_event : evt.id});

  }
  
});