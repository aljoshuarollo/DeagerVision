// 'use strict';
require('dotenv').config();

const authController = require('./controllers/auth');
const User = require('./schema/UserSchema');
const Trainer = require('./schema/TrainerSchema');
const Cred = require('./schema/CredentialSchema');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cookies stuff
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
app.set('trust proxy', 1);

app.use('/', require('./routes/auth'));

const port = 3080;

const throwError = error => {
    console.error(error);
}

const TheterURI = 'mongodb+srv://admin:admin@theter.cjbvp.mongodb.net/theter?retryWrites=true&w=majority'
mongoose.connect(TheterURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('Connected to Theterbase');
        app.listen(port, () => {
            console.log('Server listening on http://localhost:' + port);
        })
    })
    .catch(error => throwError(error));

app.use(express.static(path.join(__dirname, '../ui/out')));
app.use('/', require('./routes/auth'));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLIENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/api/get-client', async (req, res) => {
    const { username } = req.body;
    const client = await User.findOne({ username }).lean();
    if (!client) {
        res.status(404).send({ message: 'not found' });
    }
    else {
        res.send(client);
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TRAINERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/api/get-trainer', async (req, res) => {
    const { username } = req.body;
    const trainer = await Trainer.findOne({ username }).lean();
    if (!trainer) {
        res.status(404).send({ message: 'not found'});
    }
    else {
        res.send(trainer);
    }
})

app.post('/api/train-client', async (req, res) => {
    const { trainer, client } = req.body;
    await User.updateOne({ username: client.username }, { trainer: trainer});
    await Trainer.updateOne({ username: trainer }, { $push: { users: { client }}});
    res.send({ message: 'Added client and trainer relationship'});
})

