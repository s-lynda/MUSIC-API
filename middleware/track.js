const Track = require("../models/Track");
 User = require("../models/user");

module.exports = {
    TracksList: async (req, res) => {
        try {
            const trackPromise =Track.find({})
            .populate("artist", "artName")
            .populate("album","AlbumTitle");
            if (req.query.sort) trackPromise.sort(req.query.sort);
            if (req.query.select) trackPromise.select(req.query.select);
            if (req.query.limit && !Number.isNaN(req.query.limit))
               trackPromise.limit(Number(req.query.limit));
        //When we have a long list of tracks  we use skip == to skip pages 
            if (req.query.skip && !Number.isNaN(req.query.skip))
               trackPromise.skip(Number(req.query.skip));
             const tracks= await trackPromise;
            res.status(201).json(tracks);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
   createTrack: async (req, res) => {
        try {
 const {trackName,
        album,
        artist,
        lang,
        genre,
        release,
        writers,
        producers, 
        length,
         Loundness,
        Danceability,
        Energy,
        BPM,
        Popularity} = req.body,
    track = await Track.create({trackName,
            album,
            artist,
            lang,
            genre,
            release,
            writers,
            producers, 
            length,
             Loundness,
            Danceability,
            Energy,
            BPM,
            Popularity});
                
            res.status(201).json(track);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
   showSpecificTrack: async (req, res) => {
        try {
            const id = req.params.id,
                track = await Track.findById(id)
                .populate("artist", "artName")
                .populate("album","AlbumTitle");
            res.json(track.fixRating());
        } catch (e) {
           next({ message: e.message, status: 500 });
        
        }
    },
  updateTrack: async (req, res, next) => {
        try {
            const id = req.params.id,
                {lang,
                writers,
                producers,
                Loundness,
                Danceability,
                Energy,
                BPM,
                album

                } = req.body;
            let track = await Track.findById(id);
            for(const i of track.artist)
            { if (!req.user._id.equals(i))
             throw Error("You aren't allowed to update other people games.");
            }
           track.lang = lang? lang: track.lang;
           track.writers= writers? writers : track.writers;
           track.producers = producers? producers : track.producers;
           track.Loundness = Loundness? Loundness : track.Loundness;
           track.Danceability = Danceability? Danceability : track.Danceability;
           track.Energy = Energy? Energy: track.Energy;
           track.BPM= BPM? BPM: track.BPM;
           track.album= album? album: track.album;
            await track.save();
            res.status(201).json(track);
        } catch (e) {
            next({ message: e.message, status: 500 });

        }
    }, 
  deleteTrack: async (req, res) => {
        try {
            const id = req.params.id,
                track = await Track.findById(id);
                for(const i of track.artist)
                { if (!req.user._id.equals(i))
                 throw Error("You aren't allowed to delete other people games.");
                }
            await track.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
   rateTrack: async (req, res) => {
        try {
            const {rating, comment} = req.body,
                id = req.params.id,
                track= await Track.findById(id);
            req.user.rates.push({
                track_id: id,
                rating,
                comment,
            });
            await req.user.save();
             track.totalRatin+= rating;
             track.Raters++;
            /// Totatl ratings / number raters
            await track.save();
            res.json(track);
        } catch (e) {
            res.json({ error: e.message });
        }
    },  
   editRate: async (req, res) => {
        try {
            const { rating, comment } = req.body,
                id = req.params.id,
                user = req.user,
                track = await Track.findById(id);
            let oldRating;
            for (const i in user.rates) {
                if (user.rates[i].track_id.equals(id)) {
                    oldRating = user.rates[i].rating;
                    user.rates[i] = { ...user.rates[i], rating, comment };
                    break;
                }
            }
            await user.save();
            track.totalRating -= oldRating - rating;
            /// Totatl ratings / number raters
            await track.save();
            res.json(track);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};