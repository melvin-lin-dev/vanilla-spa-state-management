import { http } from "../../../api.service.js";

export function getPosts(params) {
    params = new URLSearchParams(params);
    return http(`posts?${params}`);
}