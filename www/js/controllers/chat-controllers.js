angular.module('chat.controllers', ['starter'])

.controller('ChatCtrl', function($scope,ChatMessageService, $stateParams,$rootScope,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {
    console.log($rootScope.chatUsrData);

    heightClient = angular.element(document.querySelector('#chatView'))[0].offsetHeight;
    angular.element(document.querySelector('#msnBox')).css("top", (heightClient-100)+"px");
    

    $scope.chatNameUsr = $rootScope.chatUsrData.name;
    $rootScope.logset = new Array();

    console.log($rootScope.chatUsrData);
    console.log("lastmsg "+$rootScope.chatUsrData.lastMSG);
    //carrega dados
    if($rootScope.chatUsrData.lastMSG != undefined)
      ChatMessageService.addMSGtoList($rootScope.chatUsrData.lastMSG);


  	$scope.sendMessage = function(){
  		var scopo = this;
  		var msn = scopo.msnboxtext;

  		scopo.msnboxtext = "";

  		setTimeout(function(){
	  		ChatMessageService.sendMessageWS(scopo,msn,$rootScope.chatUsrData.idfb);
	  		
  		},100);


  	};
}).service('ChatMessageService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate) {
           this.sendMessageWS = function($scope,msg,idtosend){
           		
           		var postData = {
                  "sessfb" : $localStorage.token,
                  "sess_fb": $localStorage.token,
                  "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                  "ent_user_recever_fbid": idtosend ,
                  "ent_message" : msg,
                  

                };

                $http.get($localStorage.sendmessage,{params: postData}).then(function(resp) {
                	console.log(resp);
                });
           };
           //USAR QUANDO ESTIVER NO onNotificationGCM ou apns
           this.loadLegacyChat = function(idfbp,name,pic,lastmsg){
              delete $rootScope.chatUsrData;
              $rootScope.chatUsrData = {"idfb" : idfbp, "name" : name ,"pic" : pic, "lastMSG": lastmsg};
              $state.go('app.chat',{idfb : idfbp});
           };

           this.addMSGtoList = function(msg){
                if($rootScope.logset == undefined)
                  $rootScope.logset = new Array();
                
                $rootScope.logset.push(msg);
           }
           /*
            this.loadFriendList = function($scope){

              $ionicLoading.show({
                  template: 'Carregando contatos...'
              });
            
                setTimeout(function(){
                    var postData = {
                      "sessfb" : $localStorage.token,
                      "sess_fb": $localStorage.token,
                      "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                      
                     

                    };

                  
                    $http.get($localStorage.getprofilematches,{params: postData}).then(function(resp) {
                        console.log(resp);

                        var element = angular.element(document.querySelector('#friendlistload'));
                        


                        var templateUrl = $sce.getTrustedResourceUrl('templates/chat/friendlist.html');
                        
                        console.log(templateUrl);

                        $templateRequest(templateUrl).then(function(template) {
                            // template is the HTML template as a string
                           // console.log(template);
                            // Let's put it into an HTML element and parse any directives and expressions
                            // in the code. (Note: This is just an example, modifying the DOM from within
                            // a controller is considered bad style.)
                            if(resp.data.errNum == 50){
                              $scope.friendlist = resp.data.likes;
                            }

                            $compile(element.html(template).contents())($scope);

                        }, function(err) {
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            //alert("Não há matches.")
                           $ionicSideMenuDelegate.toggleRight();
                            
                            // An error has occurred
                        });

                        $ionicLoading.hide();
                    });
                    
                },100);
             
            };*/

      });
