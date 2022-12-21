import { Context, createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

import { PopupStore } from "./popup";
import { AuthStore } from "./auth";
import { CurrentUserStore } from "./currentUser";
import { LobbyStore } from "./lobby";
import { apiService } from "api/apiService";

export class RootStore {
  popupStore: PopupStore;
  authStore: AuthStore;
  currentUser: CurrentUserStore;
  lobbyStore: LobbyStore;
  guestId: number | null = null;

  constructor() {
    makeObservable(this, {
      guestId: observable,
      setGuestId: action,
    });

    this.popupStore = new PopupStore();
    this.authStore = new AuthStore();
    this.currentUser = new CurrentUserStore();
    this.lobbyStore = new LobbyStore();
  }

  init = async () => {
    this.currentUser.setUserToken(localStorage.getItem("access_token"));
    this.currentUser.setUserIsHost(Boolean(localStorage.getItem("isHost")));
    this.currentUser.setUserId(this.getUserId());
    this.lobbyStore.setLobbyCode(localStorage.getItem("lobbyCode"));
    this.lobbyStore.setLobbyName(localStorage.getItem("lobbyName"));
    this.lobbyStore.setLobbyEventDate(localStorage.getItem("lobbyEventDate"));
    this.lobbyStore.setLobbyStarted(
      Boolean(localStorage.getItem("lobbyStarted"))
    );
  };

  setGuestId = (value: RootStore["guestId"]) => {
    this.guestId = value;
  };

  getUserId = () => {
    if (!this.currentUser.userToken) return;
    return JSON.parse(atob(this.currentUser.userToken!.split(".")[1]))[
      "user_id"
    ];
  };

  getLobbyGuest = async () => {
    apiService.getLobbyGuests(this.lobbyStore.code!).then((res) => {
      const arr = JSON.parse(res.data);
      const ept = arr.filter(
        (item: any) => item.user === this.currentUser.userId
      );
      localStorage.setItem("guest_id", JSON.stringify(ept));
    });
  };
}
export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
