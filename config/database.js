const mongoose = require("mongoose");
console.log(process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected", ()=> {
    console.log(`Connection Port -> ${db.port}, database -> ${db.host}`)
})