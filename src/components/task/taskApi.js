export function addTask(item) {
    return new Promise(async (resolve) => {
        const response = await fetch('/task', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        // TODO: on server it will only return some info of user (not password)
        resolve({ data });
    });
}

export function fetchTasksByUserId(email) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/task?user=${email}`);
        const data = await response.json();
        resolve({ data });
    });
}

export function updateTask(task) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/task/` + task.id, {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data });
    });
}
