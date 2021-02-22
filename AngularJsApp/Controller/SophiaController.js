

//----------------------------------------------------------------------------------------------------
//-----------------------------------------------State------------------------------------------------
SophiaWeb.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $rootScope, $state) {
    //  //debugger;
    $stateProvider
        .state("EmailIn", {

            url: "/EmailIn/:enviromentDetail",
            views: {
                'EmailInUI': {
                    templateUrl: "EmailIn.html",
                    controller: "EmailInController"
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

    

        .state("Home", {

            url: "/Home",
            views: {
                'HomeUI': {
                    templateUrl: "Index.html",
                    controller: "HomeController",
                    // resolve: {
                    // Authenticate: function () {
                    //     if ($rootScope.Auth != true)
                    //     { $state.go("Login"); };
                    // }
                    //}
                }
            }

        })

        .state("ActiveMq", {

            url: "/ActiveMq/:envDropdown/:pollerDn",
            views: {
                'ActiveMqUI': {
                    templateUrl: "ActiveMqPage.html",
                    controller: "ActiveMqController",
                    // resolve: {
                    // Authenticate: function () {
                    //     if ($rootScope.Auth != true)
                    //     { $state.go("Login"); };
                    // }
                    //}
                }
            }

        })

        .state("Orchestartor", {

            url: "/Orchestartor/:envDropdown/:pollerDn",
            views: {
                'OrchestartorUI': {
                    templateUrl: "Orchestartor.html",
                    controller: "OrchestartorController",
                    // resolve: {
                    // Authenticate: function () {
                    //     if ($rootScope.Auth != true)
                    //     { $state.go("Login"); };
                    // }
                    //}
                }
            }

        })

        .state("OldOrchestartor", {

            url: "/OldOrchestartorUI/:envDropdown/:pollerDn",
            views: {
                'OldOrchestartorUI': {
                    templateUrl: "OldOrchestartor.html",
                    controller: "OldOrchestartorController",
                    // resolve: {
                    // Authenticate: function () {
                    //     if ($rootScope.Auth != true)
                    //     { $state.go("Login"); };
                    // }
                    //}
                }
            }

        })

        


}]);


//------------------------------------------RootScope---------------------------------------
SophiaWeb.run(['$rootScope', '$state', function ($rootScope, $state) {

    // var ServerName = "localhost:59218";
    var AppName;
    AppName = "Login";
    //$rootScope.$broadcast.apply('AppName', AppName);
    $state.go(AppName);

}]);

//------------------------------------------Server Name---------------------------------------

SophiaWeb.factory("ServiceApiName", function () {
    return {
         ServerName: 'localhost:63241'
     // ServerName: 'qa-emailin-app/Sophia'
     //   ServerName: 'localhost/Sophia'

    }
})


//------------------------------------------Controller---------------------------------------
SophiaWeb.controller('OrchestartorController', function ($scope, $http, $stateParams, $state, $rootScope, ServiceApiName) {


    if ($rootScope.Auth != true) {
        $state.go("Login")
    }
    debugger;
    var ServerName = ServiceApiName.ServerName;
    var EnviromentDropdn = $rootScope.EnviromentDropdnroot;
    var PollerDropdn = $rootScope.PollerDropdnroot;

    var envDropdown = $stateParams.envDropdown;
    var pollerDn = $stateParams.pollerDn;
    $scope.enviromentScope = EnviromentDropdn[envDropdown].Name;
    $scope.businessAreaScope = PollerDropdn[pollerDn].PollerName;
    $scope.Confirm_Empty = false;
    
        $scope.running = true;
        var callUpdate = false;
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/GetOrchestratorMetadata?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
            debugger;
            $scope.viewTable = true;
            $scope.running = false;
            $scope.OrchestratorScope = result.data;

        })
    

    $scope.replayInstruction = function (item) {
        //debugger;
        var GetAll = new Object();
        GetAll._id = item._id;
        GetAll.businessArea = item.businessArea;
        GetAll.AuditId = item.AuditId;
        GetAll.EmailId = item.EmailId;
        GetAll.ReTryCount = item.ReTryCount;
        GetAll.EnviromentName = EnviromentDropdn[envDropdown].Name;
        GetAll.PollerName = PollerDropdn[pollerDn].PollerName;
        $scope.ResultValue ="Wait..!"
        // $scope.running = true;
        // var callUpdate = false;
        $http({
            method: 'Get',
            url: "http://" + ServerName + "/SophiaOcr/GetReplayInstructions?_id=" + item._id + "&AuditId=" + item.AuditId + "&enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            // url: "http://localhost/Sophia/SophiaOcr/PostReplayInstructions",
            // dataType: 'json',

            // data: GetAll,
            // headers: {
            //      "Content-Type": "application/json"
            // }        
        }).then(function (result) {
            debugger;
            //$scope.viewTable = true;
            // $scope.running = false;
            $scope.op = result.data;
            $scope.GetOrchestartorData(envDropdown, pollerDn);
            $scope.ResultValue = "Result :" + item._id + " is " + result.data;
            
        })
    }

    $scope.emptyInstruction = function (item) {
        debugger;
        var GetAll = new Object();
        GetAll._id = item._id;
        GetAll.businessArea = item.businessArea;
        GetAll.AuditId = item.AuditId;
        GetAll.EmailId = item.EmailId;
        GetAll.ReTryCount = item.ReTryCount;
        GetAll.EnviromentName = EnviromentDropdn[envDropdown].Name;
        GetAll.PollerName = PollerDropdn[pollerDn].PollerName;
        alert("You want to delete RequestGridFs id : " + item.RequestFsId)
        item.Confirm_Empty = true;
        //debugger;

      
    }

    $scope.ConfirmemptyInstruction = function (item) {
       
        item.Confirm_Empty = true;
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/EmptyInstructions?_id=" + item._id + "&enviromentName=" + EnviromentDropdn[envDropdown].Name + "&pollerName=" + PollerDropdn[pollerDn].PollerName + "&_requestdocumentid=" + item.RequestFsId + '&_responsedocumentid=' + item.ResponseFsId + ''
            //  dataType: 'json',

            // data: GetAll,
            // headers: {
            //     "Content-Type": "application/json"
            // }
        }).then(function (response) {
            //debugger;
            if (response.data === 'Successful') {
                $scope.alert = ("Status :Successfully Updated")
                $scope.ResultValue = "Result :" + item._id + " is Successfully Updated!";
                item.Confirm_Empty = false;
                $scope.GetOrchestartorData(envDropdown, pollerDn);

            }
            else {
                $scope.alert = ("Error" + response.data);
                $scope.ResultValue = "Result :" + item._id + " is " + result.data + "!";
                item.Confirm_Empty = false;
                $scope.GetOrchestartorData(envDropdown, pollerDn);

            }
        });
    }
    $scope.GetOrchestartorData = function (envDropdown, pollerDn) {
        $scope.running = true;
        var callUpdate = false;
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/GetOrchestratorMetadata?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
            $scope.viewTable = true;
            $scope.running = false;
            $scope.OrchestratorScope = result.data;

        })
    }


});


