import React, {useEffect, useReducer, useState} from "react";
import {create, retreive, update} from "../endpoints/endoints";
import {usersPath} from "./Users";


interface UserEditorProps {
    id?: string
    onClose: () => void
}

export interface User {
    id: string
    name: string
    age: number
}

export function UserEditor(props: UserEditorProps) {
    const [user, setUser] = useReducer(
        (user: User, newUser: User) => ({ ...user, ...newUser }),
        {} as User)

    const onSave = () => {
        if (props.id) {
            update<User>(usersPath, props.id, user).finally(props.onClose)
        } else {
            create<User>(usersPath, user).finally(props.onClose)
        }
    }

    useEffect(() => {
        if (props.id) {
            retreive<User>(usersPath, props.id).then(user => setUser(user))
        }
    }, [])

    return <div className="user-edtior">
        <h1>{props.id ? 'Edit user' : 'Add user'}</h1>
        <form>
            <input type="text" value={user.name} onChange={e => setUser({ name: e.target.value } as User)}/>
            <input type="number" value={user.age} onChange={e => setUser({ age: +e.target.value } as User)}/>
            <button onClick={onSave}>Save</button>
            <button onClick={props.onClose}>Close</button>
        </form>
    </div>
}