import expess from "express";
import * as UserService from "./services/user.js";
import * as BarangService from "./services/barang.js";
import * as TransaksiService from "./services/transaksi.js";

import { errorResponse } from "./utils/response.js";

const app = expess();
const port = 3000;
const host = "localhost";

app.use(expess.json());

// ENDPOINT LOGIN IN HERE ---
app.post("/login", UserService.authUser);

// ENDPOINT USERS IN HERE ---
app.get("/user/:id", UserService.getUserById);
app.get("/user", UserService.getUser);
app.post("/user", UserService.addUser);
app.put("/user/:id", UserService.updateUser);
app.delete("/user/:id", UserService.deleteUser);

// ENDPOINT BARANG IN HERE ---
app.get("/barang", BarangService.getBarang);
app.get("/barang/:user_id", BarangService.getBarangByUser);
app.put("/barang/:id", BarangService.updateBarang);
app.post("/barang", BarangService.addBarang);
app.delete("/barang/:id", BarangService.deleteBarang);

// ENDPOINT TRANSAKSI IN HERE ---
app.get("/transaksi", TransaksiService.getTransaksi);
app.get("/transaksi/:user_id", TransaksiService.getTransaksiByUser);
app.post("/transaksi", TransaksiService.addTransaksi);

// ENDPOINT GENERAL IN HERE ---
app.get("/", async (req, res) => {
  const result = "API TOKO KP-ARSY BERLIAN ADNIN";
  res.send(result);
});

app.use((err, request, response, next) => {
  const message = "Internal server error";
  console.log(err.message);
  errorResponse(response, message, 500);
});

app.listen(port, host, () => {
  console.log(`server REST API berlajan di http://${host}:${port}`);
});
