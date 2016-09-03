angular.module('app.match-service', ['starter'])
.service('MatchService',function($localStorage, UtilsService,
    LoginService
   ) {
          //função para esconder o menuTop
          this.hideTopMenu = function(){
          	menuAPP = angular.element(document.querySelector('#menuAPP'));
          	menuAPP.addClass('hidden');
        	
        	matchesView = angular.element(document.querySelector('#matchesView'));
        	matchesView.css("margin-top", "-40px");
          }

          //função para mostrar o menu do top
          this.showTopMenu = function(){
          	 menuAPP = angular.element(document.querySelector('#menuAPP'));
          	 menuAPP.removeClass('hidden');
          }

          //função para recalcular o tamanho da tela
          this.resizeHeight = function(){
          	heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
        	angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");
          }

          //função para recalcular o tamanho dos cards de match
          this.resizeHeightMatchCards = function(){
            heightClient = angular.element(document.querySelector('#matchesView'))[0].offsetHeight;
            angular.element(document.querySelector('#matchesView')).css("min-height", (heightClient+40)+"px");
          }
})

.service('SendMatchesToWS',function(
		$sce,$compile,$localStorage,$ionicViewService,
		$http,$rootScope,$state,$ionicLoading,$templateRequest,

		LoginService,UtilsService) {
            /*
            var cardList = [];
        
            //envia o action para poder gerar o match !
            this.sendInvite = function(jsonOBJ,callback) { 
                
                paramsToSend = {
                    "ent_invitee_fbid" : jsonOBJ.id,
                    "ent_user_action" : jsonOBJ.actionclick,
                    "ent_user_fbid" : jsonOBJ.ent_fbid,
                    "ent_id_event" : jsonOBJ.ent_id_event,
                    "ent_nome_fb" : jsonOBJ.name,
                };
                    
                $http.get(AdressService.inviteaction,{params: paramsToSend}).success(function(resp) {
                    callback(resp);
                });

            };

            //envia os like e dislikes para o servidor partty
            this.sendMatches = function(arrayMatches,eventData,callback) {     
                
                var fbid = RegistrationService.getUserFbID();
                var cardInfo = this.getCardsInfo();

                paramsToSend = {
                    "idevent" : eventData.id,
                    "ent_invitee_fbid" : fbid,
                    "offset" : cardInfo.offset,
                    "after" : cardInfo.after,
                    "before" : cardInfo.before

                };

                $registerMatches = new Array();
                
                angular.forEach(arrayMatches, function(value, key) {
                    if(value.id != fbid){
                        if(value.actionclick == 1)
                         paramsToSend["id_"+value.id] = 1;
                        if(value.actionclick == 2)
                         paramsToSend["id_"+value.id] = 0;
                    }
                });

                angularService = this;
                //envia matches para a api do parrty
                $http.get($localStorage.registermatchespartty,{params: paramsToSend}).success(function(resp) {
                    //retornar fb_ids de quem ja deu like
                    var matchFound = false;
                    /*
                    angular.forEach($rootScope.invitedActionData, function(value, key) {
                        if(value.id != $localStorage.usuarioData.ent_fbid){
                            //alert("##"+value.errNum);
                            if(value.errNum == 55){
                                matchFound = value;
                                
                            }
                        }
                    });
                    delete $rootScope.invitedActionData;
                    
                    console.log('matchFound ',matchFound);

                    if(matchFound){
                            delete matchFound;
                            $rootScope.newMatchFoundData = matchFound;
                            $ionicViewService.nextViewOptions({
                              disableBack: true
                            });
                            alert("Voce recebeu um match.");
                            $state.go("app.newmatchesfound");

                        
                    }else{
                        angularService.loadMatches($scope);
                    }
                    
                    callback({error : true});
                });                    
            };
            */
            //função para carrega matches de pessoas que estão no cache do server
            //baseadas nos criterios do perfil

            this.loadMatches = function($scope,idevent,callback){
            	
                self = this;

                console.log($scope);

                var postData = {
                	"sessfb" : LoginService.getToken(),
                	"sess_fb": LoginService.getToken(),
                	"ent_user_fbid": RegistrationService.getUserFbID(),
                	"idevent" : idevent
                };

                $http.get(AdressService.findmatchespartty,{params: postData}).then(function(resp) {
                        //se nao tiver matches envia para callback
                        if(resp.data.data.length == 0){
                            return callback({error: true});
                        }

                        //se tiver carrega template dos cards 
                        var element = angular.element(document.querySelector('#includeCards'));
                        var templateUrl = $sce.getTrustedResourceUrl('templates/matches/matches_cards.html');

                        self.cleanCards();
                        resp.data.data = self.removeMeFromCards(resp.data.data,RegistrationService.getUserFbID());                   
                        self.addArrayCards(resp);

                        $templateRequest(templateUrl).then(function(template) {
                            $compile(element.html(template).contents())($scope);
                            callback(resp);
                        
                        }, function(err) {
							callback(err);                                
                        });
                        
                });
            };

            //função de remover o proprio FB id dos matches
            this.removeMeFromCards = function(dados,fbid){
                var newArray = [];
                
                angular.forEach(dados, function(value, key) {
                    if(value.id != fbid){
                        newArray.push(value);
                    }
                });

                return newArray;
            }

            //função para dicionar card ao array
            this.addArrayCards = function(data){
                cardList = data;
            };

            //função para limpar o array de cards  
            this.cleanCards = function(){
                cardList = [];
            };

            //função para remover card do array por indice
            this.removeCards = function(index){
                cardList.splice(index, 1);
            };

            //função para retornar o card de um certo indice
            this.getCard = function(index){
                return cardList[index];
            };

            //função para retornar todos os cards
            this.getCards = function(){
                return cardList.data.data;
            }

            //função para pegar informaçao dos cards
            this.getCardsInfo = function(){
                return cardList.data;
            }
            
    });