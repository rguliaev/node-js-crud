import { v4 as uuidv4 } from 'uuid';

// in memory for now
let users = []

export const list = () => {
    return users
}

export const add = (user) => {
    const id = uuidv4()
    users.push({ id, ...user })
    return id
}

export const find = (id) => {
    return users.find(user => user.id === id)
}

export const update = (id, user) => {
    const existing = find(id)
    if (existing) {
        const updated = {id, ...user}
        users = users.map(u => u.id !== id ? u : updated);
        return updated
    }
    return undefined
}

export const remove = (id) => {
    users = users.filter(user => user.id !== id)
}


add({id: uuidv4(), name: 'user 1', age: 10})



