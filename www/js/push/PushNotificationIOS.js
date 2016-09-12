function onNotificationAPN (event) {

    $scope = angular.element(document.body).scope();
    $injector = angular.element(document.body).injector();                 

    
    if(event.nt == 2){
        setTimeout(function(){
            var injectorLocalStorage = $injector.get("$localStorage");
            var injectorExternalGET  = $injector.get("$location");
            var ionicViewLegacy      = $injector.get("$ionicViewService");
            var injectorROOTSCOPE    = $injector.get("$rootScope");
            
            ionicViewLegacy.nextViewOptions({ disableBack: true});

            ChatMessageService = $injector.get("ChatMessageService");                    
            //adicionar msg ao usuario e abri o chat
            ChatMessageService.addMSGtoList(event.alert,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, event.sFid,event.sname,0);
            ChatMessageService.loadLegacyChat(event.sFid,event.sname,null,event.alert);
            
            $scope.$apply();

        },2000);

    }else if(event.nt == 0){
            
            var injectorLocalStorage = $injector.get("$localStorage");
            var injectorExternalGET  = $injector.get("$location");
            var ionicViewLegacy      = $injector.get("$ionicViewService");
            var injectorROOTSCOPE    = $injector.get("$rootScope");
            
            ionicViewLegacy.nextViewOptions({ disableBack: true});

            dataReceive = {};

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
                       
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            //abri new matches found do push

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                injectorExternalGET.path("/app/newmatchesfound_receive");
                
                $scope.$apply();
            },5000);
            
    }else if(event.nt == 3){
            //MATCH FOUND

            var injectorLocalStorage = $injector.get("$localStorage");
            var injectorExternalGET  = $injector.get("$location");
            var ionicViewLegacy      = $injector.get("$ionicViewService");
            var injectorROOTSCOPE    = $injector.get("$rootScope");
            
            ionicViewLegacy.nextViewOptions({ disableBack: true});

            dataReceive = {};

            dataReceive.sFid = event.sFid;
            dataReceive.uName = event.sname;
            dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
            dataReceive.errMsg = event.alert;
            dataReceive.pPic = null;
            dataReceive.urlProfilepic = null;
                       
            injectorROOTSCOPE.newMatchFoundData = dataReceive;

            setTimeout(function(){
                navigator.notification.alert(event.alert);

                injectorExternalGET.path("/app/newmatchesfound_receive");
                
                $scope.$apply();
            },5000);
                
            
    }
}

//função para graver o token do ios
function tokenHandler (result) {    
    $scope = angular.element(document.body).scope();
    $injector = angular.element(document.body).injector();
    
    MainService = $injector.get("MainService");
    MainService.saveDeviceToken(result);
    
    //envia para registration
    $state = $injector.get("$state");
    $state.go("app.registration");
}