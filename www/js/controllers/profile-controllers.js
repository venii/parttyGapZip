angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope, $stateParams,$modal,$localStorage,$ionicLoading,$http,parttyUtils,$ionicViewService,$state,$cordovaDatePicker) {
     
      $scope.nome = $localStorage.usuarioData.ent_first_name;
      $scope.mydesc = {};
      $scope.Personal_Desc = "";

      $scope.processForm = function(){
        
        setTimeout(function(){

            var postData = {
            
              "sess_fb": $localStorage.token,
              "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
              "ent_pers_desc" : $scope.mydesc.desc
            };

            $http.get($localStorage.editprofile,{params: postData}).then(function(resp) {
                alert("Atualizado");
            });
                
        },1000);

      };

      $scope.changephoto = function(){
        alert("###");
        
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                }
            }, function (error) {
                console.log('Error: ' + error);
            }
        );

      };

      var postData = {
            
            "sess_fb": $localStorage.token,
            "ent_user_fbid" : $localStorage.usuarioData.ent_fbid
      };




        //PEGA INFORMAÇOES NO WS DE USUARIO FACEBOOK
      $http.get(  $localStorage.getprofile,{params: postData}).then(function(resp) {
        console.log(resp);
          $scope.imgPIC = resp.data.profilePic;
          $scope.mydesc.desc = resp.data.persDesc;
      });


});