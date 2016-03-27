var Office365DemoApp;
(function (Office365DemoApp) {
    var AdalManager = (function () {
        function AdalManager() {
        }
        AdalManager.configure = function ($httpProvider, adalSettings, adalProvider) {
            adalProvider.init({
                tenant: adalSettings.tenant,
                clientId: adalSettings.clientId,
                postLogoutRedirectUri: 'http://localhost:5000',
                endpoints: adalSettings.azureAdEndpoints,
                requireADLogin: true
            }, $httpProvider);
        };
        return AdalManager;
    })();
    Office365DemoApp.AdalManager = AdalManager;
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=AdalManager.js.map