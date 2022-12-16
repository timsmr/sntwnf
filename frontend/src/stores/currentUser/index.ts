import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userToken: string | null = null;
    isHost: boolean | null = null;
    userId: string | null = null;

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

    setUserToken = (value: CurrentUserStore["userToken"],) => {
        this.userToken = value;
        value && localStorage.setItem('userToken', value)
    }

    setUserIsHost = (value: CurrentUserStore["isHost"],) => {
        this.isHost = value;
        value && localStorage.setItem('isHost', value.toString())
    }

    setUserId = (value: CurrentUserStore["userId"],) => {
        this.userId = value;
        value && localStorage.setItem('userId', value)
    }

}

export { CurrentUserStore };