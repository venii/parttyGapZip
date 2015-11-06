angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (
                $state,$stateParams,$scope,
                
                MatchService,SendMatchesToWS,LoginService,
                RegistrationService,MenuService) {
        
        MenuService.blockSideMenu(); 
        $scope.eventinfoJSON = $stateParams.dataEvent;

        
        
        $scope.cards = SendMatchesToWS.getCards();
        $scope.cardrest = $scope.cards.length;



        console.log('send',$scope);
        
        if(SendMatchesToWS.getCards().length > 0){
            
            angular.forEach($rootScope.matchesData.data, function(value, key) {
                if(value.id != $localStorage.usuarioData.ent_fbid)
                    $scope.cards.push(value);
            });

        }
        

        /*
        $scope.cardrest = $rootScope.matchesData.data.length-1;
        
        $scope.clickLeft = function(){
            
           
                    index = ($scope.cardrest);
                    console.log(index);
                    $scope.cards[index].animateclass = 'moveleft';
                    $scope.cards[index].actionclick = 1;
                    $scope.cards[index].ent_fbid = RegistrationService.getUserFbID();
                    $scope.cards[index].ent_id_event = '';
                    
                    //$scope.cards.splice(index, 1);
                    SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                        console.log('Chegou',resp);
                        if($scope.cardrest < 0){
                            SendMatchesToWS.sendMatches($scope.cards,$scope);
                        }
                     });
                    $scope.cardrest--;
            
               
        }

        $scope.clickRight = function(){
            
                     index = ($scope.cardrest);
                     
                     $scope.cards[index].animateclass = 'moveright';
                     $scope.cards[index].actionclick = 2;
                     $scope.cards.splice(index, 1);  
                     $scope.cardrest--;

                     SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                        console.log('Chegou',resp);
                        if($scope.cardrest < 0){
                            SendMatchesToWS.sendMatches($scope.cards,$scope);
                         }    
                     });

                     
                  
        }

        */
        

    })