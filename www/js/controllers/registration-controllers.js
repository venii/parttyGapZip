angular.module('registration.controllers', ['starter'])

.controller('RegistrationCtrl', function($scope, $stateParams,
                                          $modal,$localStorage,
                                          $ionicLoading,$http,$ionicViewService,
                                          $state,$cordovaDatePicker,
                                          MainService,RegistrationService) {

      var deviceType = MainService.getDeviceToken();
      $scope.devicetoken = deviceType;

      $ionicLoading.show({
          template: 'Procurando por usuario...'
      });

      RegistrationService.getFBSessJSON(function(resp) {
          RegistrationService.verifyFBSessJSON(resp,function(){
            $state.go('app.login');  
          });
          
          RegistrationService.updateDeviceDetailsJSON(resp,deviceType);      

          
          var postData = {
                  "ent_first_name" : resp.data.usuario.name,
                  "ent_sex" : (resp.data.usuario.gender == "male" ? 1 : 2),
                  "ent_device_type" : deviceType,
                  "ent_push_token" : $localStorage.devicetoken,
                  "ent_auth_type" : 1,
                  "ent_fbid": resp.data.usuario.id,
                  "urlProfilepic" : resp.data.usuario.picture.data.url
          };

          $localStorage.usuarioData = postData;

                try{

                    angular.element(document.querySelector('#profilecontentmenu')).append("<img src='"+resp.data.usuario.picture.data.url+"' style='border-radius: 40px / 20px ;' width=64 heigth=64 />");
                }catch(err){
                  console.log("IMG "+err);
                }
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
            console.error(err);
            alert("Problema com o servidor.");

            // err.status will contain the status code
            $ionicLoading.hide();
            $ionicViewService.nextViewOptions({
                disableBack: true
              });
              
            $state.go('app.login');
          });
       


      
      //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      


});