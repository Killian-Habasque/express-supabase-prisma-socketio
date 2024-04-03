export const boards = {
    getAll: () => fetch("/boards").then(res => res.json()),
    getByName: (name) => fetch(`/boards/${name}`).then(res => res.json()),
    create: (name) => fetch("/boards", {method: "POST", body: JSON.stringify({name}), headers: {
        Accept: "application/json", 
        "Content-Type": "application/json"
    }}).then(res => res.json()),
    delete: (name) => fetch(`/boards/${name}`, {method: "DELETE"}).then(res => res.json()),
}

export const scores = {
    getAll: (boardName) => fetch(`/boards/${boardName}/scores`).then(res => res.json()),
    create: (boardName, value, username) => fetch(`/boards/${boardName}/scores`, {method: "POST", body: JSON.stringify({value, username}), headers: {
        Accept: "application/json", 
        "Content-Type": "application/json"
    }}).then(res => res.json()),
    delete: (id) => fetch(`/score/${id}`, {method: "DELETE"}).then(res => res.json()),
}

export const auth = {
    register: (email, password) => fetch("/auth/register", {method: "POST", body: JSON.stringify({ email, password }), headers: {
        Accept: "application/json", 
        "Content-Type": "application/json"
    }}).then(res => res.json()),
    login: (email, password) => fetch("/auth/login", {method: "POST", body: JSON.stringify({ email, password }), headers: {
        Accept: "application/json", 
        "Content-Type": "application/json"
    }}).then(res => res.json()),
    logout: () => fetch("/auth/logout", {method: "POST"}).then(res => res.json()),
}

export const client = {
    boards,
    scores,
    auth
}