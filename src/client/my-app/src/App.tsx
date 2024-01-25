import React, {useEffect, useState} from 'react';
import './App.css';
import {list} from "./endpoints/endoints";

interface User {
  id: string
  name: string
  age: number
}

export default function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    list<User>('/users')
        .then(users => setUsers(users))
  }, [])

  const onEdit = (id: string) => {

  }

  const onDelete = (id: string) => {

  }

  const renderUsers = () => {
    return users.length > 0 ?
        <table>
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
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => onEdit(user.id)}>Edit</button>
                  <button onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
  : null
  }

  return (
    <div className="App">
      {renderUsers()}
    </div>
  );
}