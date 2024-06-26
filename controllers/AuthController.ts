#!/usr/bin/env node
/**
 * @file AuthController.ts
 * @description Controller for authentication
 * @access public
 * @requires express
 * @requires sha1
 * @requires uuid
 * @requires dbClient
 */

import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';


class AuthController {
    /**
     * @method getConnect
     * @description Authenticates a user
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} - Response object
     */
    static async getConnect(req: any, res: any, next: any): Promise<any> {
        const authHeader = req.headers.authorization;
        const session = req.session.token;
        if (!authHeader || !session) return res.status(401).json({ error: 'Unauthorized' });

        const authCredentials = Buffer.from(authHeader.split('')[1], 'base64').toString('utf-8');
        const email = authCredentials[0];
        const password = authCredentials[1];

        const user = await dbClient.getUserByEmail(email);
        if (!user || user.password !== sha1(password)) {
            return res.status(401).json({ error: 'Forbidden' });
        }
        next();
    }

    static async getDisconnect(req: any, res: any): Promise<any> {
        req.session.token = '';
        return res.status.json({ message: 'Logout successful' });
    }
}

export default AuthController;