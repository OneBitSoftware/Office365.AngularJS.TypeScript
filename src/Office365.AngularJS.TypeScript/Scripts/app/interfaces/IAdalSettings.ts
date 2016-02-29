module Office365DemoApp.Interfaces {
    'use strict';

    export interface IAdalSettings {
        tenant: string;
        clientId: string;
        baseSPUrl: string;
        baseOneDriveUrl: string;
        azureAdEndpoints: IAzureADEndpoints;
    }
}