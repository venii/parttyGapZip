angular.module('app.utils-service', ['starter'])
.service('UtilsService',function() {
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
  });
