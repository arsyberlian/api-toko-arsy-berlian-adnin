import * as UserRepo from "../repository/user.js";
import { successResponse, errorResponse } from "../utils/response.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret_at = "kelas.com";
const secret_rt = "arsyberlian";

export const authUser = async (request, response, next) => {
  try {
    let email = request.body.email;
    let pass = request.body.password;
    const [result] = await UserRepo.getDataByEmail(email, pass);
    const user = await result[0];

    if (result.length > 0) {
      bcrypt.compare(pass, user.password, (err, result) => {
        if (user) {
          let claims = {
            id: user.user_id,
            email: user.email,
          };
          const accessToken = jwt.sign(claims, secret_at, { expiresIn: "15m" });
          const refreshToken = jwt.sign(claims, secret_rt, { expiresIn: "30m" });
          // update token user
          let id = user.user_id;
          UserRepo.updateToken(id, accessToken);

          let respData = {
            access_token: accessToken,
            refresh_token: refreshToken,
          };
          successResponse(response, "login berhasil!", respData);
        } else {
          errorResponse(response, "email atau password salah!", 400);
        }
      });
    } else {
      errorResponse(response, "email atau password salah!", 400);
    }
  } catch (error) {
    next(error);
  }
};

export const addUser = async (request, response, next) => {
  try {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const [result] = await UserRepo.addUser(name, email, hashed);
    successResponse(response, "User berhasil ditambahkan", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (request, response, next) => {
  try {
    const [result] = await UserRepo.getUser();
    successResponse(response, "User berhasil ditampilkan", result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.getUserById(id);
    if (result.length > 0) {
      successResponse(response, "Ok", result[0]);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.deleteUser(id);
    if (result.affectedRows) {
      successResponse(response, "User berhasil dihapus", result);
    } else {
      errorResponse(response, "User gagal dihapus", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const [result] = await UserRepo.updateUser(id, name, email, hashed);
    if (result.affectedRows) {
      successResponse(response, "User berhasil diupdate", result);
    } else {
      errorResponse(response, "User gagal diupdate", 404);
    }
  } catch (error) {
    next(error);
  }
};
