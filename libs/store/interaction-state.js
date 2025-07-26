import BehaviorSubject from "../behavior-subject.js";

class InteractionState {
    constructor() {
        this.post = {
            posts: {
                loading: new BehaviorSubject(false),
                error: new BehaviorSubject(null),
            },
            wordPosts: {
                loading: new BehaviorSubject(false),
                error: new BehaviorSubject(null),
            },
        };

        this.comment = {
            comments: {
                loading: new BehaviorSubject(false),
                error: new BehaviorSubject(null),
            },
        };
    }
}

export const interactionState = new InteractionState();
