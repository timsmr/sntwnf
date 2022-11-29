import { Context, createContext, useContext } from 'react';
import { action, makeObservable, observable } from 'mobx';

import { PopupStore } from './popup';
import { AuthStore } from './auth';
import { CurrentUserStore } from './currentUser';

export class RootStore {
    popupStore: PopupStore;
    authStore: AuthStore;
    currentUser: CurrentUserStore;

    constructor() {
        makeObservable(this, {

        });

        this.popupStore = new PopupStore();
        this.authStore = new AuthStore();
        this.currentUser = new CurrentUserStore();
    }

    init() {
        console.log('pls help me finish this project')
    }
}
export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () => useContext(RootStoreContext as Context<RootStore>);