angular.module('app.graph-service', ['starter'])
.service('GraphService',function($q,UtilsService, $localStorage,$ionicLoading,$q,$http,$cordovaFacebook,SQLService,$exceptionHandler) {
           //picture
        
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
                  $exceptionHandler(error);
                  deferred.reject(false);
                });
             
             }else{
                openFB.api(
                {
                    path: "/me",
                    params : {fields : "picture.width(320).height(280),name,gender,email,age_range"},
                    success: function(success){
                        deferred.resolve(success);
                    },
                    error: function(error){
                        $exceptionHandler(error);
                        deferred.reject(false);
                    }
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
                        throw(new Error(error));
      			      deferred.reject(false);
      			    });
      			 
      			 }else{
      			 	openFB.api(
      			    {
      			        path: "/me/events",
      			        params : {"fields":"id,name,picture.width(320).height(280),cover,description,start_time,location"},
      			 		success: function(success){
                              deferred.resolve(success);
                          },
      			        error: function(error){
                              $exceptionHandler(error);
                              deferred.reject(false);
                          }
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
                          $exceptionHandler(error);
        			      deferred.reject(false);
        			    });
        			 
        			 }else{
        			 	openFB.api(
        			    {
        			        path: "/"+eventFb+"/attending",
        			        params : {"fields":"id,picture.width(800).height(600),first_name,name", "limit":"10"},
        			 		success: function(success){
                                deferred.resolve({attending: success, eventFb : eventFb});
                            },
        			        error: function(error){
                                $exceptionHandler(error);
                                deferred.reject(false);
                            }
        			    });
        			 }
        		 	 return deferred.promise;
             	  
     	   }



           /*WEBSQL -> GRAPH FB*/
     	   this.addEvent = function(eventFbObj){

     	   		
                idfb = eventFbObj.id;

                nome = eventFbObj.name;
                descricao = eventFbObj.description;
                data_evento = eventFbObj.start_time;
                

                try{
                  image = eventFbObj.cover.source;
                }catch(e){

                }


                SQLService.insertIntoTable('fb_events',[idfb,nome,descricao,data_evento,image,null]);
     	   }

           this.updateEvent = function(event_obj){
              SQLService.updateIntoTable('fb_events',event_obj,event_obj.id_fb_events);
           }

     	   this.getEvent = function(eventFbId){
    				var deferred = $q.defer();


            
            var result = SQLService.findById('fb_events',eventFbId).then(function(r){
                deferred.resolve(r);
            });

            return deferred.promise;
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

           this.addAttendingEvent = function(attendinEventFbObj){
                var defer = $q.defer();

                this.getAttendingEvent(attendinEventFbObj.id,attendinEventFbObj.eventFb).then(function(rAttending){
                  if(rAttending == null){
                    
                    id_fb_events          = attendinEventFbObj.id;
                    id_fb_attending       = attendinEventFbObj.eventFb;
                    nome                  = attendinEventFbObj.name;
                    picture               = attendinEventFbObj.picture.data.url;
                    
                    SQLService.insertIntoTable('fb_events_attending',[null,id_fb_events,id_fb_attending,nome,picture]);
                    defer.resolve(true);

                  }else{

                    defer.resolve(false);
                  }
                  
                });

                return defer.promise;
           }

           this.getAttendingEvent = function(eventFbId,attendingFbId){
                var deferred = $q.defer();
                var where = "id_fb_events = '"+eventFbId+"' AND id_fb_attending = '"+attendingFbId+"'";

                var result = SQLService.findByWhere('fb_events_attending',where).then(function(r){
                    deferred.resolve(r);
                });
                
                return deferred.promise;
           }


           /*WEBSQL -> GRAPH FB*/
});
