import dbPool from "../utils/db.js";

export const getTransaksiByUser = async (user_id) => {
  const sql =
    "SELECT users.user_id, users.NAME AS user_name,barang.barang_id, barang.nama AS barang_name, barang.harga,transaksi.transaksi_id,transaksi.jumlah,transaksi.created_at AS transaksi_created_at FROM transaksi JOIN users ON transaksi.user_id = users.user_id JOIN barang ON transaksi.barang_id = barang.barang_id WHERE users.user_id = ?";

  const result = await dbPool.query(sql, [user_id]);

  return result;
};

export const getTransaksi = async () => {
  const sql =
    "SELECT users.user_id, users.NAME AS user_name,barang.barang_id, barang.nama AS barang_name, barang.harga,transaksi.transaksi_id,transaksi.jumlah,transaksi.created_at AS transaksi_created_at FROM transaksi JOIN users ON transaksi.user_id = users.user_id JOIN barang ON transaksi.barang_id = barang.barang_id";

  const result = await dbPool.query(sql);

  return result;
};

export const addTransaksi = async (user_id, barang_id, jumlah) => {
  const created_at = new Date();

  const sqlUpdate = "UPDATE barang SET stok = stok - ? WHERE barang_id = ?";
  const valueStok = [jumlah, barang_id];

  const sql = "INSERT INTO transaksi (user_id, barang_id, jumlah, created_at) VALUE(?, ?, ?, ?)";
  const value = [user_id, barang_id, jumlah, created_at];

  await dbPool.query(sqlUpdate, valueStok);

  return await dbPool.query(sql, value);
};
