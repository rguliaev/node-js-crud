import { v4 as uuidv4 } from "uuid";
import {pool} from "./posgtres.js";

const list = async () => {
  const result = await pool.query('SELECT * FROM users')
  return result.rows;
};

const add = async (user) => {
  const id = uuidv4();
  const result = await pool.query('INSERT into users(id, name, age) VALUES($1, $2, $3) RETURNING *', [id, user.name, user.age])
  return result.rows[0].id;
};

const find = async (id) => {
  const result = await pool.query('SELECT * from users WHERE id=$1', [id])
  return result.rows[0] ? result.rows[0] : undefined;
};

const update = async (id, user) => {
  const existing = await find(id);
  if (existing) {
    const updated = { id, ...user };
    await pool.query('UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *', [updated.name, updated.age, updated.id])
    return updated;
  }
  return undefined;
};

const remove = async (id) => {
  await pool.query('DELETE FROM users WHERE id=$1', [id])
};

export const userRepo = {
  list() {
    return list();
  },
  add(user) {
    return add(user);
  },
  find(id) {
    return find(id);
  },
  update(id, user) {
    return update(id, user);
  },
  remove(id) {
    return remove(id);
  },
};
