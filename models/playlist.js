const mongoose=require("mongoose");
let playlistSchema=new mongoose.Schema({
    playlistName :{
      type:String,
      required:true
    },
    public: {
         type: Boolean,
         default: false 
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    Contents:[{
        type: mongoose.Types.ObjectId,
        ref: "track",
    }],
    number:{
        type:Number,
    },
    PlaylistLength:
    {
        type:Number,
    }
});
module.exports=mongoose.model("playlist",playlistSchema);