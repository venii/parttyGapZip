angular.module('app.controllers', ['starter'])

.controller('AppCtrl', function($scope,$state,$ionicSideMenuDelegate, $ionicModal,$location, $timeout,OpenFB,$ionicViewService,$localStorage) {

  // bind do menu $ionicSideMenuDelegat
  
  $localStorage.httpserver = 'http://parttyappnoip.ddns.net';
  $localStorage.restaddress = $localStorage.httpserver+'/partty/servercode/ws/process.php/';


  //var constants
  $localStorage.signup = $localStorage.restaddress + 'login';
  $localStorage.getfbidbysess = $localStorage.restaddress + 'getfbidbysess';
  $localStorage.updatedob = $localStorage.restaddress + 'updatedob';
  $localStorage.geteventsfb = $localStorage.restaddress + 'geteventsfb';


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
});