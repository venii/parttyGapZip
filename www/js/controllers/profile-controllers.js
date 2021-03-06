angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($q,$scope,$localStorage,$ionicPopup,$timeout,ProfileService,Perfil,HOST_API) {
      $scope.showSpinner = true;

      $scope.perfil = null;

      var fbid = $localStorage.fbid;
      $scope.url_photo_slot = HOST_API+"/uploads/"+fbid+"-";

      var data = {};
      data.id = fbid;

      Perfil.get(data,function(r){
        $scope.perfil = r.Perfil;
        $scope.descricao = r.Perfil.descricao;

        $scope.showSpinner = false;
      });

      function cacheImg(img){
        return img+"?v="+Math.random();
      }

      $scope.changephoto1 = function(){

        $scope.uploadFile(1).then(function(uri){ 
          $scope.perfil.imgPIC1 = cacheImg(uri);
          //cover da img
          $localStorage.imgCover = uri;
        });
      }

      $scope.changephoto2 = function(){

        $scope.uploadFile(2).then(function(uri){
          $scope.perfil.imgPIC2 = cacheImg(uri);
        });
      }

      $scope.changephoto3 = function(){
        $scope.uploadFile(3).then(function(uri){
          $scope.perfil.imgPIC3 = cacheImg(uri);
        });
      }

      $scope.changephoto4 = function(){
        $scope.uploadFile(4).then(function(uri){
          $scope.perfil.imgPIC4 = cacheImg(uri);
        });
      }

      $scope.changephoto5 = function(){
        $scope.uploadFile(5).then(function(uri){
          $scope.perfil.imgPIC5 = cacheImg(uri);
        });
      }



      $scope.updateProfile = function(){
        if($scope.perfil.hasOwnProperty('_id')){
          delete $scope.perfil._id;
        }
        
        Perfil.update($scope.perfil,function(r){
            $ionicPopup.show({
                title:'Sucesso',
                template:'Perfil atualizado com sucesso.',
                buttons: [
                          {text : 'Fechar'}
                         ]
            });
        });
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