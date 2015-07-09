angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function (SendMatchesToWS,$scope,parttyUtils,$rootScope,$ionicSideMenuDelegate,$localStorage,toastr) {
         
         heightClient = angular.element(document.querySelector('.menu-content.pane'))[0].offsetHeight;
         
         angular.element(document.querySelector('#viewport')).css("min-height", heightClient+"px");
         //angular.element(document.querySelector('#cardscontainer')).css("min-height", (heightClient-200)+"px");
         
        $ionicSideMenuDelegate.canDragContent(false);
        console.log($rootScope.matchesData);
        console.log($rootScope.eventData);
        



        $scope.cards = [];
        $scope.cardrest = 0;

        if($rootScope.matchesData.data.length > 0){
            //alert("@");
            angular.forEach($rootScope.matchesData.data, function(value, key) {
                if(value.id != $localStorage.usuarioData.ent_fbid)
                    $scope.cards.push(value);
            });

        }else{
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            alert("Não há matches.")
            $state.go("app.events");
        }
        
        $scope.cardrest = $rootScope.matchesData.data.length-1;
        
        $scope.clickLeft = function(){
            
           
                    index = ($scope.cardrest);
                    console.log(index);
                    $scope.cards[index].animateclass = 'moveleft';
                    $scope.cards[index].actionclick = 1;
                    //$scope.cards.splice(index, 1);
                    SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                        console.log('Chegou',resp);
                     });
                    $scope.cardrest--;
            if($scope.cardrest < 0){
                SendMatchesToWS.sendMatches($scope.cards,function(resp){console.log(resp);});
            }
               
        }

        $scope.clickRight = function(){
            
                     index = ($scope.cardrest);
                     console.log(index);
                     $scope.cards[index].animateclass = 'moveright';
                     $scope.cards[index].actionclick = 2;
                     //$scope.cards.splice(index, 1);  
                     $scope.cardrest--;

                     SendMatchesToWS.sendInvite($scope.cards[index],function(resp){
                        console.log('Chegou',resp);
                     });

                     
             if($scope.cardrest < 0){
                    SendMatchesToWS.sendMatches($scope.cards,function(resp){console.log(resp);});
               
             }         
        }

        
        

    }).service('SendMatchesToWS', function($localStorage,$http,$rootScope) {
            
           

            //envia o action para poder gerar o match !
            this.sendInvite = function(jsonOBJ,callback) { 
                    //console.log("sendMatches");
                    //console.log(jsonOBJ);
                    //this.prepareArray(arrayMatches);
                    paramsToSend = {
                        "ent_invitee_fbid" : jsonOBJ.id,
                        "ent_user_action" : jsonOBJ.actionclick,
                        "ent_user_fbid" : $localStorage.usuarioData.ent_fbid

                    };
                    
                    $http.get($localStorage.inviteaction,{params: paramsToSend}).success(function(resp) {
                            if($rootScope.invitedActionData == undefined)
                                $rootScope.invitedActionData = new Array();
                            
                            $rootScope.invitedActionData.push(resp);
                            callback(resp);
                    });
                    
            };

            this.sendMatches = function(arrayMatches,callback) { 

                    paramsToSend = {
                        "idevent" : $rootScope.eventData.id,
                        "ent_invitee_fbid" : $localStorage.usuarioData.ent_fbid,
                        "offset" : $rootScope.matchesData.offset,
                        "after" :$rootScope.matchesData.after,
                        "before" : $rootScope.matchesData.before

                    };


                    $registerMatches = new Array();
                    angular.forEach(arrayMatches, function(value, key) {
                        if(value.id != $localStorage.usuarioData.ent_fbid){
                            if(value.actionclick == 1)
                             paramsToSend["id_"+value.id] = 1;
                            if(value.actionclick == 2)
                             paramsToSend["id_"+value.id] = 0;
                        }
                    });

                    
                    //console.log($rootScope.invitedActionData);
                    //console.log($registerMatches);

                    $http.get($localStorage.registermatchespartty,{params: paramsToSend}).success(function(resp) {
                            callback(resp);
                    });

            };


            

             
            
    });