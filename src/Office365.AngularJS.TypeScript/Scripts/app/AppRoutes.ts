module Office365DemoApp {
    'use strict';

    export class Routes {
        static configure(
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            adalProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html'
                })
                .state('emails', {
                    url: '/emails',
                    templateUrl: 'views/emails.html'
                })
                .state('sharepoint', {
                    url: '/sharepoint',
                    templateUrl: 'views/sharepoint.html'
                })
                .state('files', {
                    url: '/files',
                    templateUrl: 'views/files.html',
                    controller: Controllers.FilesController,
                    controllerAs: 'ctrl'
                });
            
            //Default redirect route if non of the above match
            $urlRouterProvider.otherwise('/home');
        }
    }
}