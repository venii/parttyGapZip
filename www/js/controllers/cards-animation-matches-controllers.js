angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function ($state,SendMatchesToWS,$scope,parttyUtils,$rootScope,$ionicSideMenuDelegate,$localStorage,toastr,$ionicViewService) {
         
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
                        if($scope.cardrest < 0){
                            SendMatchesToWS.sendMatches($scope.cards,$scope);
                        }
                     });
                    $scope.cardrest--;
            
               
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
                        if($scope.cardrest < 0){
                            SendMatchesToWS.sendMatches($scope.cards,$scope);
                         }    
                     });

                     
                  
        }

        
        

    }).service('SendMatchesToWS',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest) {
            
           

            //envia o action para poder gerar o match !
            this.sendInvite = function(jsonOBJ,callback) { 
                    //console.log("sendMatches");
                    //console.log(jsonOBJ);
                    //this.prepareArray(arrayMatches);
                    paramsToSend = {
                        "ent_invitee_fbid" : jsonOBJ.id,
                        "ent_user_action" : jsonOBJ.actionclick,
                        "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                        "ent_id_event" : $rootScope.eventData.id,
                        "ent_nome_fb" : jsonOBJ.name,
                    };
                    
                    $http.get($localStorage.inviteaction,{params: paramsToSend}).success(function(resp) {
                            if($rootScope.invitedActionData == undefined)
                                $rootScope.invitedActionData = new Array();
                            
                            $rootScope.invitedActionData.push(resp);
                            callback(resp);
                    });
                    
            };

            this.sendMatches = function(arrayMatches,$scope) { 

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
                    
                    angularService = this;
                    $http.get($localStorage.registermatchespartty,{params: paramsToSend}).success(function(resp) {
                        

                        if($rootScope.invitedActionData != undefined){
                            
                            var matchFound = false;
                            angular.forEach($rootScope.invitedActionData, function(value, key) {
                                if(value.id != $localStorage.usuarioData.ent_fbid){
                                    //alert("##"+value.errNum);
                                    if(value.errNum == 55){
                                        matchFound = value;
                                        $ionicViewService.nextViewOptions({
                                          disableBack: true
                                        });
                                        //$state.go("app.newmatchesfound");
                                    }
                                }
                            });
                            delete $rootScope.invitedActionData;
                            
                            console.log('matchFound ',matchFound);

                            if(matchFound){
                                    delete matchFound;
                                    $rootScope.newMatchFoundData = matchFound;
                                    $ionicViewService.nextViewOptions({
                                      disableBack: true
                                    });
                                    alert("Voce recebeu um match.");
                                    $state.go("app.newmatchesfound");

                                
                            }else{
                                angularService.loadMatches($scope);
                            }
                            
                        }
                    });

                    

            };


            
            this.loadMatches = function($scope){

              $ionicLoading.show({
                  template: 'Procurando matches...'
              });
            
                setTimeout(function(){

                    var postData = {
                    "sessfb" : $localStorage.token,
                    "sess_fb": $localStorage.token,
                    "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                    
                    "idevent" : $rootScope.eventData.id

                    };

                    $http.get($localStorage.findmatchespartty,{params: postData}).then(function(resp) {
                            //console.log(resp);
                            //console.log(resp.data.data.length);
                            if(resp.data.data.length == 0){
                                $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                                
                                
                                alert("Não há matches.");
                                $state.go("app.events");
                               
                            }

                            $rootScope.matchesData = resp.data;
                            var element = angular.element(document.querySelector('#includeCards'));
                            


                            var templateUrl = $sce.getTrustedResourceUrl('templates/matches/matches_cards.html');
                            
                            console.log(templateUrl);

                            $templateRequest(templateUrl).then(function(template) {
                                // template is the HTML template as a string
                               // console.log(template);
                                // Let's put it into an HTML element and parse any directives and expressions
                                // in the code. (Note: This is just an example, modifying the DOM from within
                                // a controller is considered bad style.)
                                $compile(element.html(template).contents())($scope);
                            }, function(err) {
                                $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                                //alert("Não há matches.")
                                $state.go("app.events");
                                
                                // An error has occurred
                            });










                            $ionicLoading.hide();


                    });

                    
                },100);
             
            };
    });