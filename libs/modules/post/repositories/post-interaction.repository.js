import { interactionState } from "../../../store/interaction-state.js";

class PostInteractionRepository {
    getPostsLoading$() {
        return interactionState.post.posts.loading;
    }

    getPostsError$() {
        return interactionState.post.posts.error;
    }

    getWordPostsLoading$() {
        return interactionState.post.posts.loading;
    }

    getWordPostsError$() {
        return interactionState.post.posts.error;
    }
}

export const postInteractionRepository = new PostInteractionRepository();