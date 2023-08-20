import * as TransaksiRepo from "../repository/transaksi.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getTransaksiByUser = async (request, response, next) => {
  try {
    const user_id = request.params.user_id;
    const [result] = await TransaksiRepo.getTransaksiByUser(user_id);
    if (result.length > 0) {
      successResponse(response, "Transaksi berhasil ditampilkan", result);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const getTransaksi = async (request, response, next) => {
  try {
    const [result] = await TransaksiRepo.getTransaksi();
    if (result) {
      successResponse(response, "Transaksi berhasil ditampilkan", result);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const addTransaksi = async (request, response, next) => {
  try {
    const user_id = request.body.user_id;
    const barang_id = request.body.barang_id;
    const jumlah = request.body.jumlah;

    if ((user_id, barang_id, jumlah)) {
      const [result] = await TransaksiRepo.addTransaksi(user_id, barang_id, jumlah);

      successResponse(response, "Transaksi berhasil ditambahkan", result);
    } else {
      errorResponse(response, "Data tidak lengkap", 400);
    }
  } catch (error) {
    next(error);
  }
};
