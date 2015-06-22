angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$localStorage,$http) {

  alert("EventsCtrl");
  var postData = {
                
                "sessfb": $localStorage.token
              };
   $http.get($localStorage.geteventsfb,{params: postData}).then(function(resp) {
   		console.log(resp);
   });
});