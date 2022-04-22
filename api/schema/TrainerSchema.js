const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    users: {type: Array, required: false}
});

const trainers = mongoose.model('trainer', TrainerSchema);
module.exports = trainers;