import { makeObservable, observable, action } from "mobx";

class LobbyStore {
  code: string | null = null;
  name: string | null = null;
  event_date: string | null = null;
  started: boolean | null = null;
  giving_to: string | null = null;
  preferences: string | null = null;

  constructor() {
    makeObservable(this, {
      name: observable,
      event_date: observable,
      code: observable,
      started: observable,
      giving_to: observable,
      preferences: observable,
      setLobbyCode: action,
      setLobbyName: action,
      setLobbyEventDate: action,
      setLobbyStarted: action,
      setGivingTo: action,
      setPref: action,
    });
  }

  setLobbyCode = (code: LobbyStore["code"]) => {
    this.code = code;
    code && localStorage.setItem("lobbyCode", code);
  };

  setLobbyName = (name: LobbyStore["name"] = null) => {
    this.name = name;
    name && localStorage.setItem("lobbyName", name);
  };

  setLobbyEventDate = (event_date: LobbyStore["event_date"] = null) => {
    this.event_date = event_date;
    event_date && localStorage.setItem("lobbyEventDate", event_date);
  };

  setLobbyStarted = (started: LobbyStore["started"] = null) => {
    this.started = started;
    started != null && localStorage.setItem("lobbyStarted", started ? "1" : "");
  };

  setGivingTo = (value: LobbyStore["giving_to"]) => {
    this.giving_to = value;
  };

  setPref = (value: LobbyStore["preferences"]) => {
    this.preferences = value;
  };
}

export { LobbyStore };