SophiaWeb.controller('OldOrchestartorController', function ($scope, $http, $stateParams, $state, $rootScope, ServiceApiName) {
    if ($rootScope.Auth != true) {
        $state.go("Login")
    }

    var ServerName = ServiceApiName.ServerName;
    var EnviromentDropdn = $rootScope.EnviromentDropdnroot;
    var PollerDropdn = $rootScope.PollerDropdnroot;

    var envDropdown = $stateParams.envDropdown;
    var pollerDn = $stateParams.pollerDn;
    $scope.enviromentScope = EnviromentDropdn[envDropdown].Name;
    $scope.businessAreaScope = PollerDropdn[pollerDn].PollerName;

    
        //debugger;
        $scope.running = true;
        var callUpdate = false;
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/GetOrchestratorMetadata?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
            $scope.viewTable = true;
            $scope.running = false;
            $scope.OldOrchestratorScope = result.data;

        })
    

    $scope.OldreplayInstruction = function (item) {
        //debugger;
        var GetAll = new Object();
        GetAll._id = item._id;
        GetAll.businessArea = item.businessArea;
        GetAll.AuditId = item.AuditId;
        GetAll.EmailId = item.EmailId;
        GetAll.ReTryCount = item.ReTryCount;
        GetAll.EnviromentName = EnviromentDropdn[envDropdown].Name;
        GetAll.PollerName = PollerDropdn[pollerDn].PollerName;
        // $scope.running = true;
        // var callUpdate = false;
        $http({
            method: 'Get',
            url: "http://" + ServerName + "/SophiaOcr/GetOldReplayInstructions?_id=" + item._id + "&AuditId=" + item.AuditId + "&enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            // url: "http://localhost/Sophia/SophiaOcr/PostReplayInstructions",
            // dataType: 'json',

            // data: GetAll,
            // headers: {
            //      "Content-Type": "application/json"
            // }        
        }).then(function (result) {
            //debugger;
            //$scope.viewTable = true;
            // $scope.running = false;
            $scope.op = result.data;
            $scope.GetOrchestartorData(envDropdown, pollerDn);
            

        })
    }

    $scope.GetOrchestartorData = function (envDropdown, pollerDn) {
        $scope.running = true;
        var callUpdate = false;
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/GetOrchestratorMetadata?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
            $scope.viewTable = true;
            $scope.running = false;
            $scope.OrchestratorScope = result.data;

        })
    }


});


