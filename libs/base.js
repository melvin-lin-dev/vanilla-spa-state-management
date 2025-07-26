export function escapeHTML(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
}

export function displaySnackbar(e) {
    let type = e.code >= 200 && e.code <= 299 ? "success" : "danger";
    let snackbar = document.getElementById(`snackbar-${type}`);
    if (snackbar) {
        snackbar.textContent = e.message;
        snackbar.classList.add("active");

        clearTimeout(snackbar._timeoutId);

        snackbar._timeoutId = setTimeout(() => {
            snackbar.classList.remove("active");
            snackbar._timeoutId = null;
        }, 3000);
    } else {
        console.error(`${type.toUpperCase()} Snackbar is not available.`);
    }
}

export function combineLatest(subjects) {
    let length = 0;
    let values = Array(subjects.length).fill(undefined);
    let unsubscribes = [];

    return {
        subscribe: (fn) => {
            subjects.forEach((subject, i) => {
                let unsub = subject.subscribe((value) => {
                    values[i] = value;

                    if (length < subjects.length){
                        length += 1;
                    }

                    if (subjects.length == length) {
                        fn(...values);
                    }
                });
                unsubscribes.push(unsub);
            });

            return {
                unsubscribe: () => {
                    unsubscribes.forEach(unsub => {
                        unsub.unsubscribe();
                    });
                }
            };
        },
    }
}
