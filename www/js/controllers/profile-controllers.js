angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope, $stateParams,$modal,$localStorage,$ionicLoading,$http,parttyUtils,$ionicViewService,$state,$cordovaDatePicker) {
     
      $scope.nome = $localStorage.usuarioData.ent_first_name;
      $scope.mydesc = {};
      $scope.Personal_Desc = "";


      $scope.loadImage = function(){
          //alert("#LOAD");
          var obj = document.querySelector('#imgPIC');
          console.log(obj.constructor.name);
          console.log(obj.src);
          var c = document.createElement("CANVAS");
          var ctx = c.getContext("2d");
          
          ctx.drawImage(obj, 10, 10);

          base64 = c.toDataURL();
          //alert(base64);
          var postData = {
            
               
                "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                "ent_index_id" : 0,
                "ent_userimage" : base64
            };

          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

          var filename = obj.src.replace(/^.*[\\\/]/, '');
          console.log("filename "+filename);
          if(filename != "noimg.png"){
           // alert("###");


            $http.get($localStorage.upload_user_image,{params: postData}).then(function(resp){
                alert("1##" + resp.data.errMsg);
                if(resp.data.errNum == "18"){
                  angular.element(document.querySelector('#profilecontentmenu')).append("<img src='"+base64+"' style='border-radius: 150px;' width=64 heigth=64 />");
                  alert("Sua foto de perfil foi trocada.");
                }

            },function(err){parttyUtils.logPartty(err)});
          }
          //alert("#@#");
      };  
      

      $scope.processForm = function(){
        
        setTimeout(function(){

            var postData = {
            
              "sess_fb": $localStorage.token,
              "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
              "ent_pers_desc" : $scope.mydesc.desc
            };

            $http.get($localStorage.editprofile,{params: postData}).then(function(resp) {
                //alert($localStorage.photoProfile64 );
                alert("Atualizado");

            });
                
        },1000);

      };

      $scope.changephoto = function(){
        
        window.imagePicker.getPictures(
            function(results) {
                
               

                $scope.imgPIC = results[0];
                $scope.$apply();
                

                /*function(){
                      window.plugins.Base64.encodeFile(results[0], function(base64){
                          /*console.log('file base64 encoding: ' + base64);

                          var postData = {
                
                                "sess_fb": $localStorage.token,
                                "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                                "ent_index_id" : 0,
                                "ent_userimage" : base64
                          };
                          
                          console.log("file base64 encoding 1 "+$localStorage.upload_user_image);
                          parttyUtils.logPartty(postData);
                          
                          try{
                          
                            alert("##");
                          
                            $http.get(  $localStorage.upload_user_image,{params: postData}).then(function(resp) {
                                console.log(resp);
                                alert("gotch");
                                //$scope.imgPIC = resp.data.profilePic;
                                //$scope.mydesc.desc = resp.data.persDesc;
                                console.log("file base64 encoding 3");
                            },function(err){
                              console.log(err);
                              console.log("file base64 encoding 4");
                            });
                            
                            console.log("file base64 encoding 2");
                            alert("##");

                          }catch(err){
                            console.log("try base64 "+err);
                            parttyUtils.logPartty(err);
                          }
                      
                      });

                }*/
                
                 



                  
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



       console.log("getprofile 1");
        //PEGA INFORMAÇOES NO WS DE USUARIO FACEBOOK
      $http.get(  $localStorage.getprofile,{params: postData}).then(function(resp) {
          console.log("getprofile 2");
          console.log(resp);
          $scope.imgPIC = resp.data.profilePic;
          $scope.mydesc.desc = resp.data.persDesc;
      });
      console.log("getprofile 3");


});