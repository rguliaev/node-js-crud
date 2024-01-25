import { v4 as uuidv4 } from 'uuid';

// in memory for now
let users = []

const list = () => {
    return users
}

const add = (user) => {
    const id = uuidv4()
    users.push({ id, ...user })
    return id
}

const find = (id) => {
    return users.find(user => user.id === id)
}

const update = (id, user) => {
    const existing = find(id)
    if (existing) {
        const updated = {id, ...user}
        users = users.map(u => u.id !== id ? u : updated);
        return updated
    }
    return undefined
}

const remove = (id) => {
    users = users.filter(user => user.id !== id)
}

export const userRepo = {
    list() { return list() },
    add(user) { return add(user) },
    find(id) { return find(id) },
    update(id, user) { return update(id, user) },
    remove(id) { return remove(id) },
}



