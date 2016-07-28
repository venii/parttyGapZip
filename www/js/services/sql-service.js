angular.module('app.sql-service', ['starter'])
.factory('Perfil', function($resource,HOST_API) {
  	/*Model de Perfil*/
  	return $resource(HOST_API+'/perfil/:id');
})
.service('SQLService',function($q,$localStorage,$ionicLoading,UtilsService,Perfil,GraphService) {

           this.schema = [
                            { nome: "fb_events", campos: ["id_fb_events", "nome","data_evento"] },
                            { nome: "fb_events_attending", campos: ["id_fb_events_attending", "id_fb_events","id_fb_attending"] },
                            { nome: "pt_chat", campos: ["id_pt_chat", "id_fb_sender","id_fb_receiver","msg","data_envio"] },

 
                         ];

           
           this.getDB = function() {
           		var deferred = $q.defer();
           		try{
                  
           		  var db = openDatabase("dbapp_partty.db", "1.0", "dbapp_partty.db", 200000);
                
                deferred.resolve(db);

              }catch(err){
                deferred.reject(db);
              }

              return deferred.promise;
           };


           this.createSchema = function(){
           		this.getDB().then(function(db){
           			db.transaction(function(tx) {
                    	/*tabelas do DB
							             usar campos dos $resources
                    	*/
                    	tx.executeSql('CREATE TABLE IF NOT EXISTS fb_events           (id_fb_events           unique, nome,data_evento);');
                    	tx.executeSql('CREATE TABLE IF NOT EXISTS fb_events_attending (id_fb_events_attending unique, id_fb_events,id_fb_attending);');
                      tx.executeSql('CREATE TABLE IF NOT EXISTS pt_chat             (id_pt_chat             unique, id_fb_sender,id_fb_receiver,data_envio);');
                      tx.executeSql('CREATE TABLE IF NOT EXISTS pt_perfil           (id_pt_perfil           unique, if_fb,nome,sexo,idade,email,foto,fb_token,pt_token);');
                      
                      /* implementar outros metodos
                      GraphService.getMeFB().then(function(r){
                        Perfil.save(r, function(r) {
                          console.log('save',r);
                          //data saved. do something here.
                        });
                      });
                		  */
                		
                    	
                });
              });
           }

           this.createTable = function(nome,campos){
              /*por enquanto a primeira field eh sempre unique (id)*/
              this.getDB().then(function(db){
                db.transaction(function(tx) {
                
                  tx.executeSql('INSERT INTO foo ('+campos.join(',')+') VALUES (' +')', [id, userValue]);
                
                });
              });
             }

           }

           this.insertIntoTable = function(){
            this.getDB().then(function(db){
              db.transaction(function(tx) {
              
                tx.executeSql('INSERT INTO foo (id, text) VALUES (?, ?)', [id, userValue]);
              
              });
            });
           }


  });
