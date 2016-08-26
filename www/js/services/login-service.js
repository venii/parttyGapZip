angular.module('app.login-service', ['app.utils-service','ngCordova'])
.service('LoginService',  function(
    $localStorage,$ionicViewService,$ionicSideMenuDelegate,
    $http,$rootScope,$cordovaOauth,$cordovaFacebook,$q,SQLService,

    
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

           //função de salvar no localstorage o json vindo do servidor do FB (graph)
           this.savePerfil = function(response){

              //["id_pt_profiles", "nome" , "gender" , "picture"]
              idfb = response.id;
              nome = response.name;
              sexo = response.gender;
              pict = response.picture.data.url;
              SQLService.insertIntoTable('pt_profiles',[idfb,nome,sexo,pict]);
           }

           this.getPerfil = function(){
              var deferred = $q.defer();

              var result = SQLService.getAll('pt_profiles',$localStorage.fbid).then(function(r){
                 deferred.resolve(r[0]);
              });
                
              return deferred.promise;
           }

           //função para realizar o login excluindo os dados do localStorage
           this.loggout = function(){
              //exclui localStorage
              delete $localStorage;
              SQLService.deleteSchema();
           }

  });
