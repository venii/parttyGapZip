angular.module('starter.controllers', ['sociogram.controllers','openfb'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
.controller('PlaylistsCtrl', function($scope,$location,OpenFB) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  //console.log(OpenFB);
  //  OpenFB.init('574073299368611','https://www.facebook.com/connect/login_success.html',window.localStorage).them(function(response){console.log(response)});
  //if(!OpenFB.isAuth()){
      OpenFB.login('email');
  //}
  
  //OpenFB.login('email');

  //console.log("tk: "+ OpenFB.isAuth()+ "sess: "+ OpenFB.getSess());
  //alert("@");

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
