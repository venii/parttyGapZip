angular.module('app.menu', ['starter'])

.controller('AppCtrl', function(
    $scope,$state,$rootScope,
    $ionicSideMenuDelegate,$ionicViewService, 
    $ionicModal,$location, $timeout,OpenFB,
    $ionicViewService,$localStorage,$stateParams,
   
    MenuService,
    FriendsService,
    AdressService,
    UtilsService) {

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

  //gerencia chat , menus superiores (top) e armazena urls da api do partty

  //função para abrir menu esquerdo top  
  $scope.toggleLeftSideMenu = function() {
    MenuService.toggleSideMenu('left');
  };

  //função para abrir menu direito top
  $scope.toggleRightSideMenu = function() {
      //carrega lista de amigos
      MenuService.toggleSideMenu('right',function(){
        FriendsService.loadFriendList($scope);
        
      });
  };

  //função de realizar loggout e enviar para login
  $scope.logout = function() {
    $state.go("app.loggedout");
  };

  //envia para configurações
  $scope.configurations = function() {
    $state.go("app.configurations");
  };

  //envia para events
  $scope.events = function() {
    $state.go("app.events");
  };

  //envia para profile
  $scope.profile = function() {
    $state.go("app.profile");
  };

  //carrega o chat com a pessoa selecionada
  $scope.loadchat = function(idfb,name,pic){
      
      delete $rootScope.chatUsrData;
      $rootScope.chatUsrData = {"idfb" : idfb, "name" : name ,"pic" : pic};
      $state.go("app.chat",{"idfb" : idfb});

  };
  
});