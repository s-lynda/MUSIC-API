const Album = require("../models/album");
module.exports = {
   showAlbumList: async (req, res) => {
        try {
            const albums = await Album.find({})
            .select("AlbumTitle")
            .populate("Artist", "artName")
            .populate("Tracks", "trackName");
            res.json(albums);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    }, 
    createAlbum: async (req, res) => {
        try {
            const { AlbumTitle,Artist,Tracks,Genres,yearPublish} = req.body,
                album = await Album.create({ AlbumTitle,Artist,Tracks,Genres,yearPublish});
            res.status(201).json(album);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showSpecificAlbum: async (req, res) => {
        try {
            const id = req.params.id,
                album = await Album.findById(id)
                  .populate("Artist", "artName")
                  .populate("Tracks", "trackName ");
            res.json(album);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
   updateAlbum: async (req, res) => {
        try {
            const id = req.params.id,
                {NumberOfTracks,
                 AlbumLength,
                 Price,
                  Number_of_sales,
                Critics} = req.body;
            let album= await Album.findById(id);
            if (!req.user._id.equals(album.Artist))
                throw new Error("You aren't allowed to edit this album.");
            album.NumberOfTracks =NumberOfTracks ? NumberOfTracks : album.NumberOfTracks;
            album.AlbumLength = AlbumLength ? AlbumLength : album.AlbumLength;
            album.Price= Price ? Price: album.Price;
            album.Number_of_sales = Number_of_sales ? Number_of_sales : album.Number_of_sales;
            album.Critics =Critics? Critics: album.Critics;
            await album.save();
            res.json(album);
        } catch (e) {
            res.json({ error: e.message });
        }
    },

    deleteAlbum: async (req, res) => {
        try {
            const id = req.params.id;
            let album= await Album.findById(id);
            if (!req.user._id.equals(album.Artist))
                throw new Error("You aren't allowed to delete this Album.");
            album.remove();
            res.json({deleted: "successfully"});
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    addTrackToAlbum: async (req, res) => {
        const id = req.params.id,
            { track } = req.body;
        try {
            let album = await Album.findById(id);

            if (!req.user._id.equals(album.Artist))
                throw new Error("You aren't allowed to add a track to this Album.");
            album.Tracks.push(track);
            album.save();
            res.json(album);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
    deleteTrackFromAlbum: async (req, res) => {
        const id = req.params.id,
            { track } = req.body;
        try {
            let album = await Album.findById(id);

            if (!req.user._id.equals(album.Artist))
                throw new Error("You aren't allowed to delete a track to this Album.");

                for( var i = 0; i < album.Tracks.length; i++)
                {  if ( album.Tracks[i] === track) 
                    { 
                      album.Tracks.splice(i, 1); 
                    }
                
                }
            album.save();
            res.json(album);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
};