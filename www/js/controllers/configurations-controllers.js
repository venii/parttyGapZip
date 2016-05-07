angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$http,$ionicLoading) {
	
  //tela de configuraçao de criterio para procurar no cache

	//init padrao das var (sexo, usar usuarios do partty)
	$scope.userregistered = 0;
	$scope.gender = 1;

  //funções para atualizar preferencias de criterio

	$scope.updateCheckboxUserRegistrados = function(parrtyusers){
		setTimeout(function(){
	
  		$scope.userregistered = (parrtyusers === true ? 0: 1 );
	
  	},100);
	};

	$scope.updateRadioGender = function(gender){
		setTimeout(function(){
	
  		$scope.gender = gender;
	
  	},100);
	};

	$scope.updateCheckboxHomen = function(homen){
		setTimeout(function(){
		
    	$scope.homen = (homen === true ? false : true);
		
    },100);
	};

	$scope.updateCheckboxMulher = function(mulher){
		setTimeout(function(){
	
  		$scope.mulher = (mulher === true ? false : true);
	
  	},100);
	};
    

  $scope.updatepreferences = function(){
  	var procurandopor = '3';
  	//update dados de preferencia via ws
  	if($scope.homen === true && $scope.mulher === false){
  		//homen
    	procurandopor = 1;
    }
    	
    if($scope.homen === false && $scope.mulher === true){
    	//mulher
    	procurandopor = 2;
    }
    
  	var postData = {
                
	    "sess_fb": $localStorage.token,
	    "ent_user_fbid": $localStorage.usuarioData.ent_fbid ,
	    "ent_sex" : $scope.gender,
	    "iam" : $scope.gender,

	    "ent_pref_lower_age" : $scope.upperage,
	    "ent_pref_upper_age" : $scope.lowerage,
	    "ent_pref_sex" : procurandopor,
	    "ent_pref_radius" : 0,
		
		  "user_filter_register"  : $scope.userregistered,  
	    "user_use_age" : 0
	    

	  };

  	  
	  $ionicLoading.show({
          template: 'Atualizando preferencias...'
      });

	  $http.get($localStorage.updatepreferences,{params: postData}).then(function(resp) {
			console.log(resp);
			$ionicLoading.hide();
	  });
  	  
  };

  var postData = {            
    "sess_fb": $localStorage.token,
    "ent_user_fbid": $localStorage.usuarioData.ent_fbid 
  };
  
  $ionicLoading.show({ template: 'Carregando preferencias...' });
  //carrega valores do ws do usuario
  $http.get($localStorage.getpreferences,{params: postData}).then(function(resp) {
  		//carrega dados do ws
  		$scope.upperage = resp.data.prUAge;
  		$scope.lowerage = resp.data.prLAge;

  		if(resp.data.sex == '1'){
  			$scope.iam = 'Homen';
  		}else{
  			$scope.iam = 'Mulher';
      }

  		if(resp.data.prSex == '1'){
  			$scope.homen = true;
  			$scope.mulher = false;
  		}
  		
  		if(resp.data.prSex == '2'){
  			$scope.mulher = true;
  			$scope.homen = false;
  		}
  		
  		if(resp.data.prSex == '3'){
  			$scope.homen = true;
  			$scope.mulher = true;
  		}

  		if(resp.data.use_registered == '1'){
  			$scope.parrtyusers = true;
  		}else{
  			$scope.parrtyusers = false;
  		}

  		$ionicLoading.hide();
  });
});