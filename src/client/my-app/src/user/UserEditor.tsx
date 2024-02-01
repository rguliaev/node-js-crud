import React, { useEffect, useReducer } from "react";
import { create, retrieve, update } from "../endpoints/endoints";
import { usersPath } from "./Users";

interface UserEditorProps {
  id?: string;
  onClose: () => void;
}

export interface User {
  id: string;
  name: string;
  age: number;
  createdAt: string;
}

export function UserEditor(props: UserEditorProps) {
  const [user, setUser] = useReducer(
    (user: User, newUser: User) => ({ ...user, ...newUser }),
    { name: "", age: 0 } as User,
  );

  const onSave = () => {
    if (props.id) {
      update<User>(usersPath, props.id, user).finally(props.onClose);
    } else {
      create<User>(usersPath, user).finally(props.onClose);
    }
  };

  useEffect(() => {
    if (props.id) {
      retrieve<User>(usersPath, props.id).then((user) => setUser(user));
    }
  }, [props.id]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{props.id ? "Edit user" : "Add user"}</h3>
        <form>
          <label className="mr-3" htmlFor="name">
            Name:
          </label>
          <input
            className="mr-3"
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ name: e.target.value } as User)}
          />
          <label className="mr-3" htmlFor="age">
            Age:
          </label>
          <input
            className="mr-3"
            type="number"
            id="age"
            value={user.age}
            onChange={(e) => setUser({ age: +e.target.value } as User)}
          />
          <p />
          <button
            type="submit"
            className="button button-success"
            onClick={onSave}
          >
            Save
          </button>
          <button className="button button-secondary" onClick={props.onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
