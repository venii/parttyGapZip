angular.module('events.controllers', ['starter'])
.controller('EventsCtrl', function ($q,$scope,$state,$http,$timeout,$ionicScrollDelegate,GraphService,Evento) {
  
  $scope.itemsPartty = new Array();
  $scope.items = new Array();
  
  $scope.showEvents = true;
  
  $scope.nextEventPaging = null;

  var eventoP = Evento.get().$promise;
  var meusEvtFbP = GraphService.getEventsFB();
  
  $q.all([eventoP,meusEvtFbP]).then(function(r){
      
      if(r[1].paging){
        $scope.nextEventPaging = r[1].paging.next;
      }

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

  $scope.checkScroll = function(){
    
    if($scope.nextEventPaging != null){
      //console.log($scope.nextEventPaging);

        $http.get($scope.nextEventPaging+"&limit=5").then(function(r){
           
           
           if(r.data.paging.next !== undefined){
             for(var i in r.data.data){
              $scope.items.push(r.data.data[i]);
             }
             $scope.nextEventPaging = r.data.paging.next;
           }else{
             $scope.nextEventPaging = null;
           }
           
           $scope.$broadcast('scroll.infiniteScrollComplete');
           
        });
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    
  }
  
});