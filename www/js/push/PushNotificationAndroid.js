function onNotificationGCM(e) { 
    
    $scope = angular.element(document.body).scope();
    $injector = angular.element(document.body).injector();                 

    switch(e.event){ 

        case 'registered':
            //Registra o push para android
            if (e.regid.length > 0){ 
                //grava o token no localstorage
                //MainService = $injector.get("MainService");
                //MainService.saveDeviceToken(e.regid);
                //envia para o controlador registration
                //$state = $injector.get("$state");
                ///$state.go("app.registration");
                console.log(e.regid);                          
            } 
        break;  

        case 'message': 
    
           if (e.foreground){
                //retorna scopo, localstorage e injetor     
                var injectorLocalStorage = $injector.get("$localStorage");
                var injectorExternalGET  = $injector.get("$location");
                var ionicViewLegacy      = $injector.get("$ionicViewService");
                var injectorROOTSCOPE    = $injector.get("$rootScope");
                    
                ionicViewLegacy.nextViewOptions({ disableBack: true });

                if(e.payload.action == 2){
                    
                    //Carrega serviço de mensagem e adiciona la lista
                    ChatMessageService = injectorExternal.get("ChatMessageService");
                    ChatMessageService.addMSGtoList(e.payload.payload,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, e.payload.sfid,e.payload.sname,0);
                    
                    $scope.$apply();
                    
                }else if(e.payload.action == 3){
                    
                    dataReceive = {};

                    dataReceive.sFid = e.payload.sfid;
                    dataReceive.uName = e.payload.sname;
                    dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                    dataReceive.errMsg = e.payload.payload;
                    dataReceive.pPic = null;
                    dataReceive.urlProfilepic = null;

                    //adicionar ao newMatchFoundData para simular o match vindo pelo PUSH
                    injectorROOTSCOPE.newMatchFoundData = dataReceive;

                    setTimeout(function(){
                        navigator.notification.alert(e.payload.payload);
                        //envia para newmatchesfound_receive
                        injectorExternalGET.path("/app/newmatchesfound_receive");
                        $scope.$apply();
                    },5000);
                }
            }else{
            
                if(e.payload.action == 2){
                     
                    setTimeout(function(){
                        ChatMessageService = $injector.get("ChatMessageService");
                        //adiciona mensagem a lista e ao chat
                        ChatMessageService.addMSGtoList(e.payload.payload,injectorLocalStorage.usuarioData.ent_fbid,injectorLocalStorage.usuarioData.ent_first_name, e.payload.sfid,e.payload.sname,0);
                        ChatMessageService.loadLegacyChat(e.payload.sfid,e.payload.sname,null,e.payload.payload);
                        
                        $scope.$apply();
                        
                    },2000);

                }else if(e.payload.action == 3){
                    
                    dataReceive = {};

                    dataReceive.sFid = e.payload.sfid;
                    dataReceive.uName = e.payload.sname;
                    dataReceive.ent_first_name = injectorLocalStorage.usuarioData.ent_first_name;
                    dataReceive.errMsg = e.payload.payload;
                    dataReceive.pPic = null;
                    dataReceive.urlProfilepic = null;
                                       
                    injectorROOTSCOPE.newMatchFoundData = dataReceive;

                    setTimeout(function(){
                        navigator.notification.alert(e.payload.payload);
                        //envia ao newmatchesfound_receive
                        injectorExternalGET.path("/app/newmatchesfound_receive");
                        
                        $scope.$apply();
                    },5000);
                }
            }
        break;   

        case 'error': 
            console.log('Error Push: ',e.msg); 
        break;    

        default: 
            console.log('Error Push:','An unknown event was received'); 
        break; 
    } 
}