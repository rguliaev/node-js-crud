import React, {useEffect, useState} from "react";
import {User, UserEditor} from "./UserEditor";
import {list, remove} from "../endpoints/endoints";

export const usersPath = '/users'

export function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [showUser, setShowUser] = useState<boolean>(false)
    const [showUserId, setShowUserId] = useState<string | undefined>(undefined)

    useEffect(() => {
        list<User>(usersPath)
            .then(users => setUsers(users))
    }, [])

    const onAddEdit = (id?: string) => {
        setShowUserId(id)
        setShowUser(true)
    }

    const onDelete = (id: string) => {
        remove(usersPath, id).finally(() => setUsers(users.filter(user => user.id !== id)))
    }

    const onClose = () => {
        setShowUserId(undefined)
        setShowUser(false)
    }

    const renderUsers = () => {
        return users.length > 0 ?
            <table className="user-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>
                            <button className="button button-default" onClick={() => onAddEdit(user.id)}>Edit</button>
                            <button className="button button-danger" onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            : null
    }

    return <>
        <h2>Users editor</h2>
        <button className="button-default button mb-3" onClick={() => onAddEdit(undefined)}>Add</button>
        {renderUsers()}
        {showUser ? <UserEditor id={showUserId} onClose={onClose}/> : null}
    </>
}