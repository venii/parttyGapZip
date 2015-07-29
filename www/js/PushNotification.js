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
   // alert("onNotificationGCM");
    //alert('Event: '+ e.event);
   
    switch(e.event){ 

        case 'registered':

            if (e.regid.length > 0){ 
                    //alert(e.regid);
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
                console.log(e.payload);
                alert(e.payload.payload); 
            } 
        break;   

        case 'error': 
            console.log('Error: ' + e.msg); 
        break;   

        default: 
            console.log('An unknown event was received'); 
        break; 
    } 
} 

function onNotificationAPN (event) {
    //alert("@apns");
    console.log(event);
    if ( event.alert )
    {
        navigator.notification.alert(event.nt);
        
        if(event.nt == '3'){
            
                console.log("###");
                navigator.notification.alert(event.alert);


                navigator.notification.alert("teste");

                scopeExternal =  angular.element(document.body).scope();
                injectorExternal = angular.element(document.body).injector();
                
                injectorExternalGET = injectorExternal.get("$location");
                injectorLocalStorage = injectorExternal.get("$localStorage");
                

                navigator.notification.alert("teste2");
                
                //injectorROOTSCOPE = injectorExternal.get("$rootScope");
                
                dataReceive = {};

                navigator.notification.alert("teste3");


                console.log(injectorLocalStorage);

                dataReceive.sFid = event.sFid;
                dataReceive.uName = event.sname;
                dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                dataReceive.errMsg = event.alert;
                dataReceive.pPic = null;
                dataReceive.urlProfilepic = null;
                
                navigator.notification.alert("teste4");
                console.log(dataReceive);
                //injectorROOTSCOPE.newMatchFoundData = dataReceive;
                injectorExternalGET.path("/app/configurations");
                scopeExternal.$apply();

                navigator.notification.alert("/app/configurations");
            
        }
    }

    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}


function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    //alert('device token = ' + result);
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