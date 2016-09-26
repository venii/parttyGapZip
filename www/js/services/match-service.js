angular.module('app.match-service', ['starter'])
.service('MatchService',function($q,$localStorage,$state,Matches) {
      this.getNewMatches = function(data_newMatchs){
          var defer = $q.defer();
        
          Matches.get(data_newMatchs,function(r){
            defer.resolve(r);
          });

          return defer.promise;

      }  

      this.haveNewMatches = function(data_newMatchs){
        this.getNewMatches(data_newMatchs).then(function(r){
             if(r.Mensagem == "RETORNADO"){
                $localStorage.newMatches = r.Matches;
                $state.go("matchesfound"); 
             }
        });
       
      }  
});