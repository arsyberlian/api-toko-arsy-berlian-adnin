USE db_toko

CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    NAME VARCHAR(100),
    email VARCHAR(100),
    PASSWORD VARCHAR(255),
    token VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT user_pk PRIMARY KEY (user_id)
);



CREATE TABLE barang (
	barang_id INT AUTO_INCREMENT,
	user_id INT,
	nama VARCHAR(100),
	stok INT(255),
	harga INT(100),
	created_at DATETIME,
	updated_at DATETIME,
	CONSTRAINT barang_pk PRIMARY KEY (barang_id), 
	CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE transaksi (
	  transaksi_id INT AUTO_INCREMENT,
	  user_id INT,
	  barang_id INT,
	  jumlah INT,
	  created_at DATETIME,
	  CONSTRAINT transaksi_pk PRIMARY KEY (transaksi_id),
	  CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(user_id),
	  CONSTRAINT FOREIGN KEY (barang_id) REFERENCES barang(barang_id)
);
