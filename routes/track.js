const express = require("express"),
    { isLoggedIn, isArtist } = require("../middleware/auth"),
    {   TracksList,
        createTrack,
        showSpecificTrack,
        updateTrack,
        deleteTrack,
        rateTrack,
        editRate,
    } = require("../middleware/track");
router = express.Router();
router.route("/").get(TracksList).post(isLoggedIn,isArtist,createTrack);
router.route("/:id").get(showSpecificTrack).all(isLoggedIn).put(updateTrack).delete(deleteTrack);
router.route("/:id/rate").all(isLoggedIn).post(rateTrack).put(editRate);
module.exports = router;