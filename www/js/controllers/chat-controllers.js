angular.module('chat.controllers', ['starter'])

.controller('ChatCtrl', function($scope,ChatMessageService, $stateParams,$rootScope,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {


    heightClient = angular.element(document.querySelector('#chatView'))[0].offsetHeight;
    angular.element(document.querySelector('#msnBox')).css("top", (heightClient-100)+"px");
    

    $scope.chatNameUsr = $rootScope.chatUsrData.name;
    

   
    //

    $rootScope.logset = new Array();

    //carrega dados
    //if($rootScope.chatUsrData.lastMSG != undefined)
    // ChatMessageService.addMSGtoList($rootScope.chatUsrData.lastMSG);
   
    ChatMessageService.loadHistoryMSG($localStorage.usuarioData.ent_fbid,function(arrayProcessed){
        for(ap in arrayProcessed){
          
          $rootScope.$apply(function(){
            //alert("apply " + arrayProcessed[ap]);
            //$rootScope.logset.push(arrayProcessed[ap]);
            $rootScope.logset.push("add list");
          });
        }
        


       
    });
   

  	$scope.sendMessage = function(){
  		var scopo = this;
  		var msn = scopo.msnboxtext;

  		scopo.msnboxtext = "";

  		setTimeout(function(){
	  		ChatMessageService.sendMessageWS(scopo,msn,$rootScope.chatUsrData.idfb);
	  		
  		},100);


  	};
}).service('ChatMessageService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate) {
           /*sqlite*/
           this.initDB = function(){
                try{
                  var db = window.sqlitePlugin.openDatabase({name: "dbapp_partty.db"});

                  db.transaction(function(tx) {
                    //tx.executeSql('DROP TABLE IF EXISTS test_table');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS chatlog (id_chatlog INTEGER PRIMARY KEY NOT NULL, fbID_receiver BIGINT (30), fbID_sender BIGINT (30), msg VARCHAR (255), data_msg TIMESTAMP);');

                    
                   
                  });
                  return db;
                }catch(err){
                    alert("ERROR DB LOAD");
                }
                return null;
           };
           /*sqlite*/
           this.insertMSG = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName){
              var db = this.initDB();
              db.transaction(function(tx) {
                  tx.executeSql("INSERT INTO chatlog (fbID_receiver, fbID_sender, msg , data_msg) VALUES (?,?,?,?);", [fbreceiverID, fbreceiverName,msg,'CURRENT_TIMESTAMP'], 
                        function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        });   
              });
           };
           /*sqlite*/
           this.loadHistoryMSG = function(idfb,callback){
              var db = this.initDB();
              

              db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM chatlog WHERE fbID_receiver = '"+idfb+"';", [],function(tx, res) {

                    console.log("Consulta  chatlog " + res.rows.length + " -- should be 1");
                    var len = res.rows.length;
                    var arrayRetorno = new Array();
                    if(len > 0){
                      
                      console.log("Consulta chatlog msg start");
                      for (var i = 0; i < len; i++) {
                        console.log("Consulta chatlog msg" + res.rows.item(i).msg);
                        arrayRetorno.push(res.rows.item(i).msg);
                      }
                      console.log("tamanho array logs "+arrayRetorno.length);
                    }
                    callback(arrayRetorno); //devolve um novo array
                      
                

                });
              });
              

              
           };
           /*sqlite*/
          



           this.sendMessageWS = function($scope,msg,idtosend){
           		
           		var postData = {
                  "sessfb" : $localStorage.token,
                  "sess_fb": $localStorage.token,
                  "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                  "ent_user_recever_fbid": idtosend ,
                  "ent_message" : msg,
                  

                };

                $http.get($localStorage.sendmessage,{params: postData}).then(function(resp) {
                	console.log(resp);
                });
           };
           //USAR QUANDO ESTIVER NO onNotificationGCM ou apns
           this.loadLegacyChat = function(idfbp,name,pic,lastmsg){
              delete $rootScope.chatUsrData;
              $rootScope.chatUsrData = {"idfb" : idfbp, "name" : name ,"pic" : pic, "lastMSG": lastmsg};
              $state.go('app.chat',{idfb : idfbp});
           };

           this.addMSGtoList = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName){
                if($rootScope.logset == undefined)
                  $rootScope.logset = new Array();


                this.insertMSG(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName);
                
                $rootScope.logset.push(msg);
           }
           /*
            this.loadFriendList = function($scope){

              $ionicLoading.show({
                  template: 'Carregando contatos...'
              });
            
                setTimeout(function(){
                    var postData = {
                      "sessfb" : $localStorage.token,
                      "sess_fb": $localStorage.token,
                      "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
                      
                     

                    };

                  
                    $http.get($localStorage.getprofilematches,{params: postData}).then(function(resp) {
                        console.log(resp);

                        var element = angular.element(document.querySelector('#friendlistload'));
                        


                        var templateUrl = $sce.getTrustedResourceUrl('templates/chat/friendlist.html');
                        
                        console.log(templateUrl);

                        $templateRequest(templateUrl).then(function(template) {
                            // template is the HTML template as a string
                           // console.log(template);
                            // Let's put it into an HTML element and parse any directives and expressions
                            // in the code. (Note: This is just an example, modifying the DOM from within
                            // a controller is considered bad style.)
                            if(resp.data.errNum == 50){
                              $scope.friendlist = resp.data.likes;
                            }

                            $compile(element.html(template).contents())($scope);

                        }, function(err) {
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            //alert("Não há matches.")
                           $ionicSideMenuDelegate.toggleRight();
                            
                            // An error has occurred
                        });

                        $ionicLoading.hide();
                    });
                    
                },100);
             
            };*/

      });
