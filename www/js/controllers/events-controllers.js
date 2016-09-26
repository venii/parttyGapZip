angular.module('events.controllers', ['starter'])
.controller('EventsCtrl', function ($q,$scope,$state,$ionicScrollDelegate,GraphService,Evento) {
  
  $scope.itemsPartty = new Array();
  $scope.items = new Array();
  
  $scope.showEvents = true;
  
  $scope.nextEventPaging = null;

  var eventoP = Evento.get().$promise;
  var meusEvtFbP = GraphService.getEventsFB();
  
  $q.all([eventoP,meusEvtFbP]).then(function(r){
      
      if(r[1].paging){
        $scope.nextEventPaging = r[1].paging;
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


  $scope.mostraSpinnerMaisEventos = false;
  $scope.checkScroll = function(){
   

    var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
    var maxScrollableDistanceFromTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

    if (currentTop >= maxScrollableDistanceFromTop)
    {

      $scope.mostraSpinnerMaisEventos = true;
      GraphService.getEventsFB($scope.nextEventPaging).then(function(r){
         console.log($scope.nextEventPaging)
         console.log(r)

         $scope.mostraSpinnerMaisEventos = false;
      });

    }
  }
  
});