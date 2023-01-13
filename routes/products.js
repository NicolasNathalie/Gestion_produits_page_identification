const express = require("express");
const router = express.Router();
const homeController = require('./homeController');


router.get("/",homeController.getIndexView);
router.get("/index",homeController.getIndex);
router.get("/product/new",homeController.getNewProduct);
router.get("/search/", homeController.search);
router.get("/product/search", homeController.productSearch);
router.get("/edit/:id", homeController.editProduct);
router.put("/edit/:id", homeController.updateProduct);
router.post("/product", homeController.newProduct);
router.delete("/delete/:id", homeController.delete);

router.get("/login", homeController.renderLogin);
router.post("/login", homeController.authenticate);
router.post("/signup", homeController.saveUser, homeController.redirectView);
router.get("/signup", homeController.renderSignup);
router.get("/logout", homeController.renderLogout); 

   

module.exports = router;