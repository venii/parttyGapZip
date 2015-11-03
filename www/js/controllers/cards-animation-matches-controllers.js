angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (
                $state,SendMatchesToWS,$scope,
                $rootScope,$ionicSideMenuDelegate,
                $localStorage,toastr,$ionicViewService,
                MatchService,LoginService,RegistrationService) {
         
         heightClient = angular.element(document.querySelector('.menu-content.pane'))[0].offsetHeight;
         
         angular.element(document.querySelector('#viewport')).css("min-height", heightClient+"px");
         //angular.element(document.querySelector('#cardscontainer')).css("min-height", (heightClient-200)+"px");
         
        $ionicSideMenuDelegate.canDragContent(false);
        console.log("stateParms",$stateParms);           



        $scope.cards = [];
        $scope.cardrest = 0;

        if($rootScope.matchesData.data.length > 0){
            //alert("@");
            angular.forEach($rootScope.matchesData.data, function(value, key) {
                if(value.id != $localStorage.usuarioData.ent_fbid)
                    $scope.cards.push(value);
            });

        }
        
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

        
        

    })