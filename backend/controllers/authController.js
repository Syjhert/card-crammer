import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            role: user.role, 
            username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register user
export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if there is a user with the same username or email
        let existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).json({ error: 'Username already in use' });
        existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const user = await User.create({ 
            username: username, 
            email: email, 
            password: password, 
            role: 'user'
        });
        const token = createToken(user);

        res.status(201).json({
            token,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                role: user.role 
            }
        });
    } catch (error) {
        next(error);
    }
};

// Login user
export const loginUser = async (req, res, next) => {
    const { emailOrUsername, password } = req.body;

    try {
        // Try finding the user by email or username
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email/username or password' });
        }

        const token = createToken(user);
        res.status(200).json({
            token,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                role: user.role, 
            }
        });
    } catch (error) {
        next(error);
    }
};