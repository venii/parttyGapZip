angular.module('app.graph-service', ['starter'])
.service('GraphService',function($q,UtilsService, $localStorage,$ionicLoading,$q,$http,$cordovaFacebook,SQLService) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.getMeFB = function() { 
             var deferred = $q.defer();

             if(UtilsService.isMob()){
                grapCall = "me?fields=picture.width(320).height(280),name,gender,email,age_range";
            
                $cordovaFacebook.api(grapCall, ["public_profile"])
                .then(function(success) {
                  // success
                  deferred.resolve(success);
                }, function (error) {
                  // error
                  deferred.reject(false);
                });
             
             }else{
                openFB.api(
                {
                    path: "/me",
                    params : {fields : "picture.width(320).height(280),name,gender,email,age_range"},
                    success: function(success){deferred.resolve(success);},
                    error: function(error){deferred.reject(false);}
                });
             }

             return deferred.promise;
           }


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
			      deferred.reject(false);
			    });
			 
			 }else{
			 	openFB.api(
			    {
			        path: "/me/events",
			        params : {"fields":"id,name,picture.width(320).height(280),cover,description,start_time,location"},
			 		success: function(success){deferred.resolve(success);},
			        error: function(error){deferred.reject(false);}
			    });
			 }

			 return deferred.promise;
     	   }	

     	   this.getEventAttendingFB = function(eventFb) { 
			 var deferred = $q.defer();
           	 		
           	 if(UtilsService.isMob()){
             	grapCall = "/"+eventFb+"/attending?fields=id,picture.width(800).height(600),first_name,name&limit=10";
           	
             	$cordovaFacebook.api(grapCall, ["public_profile"])
			    .then(function(success) {
			      // success
			      deferred.resolve({attending: success, eventFb : eventFb});
			    }, function (error) {
			      // error
			      deferred.reject(false);
			    });
			 
			 }else{
			 	openFB.api(
			    {
			        path: "/"+eventFb+"/attending",
			        params : {"fields":"id,picture.width(800).height(600),first_name,name", "limit":"10"},
			 		success: function(success){deferred.resolve({attending: success, eventFb : eventFb});},
			        error: function(error){deferred.reject(false);}
			    });
			 }
		 	 return deferred.promise;
     	  
     	   }


     	   this.addEvent = function(eventFbObj){
     	   		
                idfb = eventFbObj.id;
                nome = eventFbObj.name;
                descricao = "eventFbObj.description";
                data_evento = eventFbObj.start_time;
                image = eventFbObj.picture.data.url;

                idfb = '2';
                nome = '2';
                descricao = "2";
                data_evento = '2';
                image = '2';

                SQLService.insertIntoTable('fb_events',[idfb,nome,descricao,data_evento,image]);

     	   }

     	   this.removeEvent = function(eventfb){
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

     	   this.getEvent = function(eventFbId){
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

     	   this.getEventIndex = function(eventFbId){
				var events = $localStorage.events;

     	   		if(events === undefined){
     	   			
     	   			events = new Array();
     	   			$localStorage.events = events;
     	   			
     	   			return -1;
     	   		}

     	   		for(i in events){
     	   			var e = events[i];
     	   			if(e.id == eventFbId){
     	   				return i;
     	   			} 
     	   		}

     	   		return -1;
     	   	
     	   }

     	   this.addAttendingToEvent = function(eventFbId,attendingFbObj){
     	   		var index = this.getEventIndex(eventFbId);
     	   		
     	   		if(index != -1 ){
     	   			try{
	     	   			var evt = $localStorage.events[index];
	     	   		}catch(ex){
	     	   			$localStorage.events = new Array();
	     	   			index = 0;
	     	   		}

	     	   		if($localStorage.events[index].attending === undefined){
	     	   			$localStorage.events[index].attending = new Array();
	     	   		}

	     	   		var exitsAttending = this.getAttendingToEvent(eventFbId,attendingFbObj.id);
	     	   	
	     	   		if(exitsAttending == null){
	     	   			$localStorage.events[index].attending.push(attendingFbObj);
						return true;
	     	   		}

	
	     	   	}
     	   		return false;
     	   		
     	   }

     	   this.getAttendingToEvent = function(eventFbId,attendingFbId){
				var events = $localStorage.events;

     	   		if(events === undefined){
     	   			
     	   			events = new Array();
     	   			$localStorage.events = events;
     	   			
     	   			return null;
     	   		}
     	   		var index = this.getEventIndex(eventFbId);
     	   		
     	   		for(i in events[index]){
     	   			var attending = events[index][i];
     	   			if(attending.id == attendingFbId){
     	   				return attending;
     	   			} 
     	   		}

     	   		return null;
     	   	
     	   }
});
