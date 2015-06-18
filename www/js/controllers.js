angular.module('starter.controllers', ['ionic','ui.bootstrap','configurations.controllers','modal.controllers','sociogram.controllers','openfb','ngCordova','ngStorage','parttyutils'])
/*INJETAR LIB PELO ´[] e pelo functiob ()*/
.controller('AppCtrl', function($scope,$state,$ionicSideMenuDelegate, $ionicModal,$location, $timeout,OpenFB,$ionicViewService,$localStorage) {

  // bind do menu $ionicSideMenuDelegat
  
  $localStorage.httpserver = 'http://parttyappnoip.ddns.net';
  $localStorage.restaddress = $localStorage.httpserver+'/partty/servercode/ws/process.php/';


  //var constants
  $localStorage.signup = $localStorage.restaddress + 'login';
  $localStorage.getfbidbysess = $localStorage.restaddress + 'getfbidbysess';
  $localStorage.updatedob = $localStorage.restaddress + 'updatedob';


  $ionicViewService.nextViewOptions({
    disableBack: true
  });
  

  $scope.toggleLeftSideMenu = function() {
    if($localStorage.token != undefined)
      $ionicSideMenuDelegate.toggleLeft();
    else
      alert("É necessario autenticar antes de utilizar");
  };

  $scope.toggleRightSideMenu = function() {
    if($localStorage.token != undefined)
      /*CARREGAR CONTATOS NESSA LINHA 1*/

      $ionicSideMenuDelegate.toggleRight();

    else
      alert("É necessario autenticar antes de utilizar");
  };


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();

  };

  $scope.logout = function() {
    //disabilita history back e deleta a var de token
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    delete $localStorage.token;
    OpenFB.logout();
    $location.path("/loggedout");
    
 
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
//CONTROLLER PADRAO SETADO POR OTHERWISE
.controller('LoginFBCtrl', function($scope,$state,$location,$cordovaOauth,$localStorage,$ionicViewService) {
  //remove o history back quando usa GO() !
  $ionicViewService.nextViewOptions({
    disableBack: true
  });
  
  $scope.loginf = function(){
      
      $ionicViewService.nextViewOptions({
        disableBack: true
      });
      //alert("@0");
       if(openFB.isMob()){
        //alert("@1");
           document.addEventListener("deviceready", function () {
             if($localStorage.token == undefined){
                  //alert("@2");
                   $cordovaOauth.facebook("574073299368611", ["email"]).then(function(result) {
                              // results
                               //alert("@");
                              $scope.tokenfbview = result.access_token;
                              $localStorage.token = result.access_token;
                              //console.log(result);
                             
                               $state.go('app.main');
                              //$location.path("/main");
                              
                              
                          }, function(error) {
                             // alert("#");
                              $location.path("/main");
                              $state.go('app.loggedout');
                          });
              }else{
                  //alert("@3 "+$localStorage.token);
                  $location.path("/main");
                  $state.go('app.main');
              }
          
            });
         }else{
              
             if($localStorage.token == undefined){

                  openFB.init({ appId  : '574073299368611' });
                  

                  openFB.login(function(response){
                    
                    $scope.tokenfbview = response.authResponse.token;
                    $localStorage.token = response.authResponse.token;
                    $state.go('app.main');

                  }, {scope: 'email'});
                
              }else{
                   $scope.tokenfbview = openFB.getToken();
                   $state.go('app.main');
              }

         }
  };


  //alert($localStorage.token);
  //REDIR PARA MAIN SE TIVER SESSION
  if($localStorage.token != undefined){
     $state.go('app.main');
  }
 
   
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('RegistrationCtrl', function($scope, $stateParams,$modal,$localStorage,$ionicLoading,$http,parttyUtils,$ionicViewService,$state,$cordovaDatePicker) {
      $ionicLoading.hide();
      $scope.devicetoken = $localStorage.devicetoken;

      $ionicLoading.show({
          template: 'Procurando por usuario...'
      });

      //VALIDA SESSAO PARA PODER USAR
    




      var postData = {
                
                "sess_fb": $localStorage.token
              };

        //PEGA INFORMAÇOES NO WS DE USUARIO FACEBOOK
        $http.get($localStorage.getfbidbysess,{params: postData}).then(function(resp) {
            console.log("GET: "+$localStorage.getfbidbysess);
            console.log(resp);
                //alert(resp.data.error);
                if(resp.data.error || !resp.data.usuario){
                  alert("RETORNO no session getfbidbysess ");
                  $ionicLoading.hide();

                  
                  $ionicViewService.nextViewOptions({
                      disableBack: true
                    });

                  openFB.logout();
                  $localStorage.token = undefined;
                  $state.go('app.login');

                  return ;
                }
                //parttyUtils.logPartty(resp);
                /*
                
                  var postData = {
                        "ent_first_name" : 'testeIONIC',
                        "ent_sex" : 1,
                        "ent_device_type" : 1,
                        "ent_push_token" : $localStorage.devicetoken,
                        "ent_auth_type" : 1,
                        "ent_fbid": $localStorage.token};
                */

                

                var postData = {
                        "ent_first_name" : resp.data.usuario.name,
                        "ent_sex" : (resp.data.usuario.gender == "male" ? 1 : 2),
                        "ent_device_type" : 1,
                        "ent_push_token" : $localStorage.devicetoken,
                        "ent_auth_type" : 1,
                        "ent_fbid": resp.data.usuario.id
                      };

                $localStorage.usuarioData = postData;
                //SE EXISTIR LOGIN AUTHENTICA
                //SE NAO CRIA NOVO USUARIO
                $scope.idfbview = resp.data.usuario.id;
                $scope.namefb = resp.data.usuario.name;
                
                $http.get($localStorage.restaddress+'login',{params: postData}).then(function(resp) {

                    console.log('Success', resp);
                    parttyUtils.logPartty(resp);


                    $localStorage.usuarioData.age = resp.data.age;
                    //newuser true = setbirthday
                    //override modal classcss
                     if(resp.data.newuser){
                          var modalInstance = $modal.open({
                                  animation: $scope.animationsEnabled,
                                   templateUrl: 'templates/modal/main.html',
                                   controller: 'ModalDobCtrl',
                                   scope: $scope,
                                   windowClass: "app-modal-window",
                                   backdrop : 'static'
                           });

                           
                        
                     }else{
                        $ionicViewService.nextViewOptions({
                          disableBack: true
                        });
                        
                        $state.go('app.configurations');
                     }
                

                    $ionicLoading.hide();
                  }, function(err) {
                    console.error('ERR', err);
                    // err.status will contain the status code
                    $ionicLoading.hide();
                });


          }, function(err) {
            console.error('ERR', err);
            alert(err);
            // err.status will contain the status code
            $ionicLoading.hide();
          });
       


      
      //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      


})
.controller('MainCtrl', function($scope, $stateParams,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {
    //console.log(device.platform);
    
    //parttyUtils.logPartty(window.plugins.pushNotification);
   // console.log(ProgressIndicator);
    //alert("@");
    //alert(openFB.isMob());
    if(openFB.isMob()){
        
        $ionicLoading.show({
          template: 'Carregando servidor de mensagem ...'
        });
        
        alert("loading pushNotification.register "+$scope.isLoadedMain);
        //$cordovaProgress.showSimpleWithLabel(true, "Loading data ...");
        //alert($scope.isLoadedMain == undefined);
       // window.plugins.pushNotification
       
          alert("isLoadedMain true");
          
       document.addEventListener("deviceready", function () {
            alert("ready pushNotification.register ");
            //$scope.isLoadedMain = true;
            $scope.isLoadedMain = true;
            window.plugins.pushNotification.register(successHandler,errorHandler,
                  {"senderID":"244606470402", "ecb":"onNotificationGCM"});

           // alert("ready end pushNotification.register ");

       });
       // alert("$scope.isLoadedMain: "+$scope.isLoadedMain);
       if($scope.isLoadedMain == undefined){
        //alert("::");
        $ionicViewService.nextViewOptions({
          disableBack: true
        });
        $state.go('app.registration');
       }
      
    }else{
        //alert("@@@");
        $ionicLoading.show({
          template: 'Carregando servidor de mensagem (web) ...'
        });

        $ionicViewService.nextViewOptions({
          disableBack: true
        });





        $localStorage.devicetoken = 'web';
        $state.go('app.registration');
       /*var pubnub = PUBNUB.init({
         publish_key: 'demo',
         subscribe_key: 'demo',
         uuid: 'littlerobertanthony48'
        });
        
        alert("sem token");
      */
    }
    
    $scope.sess = $localStorage.token;

}).controller('ChatCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  /*
  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });
  
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    // Your register code from before
  };*/

// Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
         console.log(notification);
        return true;
      }
    });
  };




})


