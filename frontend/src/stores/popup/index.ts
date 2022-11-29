import { makeObservable, observable, action } from 'mobx';

class PopupStore {
    isOpened: boolean;

    constructor() {
        this.isOpened = false;

        makeObservable(this, {
            isOpened: observable,
            changeValue: action,
        });
    }

    changeValue = () => {
        this.isOpened = !this.isOpened;
    }
}

export { PopupStore };