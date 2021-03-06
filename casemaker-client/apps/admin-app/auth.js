angular.module('casemaker-admin')
    .controller('AdminUserCtrl', function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService) {

        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function (data) {
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/admin");
                }).error(function (status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }

        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/login");
            }
        }
    })
    .factory('AuthenticationService', function ($window) {
        var auth = {
            isLogged: $window.sessionStorage.token ? true : false
        }

        return auth;
    })
    .
    factory('UserService', function ($http, CONFIG) {
        return {
            logIn: function (username, password) {
                return $http.post(CONFIG.serverUrl + '/login', {username: username, password: password});
            },

            logOut: function () {

            }
        }
    })
    .factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("/login");
                }

                return $q.reject(rejection);
            }
        };
    });
/**
 * Created by Siam on 6/10/2015.
 */
