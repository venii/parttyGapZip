angular.module('chat.controllers', ['starter'])
.controller('ChatCtrl', function($scope,$stateParams,$localStorage,Perfil,Chat) {
    $scope.nomeAmigo   = "";
    $scope.imagemAmigo = "";
    $scope.chat 	   = new Array;
    
    var data = {};
    data.id  = $stateParams.idfb;

	Perfil.get(data,function(r){
		if(r.Perfil){
			$scope.nomeAmigo   = r.Perfil.name;
			$scope.imagemAmigo = r.Perfil.imgPIC1;
		}
	});


	var data  = {};
	data.fbid = $stateParams.idfb;

	Chat.get(data,function(r){
		$scope.chat = r.Chat;
	});

	$scope.enviarMSG = function(m){
		if(m !== undefined && m != ""){
			var data 	    = {};
			data.fbid 	    = $localStorage.fbid;
			data.amigoFB    = $stateParams.idfb;
			data.data_envio = new Date();
			
			Chat.save(data,function(r){
				$scope.chat.push(data);
				$scope.busca = "";
			});
		}
	}
    
});
