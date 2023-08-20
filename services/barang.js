import * as BarangRepo from "../repository/barang.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getBarang = async (request, response, next) => {
  try {
    const [result] = await BarangRepo.getBarang();
    if (result) {
      successResponse(response, "Barang berhasil ditampilkan", result);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const getBarangByUser = async (request, response, next) => {
  try {
    let id = request.params.user_id;
    const { user, barang } = await BarangRepo.getBarangByUser(id);
    if (barang[0].length > 0) {
      successResponse(response, "Barang berhasil ditampilkan", { user: user[0][0], barang: barang[0] });
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const addBarang = async (request, response, next) => {
  try {
    let user_id = request.body.user_id;
    let nama = request.body.nama;
    let stok = request.body.stok;
    let harga = request.body.harga;
    const [result] = await BarangRepo.addBarang(user_id, nama, stok, harga);
    successResponse(response, "Barang berhasil ditambahkan", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const updateBarang = async (request, response, next) => {
  try {
    let id = request.params.id;
    let nama = request.body.nama;
    let stok = request.body.stok;
    let harga = request.body.harga;
    const [result] = await BarangRepo.updateBarang(id, nama, stok, harga);
    if (result.affectedRows) {
      successResponse(response, "Barang berhasil diupdate", result);
    } else {
      errorResponse(response, "Barang gagal diupdate", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBarang = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await BarangRepo.deleteBarang(id);
    if (result.affectedRows) {
      successResponse(response, "Barang berhasil dihapus", result);
    } else {
      errorResponse(response, "Barang gagal dihapus", 404);
    }
  } catch (error) {
    next(error);
  }
};
