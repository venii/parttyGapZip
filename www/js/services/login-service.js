angular.module('app.login-service', ['app.utils-service','ngCordova'])
.service('LoginService',  function(
    $localStorage,$ionicViewService,$ionicSideMenuDelegate,
    $http,$rootScope,$cordovaOauth,$cordovaFacebook,$q,

    
    /*
      Nosso servicos
    */
    UtilsService) {
            
           var FBappId ='574073299368611';

           var FBscope = 'email';
           
           //realiza login
           this.autenticarFB = function(){
              var deferred = $q.defer();

              if(UtilsService.isMob()){
                    //registra funçao para ser executa apos da janela do fb abrir(mobile)
                    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
                    .then(function(success) {
                      
                      deferred.resolve(success);
                    }, function (error) {

                      deferred.reject(error);
                    });

              }else{
                    //abre plugin do FB para web (navegador)
                    openFB.init({ appId  : FBappId });
                    openFB.login(function(obj){deferred.resolve(obj);},{scope: FBscope});
                    
              }
              return deferred.promise;
           };

           //função para resolver os errors do login
           this.errorHandlerLogin = function(error){
              console.log(error);
              alert("LOGINSERVICE: "+error);
           }

           //função de salvar no localstorage o json vindo do servidor do FB (graph)
           this.savePerfil = function(response){
              $localStorage.perfil = response;
              //trata tipos vindo da GRAPH API e do Servidor do partty
              if(typeof(response.authResponse) == "undefined"){
                this.setToken(response.access_token);
              
              }else{
                this.setToken(response.authResponse.token);
              }
           }
           
           //função de salvar o token no localStorage
           this.setToken = function(token){
              $localStorage.token = token;
           }

           //funçao de retornar o token
           this.getToken = function(){
              return $localStorage.token;
           }

           //função para realizar o login excluindo os dados do localStorage
           this.loggout = function(callback){
              //desabilita click dos menus top left & right
              $ionicSideMenuDelegate.canDragContent(false);
              //exclui localStorage
              delete $localStorage.token;
              delete $localStorage;
              //realiza funçao após deletar o localStorage
              callback();
           }

  });
