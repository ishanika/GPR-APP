angular.module('appgpr.services', [])

.factory('API', function() {
  var api_key = 'JiHugAPcEgftCWfK';
    return api_key;
})

.factory('User', function (API,$http) {

var el = new Everlive({
        apiKey: API,
        scheme: 'http',
        token: localStorage.getItem('token')
    });
  return {
    register: function(registerData){          
        return el.Users.register(
            registerData.username, 
            registerData.password, 
              { 
                Email: registerData.email, 
                DisplayName: registerData.displayname,
                OrganizationName: registerData.organizationname
               })
            .then(function (data) {
                return data;
            },
            function(error) {
                return error;
            });               
    },
    login: function(loginData) {                
        return el.Users.login(
            loginData.username,
            loginData.password)
            .then(function (data) {
                return data;
            },
            function(error) {
                return error;
            });
    },
    logOut: function() {
        return el.Users.logout()
            .then(function () {
                return true;
            },
            function(error) {
             alert(error);
                return false;
            });
  
    },	
    loginCancelled: function() {
      authService.loginCancelled();
    },
      
    isLoggedIn:function() {
        return el.Users.currentUser()
            .then(function (data) {
                return true;
            },
            function(error) {
                return false;
            });
    },
    me: function() {
        return el.Users.currentUser()
            .then(function (data) {
            	//alert(data.result);
                return data;
            },
            function(error) {
                return error;
            });
    }
  }
})

.factory('ClubSvc', function(API) {
	var el = new Everlive({
        apiKey: API,
        scheme: 'http',
        token: localStorage.getItem('token')
    });
   
    //var clubfilter = new Everlive.Query();
	//clubfilter.where().eq('Id', '41567cd0-4c06-11e5-ae0b-391e9e071642');
	
    var data = el.data('Clubs');
    //var query = new Everlive.Query();

    return {
        
        getClubById: function(id){
            return data.getById(id)
                .then(function (data) {
                    return data;
                },
                function(error) {
                    return error;
                });     
        },
    }
})

.factory('TeamSvc', function(API) {
	var el = new Everlive({
        apiKey: API,
        scheme: 'http',
        token: localStorage.getItem('token')
    });
   
    
    var expandExp = {
  						"Teams" : {
                                    "TargetTypeName" : "Clubs"
    							}
					};
    var query = new Everlive.Query();
	
    //query.where().eq('ClubId', clubid);
    
   var data = el.data('Teams');
       
    return {
        getTeamsByClub: function(clubid){ 
           query.expand(expandExp).where().eq('ClubId', clubid);
            return data.get(query)
                .then(function (data) {
                    return data;
                },
                function(error) {
                    return error;
                });               
        },
        
        getTeamById: function(id){
            return data.getById(id)
                .then(function (data) {
                    return data;
                },
                function(error) {
                    return error;
                });     
        },
		
        
    }
})

