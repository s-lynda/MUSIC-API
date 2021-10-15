const Playlist= require("../models/playlist");
module.exports = {
   showAllPlaylists: async (req, res) => {
        try {
            const playlists = await Playlist.find({public:true})
            .select("playlistName")
            .populate("user", "artName")
            .populate("Contents", "trackName");
            res.json(playlists);
        } catch (e) {
            res.json({ error: e.message });
        
        }
    }, 
 createPlaylist: async (req, res) => {
        try {
            const {playlistName ,public,user,Contents} = req.body,
                playlist= await Playlist.create({ playlistName ,public,user,Contents});
            res.status(201).json(playlist);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
 showSpecificPlaylist: async (req, res) => {
        try {
            const id = req.params.id,
                playlist = await Playlist.findById(id)
                  .populate("user", "artName")
                  .populate("Contents", "trackName release");
            res.json(playlist);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
 updateplaylist: async (req, res) => {
        try {
            const id = req.params.id,
                { playlistName, public } = req.body;
            let playlist = await Playlist.findById(id);
            if (!req.user._id.equals(playlist.user))
                throw new Error("You aren't allowed to edit this playlist.");
            playlist.playlistName =playlistName ? playlistName : playlist.playlistName;
            playlist.public = public ? public : playlist.public;
            await playlist.save();
            res.json(playlist);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
 deletePlaylist: async (req, res) => {
        try {
            const id = req.params.id;
            let playlist= await Playlist.findById(id);
            if (!req.user._id.equals(playlist.user))
                throw new Error("You aren't allowed to delete this playlist.");
            playlist.remove();
            res.json({deleted: "succesfully"});
        } catch (e) {
            res.json({ error: e.message });
        }
    },
addTrackToplaylist: async (req, res) => {
        const id = req.params.id,
            {track} = req.body;
        try {
            let playlist = await Playlist.findById(id);

            if (!req.user._id.equals(playlist.user))
                throw new Error("You aren't allowed to add a track to this playlist.");
            playlist.Contents.push(track);
            playlist.save();
            res.json(playlist);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
deleteTrackFromPlaylist: async (req, res) => {
        const id = req.params.id,
            { track } = req.body;
        try {
            let playlist = await Playlist.findById(id);

            if (!req.user._id.equals(playlist.user))
                throw new Error("You aren't allowed to delete a track to this Playlist.");
                for( var i = 0; i < playlist.Contents.length; i++){ 
    
                    if ( playlist.Contents[i] === track) { 
                        playlist.Contents.splice(i, 1); 
                    }
                
                }
            playlist.save();
            res.json(playlist);
        } catch (e) {
            res.json({ error: e.message });
        }
    }, 
};