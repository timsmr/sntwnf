import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userToken: string | null = null;
    isHost: boolean | null = null;

    constructor() {
        makeObservable(this, {
            userToken: observable,
            isHost: observable,
            setUserToken: action,
        });
    }

    setUserToken = (value: CurrentUserStore["userToken"],) => {
        this.userToken = value;
        value && localStorage.setItem('userToken', value)
    }

    setUserIsHost = (value: CurrentUserStore["isHost"],) => {
        this.isHost = value;
        value && localStorage.setItem('isHost', value.toString())
    }

}

export { CurrentUserStore };