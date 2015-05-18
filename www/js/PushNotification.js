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
    alert(result);
}

function successHandler(result) { console.log('Success: '+ result); alert('Success: '+ result); }
function errorHandler(error) { console.log('Error: '+ error); }

function onNotificationGCM(e) { 
    console.log("onNotificationGCM");
   console.log(e);
   console.log(e.event);
    switch(e.event){ 

        case 'registered':

            if (e.regid.length > 0){ 
                    //alert(e.regid);
                    //deviceRegistered(e.regid);
                    alert("@");
                    window.localStorage.devicetoken = e.regid;

                    var e = document.getElementById('starter');
                    var $injector = angular.element(e).injector();

                    alert("@");
                    $injector.get('$location').path("/registration");
                    alert("@");
                    $injector.scope().$apply();
                    alert("@");
                } 
        break;   
        case 'message': 
            if (e.foreground){ 
                // When the app is running foreground. 
                alert('The room temperature is set too high') 
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