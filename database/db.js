const { connect } = require("mongoose");

const connection = () => {
    connect('mongodb://localhost:27017/MONGO_dars', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFinfAndModify: false,
        useCreateIndex: true,
    })
        .then(() => {
            console.log("Database is running");
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = connection


