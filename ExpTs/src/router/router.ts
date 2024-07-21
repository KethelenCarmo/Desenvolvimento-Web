// src/routes/router.ts
import express from 'express';
import { Router } from 'express';

import mainController from '../controllers/main';
import majorController from '../controllers/major';
import authController from '../controllers/auth';

const router = Router();

// Auth Controller
router.get('/auth/signup', authController.signup);
router.post('/auth/signup', authController.signup);
router.get('/auth/login', authController.login);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// Main Controller
router.get('/', mainController.index);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// Major Controller
router.get('/major', majorController.index);
router.get('/major/read/:id', majorController.read);
router.get('/major/create', majorController.create);
router.post('/major/create', majorController.create);
router.get('/major/update/:id', majorController.update);
router.post('/major/update/{{major.id}}', majorController.update);
router.get('/major/remove/:id', majorController.remove);

router.get('/create-cookie', mainController.createCookie);
router.get('/uuid', mainController.uuid);

export default router;
