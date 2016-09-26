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
    //console.log($scope.nextEventPaging);
    if($scope.nextEventPaging != null){
      //console.log($scope.nextEventPaging);

      var pos = $ionicScrollDelegate.getScrollPosition();
      $ionicScrollDelegate.scrollTo(pos.left, pos.top-5);

      $timeout(function(){ 
        $http.get($scope.nextEventPaging+"&limit=5").then(function(r){
           
           console.log(r.data);

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
      },100,true);
    }
    
  }
  
});