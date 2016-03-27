module Office365DemoApp {
    'use strict';

    export class Routes {
        static configure(
            $stateProvider: IAdalStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            adalProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    requireADLogin: false
                })
                .state('userdata', {
                    url: '/userdata/',
                    templateUrl: 'views/userdata.html',
                    controller: Controllers.UserDataController,
                    controllerAs: 'ctrl',
                    requireADLogin: true
                })
                .state('emails', {
                    url: '/emails',
                    templateUrl: 'views/emails.html',
                    requireADLogin: true
                })
                .state('sharepoint', {
                    url: '/sharepoint',
                    templateUrl: 'views/sharepoint.html',
                    requireADLogin: true
                })
                .state('files', {
                    url: '/files',
                    templateUrl: 'views/files.html',
                    controller: Controllers.FilesController,
                    controllerAs: 'ctrl',
                    requireADLogin: true
                });
            
            //Default redirect route if non of the above match
            $urlRouterProvider.otherwise('/home');
        }
    }
}