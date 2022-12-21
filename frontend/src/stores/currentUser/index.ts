import { makeObservable, observable, action } from "mobx";

class CurrentUserStore {
  userToken: string | null = null;
  isHost: boolean | null = null;
  userId: number | null = null;

  constructor() {
    makeObservable(this, {
      userToken: observable,
      userId: observable,
      isHost: observable,
      setUserToken: action,
      setUserIsHost: action,
      setUserId: action,
    });
  }

  setUserToken = (value: CurrentUserStore["userToken"]) => {
    this.userToken = value;
    value && localStorage.setItem("access_token", value);
  };

  setUserIsHost = (value: CurrentUserStore["isHost"]) => {
    this.isHost = value;
    value && localStorage.setItem("isHost", value.toString());
  };

  setUserId = (value: CurrentUserStore["userId"]) => {
    this.userId = value;
    value && localStorage.setItem("userId", String(value));
  };
}

export { CurrentUserStore };
