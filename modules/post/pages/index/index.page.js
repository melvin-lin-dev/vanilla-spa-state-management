import {
    displaySnackbar,
    escapeHTML,
    combineLatest,
} from "../../../../libs/base.js";
import BehaviorSubject from "../../../../libs/behavior-subject.js";
import { getCommentsByPostId } from "../../../../libs/modules/comment/queries/comment.query.js";
import { commentInteractionRepository } from "../../../../libs/modules/comment/repositories/comment-interaction.repository.js";
import { commentRepository } from "../../../../libs/modules/comment/repositories/comment.repository.js";
import { getPosts } from "../../../../libs/modules/post/queries/post.query.js";
import { postInteractionRepository } from "../../../../libs/modules/post/repositories/post-interaction.repository.js";
import { postRepository } from "../../../../libs/modules/post/repositories/post.repository.js";
import Subscription from "../../../../libs/subscription.js";

let pageSubject = new BehaviorSubject(1);
let subscription = new Subscription();

// =============================================
// Init + Events
// =============================================

export function init() {
    handleEvents();
    handleOnInit();
}

export function destroy() {
    subscription.flush();
}

function handleEvents() {
    document
        .getElementById("search")
        .addEventListener("keyup", handlePageReset);
    document
        .getElementById("per-page")
        .addEventListener("change", handlePageReset);

    document
        .getElementById("btn-pagination-prev")
        .addEventListener("click", () => {
            handlePagination(-1);
        });
    document
        .getElementById("btn-pagination-next")
        .addEventListener("click", () => {
            handlePagination(1);
        });

    document
        .querySelector("#posts-table tbody")
        .addEventListener("click", handleShowComments);
    document
        .getElementById("comments-container-close")
        .addEventListener("click", handleCloseComments);
}

function handleOnInit() {
    document.querySelector("#posts-table tbody").innerHTML = handlePostLoadingRender();
    document.getElementById("comments").innerHTML = handleCommentLoadingRender();

    handleFetchPosts();

    const postSubscription = combineLatest([
        postRepository.getPosts$(),
        postInteractionRepository.getPostsLoading$(),
        postInteractionRepository.getPostsError$(),
    ]).subscribe((posts, isLoading, error) => {
        if (isLoading) {
            document.querySelector("#posts-table tbody").innerHTML = handlePostLoadingRender();
        } else {
            if (error) {
                displaySnackbar(error);
            }

            handleLoadPosts();
        }
    });

    const commentSubscription = combineLatest([
        commentRepository.getComments$(),
        commentInteractionRepository.getCommentsLoading$(),
        commentInteractionRepository.getCommentsError$(),
    ]).subscribe((comments, isLoading, error) => {
        if (isLoading) {
            document.getElementById("comments").innerHTML = handleCommentLoadingRender();
        } else {
            if (error) {
                displaySnackbar(error);
            }

            handleLoadComments(comments);
        }
    });

    subscription.add(postSubscription);
    subscription.add(commentSubscription);
}

// =============================================
// Logic Functions
// =============================================

function handleFetchPosts() {
    getPosts();
}

function handleFetchComments(postId) {
    getCommentsByPostId(postId);
}

function handleShowComments(e) {
    if (e.target.classList.contains("btn-comment")) {
        document.getElementById("comments-container").classList.add("active");

        handleFetchComments(e.target.dataset.postId);
    }
}

function handlePageReset() {
    pageSubject.next(1);
    handleLoadPosts();
}

function handlePagination(dir) {
    let btnPrev = document.getElementById("btn-pagination-prev");
    let btnNext = document.getElementById("btn-pagination-next");

    btnPrev.disabled = false;
    btnNext.disabled = false;

    if (pageSubject.getValue() + dir == 1) {
        btnPrev.disabled = true;
    } else if (
        pageSubject.getValue() + dir ==
        +document.getElementById("total-page").textContent
    ) {
        btnNext.disabled = true;
    }

    pageSubject.next(pageSubject.getValue() + dir);

    handleLoadPosts();
}

function handlePostsFilter() {
    let search = document.getElementById("search").value.toLowerCase().trim();

    let searchedPosts = postRepository
        .getPosts$()
        .getValue()
        .filter(
            (post) =>
                post.title.toLowerCase().includes(search) ||
                post.body.toLowerCase().includes(search)
        );

    let perPage = +document.getElementById("per-page").value;

    let collection = {
        from: (pageSubject.getValue() - 1) * perPage,
    };

    collection.to = collection.from + perPage;
    collection.data = searchedPosts.slice(collection.from, collection.to);
    collection.total = searchedPosts.length;
    collection.totalPage = searchedPosts.length / perPage;

    return collection;
}

function handleLoadPosts() {
    let search = document.getElementById("search").value.toLowerCase().trim();

    let collection = handlePostsFilter();

    document.getElementById("from").textContent = collection.from + 1;
    document.getElementById("to").textContent = collection.to;
    document.getElementById("total").textContent = collection.total;

    document.getElementById("page").textContent = pageSubject.getValue();
    document.getElementById("total-page").textContent = collection.totalPage;

    document.querySelector("#posts-table tbody").innerHTML = collection.data
        .length
        ? collection.data.map((post) => handlePostRender(post, search)).join("")
        : '<tr><td colspan="3" class="text-center py-4 px-6 text-sm md:text-base">No Posts Available</td></tr>';
}

function handleLoadComments(comments) {
    document.getElementById("comments").innerHTML = comments.length
        ? comments.map(handleCommentRender).join("")
        : '<div class="text-center py-4 px-6 text-sm md:text-base">No Comments Available</div>';
}

function handleCloseComments() {
    document.getElementById("comments-container").classList.remove("active");
}

// =============================================
// Render Functions
// =============================================

function handlePostRender(post, search) {
    const regex = new RegExp(`(${search})`, "gi");
    let title = escapeHTML(post.title);
    let description = escapeHTML(post.body).replace(
        /(rerum)/gi,
        '<span class="bg-yellow-200">$1</span>'
    );
    if (search) {
        title = title.replace(regex, '<span class="bg-blue-200">$1</span>');
        description = description.replace(
            regex,
            '<span class="bg-blue-200">$1</span>'
        );
    }

    return `<tr class="even:bg-gray-50 text-sm md:text-base">
        <td class="py-2 px-3">${title}</td>
        <td class="py-2 px-3">${description}</td>
        <td class="py-2 px-3"><button data-post-id="${post.id}" class="btn-comment rounded-full bg-primary text-white py-2 px-3 transition hover:bg-primary-light text-sm md:text-base">Comments</button></td>
    </tr>`;
}

function handleCommentRender(comment) {
    return `<div class="py-2 px-3">
        <div class="mb-2">
            <div class="font-bold text-sm md:text-base">${escapeHTML(
                comment.name
            )}</div>
            <div class="text-gray-500 text-xs md:text-sm">${escapeHTML(
                comment.email
            )}</div>
        </div>
        <div class="text-gray-700 text-sm md:text-base">${escapeHTML(
            comment.body
        )}</div>
    </div>`;
}

function handlePostLoadingRender() {
    return '<tr><td colspan="100" class="text-center py-4 px-6 text-sm md:text-base">Loading...</td></tr>';
}

function handleCommentLoadingRender() {
    return '<div class="text-center py-4 px-6 text-sm md:text-base">Loading...</div>';
}