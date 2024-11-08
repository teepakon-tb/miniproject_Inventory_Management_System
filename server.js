// require express and cors จะใช้ exoress กับ cors
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const mysql = require('mysql2')
// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Bank0951927151",
    database: "db_64117039"
})
db.connect((err) => {
    if (err) { err }
    console.log("MySQL connected")
})
// ใช้ cors ในการเชื่อมต่อกับ frontend
app.use(cors())
// ใช้ express.json() เพื่อให้รับข้อมูลจาก frontend ได้
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello Backend ')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

app.post('/product', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body;
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({status : 400, error: false, data: results, msg: message });
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeFlag = 1',
            [username, password],
            function (err, results) {
                if (err) {
                    console.log(err);
                }
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong or user is not active";
                    res.status(400).send({status : 400, error: false, data: results, msg: message });
                } else {
                    if (results[0].authority == 1 || results[0].authority == 2) {
                        db.query("SELECT * FROM product_information", (error, results, fields) => {
                            if (error) {
                                console.log(error);
                            }
                            if (results.length == 0 || results === undefined) {
                                message = "Table is empty!";
                            } else {
                                message = "Get successfully.";
                            }
                            res.status(200).send({status : 200 , error: false, data: results, msg: message });
                        });
                    }
                }
            }
        );
    }
});
app.post('/product/:id', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body;
    const { id } = req.params;
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({status : 400, error: false, data: results, msg: message });
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeFlag = 1',
            [username, password],
            function (err, results) {
                if (err) {
                    console.log(err);
                }
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong or user is not active";
                    res.status(400).send({status : 400, error: false, data: results, msg: message });
                } else {
                    db.query("SELECT * FROM product_information WHERE product_id = ?", [id], (error, results, fields) => {
                        if (error) {
                            console.log(error);
                        }
                        if (results.length == 0 || results === undefined) {
                            message = "Table is empty!";
                        } else {
                            message = "Get successfully.";
                        }
                        res.status(200).send({status : 200,status : 200 , error: false, data: results, msg: message });
                    });
                }
            }
        );
    }
});
app.post('/product_add', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body
    let object = req.body;
    console.log(username + " " + password)
    console.log(object)
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({status : 400, error: false, data: results, msg: message })
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeFlag = 1',
            [username, password],
            function (err, results) {
                if (err) {
                    console.log(err);
                    message = "Error occurred while querying the database";
                    res.status(500).send({status : 500, error: true, data: {}, msg: message })
                } else if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong  or user is not active";
                    console.log("ไม่เจอยูสเซอร์")
                    res.status(400).send({status : 400, error: false, data: {}, msg: message })
                } else {
                    if (results[0].authority == 1) {
                        if (!object.Code_product_type || !object.Product_name || !object.Barcode_number || !object.Production_date || !object.Selling_proce || !object.Cost_price || !object.Factory_code) {
                            console.log("data is not complete")
                            message = "data is not complete";
                            res.status(400).send({status : 400, error: false, data: {}, msg: message
                            })
                        } else {
                            db.query(
                                'INSERT INTO product_information (Code_product_type, Product_name, Barcode_number, Production_date, Selling_proce, Cost_price, Factory_code) VALUES (?,?,?,?,?,?,?)', [object.Code_product_type, object.Product_name, object.Barcode_number, object.Production_date, object.Selling_proce, object.Cost_price, object.Factory_code],
                                function (err, results) {
                                    if (err)
                                        console.log(err);
                                    // console.log(results);
                                    if (results) {

                                        message = "inserted";
                                    } else {
                                        message = "CannotInsert";
                                    }
                                    res.status(200).send({status : 200 , error: false, data: results, msg: message });

                                }
                            );
                        }
                    } else {
                        message = "User not have permistion to create";
                        res.status(400).send({status: 400, error: false, data: {}, msg: message })
                    }
                }
            })
    }
})
app.delete('/product_delete/:id', (req, res) => {
    let message = "";
    let results = "";
    const { username, password } = req.body;
    const { id } = req.params;
    console.log(req.body)
    if (!username || !password) {
        console.log(username + " " + password)
        message = "Username or Password not present";
        console.log("Username or Password not present");
        res.status(400).send({status : 400, error: false, data: results, msg: message });
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeFlag = 1',
            [username, password],
            function (err, results) {
                if (err) {
                    console.log(err);
                }
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong or user is not active";
                    console.log("Username or Password is wrong or user is not active");
                    res.status(400).send({status : 400, error: false, data: results, msg: message });
                } else {
                    if (results[0].authority == 1) {
                        db.query("DELETE FROM product_information WHERE product_id = ?", [id], (error, results, fields) => {
                            if (error) {
                                console.log(error);
                            }
                            if (results.length == 0 || results === undefined) {
                                message = "Table is empty!";
                            } else {
                                message = "Get successfully.";
                            }
                            res.status(200).send({status : 200 , error: false, data: results, msg: message });
                        });
                    }else{
                        message = "User not have permistion to delete";
                        res.status(400).send({status : 400, error: false, data: results, msg: message });
                    }
                }
            }
        );
    }
}
);

app.put('/product_update/:id', (req, res) => {
    let message = "";
    let results = "";
    const { username, password, Code_product_type, Product_name, Barcode_number, Production_date, Selling_proce, Cost_price, Factory_code } = req.body;
    console.log(req.body);
    const { id } = req.params;
    console.log(req.params);
    if (!username || !password) {
        message = "Username or Password not present";
        res.status(400).send({status : 400, error: false, data: results, msg: message });
    } else {
        db.query(
            'SELECT * FROM user_login WHERE username = ? and password = ? and activeFlag = 1',
            [username, password],
            function (err, results) {
                if (err) {
                    console.log(err);
                }
                if (results.length == 0 || results === undefined) {
                    message = "Username or Password is wrong or user is not active";
                    res.status(400).send({status : 400, error: false, data: results, msg: message });
                } else {
                    if (results[0].authority == 1) {
                        db.query(
                            "UPDATE product_information SET Code_product_type = ? ,Product_name = ?, Barcode_number = ?, Production_date = ? , Selling_proce = ? , Cost_price = ? , Factory_code = ?  WHERE product_id = ?",
                            [
                                Code_product_type,
                                Product_name,
                                Barcode_number,
                                Production_date,
                                Selling_proce,
                                Cost_price,
                                Factory_code,
                                id,
                            ],
                            (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    message = "Update successfully.";
                                    res.status(200).send({status: 200, error: false, data: results, msg: message });
                                }
                            }
                        );
                    } else {
                        message = "User does not have permission to update";
                        res.status(400).send({status : 400 , error: false, data: {}, msg: message });
                    }
                }
            }
        );
    }
});
