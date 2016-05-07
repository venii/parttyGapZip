angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (
                $state,$stateParams,$scope,
                
                MatchService,SendMatchesToWS,LoginService,
                RegistrationService,MenuService,UtilsService) {
        
        //controlador dos cards
        //like dislike

        //bloqueia sidemenu 
        MenuService.blockSideMenu(); 

        //carrega os cards com os matches vindos da api
        var cards = SendMatchesToWS.getCards();
        $scope.cards = cards;
        $scope.cardrest = cards.length-1;
        $scope.eventinfoJSON = $stateParams.dataEvent;


        //função dislike
        $scope.clickLeft = function(){       
            index = $scope.cardrest;
            
            $scope.cards[index]['animateclass'] = 'moveleft';
            $scope.cards[index]['actionclick'] = 1;
            $scope.cards[index]['ent_fbid'] = RegistrationService.getUserFbID();
            $scope.cards[index]['ent_id_event'] = '';

            //envia invite da pessoa (se o invite do usuario for correspondido pelo invite de outro usuario)
            //o sistema da update no match para match_found

            SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                if($scope.cardrest < 0){
                    //envia todos os matches 
                    SendMatchesToWS.sendMatches($scope.cards,$scope.eventinfoJSON,function(resp){
            
                        //ERROR CARREGA MAIS MATCHES
                        if(resp.error){
                            UtilsService.openDialogMsg('Procurando matches...');
                            //se não ha mais matches volta paara eventos
                            SendMatchesToWS.loadMatches($scope.parent,function(resp){
                                UtilsService.closeDialogMsg();
                                    
                                if(resp.error){
                                    alert("Não há matches");
                                    $state.go('app.events');
                                }

                            });
                        }else{
                            //CARREGA MATCH
                        }
                            
                    });
                }
             });
            $scope.cardrest--;
        }

        //função like
        $scope.clickRight = function(){    
            index = $scope.cardrest;
            
            $scope.cards[index]['animateclass'] = 'moveright';
            $scope.cards[index]['actionclick'] = 2;
            $scope.cards[index]['ent_fbid'] = RegistrationService.getUserFbID();
            $scope.cards[index]['ent_id_event'] = '';
            
            //envia invite da pessoa (se o invite do usuario for correspondido pelo invite de outro usuario)
            //o sistema da update no match para match_found

            SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
               if($scope.cardrest < 0){
                  SendMatchesToWS.sendMatches($scope.cards,$scope.eventinfoJSON,function(resp){
                    //PROCESSA GO DEPOIS DE ENVIAR MATCHES
                    
                    //ERROR CARREGA MAIS MATCHES
                    if(resp.error){
                            UtilsService.openDialogMsg('Procurando matches...');
                            //envia todos os matches 
            
                            SendMatchesToWS.loadMatches($scope.parent,function(resp){
                                UtilsService.closeDialogMsg();
                                    
                                if(resp.error){
                                    alert("Não há matches");
                                    $state.go('app.events');
                                }

                            });
                    }else{
                        //CARREGA MATCH
                    }

                  });
               }    
            });
            $scope.cardrest--;
                  
        }

})