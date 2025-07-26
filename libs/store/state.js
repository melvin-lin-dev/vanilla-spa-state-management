import BehaviorSubject from "../behavior-subject.js";

class State {
    constructor() {
        this.post = {
            posts: new BehaviorSubject([]),
            wordPosts: new BehaviorSubject([]),
        };

        this.comment = {
            comments: new BehaviorSubject([]),
        };
    }
}

export const state = new State();