SophiaWeb.controller('HomeController', function ($scope, $http, $stateParams, $state, $rootScope, ServiceApiName) {

    if ($rootScope.Auth != true) {
        $state.go("Login")
    }
    //debugger;
    var ServerName = ServiceApiName.ServerName;
    
    var EnviromentDropdn = new Array();
    var PollerDropdn = new Array();
   
    $http({
        method: 'GET',
        url: "http://" + ServerName + "/SophiaOcr/EnviromentList"
        //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
    }).then(function (result) {
      //  $scope.showLoader = false;
        //debugger;
        for (var rows = 0; rows < result.data.length; rows++) {
            var EnviromentObj = new Object();
            EnviromentObj["Name"] = result.data[rows];
            EnviromentObj["value"] = rows;
            EnviromentDropdn.push(EnviromentObj);
        }
        $scope.EnviromentScope = EnviromentDropdn;
        $rootScope.EnviromentDropdnroot = EnviromentDropdn;
        
    });


    $scope.ChangeVal = function (envDropdown) {
        //debugger;
        PollerDropdn = [];
        $scope.ClientsScope = null;
        ////debugger;
        //$scope.vijay=TestSuiteDropdn[testSuiteDn];
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/PollerList?enviromentName=" + EnviromentDropdn[envDropdown].Name + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
            }).then(function (result) {             

                for (var rows = 0; rows < result.data.length; rows++) {
                    var ClientObj = new Object();
                    ClientObj["PollerName"] = result.data[rows];
                    ClientObj["value"] = rows;
                    PollerDropdn.push(ClientObj);
                }
                $scope.PollersScope = PollerDropdn;
                $rootScope.PollerDropdnroot = PollerDropdn;
            })
    }


    $scope.GetOrchestartorData = function (envDropdown, pollerDn) {

        $state.go("Orchestartor", { envDropdown: envDropdown, pollerDn: pollerDn });
    }

    $scope.GetOldOrchestartorData = function (envDropdown, pollerDn) {

        $state.go("OldOrchestartor", { envDropdown: envDropdown, pollerDn: pollerDn });
    }

       

    $scope.GetActiveMqData = function (envDropdown, pollerDn) {
        //debugger;
        $state.go("ActiveMq", { envDropdown: envDropdown, pollerDn: pollerDn });
    }
   


   

    //$scope.replayInstruction = function (item, envDropdown, pollerDn) {
    //    var GetAll = new Object();
    //    GetAll._id = item._id;
    //    GetAll.businessArea = item.businessArea;
    //    GetAll.AuditId = item.AuditId;
    //    GetAll.EmailId = item.EmailId;
    //    GetAll.ReTryCount = item.ReTryCount;
    //    GetAll.EnviromentName = EnviromentDropdn[envDropdown].Name;
    //    GetAll.PollerName = PollerDropdn[pollerDn].PollerName;
    //    //debugger;
    //    $http({
    //        url: "http://localhost:63241/SophiaOcr/PostReplayInstructions",
    //       // url: "http://localhost/Sophia/SophiaOcr/PostReplayInstructions",
    //        dataType: 'json',
    //        method: 'POST',
    //        data: GetAll,
    //        headers: {
    //            "Content-Type": "application/json"
    //        }        
    //        }).then(function (response) {
    //        //debugger;
    //        if (response.data === '0') {
    //            $scope.alert = ("Status :Successfully Updated")

    //        }
    //        else {
    //            $scope.alert = ("Error" + response.data);

    //        }
    //    });




    //}


    

    
    

});


SophiaWeb.controller('LoginController', function ($scope, $rootScope, $http, $state, $stateParams, ServiceApiName) {
       debugger;
    var ServerName = ServiceApiName.ServerName;
    $scope.DivEnable = true;
    var name = $stateParams.UserName;
    var pass = $stateParams.Password;
    $rootScope.Auth = false;
    var LoginArr = new Array();
    $http({
        method: 'GET',
        url: "http://" + ServerName + "/SophiaOcr/GetUserList"
        //params: 'ims4test'
    }).then(function (result) {
            ////debugger;
        for (var rows = 0; rows < result.data.length; rows++) {
            var LoginObj = new Object();
            LoginObj["UserName"] = result.data[rows].UserName;
            LoginObj["Password"] = result.data[rows].Password;
            LoginObj["Email"] = result.data[rows].Email;
            LoginArr.push(LoginObj);
        }

    });

    $scope.submit = function (UserName, Password) {
        ////debugger;
        $scope.DivEnable = false;
        var loginbool = false;
        for (var rows = 0; rows < LoginArr.length; rows++) {
            if (UserName === LoginArr[rows].UserName && Password === LoginArr[rows].Password) {
                $rootScope.Auth = true;
                loginbool = true;
            }
        }
        if (loginbool === false) {
            $scope.alert = "Enter the valid username & password";
        }
        else {
            $state.go("Home");
        }
    }


});

