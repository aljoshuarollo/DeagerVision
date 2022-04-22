const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    emailAddress: {type: String, required: true, unique: true}
});

const credentials = mongoose.model('credential', CredSchema);
module.exports = credentials;
