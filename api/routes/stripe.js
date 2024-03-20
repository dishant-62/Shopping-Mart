const router = require("express");
const stripe = reqire("stripe")(process.env.STRIPE_KEY);



module.exports = router;