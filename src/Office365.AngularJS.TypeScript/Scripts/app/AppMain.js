///<reference path="../../node_modules/typescript/lib/lib.d.ts" />
///<reference path="../../typings/browser.d.ts" />
///<reference path="_all.ts" />
var Office365DemoApp;
(function (Office365DemoApp) {
    'use strict';
    var AppMain = (function () {
        function AppMain() {
            this.app = angular.module("Office365DemoApp", ['ui.router', 'ui.bootstrap', 'AdalAngular', 'ui.grid']);
            //Configure app routes
            this.app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'adalSettings', 'adalAuthenticationServiceProvider',
                function ($stateProvider, $urlRouterProvider, $httpProvider, adalSettings, adalProvider) {
                    Office365DemoApp.Routes.configure($stateProvider, $urlRouterProvider, adalProvider);
                    //set up adal
                    Office365DemoApp.AdalManager.configure($httpProvider, adalSettings, adalProvider);
                }
            ]);
            //Run, go for it
            this.app.run([function () {
                    console.log('Running...');
                }]);
            //Set up directives, factories and services
            this.app.directive('topMenu', Office365DemoApp.Directives.TopMenu.factory());
            this.app.service('fileService', Office365DemoApp.Services.FileService);
            var settings = {
                tenant: 'onebit101.onmicrosoft.com',
                clientId: '12929f32-09c5-46df-a948-b59bc7cf7067',
                azureAdEndpoints: {
                    // sharepoint site containing lists
                    'https://onebit101.sharepoint.com/sites/dev/_api/': 'https://onebit101.sharepoint.com',
                    "https://onebit101-my.sharepoint.com/_api/v1.0/me/files/root/children": "https://onebit101-my.sharepoint.com",
                    // MS Graph API
                    'https://graph.microsoft.com/v1.0/me': 'https://graph.microsoft.com/'
                },
                baseSPUrl: 'https://onebit101.sharepoint.com/sites/dev/_api/',
                baseOneDriveUrl: 'https://onebit101-my.sharepoint.com/_api/v1.0/me/',
            };
            this.app.constant('adalSettings', settings);
        }
        return AppMain;
    })();
    Office365DemoApp.AppMain = AppMain;
    //Run the application
    (function () {
        var main = new AppMain();
    })();
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=AppMain.js.map