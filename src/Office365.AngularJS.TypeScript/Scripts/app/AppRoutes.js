var Office365DemoApp;
(function (Office365DemoApp) {
    'use strict';
    var Routes = (function () {
        function Routes() {
        }
        Routes.configure = function ($stateProvider, $urlRouterProvider) {
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
                controller: Office365DemoApp.Controllers.FilesController
            });
            //Default redirect route if non of the above match
            $urlRouterProvider.otherwise('/home');
        };
        return Routes;
    })();
    Office365DemoApp.Routes = Routes;
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=AppRoutes.js.map