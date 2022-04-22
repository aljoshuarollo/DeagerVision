const User = require('./../schema/UserSchema');
const Trainer = require('./../schema/TrainerSchema');
const Cred = require('./../schema/CredentialSchema');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLIENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.registerClient = async (req, res) => {
    const { name, username, emailAddress, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    try {
        const credentials = await new Cred({
            username: username,
            password: hashedPass,
            emailAddress: emailAddress
        });
        credentials.save();
    } catch(error) {
    }

    try {
        const client = await new User({
            name: name,
            username: username
        });
        client.save();
    } catch(error) {
    }
    res.send({ username: username });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TRAINERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.registerTrainer = async (req, res) => {
    const { name, username, emailAddress, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    try {
        const credentials = await new Cred({
            username: username,
            password: hashedPass,
            emailAddress: emailAddress
        });
        credentials.save();
    } catch(error) {
    }

    try {
        const trainer = await new Trainer({
            name: name,
            username: username
        });
        trainer.save();
    } catch(error) {
    }
    res.send({ username: username });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LOGIN/AUTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userCredentials = await Cred.findOne({ username }).lean();


        if(!userCredentials) return res.status(401).send({ message: 'Invalid username/password' });

        const isTrainer = await Trainer.findOne({ username }).lean();
        let { type } = {
            type: ''
        }
        
        if (isTrainer) type = 'trainer'
        else type = 'client'

        if (await bcrypt.compare(password, userCredentials.password)) {
            const id = {id: userCredentials.username, userType: type};
            const token = jwt.sign(id, process.env.JWT_SECRET, {
                expiresIn: '90d'
            });

            const cookieOptions = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: false
            }
                
            res.cookie('jwt', token, cookieOptions).send({ username, type, jwt: jwt });
            res.redirect('/')
        }
        else res.status(401).send({ message: 'Login Failed' });
    } catch (error) {
        
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AUTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.isAuth = async (req, res) => {
    if (req.headers.cookies) {
        try {
                   
            const decoded = await promisify(jwt.verify)(req.headers.cookies,
                process.env.JWT_SECRET);
            const userCredentials = await Cred.findOne({username: decoded.id}).lean();
            
            if (!userCredentials) res.json({ isAuth: false });

            res.status(200).json({ isAuth: true, username: decoded.id, userType: decoded.userType });
        }
        catch (error) {
            res.json({ isAuth: false });
        }
    } 
    else {
        res.status(200).json({auth: false });
    }
}

  
exports.logout = async (req, res) => {
    console.log('We are logging out');
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).send({message: 'Cookies replaced'});
}
