const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//register endpoint
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        //check if name waas entered
        if(!name) {
            return res.json({
                error: 'name is required'
            })
        };
        //check if password is good 
        if(!password || password.length < 6){
            return res.json({
                error: 'password is required and should be at least 6 characters long'
            })
        };
        //check email
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'Email is already in use'
            })
        }

        const hashedPassword = await hashPassword(password)
        //create user in db 
        const user = await User.create({
            name, email, password: hashedPassword,
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error:'No user found'
            })
        }

        //check if passwords match
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error:"passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser
}