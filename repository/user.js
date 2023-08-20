import dbPool from "../utils/db.js";

export const updateToken = async (id, accessToken) => {
  const sql = `UPDATE users SET token = ? WHERE user_id = ?`;
  const result = await dbPool.query(sql, [accessToken, id]);
  return result;
};

export const getDataByEmail = async (email, pass) => {
  const sql = `SELECT user_id, name, email, password, created_at FROM users WHERE email = ? AND password = ?`;

  const result = await dbPool.query(sql, [email, pass]);

  console.log(result);
  return result;
};

// CRUD FUNCTION IN HERE ---

export const addUser = async (name, email, password) => {
  let createdAt = new Date();
  const sql = "INSERT INTO users (name, email, password, created_at) VALUE(?, ?, ?, ?)";
  const value = [name, email, password, createdAt];

  return await dbPool.query(sql, value);
};

export const getUser = async () => {
  const sql = "SELECT * FROM users";
  const result = await dbPool.query(sql);

  return result;
};

export const getUserById = async (id) => {
  const sql = `SELECT * FROM users WHERE user_id = ?`;
  const result = await dbPool.query(sql, [id]);

  return result;
};

export const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;
  const result = await dbPool.query(sql, [id]);

  return result;
};

export const updateUser = async (id, name, email, password) => {
  const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?`;
  const value = [name, email, password, id];
  const result = await dbPool.query(sql, value);

  return result;
};
