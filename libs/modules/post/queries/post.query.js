import { handleState, Method } from "../../../api.service.js";
import * as service from "../services/post.service.js";

export function getPosts(params = {}) {
    return handleState(service.getPosts(params), 'post', {
        state: "posts",
        interactionState: "posts",
        methodType: Method.GET,
        dataType: "Posts",
    });
}

export function getWordPosts(params = {}) {
    return handleState(service.getPosts(params), 'post', {
        state: "wordPosts",
        interactionState: "wordPosts",
        methodType: Method.GET,
        dataType: "Word Posts",
    });
}
