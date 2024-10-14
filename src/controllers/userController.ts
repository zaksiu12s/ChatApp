import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUser } from '../services/userServices';
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const login = async (req: Request, res: Response): Promise<void> => {
    // Validate request query parameters
    if (typeof req.query.username !== 'string') {
        res.status(400).json({ error: 'Invalid username' });
        return;
    }

    const username = req.query.username.trim();

    try {
        const user = await findUser(username);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(user.username, SECRET_KEY);
        console.log(token);
        res.json({ token, senderUsername: username });
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

export const userData = async (req: Request, res: Response): Promise<void> => {
    res.send({ username: req.user });
}