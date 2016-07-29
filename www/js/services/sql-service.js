angular.module('app.sql-service', ['starter'])
.factory('Perfil', function($resource,HOST_API) {
  	/*Model de Perfil*/
  	return $resource(HOST_API+'/perfil/:id');
})
.service('SQLService',function($q,$localStorage,$ionicLoading,UtilsService,Perfil,GraphService) {
           this.debug = true;

           this.schema = [
                            { nome: "fb_events", campos: ["id_fb_events", "nome","data_evento"] },
                            { nome: "fb_events_attending", campos: ["id_fb_events_attending", "id_fb_events","id_fb_attending"] },
                            { nome: "pt_chat", campos: ["id_pt_chat", "id_fb_sender","id_fb_receiver","msg","data_envio"] },

                         ];
            this.getSchema = function(){
              return this.schema;
            }

            this.getSchemaTable = function(nome){
              var schema = service.getSchema();
              
              for(i in schema){
                var table = schema[i];
                if(table.nome == nome){
                  return table;
                }
              }
              return null;
            }

            this.isDebug = function() {
              return this.debug;
            }
           
           this.getDB = function() {
           		var deferred = $q.defer();
           		try{
                  
           		  var db = window.openDatabase("dbapp_partty.db", "1.0", "parttyapp", 1000000);
                deferred.resolve(db);

              }catch(err){
                deferred.reject(db);
              }

              return deferred.promise;
           };


           this.createSchema = function(){
              service = this;
           		this.getDB().then(function(db){
           			db.transaction(function(tx) {
                  /*tabelas do DB
							      usar campos dos $resources
                  */

                  var schema = service.getSchema();
                  for(i in schema){
                      var table = schema[i];
                      service.createTable(table.nome,table.campos);
                  }
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

           this.deleteSchema = function(){
              service = this;
              this.getDB().then(function(db){

                db.transaction(function(tx) {
                 /*tabelas do DB
                    usar campos dos $resources
                  */
                  var schema = service.getSchema();
                  for(i in schema){
                      var table = schema[i];
                      
                      service.dropTable(table.nome);
                  }
                });
              });
           }
           this.dropTable = function(nome){
              service = this;
              /*por enquanto a primeira field eh sempre unique (id)*/
              this.getDB().then(function(db){
                db.transaction(function(tx) {
                  var sql = 'DROP TABLE '+nome+' ;';
                  
                  if(service.isDebug()){
                    console.log(sql);  
                  }

                  tx.executeSql(sql);
                
                  });
              });
             

           }

           this.createTable = function(nome,campos){
              service = this;
              /*por enquanto a primeira field eh sempre unique (id)*/
              this.getDB().then(function(db){
                db.transaction(function(tx) {
                  
                  campos[0] = campos[0] + " unique";
                  
                  var campos_table = campos.join(',');
                  var sql = 'CREATE TABLE IF NOT EXISTS '+nome+' ('+campos_table+');';
                 
                  if(service.isDebug()){
                    console.log(sql);  
                  }
                  
                  tx.executeSql(sql);
                
                });
              });
             

           }


           this.insertIntoTable = function(nome_table,array_campos){
            var table = this.getSchemaTable(nome_table);
            var service = this;

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                console.log(table.campos);
                
                var campos_table   = table.campos.join(',');
                var qtd_coringa    = table.campos.length; //vulgo ?
                var campos_coringa = new Array(qtd_coringa + 1).join( "?" );

                var sql = 'INSERT INTO '+table.nome+' ('+campos_table+') VALUES ('+campos_coringa+')';

                if(service.isDebug()){
                  console.log(sql,array_campos);  
                }
                  

                tx.executeSql('INSERT INTO '+table.nome+' ('+campos_table+') VALUES ('+campos_coringa+')', array_campos);
              
              });
            });
           }


  });
