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
            this.app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'adalProvider', 'adalSettings',
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
            this.app.service('fileService', function () { return new Office365DemoApp.Services.FileService(); });
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