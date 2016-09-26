angular.module('chat.controllers', ['starter'])
.controller('ChatCtrl', function($q,$scope,$stateParams,$localStorage,$ionicScrollDelegate,Perfil,Chat) {
    $scope.nomeAmigo   = "";
    $scope.imagemAmigo = "";
    $scope.imagemMinha = "";

    $scope.chat 	   = new Array;
    $scope.carregaChat = false;
    //CARREGA PERFIL DE QUEM ESTIVER CONVERSANDO
    var data = {};
    data.id  = $stateParams.idfb;

	Perfil.get(data,function(r){
		if(r.Perfil){
			$scope.nomeAmigo   = r.Perfil.name;
			$scope.imagemAmigo = r.Perfil.imgPIC1;
		}
	});
	//CARREGA MEU PERFIL
	var data = {};
    data.id  = $localStorage.fbid;

	Perfil.get(data,function(r){
		if(r.Perfil){
			$scope.imagemMinha = r.Perfil.imgPIC1;
		}
	});

	//CARREGA CHAT DA PESSOA QUE ESTOU FALANDO
	var data  = {};
	data.fbid = $stateParams.idfb;
	var meusChatP = Chat.get(data).$promise;
	//CARREGA MEU CHAT
	var data  = {};
	data.fbid = $localStorage.fbid;
	var teusChatP = Chat.get(data).$promise;

	$q.all([meusChatP,teusChatP]).then(function(r){
		var chat1 = r[0].Chat.map(function(f){f.eu = false; return f;});
		var chat2 = r[1].Chat.map(function(f){f.eu = true;  return f;});;

		var chat = chat1.concat(chat2);
		$scope.chat = chat;
		$scope.carregaChat = true;
		$ionicScrollDelegate.scrollBottom();
	});

	$scope.enviarMSG = function(m){
		if(m !== undefined && m != ""){
			var data 	    = {};
			data.fbid 	    = $localStorage.fbid;
			data.amigoFB    = $stateParams.idfb;
			data.data_envio = new Date().toISOString();
			data.stats 		= 1; //NAO LIDO;
			data.msg 		= m;

			Chat.save(data,function(r){
				$scope.chat.push(data);
				
				$scope.busca = "";
				document.querySelector("#textEnvia").value = "";
				$ionicScrollDelegate.scrollBottom();
			});
		}
	}
    
});
