angular.module('app.graph-service', ['starter'])
.service('GraphService',function($localStorage,$ionicLoading,$q,$http) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.loadGraph = function() { 
           		var deferred = $q.defer();
  				var promise = deferred.promise;
  				
 	 			window.fbAsyncInit = function() {
			        FB.init({
			          appId      : '574073299368611',
			          xfbml      : true,
			          version    : 'v2.6'
			        });
			    };

			    (function(d, s, id){
			         var js, fjs = d.getElementsByTagName(s)[0];
			         if (d.getElementById(id)) {return;}
			         js = d.createElement(s); js.id = id;
			         js.src = "http://connect.facebook.net/en_US/sdk.js";
			         fjs.parentNode.insertBefore(js, fjs);

			         js.onload = function(){
			         	window.fbAsyncInit();
			         	deferred.resolve(true);
           		
			         }
			    }(document, 'script', 'facebook-jssdk'));

			    return promise;
     	   }	


     	   this.loginGraph = function(){
     	   
     	   	FB.login(function(){
			  // Note: The call will only work if you accept the permission request
			  FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			}, {scope: 'publish_actions'});

     	   }

});
