const mongoose = require("mongoose");
let AlbumSchema = new mongoose.Schema({
    AlbumTitle: {
        type: String,
        required: true,
    },
    Artist: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required:true,
        unique:true
    },
    Genres: [{
        type: String,
        required: true
    }],
    NumberOfTracks: {
        type: Number,
    },
    //Duration
    AlbumLength: {
        type: Number,
    },
    yearPublish:
    { type:Date,
      required:true
    },
    Price: {
        type: Number,
    },
    Number_of_sales: {
        type: Number,
    },
    Tracks: [
        {type: mongoose.Types.ObjectId,
            ref: "track",
        },
    ],
    Critics: {
        type: String,
        default:" "
    },
})
module.exports=mongoose.model("Album",AlbumSchema);