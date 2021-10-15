const express = require("express"),
{isLoggedIn,isArtist } = require("../middleware/auth"),
{showUser, updateUser, userToArtist} = require("../middleware/user");
router = express.Router();

router.route("/:id").get(showUser).put(isLoggedIn,updateUser);
router.route("/:id/toArtist").put(isLoggedIn,isArtist,userToArtist);
module.exports = router;