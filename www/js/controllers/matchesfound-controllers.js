angular.module('matchesfound.controllers', ['starter'])

.controller('MatchesFoundCtrl', function ($q,$scope,$state,$localStorage,GraphService,Perfil) {

    $scope.showSpinner = true;
    $scope.nome_do_evento = "";
    $scope.nameMe = "";      
    $scope.nameInvited = "";

    var eventP = GraphService.getEvent($localStorage.id_event);

    var data = {};
    data.id  = $localStorage.newMatches[0].id_match_1;
    var attendingP = Perfil.get(data).$promise; 

    var data = {};
    data.id = $localStorage.fbid;

    var perfilP = Perfil.get(data).$promise;


    $q.all([eventP,attendingP,perfilP]).then(function(results){
        $scope.showSpinner = false;
        
        if(results[0] != null){
            console.log(results[0][0]);
            
            $scope.nome_do_evento = results[0][0].nome;
            
        }


        $scope.nameInvited = results[1].Perfil.name;


        $scope.nameMe      = results[2].Perfil.name;
            
    });

    $scope.voltaMatches = function(){
        $state.go("matches",{id_event:$localStorage.id_event});
    }

    $scope.conversar = function(){
        $state.go("app.chat",{idfb:$localStorage.newMatches[0].id_match_1});
        
    }
});