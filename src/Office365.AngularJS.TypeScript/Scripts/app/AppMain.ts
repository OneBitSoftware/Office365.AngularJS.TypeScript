///<reference path="../../node_modules/typescript/lib/lib.d.ts" />
///<reference path="../../typings/browser.d.ts" />
///<reference path="_all.ts" />

module Office365DemoApp {
    'use strict';

    export class AppMain {
        app: ng.IModule;

        constructor() {

            this.app = angular.module("Office365DemoApp", ['ui.router', 'ui.bootstrap', 'AdalAngular', 'ui.grid']);

            //Configure app routes
            this.app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'adalSettings', 'adalAuthenticationServiceProvider',
                (
                    $stateProvider: angular.ui.IStateProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $httpProvider: angular.IHttpProvider,
                    adalSettings: Interfaces.IAdalSettings,
                    adalProvider
                ): void => {
                    Routes.configure($stateProvider, $urlRouterProvider, adalProvider);

                    //set up adal
                    AdalManager.configure($httpProvider, adalSettings, adalProvider);

                }
            ]);

            //Run, go for it
            this.app.run([function() {
                console.log('Running...');
            }]);

            //Set up directives, factories and services
            this.app.directive('topMenu', Directives.TopMenu.factory());
            this.app.service('fileService', Services.FileService);

            var settings: Interfaces.IAdalSettings = {
                tenant: 'onebit101.onmicrosoft.com', 
                clientId: 'ENTER ID HERE',
                azureAdEndpoints: {
                    // sharepoint site containing lists
                    'https://onebit101.sharepoint.com/sites/dev/_api/': 'https://onebit101.sharepoint.com',
                    //My OneDrive
                    "https://onebit101-my.sharepoint.com/_api/v1.0/me/files/root/children": "https://onebit101-my.sharepoint.com",
                    // MS Graph API
                    'https://graph.microsoft.com/v1.0/me': 'https://graph.microsoft.com/'
                },
                baseSPUrl: 'https://onebit101.sharepoint.com/sites/dev/_api/',
                baseOneDriveUrl: 'https://onebit101-my.sharepoint.com/_api/v1.0/me/',
            };

            this.app.constant('adalSettings', settings);

        }
    }

    //Run the application
    ((): void => {
        var main = new AppMain();
    })();
}
