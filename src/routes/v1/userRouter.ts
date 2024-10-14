import { Router, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Importing controllers
import { login, userData } from '../../controllers/userController';
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return
    }

    jwt.verify(token, "HELLO", (err: any, decoded: any) => {
        if (err) {
            res.sendStatus(403);
            return
        }

        req.user = decoded;
        next();
        return;
    });
};


const router: Router = Router();

// router.get('/userData', authenticateToken, userData);
router.post('/', login);

export default router;