angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$stateParams,$state,
					LoginService,UtilsService,GraphService) {
  
  //fluxo login -> main -> registration -> [events] -> matches
  GraphService.getEventsFB().then(function(r){
      for(var i in r.data){
          var evt = r.data[i];
          evt_id = evt.id;
    
          

          
          GraphService.addEvent(evt);
          
          console.log(evt_id,evt);

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

      }
  });
}).controller('ControllerListEventsCtrl', function($scope) {
  //controlador da lista de eventos
 	$scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = true
});