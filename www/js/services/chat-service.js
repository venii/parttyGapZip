angular.module('app.chat-service', ['starter','app.utils-service','app.login-service'])
.service('FriendsService',function($sce,$compile,
                                    $localStorage,$ionicViewService,
                                    $http,$rootScope,$state,
                                    $ionicLoading,$templateRequest,
                                    $ionicSideMenuDelegate,ChatMessageService) {
           
            this.loadFriendList = function($scope){

              $ionicLoading.show({
                  template: 'Carregando contatos...'
              });
            
              setTimeout(function(){
                  var postData = {
                    "sessfb" : $localStorage.token,
                    "sess_fb": $localStorage.token,
                    "ent_user_fbid": $localStorage.usuarioData.ent_fbid
                  };

                  $http.get($localStorage.getprofilematches,{params: postData}).then(function(resp) {
                  
                        var element = angular.element(document.querySelector('#friendlistload'));
                        var templateUrl = $sce.getTrustedResourceUrl('templates/chat/friendlist.html');
                  
                        $templateRequest(templateUrl).then(function(template) {
                  
                            if(resp.data.errNum == 50){
                              $scope.friendlist = resp.data.likes;
                             
                              angular.forEach($scope.friendlist, function(value, key) {
                              
                                ChatMessageService.getLastMsg(value.fbId,1,function(xhr){
                                  $scope.$apply(function(){
                                    value.lastmsgloaded = xhr[0].msg;
                                  });
                                });
                              });

                            }

                            $compile(element.html(template).contents())($scope);
                        }, function(err) {
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            
                            $ionicSideMenuDelegate.toggleRight();
                        
                        });

                        $ionicLoading.hide();
                    });
                    
                },100);
             
            };

      });