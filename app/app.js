angular.module("myContacts.services", [])
.factory("o365Service", [function() {
    var o365Service = {};
    
    o365Service.getContacts = function() {
        return [
            { displayName: "Richard diZerega", emailAddresses: [{ address: "ridize@rzdemos.com" }] },
            { displayName: "Andrew Coates", emailAddresses: [{ address: "acoates@rzdemos.com" }] },
            { displayName: "Jeremy Thake", emailAddresses: [{ address: "jthake@rzdemos.com" }] },
            { displayName: "Rob Howard", emailAddresses: [{ address: "rhoward@rzdemos.com" }] }
        ];
    }
    
    return o365Service;
}]);

angular.module("myContacts.controllers", [])
.controller("loginCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.login = function() {
        $location.path("/contacts");
    };
}])
.controller("contactsCtrl", ["$scope", "o365Service", function($scope, o365Service) {
    $scope.contacts = o365Service.getContacts();
    
    $scope.dismiss = function() {
      $scope.error = null;  
    };
}]);

angular.module("myContacts", ["myContacts.services", "myContacts.controllers", "ngRoute"])
.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/login", {
        controller: "loginCtrl",
        templateUrl: "/app/templates/view-login.html"
    }).when ("/contacts", {
        controller: "contactsCtrl",
        templateUrl: "/app/templates/view-contacts.html"
    }).otherwise({
        redirectTo: "/login"
    });
}]);