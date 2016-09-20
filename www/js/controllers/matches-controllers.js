angular.module('matches.controllers', ['starter'])


.controller('MatchesCtrl', function ($scope,$state,$stateParams,$ionicPopup,$localStorage,GraphService,SQLService,Preferencias,Perfil,Attending) {
       
        $scope.maxPreMatchesDone = 10;
        $scope.eventinfoJSON = null;
        $scope.ideventfb = 0;

        var data = {};
        data.id = $localStorage.fbid;
        
        Perfil.get(data,function(r){

          var data = {};
          data.id_fb_events    = $stateParams.id_event;
          data.id_fb_attending = $localStorage.fbid;
          data.nome            = r.Perfil.name;
          data.pic             = r.Perfil.imgPIC1;
          data.iam             = $localStorage.iam;
          
          Attending.update(data);

        });

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
              

              /*GraphService.getEventAttendingFB($scope.ideventfb).then(function(r){

                  console.log(r);
                  for(var i in r.attending.data){
                    
                    var attendingEvent = r.attending.data[i];
                    attendingEvent.eventFb = r.eventFb;
                    
                    GraphService.addAttendingEvent(attendingEvent).then(function(rAttending){
                      if(rAttending){
                        GraphService.updateEvent($scope.eventinfoJSON);
                      }
                    });
                  }
                  
              });

              $scope.cards = r.attending.data;*/
              $scope.getAttendingFromApi();


            }else{ 
              /*Se for maior carrega os attending da API (usuarios realmente ativos) */ 
              //$scope.cards = r.attending;
            }

            $scope.showMatches = false;
        };

        $scope.getAttendingFromApi = function(){
            var data = {};
            data.id = $localStorage.fbid;

            Preferencias.get(data,function(r){
              if(r.Mensagem != "NENHUM_REGISTRO_ENCONTRADO"){
                $scope.iam = r.Preferencias.iam;
                if(r.Preferencias.lookingfor !== undefined){
                  $scope.lookingfor = r.Preferencias.lookingfor;
                }

                var data = {};
                //homen
                data.lookingfor = new Array;
                if($scope.lookingfor[0].checked){
                  data.lookingfor.push("man");
                }
                //mulher
                if($scope.lookingfor[1].checked){
                  data.lookingfor.push("woman"); 
                }

                if(!$scope.lookingfor[0].checked && !$scope.lookingfor[1].checked){
                  $ionicPopup.show({
                      title:'Atenção',
                      template:'Selecione um genero em configurações.',
                       buttons: [
                                  {text : 'Ok', onTap: function(){$state.go("app.configurations")}},
                                ]
                  });
                }

                data.fbid       = $localStorage.fbid;
                data.id_event   = $stateParams.id_event;
                
                Attending.get(data,function(r2){
                  if(r2.Mensagem == "NENHUM_REGISTRO_ENCONTRADO"){
                    $ionicPopup.show({
                      title:'Atenção',
                      template:'Não há pessoas no momento,tente novamente.',
                       buttons: [
                                  {text : 'Voltar a info', onTap: function(){$scope.enterInInfo();}},
                                  {text : 'Voltar aos eventos' , onTap: function(){$state.go("app.events")}}
                                ]
                    });
                  }else{
                    /*registra no graphsql*/
                    var attending = r2.Attending;
              
                    $scope.startCards(attending);
                  }
                });

              }
            });
            
        }


        $scope.backtoevents = function(){
          $state.go("app.events");
        };


        $scope.enterInInfo = function(){
           $scope.info_index  = true;
           $scope.match_index = false;
           $scope.info();
        }

        $scope.enterInMatches = function(){
           $scope.info_index  = false;
           $scope.match_index = true;
           $scope.matches();
        }

        $scope.startCards = function(cards){
          $scope.$broadcast("startCards",{cards:cards});
          
        }

        $scope.enterInInfo();
        

  })

  .controller('MatchesCardsCtrl', function ($q,$scope,$state,$ionicPopup,$stateParams,$localStorage,MatchService,Matches) {
      //$scope.eventinfoJSON.pre_matches_done += 1;
      $scope.$on('startCards', function(event, response) { 
         $scope.init(response.cards);
        
      });
      
      $scope.init = function(cards){
        $scope.cards = cards;
    
        $scope.cardCounter = cards.length;
        $scope.cardDataArray = cards.slice(0);
        $scope.swypedCard = null;
      }

      $scope.cardsControl = {};

      $scope.exposeSwypedCard = function() {
        $scope.cardCounter -= 1;
        if ($scope.cardCounter === 0){
          $scope.deckIsEmpty = true;

          /*procura se tem novos matches*/
          var dataNewMatches      = {};
          dataNewMatches.fbid     = $localStorage.fbid;
          dataNewMatches.id_event = $stateParams.id_event;;

          MatchService.getNewMatches(dataNewMatches).then(function(r){
            console.log('r',r);
            if(r.Mensagem == "RETORNADO"){
                $localStorage.id_event   = dataNewMatches.id_event;
                $localStorage.newMatches = r.Matches;
                
                $state.go("matchesfound");
                return;
            }
            
            $scope.showEndList();

          });
 
        }

        $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];
      }

      $scope.showEndList = function(){
            $ionicPopup.show({
              title:'Atenção',
              template:'Não há pessoas no momento,tente novamente.',
               buttons: [
                          {text : 'Voltar a info', onTap: function(){$scope.enterInInfo();}},
                          {text : 'Voltar aos eventos' , onTap: function(){$state.go("app.events")}}
                        ]
            });
      }

      $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
      };

      $scope.yesClick = function() {
        $scope.cardsControl.swipeRight();
      };
      
      $scope.noClick = function() {
        $scope.cardsControl.swipeLeft();
      };
      
      $scope.cardSwipedLeft = function(index) {
        $scope.addToMatches($scope.cards[index],false).then(function(){
            $scope.exposeSwypedCard();
        });
      };
      
      $scope.cardSwipedRight = function(index) {
        
        $scope.addToMatches($scope.cards[index],true).then(function(){
            $scope.exposeSwypedCard();
        });
      };  
    
      $scope.addToMatches = function(obj,like){
        var defer = $q.defer();
        var match = {};

        match.id_match_1 = $localStorage.fbid;
        match.id_match_2 = obj.id_fb_attending;
        match.id_event   = $stateParams.id_event;
        match.like       = like;

        return Matches.update(match).$promise;
      }
  });