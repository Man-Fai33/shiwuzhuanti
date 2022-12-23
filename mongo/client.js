var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

main();

function main() {
  // createDB();
  insertOne("test","customers");
  // findOne();
  // query("test", "customers");
  // query("test", "customers", {"name":"Viola"}); // search by criteria
  // query("test", "customers", {"name": /^S/}); // search by regular expression
  // update("test", "customers",{ name: "Ben" }, { $set: {name: "Ben", address: "Canyon 123" } })
  // deleteEntry("test", "customers", {"name":"Viola"})
}
function createDB() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
}
function createCollection() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}
function dropCollection() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.dropCollection("customers", function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
}
function insertOne(dbName, colName) {
    var myobj = { name: "Company Inc", address: "Highway 15" };
  process("test", "customers", (col, cb) => {
    col.insertOne(myobj, cb);
    console.log("insert "+myobj);
  })
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db(dbName);
  //   var col = dbo.collection(colName);
  //   col.insertOne(myobj, function(err, obj) {
  //     if (err) throw err;
  //     db.close();
  //   });
  // });
}
function insertArray() {
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  process("test", "customers", (col, cb) => col.insertMany(myobj, cb))
}
function findOne() {
  // process("test", "customers", (col, cb) => col.findOne({},cb));
  process("test", "customers", (col, cb) => col.findOne({},function(err, result) {
    if (err) throw err;
    console.log(result);
    cb(err, result);
  }));
  // process("test", "customers", (col, cb) => {
  //   col.find({"name":"Viola"}) //.limit(num)
  //     .toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     cb(err, result);
  //   });
  // });
}
function query(dbName, colName, criteria={}, num=1000) {
    process(dbName, colName, (col, cb) => {
      col.find(criteria)
        .limit(num)
        .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        cb(err, result);
      });
    })
}

function update(dbName, colName, criteria, newvalues) {
  process(dbName, colName, (col, cb) => col.updateOne(criteria, newvalues, cb))
}
function deleteEntry(dbName, colName,criteria) {
  process(dbName, colName, (col,cb) =>col.deleteOne(criteria, cb))
}

function process(dbName, colName, task) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var col = dbo.collection(colName);
    task(col, function(err, obj) {
      if (err) throw err;
      db.close();
    });
  });
}
