import { Context, createContext, useContext } from 'react';
import { action, makeObservable, observable } from 'mobx';

import { PopupStore } from './popup';
import { AuthStore } from './auth';
import { CurrentUserStore } from './currentUser';
import { LobbyStore } from './lobby';

export class RootStore {
    popupStore: PopupStore;
    authStore: AuthStore;
    currentUser: CurrentUserStore;
    lobbyStore: LobbyStore;

    constructor() {
        makeObservable(this, {

        });

        this.popupStore = new PopupStore();
        this.authStore = new AuthStore();
        this.currentUser = new CurrentUserStore();
        this.lobbyStore = new LobbyStore();
    }

    init = async () => {
        this.currentUser.setUserToken(localStorage.getItem('userToken'))
        this.currentUser.setUserIsHost(Boolean(localStorage.getItem('isHost')))
        this.lobbyStore.setLobbyCode(localStorage.getItem('lobbyCode'))
        this.lobbyStore.setLobbyName(localStorage.getItem('lobbyName'))
        this.lobbyStore.setLobbyEventDate(localStorage.getItem('lobbyEventDate'))
        this.lobbyStore.setLobbyStarted(Boolean(localStorage.getItem('lobbyStarted')))
    }
}
export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () => useContext(RootStoreContext as Context<RootStore>);