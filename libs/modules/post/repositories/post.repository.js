import { state } from "../../../store/state.js";

class PostRepository {
    getPosts$() {
        return state.post.posts;
    }

    getWordPosts$() {
        return state.post.wordPosts;
    }
}

export const postRepository = new PostRepository();