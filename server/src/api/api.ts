import express, { Request, Response } from 'express';
import { register } from './register.js';

export const api = express.Router();

api.all('/', (_req: Request, res: Response) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);