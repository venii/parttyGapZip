var PushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", [options]);
};

    // Call this if you want to show toast notification on WP8
    PushNotification.prototype.showToastNotification = function (successCallback, errorCallback, options) {
        if (errorCallback == null) { errorCallback = function () { } }

        if (typeof errorCallback != "function") {
            console.log("PushNotification.register failure: failure parameter not a function");
            return
        }

        cordova.exec(successCallback, errorCallback, "PushPlugin", "showToastNotification", [options]);
    }
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = PushNotification;
}

function showResultPush(result){
    console.log(result);
   // alert(result);
}

function successHandler(result) { console.log('Success: '+ result); alert('Success: '+ result); }
function errorHandler(error) { console.log('Error: '+ error); alert('Error: '+ result); }

function onNotificationGCM(e) { 
    //console.log("onNotificationGCM");
    //alert("onNotificationGCM");
    //alert('Event: '+ e.event);
   
    switch(e.event){ 

        case 'registered':

            if (e.regid.length > 0){ 
                    alert("device token: "+e.regid);
                    //deviceRegistered(e.regid);
                    //INJETA O DEVICE VIA LEGACY CODE (FORA DO ANGULAR)
                    //REDIRECIONA PARA O NOVO CONTROLADOR

                  // alert("@init legacy code");
                    window.localStorage.devicetoken = e.regid;

                    scopeExternal =  angular.element(document.body).scope();
                    
                    injectorExternal = angular.element(document.body).injector();
                    injectorExternalGET = injectorExternal.get("$location");
                    
                    localStorageLegacy = injectorExternal.get("$localStorage");
                    localStorageLegacy.devicetoken = e.regid;


                    ionicViewLegacy = injectorExternal.get("$ionicViewService");
                    ionicViewLegacy.nextViewOptions({
                        disableBack: true
                      });

                    console.log("IOredirec");
                    console.log(injectorExternalGET);


                    console.log("current: "+injectorExternalGET.path());
                   // alert("@last");
                    injectorExternalGET.path("/app/registration");
                    scopeExternal.$apply();

                    console.log("current: "+injectorExternalGET.path());
                   // alert("@end");
                    
                  //  alert("@final");
                } 
        break;   
        case 'message': 
       
           
           if (e.foreground){ 

                // When the app is running foreground. 
                //console.log(e.payload);
                
            if(e.payload.action == 2){
                alert(e.payload.payload);
            }else if(e.payload.action == 3){
                scopeExternal =  angular.element(document.body).scope();
                injectorExternal = angular.element(document.body).injector();
                
                injectorExternalGET = injectorExternal.get("$location");
                injectorLocalStorage = injectorExternal.get("$localStorage");
                

                ionicViewLegacy = injectorExternal.get("$ionicViewService");
                ionicViewLegacy.nextViewOptions({
                    disableBack: true
                  });
               //injectorState = injectorExternal.get("$state");
                
                injectorROOTSCOPE = injectorExternal.get("$rootScope");
                
                dataReceive = {};

                


                console.log(injectorLocalStorage);

                dataReceive.sFid = e.payload.sfid;
                dataReceive.uName = e.payload.sname;
                dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                dataReceive.errMsg = e.payload.payload;
                dataReceive.pPic = null;
                dataReceive.urlProfilepic = null;
                
               
                injectorROOTSCOPE.newMatchFoundData = dataReceive;

                setTimeout(function(){
                    navigator.notification.alert(e.payload.payload);

                    //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                    injectorExternalGET.path("/app/newmatchesfound_receive");
                    //injectorState.go("app.newmatchesfound");
                    scopeExternal.$apply();
                },5000);
            }
        }else{
            alert("BACKGROUND");
        }
        break;   

        case 'error': 
            alert('Error: ' + e.msg); 
        break;    

        default: 
            alert('An unknown event was received'); 
        break; 
    } 
} 

function onNotificationAPN (event) {
    //alert("@apns");
    console.log(event);
    //alert(event.nt)
    //if ( event.alert )
    //{
        //message
        if(event.nt == 2){
            alert(event.alert);
        }else if(event.nt == 0){
            //teste
           // alert("NT 0");
            scopeExternal =  angular.element(document.body).scope();
            injectorExternal = angular.element(document.body).injector();
            
            injectorExternalGET = injectorExternal.get("$location");
            injectorLocalStorage = injectorExternal.get("$localStorage");
            

            ionicViewLegacy = injectorExternal.get("$ionicViewService");
            ionicViewLegacy.nextViewOptions({
                disableBack: true
              });
           //injectorState = injectorExternal.get("$state");
            
            injectorROOTSCOPE = injectorExternal.get("$rootScope");
            
            dataReceive = {};

            


            console.log(injectorLocalStorage);

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
            
           
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                injectorExternalGET.path("/app/newmatchesfound_receive");
                //injectorState.go("app.newmatchesfound");
                scopeExternal.$apply();
            },5000);
            
        }else if(event.nt == 3){
            //MATCH FOUND
                
            scopeExternal =  angular.element(document.body).scope();
            injectorExternal = angular.element(document.body).injector();
            
            injectorExternalGET = injectorExternal.get("$location");
            injectorLocalStorage = injectorExternal.get("$localStorage");
            

            ionicViewLegacy = injectorExternal.get("$ionicViewService");
            ionicViewLegacy.nextViewOptions({
                disableBack: true
              });
           //injectorState = injectorExternal.get("$state");
            
            injectorROOTSCOPE = injectorExternal.get("$rootScope");
            
            dataReceive = {};

            


            console.log(injectorLocalStorage);

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
            
           
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                //verificar app.js /newmatchesfound enter exit events -> create other controller wiht same configs
                injectorExternalGET.path("/app/newmatchesfound_receive");
                //injectorState.go("app.newmatchesfound");
                scopeExternal.$apply();
            },5000);
                
            
    }
    //}


    /*
    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }*/
}


function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
    window.localStorage.devicetoken = result;
    scopeExternal =  angular.element(document.body).scope();
    
    injectorExternal = angular.element(document.body).injector();
    injectorExternalGET = injectorExternal.get("$location");
    
    localStorageLegacy = injectorExternal.get("$localStorage");
    localStorageLegacy.devicetoken = result;


    ionicViewLegacy = injectorExternal.get("$ionicViewService");
    ionicViewLegacy.nextViewOptions({
        disableBack: true
      });

    console.log("IOredirec");
    console.log(injectorExternalGET);


    console.log("current: "+injectorExternalGET.path());
   // alert("@last");
    injectorExternalGET.path("/app/registration");
    scopeExternal.$apply();
}