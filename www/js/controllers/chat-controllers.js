angular.module('chat.controllers', ['starter'])

.controller('ChatCtrl', function($scope,ChatMessageService,$ionicScrollDelegate, $stateParams,$rootScope,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {

    $scope.chatNameUsr = $rootScope.chatUsrData.name;
    $rootScope.logset = new Array();

    //carrega dados
    setTimeout(function(){
      ChatMessageService.loadHistoryMSG($rootScope.chatUsrData.idfb,function(arrayProcessed){ 
          
          for(ap in arrayProcessed){
            
            $rootScope.$apply(function(){
              //adiciona ao array e envia o scroll para o maximo do bottom
              $rootScope.logset.push({ "msg" : arrayProcessed[ap].msg , "data" : arrayProcessed[ap].data_msg, "side": arrayProcessed[ap].side});
              $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
              
            });
          }
      },1000);
    });

    //envia msg
  	$scope.sendMessage = function(){
  		var scopo = this;
  		var msn = scopo.msnboxtext;

  		scopo.msnboxtext = "";

  		setTimeout(function(){
	  		ChatMessageService.sendMessageWS(scopo,msn,$rootScope.chatUsrData.idfb);
	  		
  		},100);

  	};
}).service('ChatMessageService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate,$ionicScrollDelegate) {
           //serviço de sqlite para o chat

           /*sqlite*/
           this.initDB = function(){
                try{
                  var db = window.sqlitePlugin.openDatabase({name: "dbapp_partty.db", createFromLocation: 1});

                  db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS chatlog (id_chatlog INTEGER PRIMARY KEY NOT NULL, fbID_receiver BIGINT (30), fbID_sender BIGINT (30), me INTEGER(1), msg VARCHAR (255), data_msg TIMESTAMP);');
                  });

                  return db;

                }catch(err){
                    alert("err dbload "+err.code);
                }
                return null;
           };
           
           /*sqlite*/
           this.insertMSG = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me){
              var db = this.initDB();

              if(db == null){
                return;
              }

              db.transaction(function(tx) {
                  tx.executeSql("INSERT INTO chatlog (fbID_receiver, fbID_sender, msg , data_msg,me) VALUES (?,?,?,?,?);", [fbreceiverID, fbsenderID,msg,new Date().toLocaleString(),me], 
                        function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        });   
              });
           };

           /*sqlite*/
           this.loadHistoryMSG = function(idfb,callback){
           
              var db = this.initDB();
              
              if(db == null){
                return;
              }

              db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM chatlog WHERE (fbID_receiver = '"+idfb+"')  ;", [],function(tx, res) {

               
                    var len = res.rows.length;
                    var arrayRetorno = new Array();
               
                    if(len > 0){
                      for (var i = 0; i < len; i++) {
                        arrayRetorno.push({"msg" : res.rows.item(i).msg , "data" : res.rows.item(i).data_msg, "side": res.rows.item(i).me});
                      }
                    }

                    callback(arrayRetorno); //devolve um novo array
                    
                });
              });
           };

           /*sqlite*/
          this.getLastMsg = function(idfb,num,callback){
              var db = this.initDB();
              if(db == null){
                return;
              }

              db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM chatlog WHERE (fbID_receiver = '"+idfb+"') ORDER BY id_chatlog DESC LIMIT "+num+" ;", [],function(tx, res) {

                    var len = res.rows.length;
                    var arrayRetorno = new Array();
               
                    if(len > 0){
                      for (var i = 0; i < len; i++) {
                        arrayRetorno.push({"msg" : res.rows.item(i).msg , "data" : res.rows.item(i).data_msg, "side": res.rows.item(i).me});
                      }
               
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

                var self = this;
                
                $http.get($localStorage.sendmessage,{params: postData}).then(function(resp) {
                  self.addMSGtoList(msg,$localStorage.usuarioData.ent_fbid,"",idtosend,"",1);
                });
           };
           
           //USAR QUANDO ESTIVER NO onNotificationGCM ou apns
           this.loadLegacyChat = function(idfbp,name,pic,lastmsg){
              delete $rootScope.chatUsrData;
              $rootScope.chatUsrData = {"idfb" : idfbp, "name" : name ,"pic" : pic, "lastMSG": lastmsg};

              $ionicViewService.nextViewOptions({
                  disableBack: true
              });

              $state.go('app.chat',{idfb : idfbp});
           };

           this.addMSGtoList = function(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me){
                if($rootScope.logset == undefined){
                  $rootScope.logset = new Array();
                }
                
                this.insertMSG(msg,fbsenderID,fbsenderName,fbreceiverID,fbreceiverName,me);
                
                $rootScope.logset.push({"msg" : msg, "data" : new Date().toLocaleString(), "side": me});

                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
           }
           
      });
