angular.module('app.sql-service', ['starter'])
/*PREFERENCIAS*/
.service('SQLService',function($q,$rootScope,$localStorage,$ionicLoading,UtilsService,Perfil) {
           this.debug = false;


           this.schema = [
                            { nome: "fb_events", campos: ["id_fb_events", "nome","descricao","data_evento","image","lugar","pre_matches_done"] },
                            { nome: "fb_events_attending", campos: ["id_fb_events_attending", "id_fb_events","id_fb_attending","nome","picture"] },
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
               
                deferred.resolve($rootScope.db);

              }catch(err){
                deferred.reject($rootScope.db);
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

                              function(transaction,success){
                                                            if(service.isDebug()){
                                                              console.log("SQL success",transaction,success);
                                                            }
                                                           },
                              function(transaction, error){
                                                             if(service.isDebug()){
                                                              console.log("SQL error",transaction,error)
                                                             }
                                                          });

              
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

                
                var valores = Object.keys(array_campos).map(function(k) { return array_campos[k] });
                
                valores.splice(0,1);

                tx.executeSql(sql,
                              valores,
                              function(transaction,success){if(service.isDebug()){
                                                              console.log("SQL success",transaction,success);
                                                            }
                                                           },
                              function(transaction, error){if(service.isDebug()){
                                                              console.log("SQL error",transaction,error);
                                                             }
                                                          });
              
              });
            });
           }

           this.findById = function(nome_table,id){
            var table = this.getSchemaTable(nome_table);
            var service = this;
            var deferred = $q.defer();

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                try{
                  
                  var sql = 'SELECT * FROM '+table.nome+' WHERE '+table.campos[0]+' = "'+id+'"';
    
                  if(service.isDebug()){
                    console.log(sql);  
                  }

                  var rs = tx.executeSql(sql,[], function (tx, results) {


                  if(UtilsService.isMob()){
                    var len     = results.rows.length;
                    var retorno = new Array;
                    var i = 0;

                    for (; i < len; i = i + 1) {
                        retorno.push(results.rows.item(i));
                    }
                    if(len > 0){

                      deferred.resolve(retorno);
                    }else{
                      deferred.reject(null);
                    }
                  }else{
                    
                    var len = results.rows.length;
                    
                    if(len > 0){

                      deferred.resolve(results.rows);
                    }else{
                      deferred.reject(null);
                    }
                  }
                      
                 }, function(){deferred.reject(false);});
               
               }catch(ex){
                deferred.reject(false);
               }

              });
            });

            return deferred.promise;
          }

          this.findByWhere = function(nome_table,where){
            var table = this.getSchemaTable(nome_table);
            var service = this;
            var deferred = $q.defer();

            this.getDB().then(function(db){
              db.transaction(function(tx) {
                
                var sql = 'SELECT * FROM '+table.nome+' WHERE '+where;
  
                if(service.isDebug()){
                  console.log(sql);  
                }
                
                var rs = tx.executeSql(sql,[], function (tx, results) {

                  var len = results.rows.length;
                  
                  if(len > 0){
                      deferred.resolve(results.rows);
                  }else{
                      deferred.resolve(null);
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
                      deferred.reject(null);
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
