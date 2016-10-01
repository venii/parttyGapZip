angular.module('app.menu', ['starter'])

.controller('AppCtrl', function(
    $scope,
    $state,
    $localStorage,
    MenuService,
    Friends,
    LoginService,
    ProfileService) {
  
  $scope.spinnerChat = true;
  $scope.friends = new Array;
  $scope.friendsSearch = null;
  $scope.buscaPerfilModel = "";

  //função para abrir menu esquerdo top  
  $scope.toggleLeftSideMenu = function() {
    ProfileService.loadCoverProfileFoto();
    MenuService.toggleSideMenu('left');
  };

  //função para abrir menu direito top
  $scope.toggleRightSideMenu = function() {
      //carrega lista de amigos
      var data = {};
      data.fbid = $localStorage.fbid;
      
      $scope.spinnerChat = true;

      MenuService.toggleSideMenu('right');

      Friends.get(data,function(r){
         $scope.spinnerChat = false;
         
         if(r.Friends.length > 0){
          $scope.friends = r.Friends;
          $scope.friendsSearch = $scope.friends;
         }
      }); 

  };
  
  //carrega o chat com a pessoa selecionada
  $scope.loadChat = function(index){
      var friend = $scope.friends[index];
      
      $state.go("app.chat",{"idfb" : friend.id,
                            "nome" : friend.name, 
                            "imgPIC1" : friend.imgPIC1});

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

  $scope.buscaPerfil = function(v){
    if(v === undefined || v == ""){
      $scope.friends = $scope.friendsSearch;
    }else{
      var result = $scope.friendsSearch.filter(function(filter) {
                        if(filter.name.indexOf(v) != -1){
                          return filter;
                        }return;
                    });

      $scope.friends = result;
    }
  }

  $scope.limpaBusca = function(){
    $scope.busca = "";
    document.querySelector("input").value = "";
    $scope.friends = $scope.friendsSearch;
  }

});