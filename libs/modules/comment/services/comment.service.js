import { http } from "../../../api.service.js";

export function getCommentsByPostId(postId, params) {
    params = new URLSearchParams(params);
    return http(`posts/${postId}/comments?${params}`);
}
