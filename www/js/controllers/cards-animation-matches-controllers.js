angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (
                $state,$stateParams,$scope,
                
                MatchService,SendMatchesToWS,LoginService,
                RegistrationService,MenuService) {
        
        MenuService.blockSideMenu(); 
      
        var cards = SendMatchesToWS.getCards();
        $scope.cards = cards;
        $scope.cardrest = cards.length;
        $scope.eventinfoJSON = $stateParams.dataEvent;

        $scope.clickLeft = function(){       
            index = ($scope.cardrest);
            
            $scope.cards[index].animateclass = 'moveleft';
            $scope.cards[index].actionclick = 1;
            $scope.cards[index].ent_fbid = RegistrationService.getUserFbID();
            $scope.cards[index].ent_id_event = '';
            
            SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
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
               if($scope.cardrest < 0){
                  SendMatchesToWS.sendMatches($scope.cards,$scope);
               }    
            });                  
        }

})