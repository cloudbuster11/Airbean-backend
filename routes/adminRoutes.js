const express = require('express');
const { authJwt } = require('../middleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/allorders', [authJwt.verifyToken, authJwt.isAdmin], adminController.getAllOrders);

router.get('/menu', [authJwt.verifyToken, authJwt.isAdmin], adminController.getMenu);

router.post('/menu', [authJwt.verifyToken, authJwt.isAdmin], adminController.addToMenu);

router.patch('/menu/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.updateMenu);

router.delete('/menu/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteProduct);

module.exports = router;
