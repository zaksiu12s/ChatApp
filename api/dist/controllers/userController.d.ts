import { Request, Response } from 'express';
import "dotenv/config";
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const userData: (req: Request, res: Response) => Promise<void>;
