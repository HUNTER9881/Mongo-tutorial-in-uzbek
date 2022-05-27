const mongoose = require('mongoose')
const FirsDemoAggregate = mongoose.Schema({
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    count: { type: Number, required: true },
    views: { type: Number, required: true },
    tag: [{ type: String, required: true }],
    ball: [{ type: Number, required: true }],
    countryName: { type: String, required: true },
    price: { type: Number, required: true },
    year_born: { type: Number, required: true },
    year_died: { type: Number, required: true },
    nationality: { type: String, required: true },
}, {
    timestamps: true
})

const WorkerSchema = mongoose.Schema({
    username: { type: String, required: true },
    country: { type: String, required: true },
    company: { type: String, required: true },
    workedYear: { type: Number, required: true },
    salary: {
        january: { type: Number, required: true },
        february: { type: Number, required: true },
        march: { type: Number, required: true },
        april: { type: Number, required: true },
        may: { type: Number, required: true },
        june: { type: Number, required: true },
    },
    bonus: {
        january: { type: Number, required: true },
        february: { type: Number, required: true },
        march: { type: Number, required: true },
        april: { type: Number, required: true },
        may: { type: Number, required: true },
        june: { type: Number, required: true },
    },
    born: { type: Number, required: true },
    died: { type: Number, required: true },
    position: { type: String, required: true }
})






const Workers = mongoose.model("workers", WorkerSchema);
const ModelSchema = mongoose.model("aggregateSchema", FirsDemoAggregate)


module.exports = { ModelSchema, Workers }