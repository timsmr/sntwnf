import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userId: string | null = null;

    constructor() {
        makeObservable(this, {
            userId: observable,
            setUserId: action,
        });
    }

    setUserId = (value: CurrentUserStore["userId"],) => {
        this.userId = value;
    }
}

export { CurrentUserStore };