angular.module('registration.controllers', ['starter'])

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
                  alert("Autentique com o Facebook novamente.");
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
                    //parttyUtils.logPartty(resp);


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
                        
                        $state.go('app.events');
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

      


});