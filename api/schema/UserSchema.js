const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    trainer: {type: Object, required: true, default: 'none'},
    priorityGoal: {type: String, required: true, default: 'none'},
    goalList: {type: Array, required: true, default: []},
    completedGoals: {type: Array, required: true, default: []}},
    { collection: "users" }
    );

// create a schema communicating with the User collection
const User = mongoose.model('user', UserSchema);
module.exports = User;
