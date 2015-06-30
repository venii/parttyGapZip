angular.module('starter.controllers', ['ionic','ui.bootstrap','modal.controllers',
                                          'sociogram.controllers','openfb',
                                          'ngCordova','ngStorage','parttyutils',
                                          'app.controllers',
                                          ,'login.controllers',
                                          ,'main.controllers',
                                           ,'registration.controllers',
                                          ,'configurations.controllers',
                                          'events.controllers',
                                           'matches.controllers'

                                          
                                          ])

.controller('ChatCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  /*
  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });
  
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    // Your register code from before
  };*/

// Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    // Your identify code from before
  };
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
         console.log(notification);
        return true;
      }
    });
  };




})


