module Office365DemoApp {
    'use strict';

    export interface IAdalState extends angular.ui.IState {
        requireADLogin?: boolean
    }
}