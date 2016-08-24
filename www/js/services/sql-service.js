angular.module('app.sql-service', ['starter'])
/*PREFERENCIAS*/
.factory('Preferencias', function($resource,HOST_API) {
    /*Model de Preferencias*/
    var Preferencias = $resource(HOST_API+'/preferencias/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

      

    Preferencias.prototype.update = function(cb) {
     
      return Preferencias.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
    return Preferencias;
})
/*PREFERENCIAS*/
/*PERFIL*/
.factory('Perfil', function($resource,HOST_API) {
  	/*Model de Perfil*/
    var Perfil = $resource(HOST_API+'/perfil/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

      

    Perfil.prototype.update = function(cb) {
     
      return Perfil.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
  	return Perfil;
})
/*PERFIL*/
/*EVENTO*/
.factory('Evento', function($resource,HOST_API) {
    /*Model de Perfil*/
    var Evento = $resource(HOST_API+'/evento/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

    Evento.prototype.update = function(cb) {
     
      return Evento.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
    return Evento;
})
/*EVENTO*/

.service('SQLService',function($q,$localStorage,$ionicLoading,UtilsService,Perfil) {
           this.debug = true;

           this.schema = [
                            { nome: "fb_events", campos: ["id_fb_events", "nome","descricao","data_evento","image","pre_matches_done"] },
                            { nome: "fb_events_attending", campos: ["id_fb_events_attending", "id_fb_events","id_fb_attending"] },
                            { nome: "pt_chat", campos: ["id_pt_chat", "id_fb_sender","id_fb_receiver","msg","data_envio"] },
                            { nome: "pt_profiles", campos: ["id_pt_profiles", "nome" , "gender" , "picture"] },

                         ];
            this.getSchema = function(){
              return this.schema;
            }

            this.getSchemaTable = function(nome){
              var schema = service.getSchema();
              
              for(i in schema){
                var table = schema[i];
                if(table.nome == nome){
                  table.campos[0] = table.campos[0].replace(" unique","");

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
              this.getDB().then(function(db){
                db.transaction(function(tx) {
                  /*por enquanto a primeira field eh sempre unique (id)*/
             
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
                
                var campos_table   = table.campos.join(',');

                var campos_valor   = array_campos.join(",");
                
                var wildcards = service.pad(array_campos.length,'?,');
                wildcards = wildcards.substring(0, wildcards.length - 1);

                var sql = 'INSERT INTO '+table.nome+' ('+campos_table+') VALUES ('+wildcards+')';

                if(service.isDebug()){
                  console.log(sql);  
                }

                tx.executeSql(sql,
                              array_campos,
                              function(transaction,success){console.log("SQL success",transaction,success);},
                              function(transaction, error){console.log("SQL error",transaction,error)});
              
              });
            });
           }

           /*usar nomes dos campos*/
           this.updateIntoTable = function(nome_table,array_campos,id){
            var table = this.getSchemaTable(nome_table);
            var service = this;

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                
                var setFields = new Array;
                for(var i in array_campos){
                  setFields.push(i + " = ?");
                }

                var idset = setFields.splice(0,1)[0].replace(" = ?","");
                
                var sql = 'UPDATE '+table.nome+' SET '+setFields.join(',')+' WHERE '+idset+' = "'+id+'"';

                if(service.isDebug()){
                  console.log(sql);  
                }

                tx.executeSql(sql,
                              array_campos,
                              function(transaction,success){console.log("SQL success",transaction,success);},
                              function(transaction, error){console.log("SQL error",transaction,error)});
              
              });
            });
           }

           this.findById = function(nome_table,id){
            var table = this.getSchemaTable(nome_table);
            var service = this;
            var deferred = $q.defer();

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                
                var sql = 'SELECT * FROM '+table.nome+' WHERE '+table.campos[0]+' = "'+id+'"';
  
                if(service.isDebug()){
                  console.log(sql);  
                }

                var rs = tx.executeSql(sql,[], function (tx, results) {

                  var len = results.rows.length;
                  
                  if(len > 0){
                      deferred.resolve(results.rows);
                  }else{
                      deferred.reject(false);
                  }
                  
                    
               }, function(){deferred.reject(false);});

              });
            });

            return deferred.promise;
          }

          this.getAll = function(nome_table){
            var table = this.getSchemaTable(nome_table);
            var service = this;
            var deferred = $q.defer();

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                
                var sql = 'SELECT * FROM '+table.nome;
  
                if(service.isDebug()){
                  console.log(sql);  
                }

                var rs = tx.executeSql(sql,[], function (tx, results) {

                  var len = results.rows.length;
                  
                  if(len > 0){
                      deferred.resolve(results.rows);
                  }else{
                      deferred.reject(false);
                  }
                  
                    
               }, function(){deferred.reject(false);});

              });
            });

            return deferred.promise;
          }

          this.pad = function(len, c){
              var i=0;
              var pad = '';
              while(i<len){
                pad += c;
                i++;
              }
              return pad;
          }
  });
