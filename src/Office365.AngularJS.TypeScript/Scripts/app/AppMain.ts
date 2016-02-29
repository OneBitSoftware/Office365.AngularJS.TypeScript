///<reference path="../../node_modules/typescript/lib/lib.d.ts" />
///<reference path="../../typings/browser.d.ts" />
///<reference path="_all.ts" />

module Office365DemoApp {
    'use strict';

    export class AppMain {
        app: ng.IModule;

        constructor() {

            this.app = angular.module("Office365DemoApp", ['ui.router', 'ui.bootstrap', 'AdalAngular']);

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

            //Set up directives, factories and services
            this.app.directive('topMenu', Directives.TopMenu.factory());
            this.app.service('fileService', () => new Services.FileService());
        }
    }

    //Run the application
    ((): void => {
        var main = new AppMain();
    })();
}
