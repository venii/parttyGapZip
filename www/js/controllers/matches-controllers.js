angular.module('matches.controllers', ['starter','cards-animation-matches.controllers'])

.controller('MatchesCtrl', function (
                        $scope,$state,$stateParams,
                        SendMatchesToWS,MatchService,UtilsService,GraphService) {

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
        
        $scope.info = function(){
            $scope.showMatchesInfo = true;
            
            GraphService.getEvent($stateParams.id_event).then(function(r){
              if(r.length > 0){
                $scope.eventinfoJSON = r[0];
                
                $scope.showMatchesInfo = false;
              }
            });
        }
        
        //função para carregar os matches do servidor do partty
        $scope.matches = function(){
            $scope.showMatches = true;
                
            //$scope.showMatches = false;
        };

        $scope.backtoevents = function(){
          $state.go("app.events");
        };
        
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


    	

  });