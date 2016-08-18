angular.module('app.menu-service', ['starter','app.utils-service','app.login-service'])
.service('MenuService',function(
				$ionicSideMenuDelegate,
				$localStorage,
				
				UtilsService,
				LoginService
			) {
          

           this.toggleSideMenu = function(side){
           		
           		if(UtilsService.isMob()){
                self = this;

		           	if(UtilsService.getInternetState()){
						      self.performToggleSideMenu(side);	  
                }else{
					      	UtilsService.showNoConnectionError();  
                }
                
              }else{
                self = this;
                self.performToggleSideMenu(side);   
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
