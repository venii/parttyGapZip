angular.module('app.graph-service', ['starter'])
.service('GraphService',function(UtilsService, $localStorage,$ionicLoading,$q,$http,$cordovaFacebook) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.getEvents = function() { 
           	 		
           	 if(UtilsService.isMob()){
             	grapCall = "me/events?fields=id,name,picture.width(320).height(280),cover,description,start_time,location";
           	
             	$cordovaFacebook.api(grapCall, ["public_profile"])
			    .then(function(success) {
			      // success
			      console.log(success);
			    }, function (error) {
			      // error
			      console.log(success);
			    });
			 
			 }else{
			 	openFB.api(
			    {
			        path: "/me/events",
			        params : {"fields":"id,name,picture.width(320).height(280),cover,description,start_time,location"},
			 		success: function(success){console.log(success);},
			        error: function(error){console.log(error);}
			    });
			 }
     	   }	

     	   this.getEventAttending = function(eventFb) { 
           	 		
           	 if(UtilsService.isMob()){
             	grapCall = "/"+eventFb+"/attending?fields=id,picture.width(800).height(600),first_name,name&limit=10";
           	
             	$cordovaFacebook.api(grapCall, ["public_profile"])
			    .then(function(success) {
			      // success
			      console.log(success);
			    }, function (error) {
			      // error
			      console.log(success);
			    });
			 
			 }else{
			 	openFB.api(
			    {
			        path: "/"+eventFb+"/attending",
			        params : {"fields":"id,picture.width(800).height(600),first_name,name", "limit":"10"},
			 		success: function(success){console.log(success);},
			        error: function(error){console.log(error);}
			    });
			 }
     	   }

     	   this.addEvents = function(eventfb){
     	   		var events = $localStorage.getItem("events");
     	   		if(events === undefined){
     	   			events = {};
     	   		}

     	   		var exitsEvent = events[events.id];
     	   		console.log(exitsEvent);
     	   }

});
