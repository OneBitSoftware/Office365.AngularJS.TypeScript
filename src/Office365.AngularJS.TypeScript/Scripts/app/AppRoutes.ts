module Office365DemoApp {
    'use strict';

    export class Routes {
        static configure($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html'
                })
                .state('files', {
                    url: '/files',
                    templateUrl: 'views/files.html'
                });
            
            //Default redirect route if non of the above match
            $urlRouterProvider.otherwise('/home');

        }
    }
}