app.post('/api/delete-client', async (req, res) => {
    const { trainer, client } = req.body;

    try {
        await User.updateOne(
            { username: client.username },
            { trainer: "none" }
        );

        await Trainer.updateOne(
            { username: trainer },
            { '$pull' : { users: { client } } }
        );
    } catch(err) {
        res.send(err);
    }

    res.send({ message: 'Removed client and trainer relationship'});
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GOALS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


app.post('/api/create-goal', async (req, res) => {

    const { username, goalName, goalType, deadline, description, amount } = req.body;

    let type;
    switch (goalType) {
        case 'water':  {
            type = {type: 'Water', volume: amount};
            break;
        }
        case 'workout': {
            type = {type: 'Workout', workouts: amount};
            break;
        }
        case 'food': {
            type = {type: 'Food', calories: amount};
            break;
        }
    }
    let date = deadline.split(',')[0];
    let dateFormat = date.split('/');
    const newGoal = {
        goalName: goalName,
        deadline: new Date(dateFormat[2], dateFormat[0] - 1, dateFormat[1]),
        goalType: type,
        description: description,
    }
    await User.updateOne({ username: username }, { $push: { goalList: newGoal }});
    res.send({ message: 'Goal Created.' })
})

app.post('/api/edit-goal-description', async (req, res) => {
    const { username, goalName, description, priorityGoal } = req.body;
    const filter = { username: username, 'goalList.goalName': goalName };
    const newDescription = { $set: { 'goalList.$.description': description }};

    try {
        const editedGoal = await User.updateOne(filter, newDescription);
        if (!editedGoal) {
            res.send({ message: 'User not found' });
        }
        if (priorityGoal) {
            await User.updateOne({ username: username }, { 'priorityGoal': goalName });
        }
        res.send(editedGoal);
    } catch(err) {
        console.log(err);
    }
})

app.post(`/api/edit-goal-deadline`, async (req, res) => {
    const {username, goalName, deadline } = req.body;
    let format = deadline.split('/');
    const filter = { username: username, 'goalList.goalName': goalName };
    const newDeadline = { $set: { 'goalList.$.deadline': new Date(format[2],format[1] - 1,format[0]) }};

    try {
        const editedGoal = await User.updateOne(filter, newDeadline);
        if (!editedGoal) {
            res.send({ message: 'User not found' });
        }
        res.send({ message: 'Deadline edited.' });
    } catch(err) {
        throwError(err);
    }
})

app.post('/api/add-goal-comment', async (req, res) => {
    const { username, goalName, comment } = req.body;
    const filter = { username: username, 'goalList.goalName': goalName };
    const newComment = { $set: { 'goalList.$.comment': comment }};

    try {
        const editedGoal = await User.updateOne(filter, newComment);
        if (!editedGoal) {
            res.send({ message: 'User not found' });
        }
        res.send(editedGoal);
    } catch(err) {
        console.log(err);
    }
})

app.post('/api/complete-goal', async (req, res) => {
    const { username, goalName, priorityGoal } = req.body;
    const filter = { username: username, 'goalList.goalName': goalName };
    const goal = await User.findOne({ username }).select({ goalList: { $elemMatch: { goalName: goalName }}});
    const completedGoal = goal.goalList[0];

    if (completedGoal.goalName === priorityGoal) {
        await User.updateOne({ username }, { $set: { 'priorityGoal': 'none' }});
    }

    try {
        const addCompletedGoal = await User.updateOne({ username }, { $push: { completedGoals: completedGoal }});
        if (!addCompletedGoal) {
            res.send({ message: 'Goal not added to completed goals.' });
        }
    } catch(err) {
        res.send(err);
    }

    try {
        await User.updateOne(
            filter,
            { '$pull' : { goalList: { goalName: goalName } } },
            { 'multi' : true }
        );
    } catch(err) {
        res.send(err);
    }

    res.send({ message: 'Goal Completed.'});
})

app.post('/api/delete-goal', async (req, res) => {
    const { username, goalName } = req.body;
    const filter = { username: username, 'goalList.goalName': goalName };
    try {
        const client = await User.findOne({ username });
        if (client.priorityGoal === goalName) {
            await User.updateOne({ username }, { $set: { 'priorityGoal': 'none' }});
        }
        await User.updateOne(
            filter,
            { '$pull' : { goalList: { goalName: goalName } } },
            { 'multi' : true }
        );
    } catch(err) {
        res.send(err);
    }
    res.send({ message: 'Goal Deleted.'});
})

app.post('/api/check-goal-name', async (req, res) => {
    const { username, goalName } = req.body;
    const goalExists = await User.findOne({ username, 'goalList.goalName': goalName });
    if (goalExists) {
        res.send({ exists: 'true' });
    }
    else {
        res.send({ exists: 'false' });
    }
})

app.post('/api/get-priority-goal', async (req, res) => {
    const { username } = req.body;
    const goalName = await User.findOne({ username }).select('priorityGoal');
    if (goalName.priorityGoal === 'none') {
        res.send({ priorityGoal: 'none' })
    }
    else {
        const priorityGoal = await User.findOne( { username }).select({ goalList: { $elemMatch: { goalName: goalName.priorityGoal }}});
        res.send({ priorityGoal: priorityGoal.goalList[0] });
    }
})

app.post('/api/check-goal-deadline', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        let today = new Date();
        let passedDeadlineGoals = []
        for (let i = 0; i < user.goalList.length; i++) {
            let goalDeadline = user.goalList[i].deadline;
            if (goalDeadline <= today) {
                passedDeadlineGoals.push(user.goalList[i]);
            }
        }
        res.send(passedDeadlineGoals)
    }
    else {
        console.log("Failed to find the user!");
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Registration Checks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/api/check-new-registration', async (req, res) => {
    const { username, emailAddress } = req.body;
    const usernameFound = await Cred.findOne({ username }).lean();
    const emailAddressFound = await Cred.findOne({ emailAddress }).lean();
    let check = {
        availableUsername: !usernameFound,
        availableEmailAddress: !emailAddressFound
    }
    res.send(check);
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/out/index.html'));
});
