angular.module('app.sql-service', ['starter'])
.service('SQLService',function($q,$localStorage,$ionicLoading,UtilsService) {
           this.getDB = function() {
           		var deferred = $q.defer();
           		try{
                  
           		  if(UtilsService.isMob()){
                  	var db = window.sqlitePlugin.openDatabase({name: "dbapp_partty.db", createFromLocation: 1});
                  }else{
                  	var db = openDatabase("dbapp_partty.db", "1.0", "dbapp_partty.db", 200000);
                  }

                  deferred.resolve(db);

                }catch(err){
                    deferred.reject(db);
                }

                return deferred.promise;
           };


           this.createSchema = function(){
           		this.getDB().then(function(db){
           			db.transaction(function(tx) {
                    	tx.executeSql('CREATE TABLE IF NOT EXISTS chatlog (id_chatlog INTEGER PRIMARY KEY NOT NULL, fbID_receiver BIGINT (30), fbID_sender BIGINT (30), me INTEGER(1), msg VARCHAR (255), data_msg TIMESTAMP);');
                    	tx.executeSql('CREATE TABLE IF NOT EXISTS chatlog (id_chatlog INTEGER PRIMARY KEY NOT NULL, fbID_receiver BIGINT (30), fbID_sender BIGINT (30), me INTEGER(1), msg VARCHAR (255), data_msg TIMESTAMP);');
                	});
               	});
           }


  });
