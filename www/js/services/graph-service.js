angular.module('app.graph-service', ['starter'])
.service('GraphService',function($localStorage,$ionicLoading,$q,$http,$cordovaFacebook) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.api = function() { 
           		$cordovaFacebook.api("me", ["public_profile"])
			    .then(function(success) {
			      // success
			      console.log(success);
			    }, function (error) {
			      // error
			      console.log(success);
			    });
     	   }	


});
