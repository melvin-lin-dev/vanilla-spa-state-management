import { interactionState } from "../../../store/interaction-state.js";

class CommentInteractionRepository {
    getCommentsLoading$() {
        return interactionState.comment.comments.loading;
    }

    getCommentsError$() {
        return interactionState.comment.comments.error;
    }
}

export const commentInteractionRepository = new CommentInteractionRepository();