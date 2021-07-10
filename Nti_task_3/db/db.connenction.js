const mongoose = require('mongoose');
const DBURL = "mongodb://127.0.0.1:27017/myDB";
mongoose.connect(DBURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}, (err, res) => {
    err ? console.log(err) : console.log("database connected!");
})