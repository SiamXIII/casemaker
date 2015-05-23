angular.module('casemaker-admin', ['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ngRoute', 'ngResource', 'oi.file'])
    .controller('adminCtrl', function ($scope) {

    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });