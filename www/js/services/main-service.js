angular.module('app.main-service', ['starter','app.utils-service','app.login-service','ngCordova'])
.service('MainService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaOauth,$cordovaDevice,

    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService

    ) {
		  //função para adicionar listener de deviceReady
    	this.registerPushNotification = function(callback){
    		document.addEventListener("deviceready",callback);
      }

      this.registerPushNotificationOnMobile = function () {
        //REGISTRA push DE CADA ARQUITETURA
        // ANDROID OU IOS      
        if ( UtilsService.isAndroid() ){
          
          window.plugins.pushNotification.register(
          		successHandler,
          		errorHandler,
          		{"senderID":"244606470402", 
          		"ecb":"onNotificationGCM"}
          );
        
        }else{
            	
            var model = $cordovaDevice.getModel();
	          //REGISTRA PUSH APENAS MODELOS_ 64BITS
            if(model != "x86_64"){
                 
               window.plugins.pushNotification.register(
                      tokenHandler,
                      errorHandler,
                      {
                          "badge":"true",
                          "sound":"true",
                          "alert":"true",
                          "ecb":"onNotificationAPN"
               		}
               );
	          }
        }
      }

      //função para retornar token de PUSH (apns ou gcms)
    	this.getDeviceToken = function(){
		    return $localStorage.devicetoken;
	    }
      
      //função para registrar token no localStorage
	    this.saveDeviceToken = function(token){
	    	$localStorage.devicetoken = token;
	    }     

      //função para retornar o tipo de dispositivo
      this.getDeviceType = function(){
        var devicetypeapp = 3;

        if(typeof device !== "undefined"){
            
            if(UtilsService.isMob() ){
              //android
              if( UtilsService.isAndroid()){
                  devicetypeapp = 2;
              }
              //ios
              else if(UtilsService.isIOS()){
                  devicetypeapp = 1;
              }
            }
        }
        return devicetypeapp;
      }


      

  });
