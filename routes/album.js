const express = require("express"),
  { isLoggedIn,isArtist} = require("../middleware/auth"),
    {  createAlbum,
       showAlbumList,
       showSpecificAlbum,
       updateAlbum,
       deleteAlbum ,
       addTrackToAlbum,
       deleteTrackFromAlbum
    } = require("../middleware/album");
router = express.Router();

router.route("/").get(showAlbumList).post(isLoggedIn,isArtist,createAlbum);
router.route("/:id").get(showSpecificAlbum).all(isLoggedIn,isArtist).put(updateAlbum).delete(deleteAlbum);
router.route("/:id/addTrack").put(isLoggedIn,isArtist,addTrackToAlbum);
router.route("/:id/deleteTrack").delete(isLoggedIn,isArtist,deleteTrackFromAlbum);
module.exports = router;