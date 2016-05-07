angular.module('app.utils-service', ['starter'])
.service('UtilsService',function($localStorage,$ionicLoading) {
           //função para verificar se é mobile (true - mobile / false - web)
           this.isMob = function() { 
			     if( navigator.userAgent.match(/Android/i)
			     || navigator.userAgent.match(/webOS/i)
			     || navigator.userAgent.match(/iPhone/i)
			     || navigator.userAgent.match(/iPad/i)
			     || navigator.userAgent.match(/iPod/i)
			     || navigator.userAgent.match(/BlackBerry/i)
			     || navigator.userAgent.match(/Windows Phone/i)
			     ){
			        return true;
			      }
			     else {
			        return false;
			      }
		    }

		    //função para verificar se é IOS
		    this.isIOS = function(){
			     if ( navigator.userAgent.match(/iPhone/i)
			     || navigator.userAgent.match(/iPad/i)
			     || navigator.userAgent.match(/iPod/i)
			     || navigator.userAgent.match(/BlackBerry/i)
			     ){
			        return true;
			      }
			     else {
			        return false;
			      }
		    }

		    //função para verificar se é Android
		    this.isAndroid = function(){
		    	 if(navigator.userAgent.match(/Android/i)){
			        return true;
			     }else{
			        return false;
			     }
		    }

		    //função para atualizar estado da internet
		    this.setInternetState = function(state){
		    	$localStorage.internetState = navigator.onLine;
		    }

		    //função para retornar estado da internet
		    this.getInternetState = function(){
		    	return navigator.onLine;
		    }

		    //função de error de conection
		    this.showNoConnectionError = function(){
		    	alert("É necessario ter conexao a internet para utilizar o sistema.");
		    }

		    //função para abrir loading
		    this.openDialogMsg = function(msg){
		    	$ionicLoading.show({
		          template: msg
		      	});
		    }

		    //função para fechar loading
		    this.closeDialogMsg = function(){
		    	$ionicLoading.hide();
		    }

  }).factory('AdressService', function() {
  			//fabrica com todos os endereços dos hooks da api

  			var httpserver = 'http://parttyappnoip.ddns.net';
			var restaddress = httpserver+'/partty/servercode/ws/process.php/';
			  
			var signup = restaddress + 'login';
			var getfbidbysess = restaddress + 'getfbidbysess';
			var updatedob = restaddress + 'updatedob';
			var geteventsfb = restaddress + 'geteventsfb';
			var getpreferences = restaddress + 'getPreferences';
			var updatepreferences = restaddress + 'updatePreferences';
			var findmatchespartty = restaddress + 'findMatchespartty';
			var inviteaction = restaddress + 'inviteAction';
			var registermatchespartty = restaddress + 'registerMatchespartty';
			var updatedevicedetails = restaddress + '_updateDeviceDetails';
			var getprofilematches = restaddress + 'getProfileMatches';
			var sendmessage = restaddress + 'sendMessage';
			var getprofile = restaddress + 'getProfile';
			var editprofile = restaddress + 'editProfile';
			var upload_user_image = restaddress + 'upload_user_image';
			var uploadchunk = restaddress + 'uploadChunk';
	
  			return { httpserver: httpserver,
  					 restaddress: restaddress,
  					 signup: signup,
  					 getfbidbysess: getfbidbysess,
  					 updatedob: updatedob,
  					 geteventsfb: geteventsfb,
  					 getpreferences: getpreferences,
  					 updatepreferences: updatepreferences,
  					 findmatchespartty: findmatchespartty,
  					 inviteaction: inviteaction,
  					 registermatchespartty: registermatchespartty,
  					 updatedevicedetails: updatedevicedetails,
  					 getprofilematches: getprofilematches,
  					 sendmessage: sendmessage,
  					 getprofile: getprofile,
  					 editprofile: editprofile,
  					 upload_user_image: upload_user_image,
  					 uploadchunk: uploadchunk
  					};
});
