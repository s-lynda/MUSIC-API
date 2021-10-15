const mongoose = require("mongoose");
let TrackSchema = new mongoose.Schema({
        trackName: {
            type: String,
            required: true
        },
        album:{
            type: mongoose.Types.ObjectId,
            ref: "Album",
        },
        artist: [{
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true
        }],
        genre:[
        {
            type:String,
            required:true
        }],
        lang: {
            default: "EN",
            type: String,
            enum: ["EN", "JP", "FR", "AR", "DU", "SP"]
        },
        //realease date
        release: {
            type: Date,
            required: true
        },
        writers:[ {
            type: String,
        }],
        producers:
        [{
          type: String,
        }],
       //Duration 
        length: {
            type: Number
        },
        Loundness:{
            type: Number
        },
        Danceability: {
            type: Number
        },
        Energy: {
            type: Number
        },
        // BPM :beats per minute 
        BPM: {
            type: Number
        },
        totalRatin:
        {
            type:Number ,
            default:0
        },
        Raters:{
        type:Number,
        default:0
        },
        Popularity:
        {
            type:Number
        },
    },
    { timestamps: true });
    TrackSchema.methods.fixRating = function () {
        let obj = this.toObject();
        obj.rating = obj.totalRatin / obj.Raters;
        return obj;
    };
    module.exports=mongoose.model("track",TrackSchema);