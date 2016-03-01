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
                    //AdalManager.configure($httpProvider, adalSettings, adalProvider);

                }
            ]);

            //Run, go for it
            this.app.run([function() {
                console.log('Running...');
            }]);

            //Set up directives, factories and services
            this.app.directive('topMenu', Directives.TopMenu.factory());
            this.app.service('fileService', () => new Services.FileService());

            var settings: Interfaces.IAdalSettings = {
                tenant: '0534985e-032e-430a-9b95-60f5277b96f4', //Update with your tenant ID
                clientId: 'b01e72a7-6017-4cf0-b16a-e032f6c869c4', //Update with your client ID
                azureAdEndpoints: {
                    // sharepoint site containing lists
                    'https://cand3.sharepoint.com/sites/ChadDev/ExpenseApp/_api/': 'https://cand3.sharepoint.com',
                    // MS Graph API
                    'https://graph.microsoft.com/v1.0/me': 'https://graph.microsoft.com/'
                },
                baseSPUrl: 'https://cand3.sharepoint.com/sites/ChadDev/ExpenseApp/_api/',
                baseOneDriveUrl: 'https://graph.microsoft.com/v1.0/me',
            };

            this.app.constant('adalSettings', settings);

        }
    }

    //Run the application
    ((): void => {
        var main = new AppMain();
    })();
}
