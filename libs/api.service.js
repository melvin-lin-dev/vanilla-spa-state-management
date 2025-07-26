import { interactionState } from "./store/interaction-state.js";
import { state } from "./store/state.js";

export const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELET: "DELETE",
};

export async function http(url) {
    const API = "https://jsonplaceholder.typicode.com";

    return fetch(`${API}/${url}`)
        .then((response) => {
            if (!response.ok) throw { message: "", code: response.status };
            return response.json();
        })
        .catch((err) => {
            console.error(`[HTTP - ${err.code}]`, err.message);
            throw {
                message: err.message
                    ? `API Error: ${err.message}`
                    : "API Error",
                code: err.code ? err.code : err.status,
            };
        });
}

export function getErrorData(error, methodType, type) {
    return { message: `[API] [${methodType} - ${type}] Error ${error.code}: ${error.message}`, code: error.code };
}

export function handleError(error, methodType, type) {
    const data = getErrorData(error, methodType, type);
    console.error(data.message);
    throw data;
}

export function handleState(request, stateType, obj) {
    const loading$ = interactionState[stateType][obj.interactionState].loading;
    const error$ = interactionState[stateType][obj.interactionState].error;
    const state$ = state[stateType][obj.state];

    loading$.next(true);

    return request
        .then((posts) => {
            state$.next(posts);
        })
        .catch((err) => {
            state$.next([]);
            error$.next(getErrorData(err, obj.methodType, obj.dataType));
            
            handleError(err, obj.methodType, obj.dataType);
        })
        .finally(() => {
            loading$.next(false);
        });
}
