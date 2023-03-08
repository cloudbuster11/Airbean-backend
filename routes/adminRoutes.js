const express = require('express');
const { authJwt } = require('../middleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/auth/allorders', [authJwt.verifyToken, authJwt.isAdmin], adminController.getAllOrders);

router.get('/auth/menu', [authJwt.verifyToken, authJwt.isAdmin], adminController.getMenu);

router.post('/auth/menu', [authJwt.verifyToken, authJwt.isAdmin], adminController.addToMenu);

router.patch('/auth/menu/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.updateMenu);

router.delete('/auth/menu/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteProduct);

module.exports = router;
