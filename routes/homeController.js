const Product = require("../models/product");
const User = require("../models/user");
const passport = require("passport");



module.exports = { 

getIndex : (req, res)=>{
    if(!req.isAuthenticated()){
        res.render('index', {products:[]});
        return;
    }
    Product.find({})
    .then(products=>{
        res.render('index', {products: products, currentUser: req.user});
    })
    .catch(error =>{
        console.log(error);});    
},
getIndexView : (req, res)=> {
    if(!req.isAuthenticated()){
        res.redirect("login");
        return;
    }
    else{
        res.redirect("index");
        return;
    }
},
getNewProduct : (req, res)=>{
    res.render("new");
},
productSearch : (req, res)=>{
    res.render("search");
},

search : (req, res)=>{ 
     const search ={code: req.query.code};
      
        Product.findOne(search)
        .then(product=>{
            if(!product){
            req.flash("error_msg", `Product does not existe with this code`);
            res.redirect("/product/search");
            }else{
            res.render("search", {product: product});
        }
        })
        .catch(error =>{           
            console.log(error);});   
},

editProduct : (req, res)=>{
    const searchById ={_id: req.params.id};

    Product.findOne(searchById)
    .then(product=>{
        res.render("edit", {product: product});
    })
    .catch(error =>{
        console.log(error);});    
},

updateProduct : (req, res)=>{
    const searchById ={_id: req.params.id};

    Product.updateOne(searchById, {$set:{
        code: req.body.code,
        description: req.body.description,
        price: req.body.price
    }}).then((product)=>{
        req.flash("success_msg", "Product data updates successfully");
        res.redirect("/");
    })
    .catch(error=>{res.redirect("/");});
},

newProduct : (req, res)=>{    
    const code_value = req.body.code;
    const description_value = req.body.description;
    const price_value = req.body.price;

    const newProduit = new Product({code : code_value, description : description_value, price : price_value});
    newProduit.save()
    .then(result=>{
        req.flash("success_msg", "Product data added to database successfully");
        res.redirect("/");
    })
    .catch(error =>{
        console.log(error);});
},

delete : (req, res)=>{    
    const searchById = {_id: req.params.id}; 

     Product.deleteOne(searchById).then(()=>{
        req.flash("success_msg", "Product deleted successfully");
        res.redirect("/");
     })
     .catch(error =>{
        res.redirect("/");
    });
},

renderLogin : (req, res) => {
    if(!req.isAuthenticated()){
        res.render("login");
    }
    else{
        res.redirect("/")
    }
},
renderSignup : (req, res) => {
    res.render("signup");
},     
renderLogout : (req, res) => { 
    req.logout (); 
    res.redirect ('/login');
}, 

    //Method authenticate//
 authenticate: passport.authenticate("local", {
 failureFlash:{
      type:"error_msg", 
      message: "Invalid email or pasword. Try Again!!!"
     },
      failureRedirect:"login",
      successRedirect:"/"
    }),
     
    //sauvegarder mot de passe et email//
saveUser : (req, res, next) => {
    console.log(req.body);

    if(req.skip) next();//si true=>middleware suivant
     let userParams ={
         name : req.body.name,
         email : req.body.email
       //password = req.body.password;
     }; 
    const newUsers = new User(userParams);
        console.log(newUsers);
        User.register(newUsers, req.body.password, (error, user)=>{
           if(error){
               console.log(error);
               res.locals.redirect = "/signup";
               next();               
           }else{
               res.locals.redirect = "/login";
               next();
            }
        });
},
redirectView: (req, res)=>{
    const redirectPath = res.locals.redirect;
    if(redirectPath)
    res.redirect(redirectPath);
},
    
};       
       
       
