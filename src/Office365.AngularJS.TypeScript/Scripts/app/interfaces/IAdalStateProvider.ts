module Office365DemoApp {
    'use strict';

    export interface IAdalStateProvider extends angular.ui.IStateProvider {
        state(name: string, config: IAdalState): IAdalStateProvider;
        state(config: IAdalState): IAdalStateProvider;
        decorator(name?: string, decorator?: (state: IAdalState, parent: Function) => any): any;
    }
}