//------------------------------------------Controller---------------------------------------
SophiaWeb.controller('ActiveMqController', function ($scope, $http, $stateParams, $state, $rootScope, ServiceApiName) {
    debugger;
    if ($rootScope.Auth != true) {
        $state.go("Login")
    }

    var envDropdown = $stateParams.envDropdown;
    var pollerDn = $stateParams.pollerDn;
    var ServerName = ServiceApiName.ServerName;
    var EnviromentDropdn = $rootScope.EnviromentDropdnroot;
    var PollerDropdn = $rootScope.PollerDropdnroot;
    var PostInputObject = new Object();
    PostInputObject.enviromentName = EnviromentDropdn[envDropdown].Name;
    PostInputObject.pollerName = PollerDropdn[pollerDn].PollerName;

    $scope.enviromentScope = EnviromentDropdn[envDropdown].Name;
    $scope.businessAreaScope = PollerDropdn[pollerDn].PollerName;
    $scope.running = true;
    $scope.DeletedClicked = false;

    $scope.ActiveMqClicked = function () {
        $http({
            method: 'GET',
            url: "http://" + ServerName + "/SophiaOcr/GetActiveMqCreateDateTime?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
    //$http({
    //    method: 'POST',
    //    url: "http://" + ServerName + "/SophiaOcr/PostActiveMqCreateDateTime",
    //    dataType: 'json',
    //    data: PostInputObject,
    //    headers: {
    //        "Content-Type": "application/json"
    //      }
    //    }).then(function (result) {
            debugger;
            $scope.running = false;
            $scope.viewTable = true;
            $scope.ActiveMqScope = result.data;
            

        })
   }

    $scope.ActiveMqClicked = function () {
        $scope.running = true;
        var PostInputObject = new Object();
        PostInputObject.enviromentName = EnviromentDropdn[envDropdown].Name;
        PostInputObject.pollerName = PollerDropdn[pollerDn].PollerName;
    //$http({
    //    method: 'GET',
    //    url: "http://" + ServerName + "/SophiaOcr/GetActiveMqCreateDateTime?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&pollerName=' + PollerDropdn[pollerDn].PollerName + ''
    //    //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
    //}).then(function (result) {
        $http({
            method: 'POST',
            url: "http://" + ServerName + "/SophiaOcr/PostActiveMqCreateDateTime",
            dataType: 'json',
            data: PostInputObject,
            headers: {
                "Content-Type": "application/json"
            }
            //url: "http://" + ServerName + "/api/Values/GetAll/" + $rootScope.enviroment
        }).then(function (result) {
        ////debugger;
        $scope.running = false;
        $scope.viewTable = true;
        $scope.ActiveMqScope = result.data;

    })
    }

    $scope.DeleteActiveMqInstruction = function (item) {
        debugger; 
        $scope.DeletedClicked = true;
        $scope.running = true;
        var GetAll = new Object();
        GetAll._id = item.EREF;
        GetAll.CRDATTIM = item.CRDATTIM;
        GetAll.RECORDCD = item.RECORDCD;
        GetAll.DATAVALUE = item.DATAVALUE;        
        GetAll.EnviromentName = EnviromentDropdn[envDropdown].Name;
        GetAll.PollerName = PollerDropdn[pollerDn].PollerName;
        $scope.ResultValue="Wait.....!"
        // var callUpdate = false;
        $http({
            method: 'Get',
            url: "http://" + ServerName + "/SophiaOcr/DeleteActiveMqInstruction?enviromentName=" + EnviromentDropdn[envDropdown].Name + '&NMSCorrelationID=' + item.EREF + ''
           
                   
        }).then(function (result) {
            //debugger;
            //$scope.viewTable = true;
            $scope.running = false;
            $scope.ResultValue = "Result :" + item.EREF+ " is " + result.data;
            $scope.DeletedClicked = false;
            if (result.data == 'Successfully Deleted') {
                $scope.ResultColor = "green";
            }
            else {
                $scope.ResultColor = "red";
            }
            $scope.ActiveMqClicked();
            
        })

    }   

});