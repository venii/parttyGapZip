angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope,$state,$localStorage,$ionicPopup,ProfileService,LoginService,Perfil) {
      $scope.showSpinner = true;

      $scope.nome = "";
      $scope.descricao = "";

      $scope.perfil = null;

      var fbid = $localStorage.fbid;
      var data = {};
      data.id = fbid;

      Perfil.get(data,function(r){
        $scope.perfil = r.Perfil;

        $scope.showSpinner = false;
      });



      $scope.changephoto1 = function(){
        var slot = 1;
        ProfileService.returnFoto().then(function(blob){
          ProfileService.uploadPhoto(blob,slot);
            
            $ionicPopup.show({
              title:'Sucesso',
              template:'Foto enviada ao servidor com sucesso.',
               buttons: [
                          {text : 'Fechar'}
                        ]
            });
            
        });
      }



      $scope.updateProfile = function(){
        console.log("##");
      }

      $scope.uploadFileToApi = function(){
        
      }
});