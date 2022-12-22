import { makeObservable, observable, action } from "mobx";

class LobbyStore {
  code: string | null = null;
  name: string | null = null;
  event_date: string | null = null;
  started: boolean | null = null;
  givingName: string | null = null;
  giving_to: string | null = null;
  preferences: string | null = null;

  constructor() {
    makeObservable(this, {
      name: observable,
      event_date: observable,
      code: observable,
      started: observable,
      giving_to: observable,
      givingName: observable,
      preferences: observable,
      setLobbyCode: action,
      setLobbyName: action,
      setLobbyEventDate: action,
      setLobbyStarted: action,
      setGivingTo: action,
      setGivingName: action,
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
    value && localStorage.setItem("givingTo", value);
  };

  setGivingName = (value: LobbyStore["givingName"]) => {
    this.givingName = value;
    value && localStorage.setItem("givingName", value);
  };

  setPref = (value: LobbyStore["preferences"]) => {
    this.preferences = value;
    value && localStorage.setItem("preferences", value);
  };

  clear = () => {
    this.code = null;
    localStorage.removeItem("lobbyCode")

    this.name = null;
    localStorage.removeItem("lobbyName")

    this.event_date = null;
    localStorage.removeItem("lobbyEventDate")

    this.started = null;
    localStorage.removeItem("lobbyStarted")

    this.giving_to = null;
    localStorage.removeItem("givingTo")

    this.preferences = null;
    localStorage.removeItem("preferences")
  }
}

export { LobbyStore };
