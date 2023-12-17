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

    if (this.currentUser.userToken) {
      this.currentUser.setUserIsHost(Boolean(localStorage.getItem("isHost")));
      this.currentUser.setUserId(this.getUserId());
      this.lobbyStore.setLobbyCode(localStorage.getItem("lobbyCode"));
      this.lobbyStore.setLobbyName(localStorage.getItem("lobbyName"));
      this.lobbyStore.setLobbyEventDate(localStorage.getItem("lobbyEventDate"));
      this.lobbyStore.setLobbyStarted(
        Boolean(localStorage.getItem("lobbyStarted"))
      );
      this.setGuestId(Number(localStorage.getItem("guest_id")));
    }
  };

  setGuestId = (value: RootStore["guestId"]) => {
    this.guestId = value;
    value && localStorage.setItem("guest_id", String(value));
  };

  getUserId = () => {
    if (!this.currentUser.userToken) return;
    return JSON.parse(atob(this.currentUser.userToken!.split(".")[1]))[
      "user_id"
    ];
  };

  fetchLobbyData = async () => {
    const promises = [
      this.getLobbyStarted(),
      this.guestId && this.getLobbyGuest(),
      this.getGivingToGuest(),
    ];

    return Promise.all(promises);
  };

  getGivingToGuest = async () => {
    if (this.lobbyStore.started) {
      this.guestId &&
        (await apiService.getGuest(this.guestId).then((res) => {
          this.lobbyStore.setGivingTo(res.data.giving_to);
          apiService.getGuest(Number(this.lobbyStore.giving_to)).then((res) => {
            apiService.getUser(res.data.user).then((res) => {
              this.lobbyStore.setGivingName(res.name);
              this.lobbyStore.setPref(res.preferences);
            });
          });
        }));
    }
  };

  getLobbyGuest = async () => {
    apiService.getLobbyGuests(this.lobbyStore.code).then((res) => {
      const ept = res.data.find(
        (item: any) => item.user === this.currentUser.userId
      );

      ept && this.setGuestId(ept.id);
    });
  };

  getLobbyStarted = async () => {
    apiService.getLobby(this.lobbyStore.code).then((res) => {
      this.lobbyStore.setLobbyStarted(res.data.started);
    });
  };
}
export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
