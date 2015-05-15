angular.module('starter.controllers', ['sociogram.controllers','openfb','ngCordova','ngStorage'])
/*INJETAR LIB PELO ´[] e pelo functiob ()*/
.controller('AppCtrl', function($scope,$state,$ionicSideMenuDelegate, $ionicModal,$location, $timeout,OpenFB,$ionicViewService,$localStorage) {

  // bind do menu $ionicSideMenuDelegat

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
.controller('MainCtrl', function($scope, $stateParams,OpenFB,$localStorage) {
    //console.log(device.platform);
    if(openFB.isMob()){
        alert("token");
       document.addEventListener("deviceready", function () {
            window.plugins.pushNotification.register(successHandler,errorHandler,
                  {
                    "senderID":"244606470402",
                      "ecb":"onNotificationGCM"});
       });
    }else{
       var pubnub = PUBNUB.init({
         publish_key: 'demo',
         subscribe_key: 'demo',
         uuid: 'littlerobertanthony48'
        });
        
        alert("sem token");

    }
    
    $scope.sess = $localStorage.token;

})


