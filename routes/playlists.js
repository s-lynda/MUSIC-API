const express = require("express"),
  { isLoggedIn} = require("../middleware/auth"),
    { showAllPlaylists,
        createPlaylist,
        showSpecificPlaylist,
        updateplaylist,
        deletePlaylist,
        addTrackToplaylist,
        deleteTrackFromPlaylist,
    } = require("../middleware/playlist");
router = express.Router();

router.route("/").get(showAllPlaylists).post(isLoggedIn,createPlaylist);
router.route("/:id").get(showSpecificPlaylist).all(isLoggedIn).put(updateplaylist).delete(deletePlaylist);
router.route("/:id/addTrack").put(isLoggedIn,addTrackToplaylist);
router.route("/:id/deleteTrack").delete(isLoggedIn,deleteTrackFromPlaylist);
module.exports = router;