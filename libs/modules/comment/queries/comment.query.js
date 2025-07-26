import { handleState, Method } from "../../../api.service.js";
import * as service from "../services/comment.service.js";

export function getCommentsByPostId(postId, params = {}) {
    return handleState(service.getCommentsByPostId(postId, params), "comment", {
        stateType: "comment",
        state: "comments",
        interactionState: "comments",
        methodType: Method.GET,
        dataType: "Comments By Post ID",
    });
}
