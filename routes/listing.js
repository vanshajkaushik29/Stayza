const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/",wrapAsync(listingController.index));

// router.post('/', upload.single("listing[image]"),  (req, res, next)=> {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   res.send(req.file);
// });

router.get("/new",isLoggedIn,listingController.renderNewForm);



router.get("/:id",wrapAsync(listingController.showListing));


router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));



router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing));
    
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


module.exports = router;
