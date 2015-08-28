angular.module('appgpr.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout,$state,$stateParams, $http, $ionicPopup, $ionicLoading, $ionicHistory,User) {
    
    $rootScope.useremail = "";
  // Form data for the login modal
  $scope.loginData = {
    username: 'ishanika',
    password: 'welcome'
  };

  $scope.registerData = {
    username: null,
    password: null,
    email: null,
    displayname: null,
    organizationname: null
  };

    // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
   
    // Determine if the user is logged into Instagram
  $scope.isLoggedIn1 = function() {
     User.me().then(function(data){
      if(!data.result){
          return false;
       }
         return true;
         
    });    
  };
  
    
    $scope.getLoggedInUser = function() {
        User.me().then(function(data){	
      	if(!data.result){
        	$ionicPopup.alert({
            title: 'Your session has expired',
            template: 'Please login!'
          	});
            $state.go("app.login");
        }
    });    
        
        /*User.me().then(function(data){
           if(!data.result){
          alert(data.result.length);
          $rootScope.LoggedInUser=data.result.Username;
          $scope.$apply();
        }); */
    };
 
  $scope.testLoginStatus = function() {
     User.me().then(function(data){
	
      console.log(data)
      if(!data.result){
        $ionicPopup.alert({
            title: 'Your session has expired',
            template: 'Please login!'
          });
        //go home
        
          $state.go("app.squad");
        }
    });    
  };
  
    $scope.logout = function() {
  		
        User.logOut().then(function(data){
      	if(data==true){
            localStorage.setItem("token",'');
            $rootScope.LoggedInUser='';
           $timeout(function () {
               $ionicLoading.show({template:'Logging out....'});
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                $state.go('app.login');
                }, 30);
        	
          }
          else{
            $ionicPopup.alert({
                title: data.message,
                template: 'Please try again!'
              });
          }
    	});
        
        
        
    };
    
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('GameCtrl', function($rootScope, $scope, $ionicModal, $timeout,$state,$stateParams, $http, $ionicPopup, $ionicLoading, $ionicHistory,User,ClubSvc,TeamSvc) {
    //alert($rootScope.ClubId);
    //$rootScope.ClubId='41567cd0-4c06-11e5-ae0b-391e9e071642';
    $scope.getAllTeams = function() {     
        TeamSvc.getTeamsByClub($rootScope.ClubId).then(function(data){
          // alert(data.result.length);
          console.log(data.result);
          $scope.teams = data.result;
          $scope.$apply();
        }); 
    };
})



.controller('PlaylistCtrl', function($rootScope,$scope, $stateParams) {
})
//http://devdactic.com/user-auth-angularjs-ionic/
.controller('LoginCtrl', function($rootScope,$state, $scope, $stateParams, $location,$ionicPopup,User) {
    $rootScope.useremail='';
    $scope.loginData = {
        username: 'ishanika',
        password: 'welcome'
    };
    
    $scope.login = function () {
      	User.login($scope.loginData).then(function(data){
      	//console.log(data.result);
          if(data.result){
              $rootScope.useremail=data.result.Email;
            localStorage.setItem("token",data.result.access_token);
            $state.go("app.squad");
            $scope.loginmodal.hide();
          }
          else{
            $ionicPopup.alert({
                title: data.message,
                template: 'Please try again!'
              });
          }
    	});
    };
    
   
    $scope.logout1 = function(){
        alert("logout called");
       /*User.logOut().then(
         function() {
             console.log('Logout Success');
             alert('success');
             $state.go("app.playlists");
           }, function(error) {
             alert('error : ' + error);
           }
        )
       */
        /*$ionicLoading.show({template:'Logging out....'});
        $localstorage.set('loggin_state', '');
        $timeout(function () {
            $ionicLoading.hide();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
            $state.go('app.login');
            }, 30);
		*/
	};
     
   
    
  
});
