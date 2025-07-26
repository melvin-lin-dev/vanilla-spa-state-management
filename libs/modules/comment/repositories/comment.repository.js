import { state } from "../../../store/state.js";

export class CommentRepository {
    getComments$() {
        return state.comment.comments;
    }
}

export const commentRepository = new CommentRepository();