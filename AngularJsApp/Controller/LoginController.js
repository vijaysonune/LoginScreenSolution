//----------------------------------------------------------------------------------------------------
//-----------------------------------------------State------------------------------------------------
LoginWebApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $rootScope, $state) {
    //  //debugger;
    $stateProvider
        .state("EmailIn", {

            url: "/EmailIn/:enviromentDetail",
            views: {
                'HomeUI': {
                    templateUrl: "HomeUI.html",
                    controller: "HomeUIController"
                }
            }
        })
        .state("Login", {
            url: "/Login",
            views: {
                '': {
                    templateUrl: "Login.html",
                    controller: "LoginController",

                }
            }
        })
}]);

    //------------------------------------------RootScope---------------------------------------
LoginWebApp.run(['$rootScope', '$state', function ($rootScope, $state) {

        // var ServerName = "localhost:59218";
        var AppName;
        AppName = "Login";
        //$rootScope.$broadcast.apply('AppName', AppName);
        $state.go(AppName);

}]);

  //---------We can set enviroment in below------------------------------------------------------------------------

LoginWebApp.factory("ServiceApiName", function () {
    return {
        ServerName: 'localhost:64872'
        // ServerName: 'QA-Serevr'
        //   ServerName: 'Prod-Server'

    }
})


LoginWebApp.controller('HomeController', function ($scope, $http, $stateParams, $state, $rootScope, ServiceApiName) {

    if ($rootScope.Auth != true) {
        $state.go("Login")
    }
    //debugger;
    var ServerName = ServiceApiName.ServerName;

    var PersonArray = new Array();
    //var PollerDropdn = new Array();

    $http({
        method: 'GET',
        url: "http://" + ServerName + "/api/Person/Get"
        //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
    }).then(function (result) {
        //  $scope.showLoader = false;
        debugger;
        for (var rows = 0; rows < result.data.length; rows++) {
            var PersonObj = new Object();
            debugger;
            PersonObj["Id"] = result.data[rows];
            PersonObj["Name"] = rows;
            PersonObj["ContactDetails"] = result.data[rows];
            PersonObj["IsDisable"] = rows;
            PersonArray.push(PersonObj);
        }
        $scope.Person = EnviromentDropdn;
        //$rootScope.EnviromentDropdnroot = EnviromentDropdn;

    });
});


LoginWebApp.controller('LoginController', function ($scope, $rootScope, $http, $state, $stateParams, ServiceApiName) {
    debugger;
    var ServerName = ServiceApiName.ServerName;
    $scope.DivEnable = true;
    var name = $stateParams.UserName;
    var pass = $stateParams.Password;
    $rootScope.Auth = false;
    //var LoginArr = new Array();
   

    $scope.submit = function (UserName, Password) {
        //debugger;
        var PostInputObject = new Object();
        PostInputObject.UserName =UserName;
        PostInputObject.Password = Password;
        $scope.DivEnable = false;
        var loginbool = false;
        $http({
            method: 'POST',
            url: "http://" + ServerName + "/api/Login/ValidateUsers",            
            data: PostInputObject,
            headers: {
                "Content-Type": "application/json"
            }            
        }).then(function (result) {
            debugger;
            if (result.data.Valid === false)
            loginbool = true;
            $rootScope.Auth = true;
            //$scope.viewTable = true;
            //$scope.ActiveMqScope = result.data;
            if (loginbool === false) {
                $scope.alert = "Enter the valid username & password";
            }
            else {
                $state.go("Home");
            }

        });
        
    }

    
    
   

});