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
                  //console.log(evt_id,evt);

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


        /*SQLService.findById('fb_events','190568661357844').then(function(r){
          var obj = r[0];
          console.log(obj);
          
          obj.descricao = "tiririca";

          SQLService.updateIntoTable('fb_events',obj,obj.id_fb_events);

          console.log(obj);
          
        });*/
        /*
          /*
        console.log(response);
        
        Perfil.update(response, function(r) {
                        console.log('update',r);
                        //data saved. do something here.
                      });
          */
        /*
        SQLService.insertIntoTable('fb_events',['id_fb_events','nome','data_evento']);
        SQLService.insertIntoTable('fb_events',['id_fb_events2','nome','data_evento']);
        SQLService.insertIntoTable('fb_events',['id_fb_events3','nome','data_evento']);


        SQLService.findById('fb_events','id_fb_events2').then(function(r){
          var obj = r[0];
          console.log(obj);
          
          obj.nome = "tiririca";

          SQLService.updateIntoTable('fb_events',obj,obj.id_fb_events);

          console.log(obj);
          
        });
        */
        /*pegar os eventos e carregar na tela
          verificar directiva
        */
        

  });