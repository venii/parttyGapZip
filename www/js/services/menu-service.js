angular.module('app.menu-service', ['starter','app.utils-service','app.login-service'])
.service('MenuService',function(
				$ionicSideMenuDelegate,
				$localStorage,
				$cordovaNetwork,
				UtilsService,
				LoginService
			) {
          

           this.toggleSideMenu = function(side,callback){
           		
           		if(LoginService.isAuthFb()){

           			if(UtilsService.isMob()){

           				document.addEventListener("deviceready", function () {
		           			
		           			if(UtilsService.getInternetState()){
						      	   this.performToggleSideMenu(side);
                       typeof(callback) != "undefined" ? callback() : null;
					      	  
                    }else{
					      		   UtilsService.showNoConnectionError();
					      	  
                    }

				      	});
           			}else{
           				this.performToggleSideMenu(side);
           				typeof(callback) != "undefined" ? callback() : null;
           			}

           		}else{
           			LoginService.showNoAuthError();
           		}
           		

           }

           this.performToggleSideMenu = function(side){
           		if(side == 'left')
      					$ionicSideMenuDelegate.toggleLeft();

      				if(side == 'right')
      					$ionicSideMenuDelegate.toggleRight();						    
           }


           this.blockSideMenu = function(){
           		$ionicSideMenuDelegate.canDragContent(false);
           }

           this.unBlockSideMenu = function(){
           		$ionicSideMenuDelegate.canDragContent(true);
           }
  });
