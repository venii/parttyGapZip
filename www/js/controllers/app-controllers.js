angular.module('app.controllers', ['starter'])

.controller('AppCtrl', function(FriendsService,$cordovaNetwork,$scope,$state,$rootScope,$ionicSideMenuDelegate,$ionicViewService, $ionicModal,$location, $timeout,OpenFB,$ionicViewService,$localStorage,$stateParams) {

  // bind do menu $ionicSideMenuDelegat

  //NAO CARREGA O MENU EM CERTAS PAGINAS
 
 
  //$localStorage.httpserver = 'http://parttyappnoip.ddns.net';
  $localStorage.httpserver = 'http://parttyappnoip.ddns.net';
  
  $localStorage.restaddress = $localStorage.httpserver+'/partty/servercode/ws/process.php/';


  //var constants
  $localStorage.signup = $localStorage.restaddress + 'login';
  $localStorage.getfbidbysess = $localStorage.restaddress + 'getfbidbysess';
  $localStorage.updatedob = $localStorage.restaddress + 'updatedob';
  $localStorage.geteventsfb = $localStorage.restaddress + 'geteventsfb';
  $localStorage.getpreferences = $localStorage.restaddress + 'getPreferences';
  $localStorage.updatepreferences = $localStorage.restaddress + 'updatePreferences';
  $localStorage.findmatchespartty = $localStorage.restaddress + 'findMatchespartty';
  $localStorage.inviteaction = $localStorage.restaddress + 'inviteAction';
  $localStorage.registermatchespartty = $localStorage.restaddress + 'registerMatchespartty';
  $localStorage.updatedevicedetails = $localStorage.restaddress + '_updateDeviceDetails';
  $localStorage.getprofilematches = $localStorage.restaddress + 'getProfileMatches';
  $localStorage.sendmessage = $localStorage.restaddress + 'sendMessage';
  $localStorage.getprofile = $localStorage.restaddress + 'getProfile';
  $localStorage.editprofile = $localStorage.restaddress + 'editProfile';
  $localStorage.upload_user_image = $localStorage.restaddress + 'upload_user_image';
  $localStorage.uploadchunk = $localStorage.restaddress + 'uploadChunk';

  // listen for Online event
     // listen for Online event
  $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
    var onlineState = networkState;
    //alert("@@@ON");
  })

  // listen for Offline event
  $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
    var offlineState = networkState;
    alert("Sem acesso a internet");
    ionic.Platform.exitApp();
  })
  
  $ionicViewService.nextViewOptions({
    disableBack: false
  });
  
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.toggleLeftSideMenu = function() {
    if($localStorage.token != undefined)
      $ionicSideMenuDelegate.toggleLeft();
    else
      alert("É necessario autenticar antes de utilizar");
  };

  $scope.toggleRightSideMenu = function() {
    if($localStorage.token != undefined){
      /*CARREGAR CONTATOS NESSA LINHA 1*/


      FriendsService.loadFriendList($scope);
      $ionicSideMenuDelegate.toggleRight();

    }else
      alert("É necessario autenticar antes de utilizar");
  };

  $scope.logout = function() {
    //disabilita history back e deleta a var de token
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    
    $state.go("app.loggedout");
    
 
  };

  $scope.configurations = function() {
    
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    
    $state.go("app.configurations");
    
  };

  $scope.events = function() {
    
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    
    $state.go("app.events");
    
  };

  $scope.profile = function() {
    
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    
    $state.go("app.profile");
    
  };



  $scope.loadchat = function(idfb,name,pic){
      $ionicViewService.nextViewOptions({
        disableBack: true
      });



      delete $rootScope.chatUsrData;
      $rootScope.chatUsrData = {"idfb" : idfb, "name" : name ,"pic" : pic};
      
      $state.go("app.chat",{"idfb" : idfb});
      
  };
  
}).service('FriendsService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate,ChatMessageService) {
           
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
                             
                              angular.forEach($scope.friendlist, function(value, key) {
                                
                                console.log('friendlist: ' + value.fbId);
                                
                                ChatMessageService.getLastMsg(value.fbId,1,function(xhr){
                                  //alert(xhr[0].msg);
                                  console.log(xhr);
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
                            //alert("Não há matches.")
                           $ionicSideMenuDelegate.toggleRight();
                            
                            // An error has occurred
                        });

                        $ionicLoading.hide();
                    });
                    
                },100);
             
            };

      });