const express = require("express");
const {
  modifySchemeInfo,
} = require("../../controllers/schemeInfo/schemeInfoUpdateController");

const router = express.Router();

// POST route to update scheme information by scheme_id
// This endpoint triggers the controller function to handle updating the information of a specific scheme identified by scheme_id
router.post("/scheme-info/update/:scheme_id", modifySchemeInfo);

module.exports = router;
