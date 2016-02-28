///<reference path="../../node_modules/typescript/lib/lib.d.ts" />
///<reference path="../../typings/browser.d.ts" />
///<reference path="_all.ts" />
var Office365DemoApp;
(function (Office365DemoApp) {
    'use strict';
    var AppMain = (function () {
        function AppMain() {
            this.app = angular.module("Office365DemoApp", ['ui.router', 'ui.bootstrap']);
            //Configure app routes
            this.app.config(['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    Office365DemoApp.Routes.configure($stateProvider, $urlRouterProvider);
                }
            ]);
            //Run, go for it
            this.app.run([function () {
                    console.log('Running...');
                }]);
            this.app.directive('topMenu', Office365DemoApp.Directives.TopMenu.factory());
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