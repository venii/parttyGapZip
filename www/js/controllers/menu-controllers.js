angular.module('app.menu', ['starter'])

.controller('AppCtrl', function(
    $scope,
    MenuService,
    FriendsService,
    UtilsService,
    LoginService,
    ProfileService) {

  //função para abrir menu esquerdo top  
  $scope.toggleLeftSideMenu = function() {
    ProfileService.loadCoverProfileFoto();
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
    LoginService.loggout();
    $state.go("login");
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