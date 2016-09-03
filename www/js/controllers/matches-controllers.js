angular.module('matches.controllers', ['starter'])

.controller('MatchesCtrl', function ($scope,$state,$stateParams,GraphService,SQLService) {
        
        $scope.maxPreMatchesDone = 10;

        $scope.eventinfoJSON = null;
        $scope.ideventfb = 0;

        $scope.info = function(){
            $scope.showMatchesInfo = true;
          
            GraphService.getEvent($stateParams.id_event).then(function(r){
              if(r.length > 0){
                $scope.eventinfoJSON = r[0];
                $scope.ideventfb = r[0].id_fb_events;

                $scope.showMatchesInfo = false;
              }
            });
        }
        
        //função para carregar os matches do servidor do partty
        $scope.matches = function(){
            $scope.showMatches = true;
            
            if($scope.eventinfoJSON.pre_matches_done == null){
              $scope.eventinfoJSON.pre_matches_done = 0;
              GraphService.updateEvent($scope.eventinfoJSON);
            }

            
            if($scope.eventinfoJSON.pre_matches_done <= $scope.maxPreMatchesDone){
              /*Se for menor carrega os maxPreMatchesDone vindo do graph */
              
              GraphService.getEventAttendingFB($scope.ideventfb).then(function(r){
                  console.log(r);
                  for(var i in r.attending.data){
                    
                    var attendingEvent = r.attending.data[i];
                    attendingEvent.eventFb = r.eventFb;
                    
                    GraphService.addAttendingEvent(attendingEvent).then(function(rAttending){
                      if(rAttending){
                        $scope.eventinfoJSON.pre_matches_done += 1;
                        GraphService.updateEvent($scope.eventinfoJSON);
                      }
                    });
                  }
                  
              });

              

            }else{ 
              /*Se for maior carrega os attending da API (usuarios realmente ativos) */ 

            }

            $scope.showMatches = false;
        };

        $scope.backtoevents = function(){
          $state.go("app.events");
        };
  }).controller('MatchesCardsCtrl', function ($scope,$state,$stateParams,MatchService) {

  });