angular.module('app.sql-service', ['starter'])
.factory('Perfil', function($resource,HOST_API) {
  	/*Model de Perfil*/
    var Perfil = $resource(HOST_API+'/perfil/:id',
      
      { update: {
        method: 'PUT'
      }

    });

      

    Perfil.prototype.update = function(cb) {
     
      return Perfil.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };



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

                for(i in array_campos){
                  array_campos[i] = "\'"+array_campos[i]+"\'";
                }

                var campos_valor   = array_campos.join(",");
                var sql = 'INSERT INTO '+table.nome+' ('+campos_table+') VALUES ('+campos_valor+')';

                if(service.isDebug()){
                  console.log(sql);  
                }

                tx.executeSql(sql);
              
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
                  setFields.push(i + " = '"+array_campos[i]+"'");
                }
                
                var sql = 'UPDATE '+table.nome+' SET '+setFields.join(',')+' WHERE '+table.campos[0]+' = "'+id+'"';

                if(service.isDebug()){
                  console.log(sql);  
                }

                tx.executeSql(sql);
              
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


  });
