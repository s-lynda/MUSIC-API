const User= require("../models/user");
module.exports = {
    createUser: async (req, res) => {
        const {realName,artName, mail, Password,role,isArtist} = req.body;
        try {
            const user = await User.create({realName,artName, mail, Password,role,isArtist});
            res.status(201).json(user.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    logUser: async (req, res) => {
        //artName=UserName 
        const { artName, Password } = req.body;
        try {
            const u= await User.findOne({ artName });
            if (!u) throw new Error("Sorry,We didn't find any user with this username : " + artName);
            if (!(await u.comparePasswords(Password)))
                throw Error("Wrong Password,Try again !!");
            res.json(u.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id).select({ Password: 0 })
           .populate("tracks","trackName")
           .populate("Albums","AlbumTitle")
           .populate("Playlists","playlistName"); 
            res.status(201).json(user.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateUser: async (req, res) => {
        const  {realName,Password,role,instruments,Country,City,yearBirth,tracks,Albums,Playlists} = req.body,
            id = req.params.id;
        try {
            if (!req.user._id.equals(id))
              throw new Error("You aren't allowed to edit other users profiles.");
            const u = await User.findById(id);
            u.realName = realName? realName : u.realName;
            u.Password = Password ? Password : u.Password;
            u.role = role ? role : u.role;
            u.instruments=instruments?instruments: u.instruments;
            u.Country=Country?Country: u.Country;
            u.City=City?City: u.City;
            u.yearBirth=yearBirth?yearBirth: u.yearBirth;
            u.tracks.push(...tracks);
            u.Albums.push(...Albums);
            u.Playlists.push(...Playlists);
             await u.save();
             res.status(201).json(u);          
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    userToArtist: async (req, res) => {
        const id = req.params.id;
        try {
            const u = await User.findById(id);
             u.isArtist = true;
             await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};