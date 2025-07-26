export default class Subscription {
    constructor() {
        this.list = [];
    }

    add(subscription) {
        this.list.push(subscription);
    }

    flush() {
        this.list.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
