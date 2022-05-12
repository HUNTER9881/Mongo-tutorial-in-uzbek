const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true },
    ball: { type: Number, required: true },
    uuid: { type: Number, required: true },
    tag: [{ type: String, required: true }],
}, { timestamps: true })




const UserModel = mongoose.model('user', UserSchema)
module.exports = {
    UserModel
}
