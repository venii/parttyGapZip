angular.module('starter.controllers', ['sociogram.controllers','openfb'])
/*INJETAR LIB PELO ´[] e pelo functiob ()*/
.controller('AppCtrl', function($scope,$state, $ionicModal,$location, $timeout,OpenFB) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();

  };

  $scope.logout = function() {
    OpenFB.logout();
    $state.go('app.loggedout');
 
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
//CONTROLLER PADRAO SETADO POR OTHERWISE
.controller('LoginFBCtrl', function($scope,$state,$location,OpenFB) {
  
  
  if(!OpenFB.isAuth()){
      OpenFB.login('public_profile, email, user_birthday, user_relationship_details, user_events, user_photos, user_about_me');
  }else{
       $scope.tokenfbview = OpenFB.getSess();
       $state.go('app.main');
  }

  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('MainCtrl', function($scope, $stateParams,OpenFB) {
    console.log($stateParams);
    $scope.sess = OpenFB.getSess();

})


