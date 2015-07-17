angular.module('app.controllers', ['starter'])

.controller('AppCtrl', function($scope,$state,$ionicSideMenuDelegate,$ionicViewService, $ionicModal,$location, $timeout,OpenFB,$ionicViewService,$localStorage) {

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
    if($localStorage.token != undefined)
      /*CARREGAR CONTATOS NESSA LINHA 1*/

      $ionicSideMenuDelegate.toggleRight();

    else
      alert("É necessario autenticar antes de utilizar");
  };

  $scope.logout = function() {
    //disabilita history back e deleta a var de token
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    
    $state.go("app.loggedout");
    
 
  };

  
});