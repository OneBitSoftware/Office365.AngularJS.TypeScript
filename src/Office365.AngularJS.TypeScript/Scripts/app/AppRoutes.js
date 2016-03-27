var Office365DemoApp;
(function (Office365DemoApp) {
    'use strict';
    var Routes = (function () {
        function Routes() {
        }
        Routes.configure = function ($stateProvider, $urlRouterProvider, adalProvider) {
            $stateProvider
                .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                requireADLogin: false
            })
                .state('userdata', {
                url: '/userdata/',
                templateUrl: 'views/userdata.html',
                controller: Office365DemoApp.Controllers.UserDataController,
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
                controller: Office365DemoApp.Controllers.FilesController,
                controllerAs: 'ctrl',
                requireADLogin: true
            });
            //Default redirect route if non of the above match
            $urlRouterProvider.otherwise('/home');
        };
        return Routes;
    })();
    Office365DemoApp.Routes = Routes;
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=AppRoutes.js.map