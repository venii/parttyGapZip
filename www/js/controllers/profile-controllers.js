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
        
        window.imagePicker.getPictures(
            function(results) {
                
               

                $scope.imgPIC = results[0];
                $scope.$apply();

                
                 

                  window.plugins.Base64.encodeFile(results[0], function(base64){
                      console.log('file base64 encoding: ' + base64);

                      var postData = {
            
                            "sess_fb": $localStorage.token,
                            "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                            "ent_index_id" : 0,
                            "ent_userimage" : base64
                      };

                      $http.get(  $localStorage.upload_user_image,{params: postData}).then(function(resp) {
                          console.log(resp);
                          //$scope.imgPIC = resp.data.profilePic;
                          //$scope.mydesc.desc = resp.data.persDesc;
                      });
                  });

                  
                    //PEGA INFORMAÇOES NO WS DE USUARIO FACEBOOK
                  


                
            }, function (error) {
                console.log('Error: ' + error);
            },
            {
              maximumImagesCount: 1,

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