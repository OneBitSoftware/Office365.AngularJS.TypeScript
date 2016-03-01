module Office365DemoApp {

    export class AdalManager {
        static configure($httpProvider: ng.IHttpProvider, adalSettings: Interfaces.IAdalSettings, adalProvider) {
            adalProvider.init(
                {
                    tenant: adalSettings.tenant,
                    clientId: adalSettings.clientId,
                    postLogoutRedirectUri: 'http://localhost:8000',
                    endpoints: adalSettings.azureAdEndpoints,
                    requireADLogin: true
                },
                $httpProvider);
        }
    }
}