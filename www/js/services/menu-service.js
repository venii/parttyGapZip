angular.module('app.menu-service', ['starter','app.utils-service','app.login-service'])
.service('MenuService',function($ionicSideMenuDelegate) {
          
   this.toggleSideMenu = function(side){
      s.performToggleSideMenu(side);   
   }

   this.performToggleSideMenu = function(side){
   		if(side == 'left'){
				$ionicSideMenuDelegate.toggleLeft();
      }
			if(side == 'right'){
				$ionicSideMenuDelegate.toggleRight();
      }						    
   }

   this.blockSideMenu = function(){
   		$ionicSideMenuDelegate.canDragContent(false);
   }

   this.unBlockSideMenu = function(){
   		$ionicSideMenuDelegate.canDragContent(true);
   }
});
