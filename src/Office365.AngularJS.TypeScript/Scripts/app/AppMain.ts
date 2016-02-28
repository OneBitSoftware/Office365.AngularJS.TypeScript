///<reference path="../../node_modules/typescript/lib/lib.d.ts" />
///<reference path="../../typings/browser.d.ts" />
///<reference path="_all.ts" />

module Office365DemoApp {
    'use strict';

    export class AppMain {
        app: ng.IModule;

        constructor() {

            this.app = angular.module("Office365DemoApp", ['ui.router', 'ui.bootstrap']);

            //Configure app routes
            this.app.config(['$stateProvider', '$urlRouterProvider',
                ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
                    Routes.configure($stateProvider, $urlRouterProvider);
                }
            ]);

            //Run, go for it
            this.app.run([function() {
                console.log('Running...');
            }]);

            this.app.directive('topMenu', Directives.TopMenu.factory());
        }
    }

    //Run the application
    ((): void => {
        var main = new AppMain();
    })();
}
