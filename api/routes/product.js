const product = require("../models/product");
const {verifytoken, verifytokenandAuthorization, verifytokenandAdmin} = require("./verifytoken");
const router = require("express").Router();


//CREATE
router.post("/" ,verifytokenandAdmin , async (req,res)=>{
    const newproduct = new product(req.body);

    try{
        const savedproduct = await newproduct.save();
        res.status(200).json(savedproduct);
    }catch(err){
        console.error("Error adding product:", err);
        res.status(500).json(err);
    }
})

// UPDATE
router.put("/:id" , verifytokenandAdmin, async (req,res)=>{
    try{
        const updatedproduct = await product.findByIdAndUpdate(req.params.id , {
            $set: req.body
        } , {new:true});
        res.status(200).json(updatedproduct)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

// //DELETE
router.delete("/:id", verifytokenandAdmin, async (req, res) => {
    try {
      await product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });
  
//GET
router.get("/find/:id", async (req, res) => {
    try {
      const findproduct = await product.findById(req.params.id);
      res.status(200).json(findproduct);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });


// //GET ALL PRODUCT
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await product.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
        products = await product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;