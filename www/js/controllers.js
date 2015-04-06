angular.module('starter.controllers', ['sociogram.controllers','openfb','ngCordova'])
/*INJETAR LIB PELO ´[] e pelo functiob ()*/
.controller('AppCtrl', function($scope,$state, $ionicModal,$location, $timeout,OpenFB) {
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
    OpenFB.logout();
    $state.go('app.loggedout');
 
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
.controller('LoginFBCtrl', function($scope,$state,$location,OpenFB,$cordovaOauth) {
  
  /*
  if(!OpenFB.isAuth()){
      OpenFB.login('public_profile, email, user_birthday, user_relationship_details, user_events, user_photos, user_about_me');
  }else{
       $scope.tokenfbview = OpenFB.getSess();
       $state.go('app.main');
  }*/
  //USE OPENFB TO WEB AND OAUTH FOR DEVICES
  //openFB.init({ appId  : '574073299368611' });
  //openFB.login(function(response){
 //   alert(response);
 // }, {scope: 'email'});
 /// alert(openFB.getToken());
  
  //LOGIN PARA MOBILE E LOGIN PARA WEB

  if(openFB.isMob()){
      document.addEventListener("deviceready", function () {

      
         $cordovaOauth.facebook("574073299368611", ["email"]).then(function(result) {
                  // results
                   
                  $scope.tokenfbview = result.access_token;
                   alert("@loguei" + result.access_token);
                 //  $scope.$digest();
                  //$localStorage.accessToken = result.access_token;
                  $location.path("/main");
                  
                  
              }, function(error) {
                  // error
                

                  alert("loggedout");
                  $state.go('app.loggedout');
              });
      
    });
  }else{

    openFB.init({ appId  : '574073299368611' });

    openFB.login(function(response){
     alert(response);
    }, {scope: 'email'});
  }
   
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('MainCtrl', function($scope, $stateParams,OpenFB) {
    
    $scope.sess = OpenFB.getSess();

})


