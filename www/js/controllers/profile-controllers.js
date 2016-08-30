angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope,$state,$localStorage,ProfileService,LoginService,Perfil) {
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
        console.log("##");
        ProfileService.returnFoto().then(function(blob){
          console.log(blob);
        });
      }



      $scope.updateProfile = function(){
        console.log("##");
      }

      $scope.uploadFileToApi = function(){
        
      }
});