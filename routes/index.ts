#!/usr/bin/env node
/**
 * @file index.ts
 * @description Entry point for routes
 * @access public
 * @requires express
 */
import Router from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/signup', UsersController.createUser);
router.post('/login', AuthController.getConnect, UsersController.loginUser);
router.post('/payment', AuthController.getConnect, );
router.get('/logout', AuthController.getDisconnect);

export default router;