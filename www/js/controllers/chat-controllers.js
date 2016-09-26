angular.module('chat.controllers', ['starter'])
.controller('ChatCtrl', function($q,$scope,$stateParams,$timeout,$localStorage,$ionicScrollDelegate,Perfil,Chat) {
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



	$scope.carregaUpdater = false;
	$q.all([meusChatP,teusChatP]).then(function(r){
		var chat1 = r[0].Chat.map(function(f){f.eu = false; return f;});
		var chat2 = r[1].Chat.map(function(f){f.eu = true;  return f;});

		var id_view_msg = r[0].Chat.map(function(f){return f._id;});
		var idfb 		= $localStorage.fbid;

		Chat.update({id_view_msg: id_view_msg,idfb: idfb});

		var chat = chat1.concat(chat2);
		$scope.chat = chat;
		$scope.carregaChat = true;
		$ionicScrollDelegate.scrollBottom();
		
		$timeout(function(){
			$scope.carregaUpdater = true;
		},1000,true);

		
	});

	$scope.enviarMSG = function(m){
		if(m !== undefined && m != ""){
			var data 	    = {};
			data.fbid 	    = $localStorage.fbid;
			data.amigoFB    = $stateParams.idfb;
			data.data_envio = new Date().toISOString();
			data.stats 		= 1; //NAO LIDO;
			data.msg 		= m;
			data.eu 		= true;

			Chat.save(data,function(r){
				$scope.chat.push(data);
				
				$scope.busca = "";
				document.querySelector("#textEnvia").value = "";
				$ionicScrollDelegate.scrollBottom();
			});
		}
	}

	$scope.checkScroll = function(){
   
    	
    	$scope.$broadcast('scroll.infiniteScrollComplete');
        
        var pos = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition();
  		$ionicScrollDelegate.scrollTo(pos.left, pos.top-5);

  	}
});
