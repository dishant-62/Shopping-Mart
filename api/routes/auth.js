const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password , process.env.PASSKEY).toString() , 
    });
    
    try
    {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//LOGIN

router.post("/login" , async (req,res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSKEY
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const asccesstoken = jwt.sign({
            id:user._id , isAdmin:user.isAdmin
        }, 
        process.env.JWT_KEY,
        {expiresIn:"3days"}
        );

        const { password , ...others} = user._doc;

        res.status(200).json({...others , asccesstoken});

    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
