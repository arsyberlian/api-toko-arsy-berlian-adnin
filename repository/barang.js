import dbPool from "../utils/db.js";

export const getBarang = async (id) => {
  const sql = "SELECT * FROM barang";
  const result = await dbPool.query(sql);

  return result;
};

export const getBarangByUser = async (id) => {
  const sqlUser = `SELECT users.user_id, users.NAME
  FROM users
  JOIN barang ON users.user_id = barang.user_id
  WHERE users.user_id = ?`;

  const sqlBarang = `SELECT barang.barang_id, barang.nama, barang.stok, barang.harga, barang.created_at, barang.updated_at
  FROM users
  JOIN barang ON users.user_id = barang.user_id
  WHERE users.user_id = ?`;

  const user = await dbPool.query(sqlUser, [id]);
  const barang = await dbPool.query(sqlBarang, [id]);
  return { user, barang };
};

export const addBarang = async (user_id, nama, stok, harga) => {
  const created_at = new Date();
  const updated_at = new Date();
  const sql = "INSERT INTO barang (user_id, nama, stok, harga,created_at, updated_at) VALUE(?, ?, ?, ?, ?, ?)";
  const value = [user_id, nama, stok, harga, created_at, updated_at];

  return await dbPool.query(sql, value);
};

export const updateBarang = async (id, nama, stok, harga) => {
  const updated_at = new Date();
  const sql = `UPDATE barang SET nama = ?, stok = ?, harga = ? , updated_at = ? WHERE barang_id = ?`;
  const value = [nama, stok, harga, updated_at, id];
  const result = await dbPool.query(sql, value);

  return result;
};

export const deleteBarang = async (id) => {
  const sql = `DELETE FROM barang WHERE barang_id = ?`;
  const result = await dbPool.query(sql, [id]);

  return result;
};
