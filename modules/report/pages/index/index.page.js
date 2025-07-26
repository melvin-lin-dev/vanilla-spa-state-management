import { combineLatest, displaySnackbar } from "../../../../libs/base.js";
import {
    getPosts,
    getWordPosts,
} from "../../../../libs/modules/post/queries/post.query.js";
import { postInteractionRepository } from "../../../../libs/modules/post/repositories/post-interaction.repository.js";
import { postRepository } from "../../../../libs/modules/post/repositories/post.repository.js";
import Subscription from "../../../../libs/subscription.js";

let subscription = new Subscription();

// =============================================
// Init + Events
// =============================================

export function init() {
    handleOnInit();
}

export function destroy() {
    subscription.flush();
}

function handleOnInit() {
    handleLoadUserPostCount();
    handleLoadWordPostTotal();

    const postSubscription = combineLatest([
        postRepository.getPosts$(),
        postInteractionRepository.getPostsLoading$(),
        postInteractionRepository.getPostsError$(),
    ]).subscribe((posts, isLoading, error) => {
        if (isLoading) {
            document.querySelector("#user-posts-table tbody").innerHTML =
                handleUserPostLoadingRender();
        } else {
            if (error) {
                displaySnackbar(error);
            }

            handleUserPostCount(posts);
        }
    });

    const wordPostSubscription = combineLatest([
        postRepository.getWordPosts$(),
        postInteractionRepository.getWordPostsLoading$(),
        postInteractionRepository.getWordPostsError$(),
    ]).subscribe((posts, isLoading, error) => {
        if (isLoading) {
            document.getElementById("rerum-post-total").textContent =
                "Loading...";
        } else {
            if (error) {
                displaySnackbar(error);
            }

            document.getElementById("rerum-post-total").textContent =
                posts.length;
        }
    });

    subscription.add(postSubscription)
    subscription.add(wordPostSubscription)
}

// =============================================
// Logic Functions
// =============================================

function handleLoadUserPostCount() {
    getPosts();
}

function handleLoadWordPostTotal() {
    getWordPosts({ body_like: "rerum" });
}

function handleUserPostCount(posts) {
    let userPostCount = {};

    posts.forEach((post) => {
        userPostCount[post.userId] =
            userPostCount[post.userId] + 1 || 1;
    });

    let usersCount = Object.keys(userPostCount);

    document.querySelector("#user-posts-table tbody").innerHTML =
        usersCount.length
            ? usersCount
                    .map((userId) =>
                        handleUserPostCountRender(
                            userId,
                            userPostCount[userId]
                        )
                    )
                    .join("")
            : '<tr><td colspan="100" class="text-center py-2 px-3">No Posts Available</td></tr>';
}

// =============================================
// Render Functions
// =============================================

function handleUserPostCountRender(userId, postCount) {
    return `<tr class="even:bg-gray-50 text-sm md:text-base">
        <td class="py-2 px-3">${userId}</td>
        <td class="py-2 px-3">${postCount}</td>
    </tr>`;
}

function handleUserPostLoadingRender() {
    return '<tr><td colspan="100" class="text-center py-2 px-3">Loading...</td></tr>';
}
