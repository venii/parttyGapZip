angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($q,$scope,$state,$localStorage,$ionicPopup,$timeout,ProfileService,LoginService,Perfil,HOST_API) {
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
        $scope.uploadFile(1).then(function(uri){
          $scope.imgPIC1 = uri;
        });
      }

      $scope.changephoto2 = function(){
        $scope.uploadFile(2).then(function(uri){
          $scope.imgPIC2 = uri;
        });
      }

      $scope.changephoto3 = function(){
        $scope.uploadFile(3).then(function(uri){
          $scope.imgPIC3 = uri;
        });
      }

      $scope.changephoto4 = function(){
        $scope.uploadFile(4).then(function(uri){
          $scope.imgPIC4 = uri;
        });
      }

      $scope.changephoto5 = function(){
        $scope.uploadFile(5).then(function(uri){
          $scope.imgPIC5 = uri;
        });
      }



      $scope.updateProfile = function(){

      }


      /*faz upload para a api*/
      $scope.uploadFile = function(slot){
        var defer = $q.defer();

        ProfileService.returnFoto().then(function(blob){
          ProfileService.uploadPhoto(blob,slot);
            
            $ionicPopup.show({
              title:'Sucesso',
              template:'Foto enviada ao servidor com sucesso.',
               buttons: [
                          {text : 'Fechar'}
                        ]
            });

            $timeout(function(){
              defer.resolve($scope.url_photo_slot + slot+".jpg");
            },1000);
            
        });

        return defer.promise;
      }
});