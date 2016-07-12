angular.module('app.graph-service', ['starter'])
.service('GraphService',function($q,UtilsService, $localStorage,$ionicLoading,$q,$http,$cordovaFacebook) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.getEventsFB = function() { 
           	 var deferred = $q.defer();

           	 if(UtilsService.isMob()){
             	grapCall = "me/events?fields=id,name,picture.width(320).height(280),cover,description,start_time,location";
           	
             	$cordovaFacebook.api(grapCall, ["public_profile"])
			    .then(function(success) {
			      // success
			      deferred.resolve(success);
			    }, function (error) {
			      // error
			      deferred.reject(success);
			    });
			 
			 }else{
			 	openFB.api(
			    {
			        path: "/me/events",
			        params : {"fields":"id,name,picture.width(320).height(280),cover,description,start_time,location"},
			 		success: function(success){deferred.resolve(success);},
			        error: function(error){deferred.reject(error);}
			    });
			 }

			 return deferred.promise;
     	   }	

     	   this.getEventAttendingFB = function(eventFb) { 
           	 		
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


     	   this.addEvents = function(eventFbObj){
     	   	console.log($localStorage.events);
     	   		var events = $localStorage.events;
     	   		if(events === undefined){
     	   			events = new Array();
     	   		}

     	   		var exitsEvent = this.getEvents(eventFbObj.id);
     	   	
     	   		if(exitsEvent == null){
     	   			events.push(eventFbObj);
     	   		}

     	   		$localStorage.events = events;

     	   		return false;
     	   		
     	   }

     	   this.removeEvents = function(eventfb){
     	   		var events = $localStorage.events;
     	   		if(events === undefined){
     	   			events = new Array();
     	   		}

     	   		for(i in events){
     	   			var e = events[i];
     	   			if(e.id == eventfb){
     	   				return e;
     	   			} 
     	   		}

     	   		$localStorage.events = events;

     	   		return null;
     	   		
     	   }

     	   this.getEvents = function(eventFbId){
				var events = $localStorage.events;

     	   		if(events === undefined){
     	   			
     	   			events = new Array();
     	   			$localStorage.events = events;
     	   			
     	   			return null;
     	   		}

     	   		for(i in events){
     	   			var e = events[i];
     	   			if(e.id == eventFbId){
     	   				return e;
     	   			} 
     	   		}

     	   		return null;
     	   	
     	   }

});
