angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope,$state,$localStorage,$ionicPopup,ProfileService,LoginService,Perfil,HOST_API) {
      $scope.showSpinner = true;

      
      $scope.nome = "";
      $scope.descricao = "";

      $scope.perfil = null;

      var fbid = $localStorage.fbid;
      $scope.url_photo_slot = HOST_API+"/uploads/"+fbid+"-";



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
            $scope.imgPIC1 = $scope.url_photo_slot = HOST_API+"/uploads/"+fbid+"-"+slot+".jpg";

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