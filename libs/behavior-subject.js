export default class BehaviorSubject {
    constructor(value) {
        this.value = value;
        this.listeners = [];
    }

    subscribe(fn) {
        this.listeners.push(fn);
        fn(this.value);

        return {
            unsubscribe: () => {
                this.listeners = [];
            },
        };
    }

    next(value) {
        this.value = value;
        this.listeners.forEach((fn) => {
            fn(value);
        });
    }

    getValue() {
        return this.value;
    }
}
