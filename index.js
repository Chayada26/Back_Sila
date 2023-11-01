require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

const db = new sqlite3.Database("./Database/TBBess.db");

app.use(express.json());


db.run(`CREATE TABLE IF NOT EXISTS Customer (cus_id INTEGER PRIMARY KEY,
				cus_name TEXT , cus_address TEXT ,  cus_phone TEXT  )`);

 db.run(`CREATE TABLE IF NOT EXISTS Order_product (order_id INTEGER PRIMARY KEY,
        cuss_id INTEGER , order_date TEXT ,  order_price INTEGER  
        )`);
  


  //ใหม่    // CUSTOMER  
        app.get("/customer", (req, res) => {
          db.all("SELECT * FROM customer ",(err, row) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (!row) {
                res.status(404).send("customer not found");
              } else {
                res.json(row);
              }
            }
          });
        });        
        app.get("/customer/:id", (req, res) => {
          db.get("SELECT * FROM customer WHERE cus_id = ? ", req.params.id, (err, row) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (!row) {
                res.status(404).send("customer not found");
              } else {
                res.json(row);
              }
            }
          });
        });
        
        
        app.post("/customer", (req, res) => {
          const customer = req.body;
          db.run(
            "INSERT INTO customer (cus_name,cus_address,cus_phone) VALUES (?,?,?)",
            customer.cus_name,customer.cus_address,customer.cus_phone,
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                
                customer.cus_id = this.lastID;
                res.send(customer);
                res.status(200);
              }
            }
          );
        });
        app.put("/customer/:id", (req, res) => {
          const customer = req.body;
          db.run(
            "UPDATE customer SET cus_name = ? , cus_address = ? , cus_phone = ?  WHERE cus_id = ? ",
            customer.cus_name,
            customer.cus_address,
            customer.cus_phone,
            req.params.id,
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(customer);
              }
            }
          );
        });
        
        
        app.delete("/customer/:id", (req, res) => {
          db.run("DELETE FROM customer WHERE cus_id = ?", req.params.id, (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send({});
            }
          });
        });


         //ใหม่    // ORDER_PRODUCT  
         app.get("/ORDER_PRODUCT", (req, res) => {
          db.all("SELECT * FROM ORDER_PRODUCT ",(err, row) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (!row) {
                res.status(404).send("ORDER_PRODUCT not found");
              } else {
                res.json(row);
              }
            }
          });
        });      

        app.get("/ORDER_PRODUCT/:id", (req, res) => {
          db.get("SELECT * FROM ORDER_PRODUCT WHERE order_id = ? ", req.params.id, (err, row) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (!row) {
                res.status(404).send("ORDER_PRODUCT not found");
              } else {
                res.json(row);
              }
            }
          });
        });
        
        
        app.post("/ORDER_PRODUCT", (req, res) => {
          const ORDER_PRODUCT = req.body;
          db.run(
            "INSERT INTO ORDER_PRODUCT (cuss_id,order_date,order_price) VALUES (?,?,?)",
            ORDER_PRODUCT.cuss_id,ORDER_PRODUCT.order_date,ORDER_PRODUCT.order_price,
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                
                ORDER_PRODUCT.order_id = this.lastID; // เปลี่ยน ID ซึ่งเป็น Primary KEY ของ Table นั้น 
                res.send(ORDER_PRODUCT);
                res.status(200);
              }
            }
          );
        });
        app.put("/ORDER_PRODUCT/:id", (req, res) => {
          const ORDER_PRODUCT = req.body;
          db.run(
            "UPDATE ORDER_PRODUCT SET cuss_id = ? , order_date = ? , order_price = ?  WHERE order_id = ? ",
            ORDER_PRODUCT.cuss_id,
            ORDER_PRODUCT.order_date,
            ORDER_PRODUCT.order_price,
            req.params.id,
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(ORDER_PRODUCT);
              }
            }
          );
        });
        
        
        app.delete("/ORDER_PRODUCT/:id", (req, res) => {
          db.run("DELETE FROM ORDER_PRODUCT WHERE order_id = ?", req.params.id, (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send({});
            }
          });
        });


// ดึงข้อมูล
// ดูข้อมูลทั้งหมด
app.get("/school", (req, res) => {
  db.all("SELECT * FROM school ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("School not found");
      } else {
        res.json(row);
      }
    }
  });
});




// ดูข้อมูลด้วย id
app.get("/school/:id", (req, res) => {
  db.get("SELECT * FROM school WHERE school_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("School not found");
      } else {
        res.json(row);
      }
    }
  });
});


//ส่วนนี้บอสทำต่อให้จนเสร็จละ คือการเพิ่มข้อมูล
app.post("/school", (req, res) => {
  const school = req.body;
  db.run(
    "INSERT INTO school (number,name) VALUES (?,?)",
    school.number,school.name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        school.id = this.lastID;
        res.send(school);
        res.status(200);
      }
    }
  );
});



//ส่วนแก้ไข
app.put("/school/:id", (req, res) => {
  console.log(req.params.id);
  const school = req.body;
  db.run(
    "UPDATE school SET number = ? , name = ? WHERE school_id = ? ",
    school.number,
    school.name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(school);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/school/:id", (req, res) => {
  db.run("DELETE FROM school WHERE school_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// province

app.get("/province", (req, res) => {
  db.all("SELECT * FROM province ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("province not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/province/:id", (req, res) => {
  db.get("SELECT * FROM province WHERE province_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("province not found");
      } else {
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/province", (req, res) => {
  const province = req.body;
  db.run(
    "INSERT INTO province (province_name) VALUES (?)",
    province.province_name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        province.id = this.lastID;
        res.send(province);
        res.status(200);
      }
    }
  );
});


//ส่วนแก้ไข
app.put("/province/:id", (req, res) => {
  console.log(req.params.id);
  const province = req.body;
  db.run(
    "UPDATE province SET province_name = ?  WHERE province_id = ? ",
    province.province_name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(province);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/province/:id", (req, res) => {
  db.run("DELETE FROM province WHERE province_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// school_province

app.get("/school_province", (req, res) => {
  db.all("SELECT * FROM school_province ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("school_province not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/school_province/:id", (req, res) => {
  console.log("gettttttt")
  db.get("SELECT * FROM school_province WHERE id = ? ", req.params.id, (err, row) => {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("school_province not found");
      } else {
        console.log(row)
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/school_province", (req, res) => {
  const school_province = req.body;
  db.run(
    "INSERT INTO school_province (school_id , province_id) VALUES (?, ?)",
    school_province.school_id,
    school_province.province_id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        school_province.id = this.lastID;
        res.send(school_province);
        res.status(200);
      }
    }
  );
});


//ส่วนแก้ไข
app.put("/school_province/:id", (req, res) => {
  console.log(req.params.id);
  const school_province = req.body;
  db.run(
    "UPDATE school_province SET school_id = ?, province_id = ?  WHERE id = ? ",
    school_province.school_id,
    school_province.province_id,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(school_province);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/school_province/:id", (req, res) => {
  db.run("DELETE FROM school_province WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));